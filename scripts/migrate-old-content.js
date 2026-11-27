#!/usr/bin/env node

/**
 * Migrate blogs and case studies from the old Gatsby website (avniproject/avni-website).
 *
 * Usage:
 *   git clone --depth 1 git@github.com:avniproject/avni-website.git /tmp/old-site
 *   node scripts/migrate-old-content.js /tmp/old-site
 *
 * Re-runnable: re-run before launch to pick up posts published on the old site in the meantime.
 * - Each old post keeps its file name, so its URL (/blog/<file-name>/) stays the same.
 * - Images are copied to public/img (same folders as the old /img paths), resized to
 *   max 1600px wide and converted to WebP. Spaces in paths become hyphens.
 *   Large animated GIFs (screen recordings) become MP4 clips that autoplay, loop and are muted,
 *   like a GIF but ~10x smaller. Needs ffmpeg installed.
 *   Already converted images are skipped.
 * - Posts created only in this repo are never touched.
 */

const { execFile } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const { blogSectors } = require('./blog-sector-rules');
const { simplifyPostHtml } = require('./simplify-post-html');
const matter = require('gray-matter');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT = {
  blog: path.join(ROOT, 'content/blogs'),
  'case-studies': path.join(ROOT, 'content/case-studies'),
};
const OLD_SITE_URL = 'https://avniproject.org';
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;
const CONVERTIBLE = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const VIDEO_MIN_BYTES = 1e6; // smaller GIFs stay images

// First matching rule wins. Matched case-insensitively against each tag and the title,
// since many old posts (most release notes) have no tags.
const BLOG_CATEGORY_RULES = [
  ['Events', /conference|sprint|workshop|retreat|charcha|meetup/],
  ['Avni News', /^release$|release\b|annual update|launchpad|cohort|^avni$|announcement|annoucement/],
  ['Technical Story', /^ai$|ai cohort|machine learning|llm|software engineering|architecture|^technology$|data visualization|chatbot|open source|data strategy/],
  ['User Story', /user stor|field visit|social impact|case study|reflections/],
];
const DEFAULT_BLOG_CATEGORY = 'Knowledge';

// Old file names that need a hand-picked new slug. Other names with spaces or punctuation
// (which break in browsers and shared links) get one automatically, see toSlug().
const SLUG_RENAMES = {
  '2022-10-20-avni-release-announcement copy': '2022-10-20-avni-release-announcement',
};
// Listing thumbnails chosen on the new site, kept when the script is re-run.
// A path (file in public/img) replaces the cover; null drops it so the branded card shows.
const COVER_OVERRIDES = {
  '2026-10-29-camp-mode': '/img/camp-mode/camp-mode-cover.webp',
  // better photos from inside the post (or a crop of one)
  '2026-06-16-inside-ashwini-community-healthcare-nilgiris': '/img/2026-06-16-inside-ashwini-community-healthcare-nilgiris/ashwini-2.webp',
  '2025-12-02-my-three-weeks-with-jss-a-ground-reality-reflection': '/img/2025-12-02-my-three-weeks-with-jss-a-ground-reality-reflection/jss-card.webp',
  '2025-05-19-field-visit-to-iph': '/img/2025-05-19-siddharth-iph-blog/s2.webp',
  '2025-06-12-field-visit-to-kollegal-government-hospital': '/img/2025-06-12-field-visit-to-kollegal-government-hospital/R2.webp',
  // text graphics and screenshots that don't work as a full-cover thumbnail
  'avni-appsheet-comparison': null,
  '2024-09-23-Query-Generation-Using-AI': null,
  '2026-07-10-ai-across-the-avni-lifecycle': null,
  '2026-04-29-deterministic-rails-agentic-judgement': null,
  '2025-06-12-no-more-fake-data-headaches': null,
};

// Which part of the cover the card shows (default: middle)
const IMAGE_POSITION_OVERRIDES = {
  '2025-02-11-reflections-of-the-avni-conference-2025': 'top',
  '2025-02-03-reflections-and-learnings-from-avni-2025-conference': 'top',
  '2025-01-31-my-reflections-from-avni-conf-2025': 'top',
  '2025-01-29-avni-conf-2025-pooja-aggarwal': 'top',
  '2025-01-29-avni-conference-blog-kamesh': 'top',
  '2020-update': 'top',
};

// Every renamed URL is recorded here, for the old-site redirects
const REDIRECTS_FILE = path.join(ROOT, 'config/old-site-redirects.json');
const OLD_PATH = { blog: '/blog', 'case-studies': '/case-studies' };
const NEW_PATH = { blog: '/blog', 'case-studies': '/resources/case-studies' };

const CASE_STUDY_SECTOR_BY_TAG = {
  health: 'Healthcare',
  water: 'Water & Sanitation',
  education: 'Education',
  socialsecurity: 'Social Security',
  'social security': 'Social Security',
  sports: 'Sports',
  wastemanagement: 'Waste Management',
  'waste management': 'Waste Management',
};

