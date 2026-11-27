/**
 * Simplify post HTML
 * Turns the old site's simple HTML image wrappers into plain markdown images, so the CMS
 * editor shows a picture instead of code. The site sizes article images itself (.article-body
 * in globals.css), so the wrappers' widths aren't needed.
 *
 * Only simple cases are converted: a <div> holding nothing but one <img>, a bare <img> on its
 * own line, and a <p> or <center> around one. Designed layouts (stat boxes, side-by-side cards)
 * are left as HTML.
 *
 *   node scripts/simplify-post-html.js        # rewrite content/blogs and content/case-studies
 *   node scripts/simplify-post-html.js --dry  # only report what would change
 *
 * Also used by scripts/migrate-old-content.js.
 */

const fs = require('fs');
const path = require('path');

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];

function toMarkdownImage(imgTag) {
  const src = attr(imgTag, 'src');
  if (!src) return null;
  const alt = (attr(imgTag, 'alt') || '').replace(/[[\]]/g, '');
  return `![${alt}](${src.replace(/ /g, '%20')})`;
}

function simplifyPostHtml(body) {
  let count = 0;
  const replace = (text, regex) => text.replace(regex, (all, img) => {
    const markdown = toMarkdownImage(img);
    if (!markdown) return all;
    count++;
    return `\n\n${markdown}\n\n`;
  });

  let out = body;
  // <div ...> <img ...> </div>, also nested one level (<div><div><img></div></div>)
  out = replace(out, /<div\b[^>]*>\s*(?:<div\b[^>]*>\s*)?(<img\b[^>]*>)\s*(?:<\/div>\s*)?<\/div>/gi);
  // <p> or <center> around a single image
  out = replace(out, /<(?:p|center)\b[^>]*>\s*(<img\b[^>]*>)\s*<\/(?:p|center)>/gi);
  // A bare <img> alone on its line
  out = replace(out, /^[ \t]*(<img\b[^>]*>)[ \t]*$/gim);

  return { body: out.replace(/\n{3,}/g, '\n\n'), count };
}

module.exports = { simplifyPostHtml };

if (require.main === module) {
  const matter = require('gray-matter');
  const dry = process.argv.includes('--dry');
  let files = 0, images = 0;
  for (const dir of ['content/blogs', 'content/case-studies']) {
    for (const name of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
      const file = path.join(dir, name);
      const raw = fs.readFileSync(file, 'utf8');
      const { content } = matter(raw);
      const { body, count } = simplifyPostHtml(content);
      if (!count) continue;
      files++; images += count;
      // Replace only the body, so the frontmatter keeps its exact formatting
      if (!dry) fs.writeFileSync(file, raw.slice(0, raw.length - content.length) + body);
    }
  }
  console.log(`${dry ? 'Would simplify' : 'Simplified'} ${images} images in ${files} posts`);
}
