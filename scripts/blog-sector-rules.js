/**
 * Blog sector rules
 * Which sectors a blog post is about, from partner names and topic words in its title, tags
 * and text. Used by scripts/migrate-old-content.js and scripts/tag-blog-sectors.js.
 * A post gets its main sectors only: at most MAX_SECTORS, each mentioned at least MIN_MENTIONS
 * times and at least half as often as the top one. Events and Avni News posts (conferences,
 * year reviews, announcements) are about Avni as a whole and get no sector.
 */

const MIN_MENTIONS = 3;
const MAX_SECTORS = 2;
const NO_SECTOR_CATEGORIES = ['Events', 'Avni News'];

const SECTOR_RULES = {
  'Healthcare': /\b(health|ASHA|ANM|maternal|pregnan|sickle|NCD|tubercul|malnutrition|anaemi|hospital|clinic|immuni[sz]|nutrition|ASHWINI|Jan Swasthya|JSS|Calcutta Kids|IHMP|Yenepoya|SEWA Rural|JNPCT|Chashma|eye camp)/gi,
  'Education': /\b(school|teacher|classroom|students?\b|education|literacy|numeracy|creche|Leadership for Equity|LFE|CInI|Teach tool)/gi,
  'Water & Sanitation': /\b(water bod|desilt|silt|Jal Jeevan|drinking water|sanitation|toilet|ATECF|Arghyam|Shelter Associates|tank)/gi,
  'Agriculture': /\b(farmer|agricultur|farmland|crop|irrigation)/gi,
  'Waste Management': /\b(waste picker|waste management|Hasiru Dala|recycl)/gi,
  'Social Security': /\b(social security|entitlement|welfare scheme|government scheme|ration card|pension|PECOnet|Project Potential)/gi,
  'Livelihood': /\b(livelihood|artisan|handicraft|Udgam|Goonj|self[- ]help group|SHG)/gi,
  'Child Protection': /\b(child protection|child labou?r|trafficking|child marriage|Save the Children|Bal Raksha)/gi,
  'Legal Aid': /\b(legal aid|paralegal|Centre for Social Justice)/gi,
  'Human Rights': /\b(human rights)/gi,
  'Sports': /\b(sports?\b|football|netball|kho-kho|KhelMel|Maitrayana|athlet)/gi,
};

function blogSectors(text, category) {
  if (NO_SECTOR_CATEGORIES.includes(category)) return [];
  const counts = Object.entries(SECTOR_RULES)
    .map(([sector, rule]) => [sector, (text.match(rule) || []).length])
    .filter(([, n]) => n >= MIN_MENTIONS)
    .sort((a, b) => b[1] - a[1]);
  const top = counts[0]?.[1] ?? 0;
  return counts.filter(([, n]) => n >= top / 2).slice(0, MAX_SECTORS).map(([sector]) => sector);
}

module.exports = { blogSectors };