// Case studies whose tags don't name a sector, or that have a partner logo in public/logos
const CASE_STUDY_OVERRIDES = {
  '2025-09-03-how-goonj-uses-avni': { sector: 'Livelihood', logo: '/logos/Goonj-logo-10June20.webp' },
  'mahapeconet-use-of-avni-in-covid-relief': { sector: 'Social Security', logo: '/logos/Maharashtra-PECOnet-logo.webp' },
  '2024-11-11-jal-jeevan-mission-arghyam': { logo: '/logos/ARGHYAM.webp' },
  '2025-08-01-empowering-waste-pickers': { logo: '/logos/HD-Main-Logo.webp' },
  'avni-for-sickle-cell-disease-screening-and-treatment': { logo: '/logos/JSS-Logo-new-Hindi-2.webp' },
  // logos taken from each partner's official website
  '2025-04-30-restoring-waterbodies-avni-atecf': { logo: '/logos/ATECF-logo.webp' },
  'dam-and-water-bodies-desilting-work-monitoring-1': { logo: '/logos/ATECF-logo.webp' },
  'calcutta-kids-avni-implemented-for-maternal-and-child-health-program': { logo: '/logos/Calcutta-Kids-logo.webp' },
  '2024-09-19-Scaling-Rural-Education': { logo: '/logos/CInI-logo.webp' },
  '2024-11-27-Project-Potential-Bihar-Health-Access-Digitisation-Case-study': { logo: '/logos/Project-Potential-logo.webp' },
  '2025-05-28-bridging-the-nutrition-gap-apf-odisha': { logo: '/logos/Azim-Premji-Foundation-logo.webp' },
  '2025-07-31-scoring-for-equality': { sector: 'Sports', logo: '/logos/Maitrayana-logo.webp' },
  'classroom-observation-tool-for-andhra-pradesh': { logo: '/logos/LFE-logo.webp' },
  '2025-05-02-ihmp-strengthening-adolescent-health': { logo: '/logos/IHMP-logo.webp' },
  '2024-05-22-empowering-vision-care-chashma-tech4dev': { logo: '/logos/Sarva-Mangal-Family-Trust-logo.webp' },
  // JNPCT has no logo of its own; SEWA Rural is its tech partner on this project
  'use-of-avni-in-jnpct-malnutrition-project-case-study': { logo: '/logos/SEWA-Rural-logo.webp' },
  '2026-05-05-purna-clinic-tide-trust-dangs': { logo: '/logos/TIDE-logo.webp' },
};

const redirects = {};
const report = { blog: 0, 'case-studies': 0, images: 0, videos: 0, imagesSkipped: 0, bytesIn: 0, bytesOut: 0, missing: [], categories: {}, sectors: {} };
const imageCache = new Map();
const migratedPaths = new Set(); // new paths already written into bodies, so a later pass doesn't migrate them again

function toPublicImagePath(ref) {
  const clean = ref.replace(/\s+/g, '-');
  const ext = path.extname(clean).toLowerCase();
  return CONVERTIBLE.includes(ext) ? clean.slice(0, -ext.length) + '.webp' : clean;
}

async function isLargeAnimation(src) {
  if (path.extname(src).toLowerCase() !== '.gif' || fs.statSync(src).size < VIDEO_MIN_BYTES) return false;
  const { pages = 1 } = await sharp(src, { limitInputPixels: false }).metadata();
  return pages > 1;
}

async function gifToMp4(src, dest) {
  await promisify(execFile)('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', src,
    '-vf', `scale='trunc(min(${MAX_WIDTH},iw)/2)*2':-2`, // H.264 needs even dimensions
    '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', '-an', dest,
  ]);
}

const videoTag = (src, attrs = '') => `<video src="${src}"${attrs} autoplay loop muted playsinline></video>`;

async function fetchLegacyStatic(ref, oldSite) {
  // Gatsby-processed images (/static/<name>-<hash>.<ext>) exist only on the live old site
  const dest = path.join(oldSite, 'static/img/legacy', path.basename(ref));
  if (!fs.existsSync(dest)) {
    const res = await fetch(OLD_SITE_URL + ref);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  }
  return '/img/legacy/' + path.basename(ref);
}

// Returns the new path; a .mp4 path means the caller must render a <video>
async function migrateImage(rawRef, oldSite, file, { allowVideo = true } = {}) {
  const cacheKey = `${allowVideo}:${rawRef}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey);
  let ref = rawRef;
  try { ref = decodeURIComponent(rawRef); } catch { /* keep as is */ }
  if (ref.startsWith('img/')) ref = '/' + ref;

  let newRef = rawRef;
  try {
    if (ref.startsWith('/static/')) ref = await fetchLegacyStatic(ref, oldSite);
    const src = path.join(oldSite, 'static', ref);
    if (!fs.existsSync(src)) throw new Error('not found in old site');

    const asVideo = allowVideo && (await isLargeAnimation(src));
    newRef = asVideo ? toPublicImagePath(ref).replace(/\.webp$/, '.mp4') : toPublicImagePath(ref);
    const dest = path.join(PUBLIC_DIR, newRef);
    if (fs.existsSync(dest)) {
      report.imagesSkipped++;
    } else {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const ext = path.extname(src).toLowerCase();
      if (asVideo) {
        await gifToMp4(src, dest);
        report.videos++;
      } else if (CONVERTIBLE.includes(ext)) {
        await sharp(src, { animated: ext === '.gif' || ext === '.webp', limitInputPixels: false })
          .rotate() // apply the camera's orientation tag, or phone photos come out sideways
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY, effort: 4 })
          .toFile(dest);
      } else {
        fs.copyFileSync(src, dest);
      }
      report.images++;
      report.bytesIn += fs.statSync(src).size;
      report.bytesOut += fs.statSync(dest).size;
    }
  } catch (error) {
    report.missing.push(`${file}: ${rawRef} (${error.message})`);
    newRef = rawRef;
  }
  imageCache.set(cacheKey, newRef);
  migratedPaths.add(newRef);
  return newRef;
}

async function replaceAsync(text, regex, replacer) {
  const matches = [...text.matchAll(regex)];
  const replacements = await Promise.all(matches.map(m => replacer(...m)));
  let i = 0;
  return text.replace(regex, () => replacements[i++]);
}

const isLocalImage = ref => /^\/?(img|static)\//.test(ref);

async function migrateBody(body, oldSite, file) {
  let out = body
    .replace(/^\s*(-\s*){3,}\n/, '') // stray separator right after the frontmatter would be read as a second frontmatter block
    .replace(/^\s*# .*\n/, ''); // the page template already renders the title as <h1>

  // Markdown images; the old site allowed unencoded spaces in paths, which CommonMark doesn't
  out = await replaceAsync(out, /(!\[([^\]]*)\]\()([^)"]+?)(\s+"[^"]*")?\)/g, async (all, open, alt, ref, title = '') => {
    if (!isLocalImage(ref.trim())) return all;
    const newRef = await migrateImage(ref.trim(), oldSite, file);
    if (newRef.endsWith('.mp4')) return videoTag(newRef, alt ? ` aria-label="${alt.replace(/"/g, '&quot;')}"` : '');
    return `${open}${newRef}${title})`;
  });
  // Plain links to Gatsby-processed images, e.g. [a dashboard](/static/my-dashboard-<hash>.gif)
  out = await replaceAsync(out, /((?<!!)\[[^\]]*\]\()(\/static\/[^)\s]+)\)/g, async (all, open, ref) =>
    `${open}${await migrateImage(ref, oldSite, file, { allowVideo: false })})`);
  // HTML <img>, <video>, <source>
  out = await replaceAsync(out, /(src=["'])([^"']+)(["'])/g, async (all, open, ref, close) => {
    if (!isLocalImage(ref) || migratedPaths.has(ref)) return all;
    return `${open}${await migrateImage(ref, oldSite, file)}${close}`;
  });
  // <img> tags whose GIF became a video keep their attributes (width etc.)
  out = out.replace(/<img\b([^>]*?\ssrc=["'][^"']+\.mp4["'][^>]*?)\s*\/?>/g, (all, attrs) =>
    `<video${attrs.replace(/\balt=/, 'aria-label=')} autoplay loop muted playsinline></video>`);
  // The old site's YouTube shorthand `youtube: <id>` becomes an embed
  out = out.replace(/^`youtube:\s*([\w-]+)`\s*$/gm, (all, id) =>
    `<iframe class="video-embed" src="https://www.youtube.com/embed/${id}" title="YouTube video" loading="lazy" allowfullscreen></iframe>`);
  // Plain markdown images instead of HTML wrappers, so the CMS editor shows pictures
  out = simplifyPostHtml(out).body;
  // Case studies moved under /resources
  return out.replace(/(\]\(|href=["'])\/case-studies\b/g, '$1/resources/case-studies');
}

function blogCategory(tags, title) {
  const lower = [...tags, title].map(t => String(t).toLowerCase().trim());
  for (const [category, rule] of BLOG_CATEGORY_RULES) {
    if (lower.some(t => rule.test(t))) return category;
  }
  return DEFAULT_BLOG_CATEGORY;
}

function caseStudySector(tags) {
  for (const tag of tags) {
    const sector = CASE_STUDY_SECTOR_BY_TAG[String(tag).toLowerCase().trim()];
    if (sector) return sector;
  }
  return null;
}

function toSlug(oldSlug) {
  if (SLUG_RENAMES[oldSlug]) return SLUG_RENAMES[oldSlug];
  if (/^[A-Za-z0-9._-]+$/.test(oldSlug)) return oldSlug; // keep the old URL as is
  return oldSlug
    .normalize('NFKD')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toDateString(value) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
}

function readTime(body) {
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function fallbackDescription(body) {
  const paragraph = body.split(/\n\s*\n/).map(p => p.trim()).find(p => p && !/^[!#<]/.test(p)) || '';
  const text = paragraph.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/<[^>]+>|[*_`]/g, '');
  return text.length > 160 ? text.slice(0, 157).trimEnd() + '...' : text;
}

const clean = value => String(value || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

async function migrateFile(type, file, oldSite) {
  const oldSlug = file.replace(/\.md$/, '');
  const slug = toSlug(oldSlug);
  if (slug !== oldSlug) redirects[`${OLD_PATH[type]}/${oldSlug}/`] = `${NEW_PATH[type]}/${slug}/`;
  const { data, content } = matter(fs.readFileSync(path.join(oldSite, 'src/pages', type, file), 'utf8'));
  const tags = (data.tags || []).map(clean).filter(Boolean);
  const body = await migrateBody(content, oldSite, file);
  // Release posts get a generated release-notes card instead (see BlogCoverFallback); posts
  // without a cover get a branded card rather than an image picked from the body
  const isRelease = type === 'blog' && /releas/i.test(clean(data.title));
  const image = slug in COVER_OVERRIDES ? COVER_OVERRIDES[slug] : (data.featuredimage && !isRelease
    ? await migrateImage(data.featuredimage, oldSite, file, { allowVideo: false })
    : undefined);

  const frontmatter = {
    title: clean(data.title),
    slug,
    description: clean(data.description) || fallbackDescription(body),
    date: toDateString(data.date),
    author: clean(data.author) || 'Avni Team',
    readTime: readTime(body),
  };

  if (type === 'blog') {
    frontmatter.category = blogCategory(tags, frontmatter.title);
    report.categories[frontmatter.category] = (report.categories[frontmatter.category] || 0) + 1;
    const sectors = blogSectors([frontmatter.title, tags.join(' '), body].join(' '), frontmatter.category);
    if (sectors.length) frontmatter.sectors = sectors;
  } else {
    const override = CASE_STUDY_OVERRIDES[slug] || {};
    frontmatter.sector = override.sector || caseStudySector(tags);
    if (!frontmatter.sector) {
      frontmatter.sector = 'Healthcare';
      report.missing.push(`${file}: no sector could be derived from tags [${tags}], defaulted to Healthcare`);
    }
    if (override.logo) frontmatter.logo = override.logo;
    report.sectors[frontmatter.sector] = (report.sectors[frontmatter.sector] || 0) + 1;
  }
  if (image) frontmatter.image = image;
  if (image && IMAGE_POSITION_OVERRIDES[slug]) frontmatter.imagePosition = IMAGE_POSITION_OVERRIDES[slug];
  frontmatter.tags = tags.filter(t => !/^case ?study$/i.test(t));

  fs.writeFileSync(path.join(OUT[type], slug + '.md'), matter.stringify(body.trimStart(), frontmatter));
  report[type]++;
}

async function main() {
  const oldSite = process.argv[2];
  if (!oldSite || !fs.existsSync(path.join(oldSite, 'src/pages/blog'))) {
    console.error('Usage: node scripts/migrate-old-content.js <path-to-old-avni-website-checkout>');
    process.exit(1);
  }

  for (const type of Object.keys(OUT)) {
    fs.mkdirSync(OUT[type], { recursive: true });
    const files = fs.readdirSync(path.join(oldSite, 'src/pages', type)).filter(f => f.endsWith('.md'));
    for (const file of files) {
      await migrateFile(type, file, oldSite);
    }
  }

  fs.writeFileSync(REDIRECTS_FILE, JSON.stringify(redirects, null, 2) + '\n');

  const mb = bytes => (bytes / 1e6).toFixed(1) + ' MB';
  console.log(`\nMigrated ${report.blog} blogs, ${report['case-studies']} case studies`);
  console.log('Blog categories:', report.categories);
  console.log('Case study sectors:', report.sectors);
  console.log(`Renamed URLs (written to ${path.relative(ROOT, REDIRECTS_FILE)}): ${Object.keys(redirects).length}`);
  console.log(`GIFs converted to video: ${report.videos}`);
  console.log(`Images converted: ${report.images} (${mb(report.bytesIn)} -> ${mb(report.bytesOut)}), already present: ${report.imagesSkipped}`);
  if (report.missing.length) {
    console.log(`\n⚠️  ${report.missing.length} issue(s) need a manual look:`);
    report.missing.forEach(m => console.log('  - ' + m));
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
