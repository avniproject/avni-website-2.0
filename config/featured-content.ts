/**
 * Featured Content Configuration
 * 
 * ⚠️ CRITICAL: Only ONE featured blog and ONE featured case study allowed!
 * The build will FAIL if you add more than one item to each array.
 * 
 * IMPORTANT: Add the EXACT title as it appears in the markdown frontmatter.
 * Titles are case-sensitive and must match exactly.
 * 
 * To make content featured:
 * 1. Find the exact title from the markdown file's frontmatter
 * 2. Add it to the appropriate array below (ONLY ONE per array)
 * 3. Save this file
 * 4. Run: npm run validate:featured (to verify)
 * 
 * To change featured content:
 * 1. Remove or comment out the old title
 * 2. Add the new title
 * 3. Save this file
 */

/**
 * Featured Case Studies
 * Add exact case study titles here to make them featured
 * 
 * Example:
 * "Empowering Waste Pickers: Hasiru Dala's Digital Transformation"
 */
// Leave empty to feature the most recent case study
export const FEATURED_CASE_STUDIES: string[] = [
  // Add exact case study titles here
  // Example: "Your Exact Case Study Title Here"
];

/**
 * Featured Blogs
 * Add exact blog titles here to make them featured
 * 
 * Example:
 * "Technical Deep Dive: Offline-First Architecture"
 */
// Leave empty to feature the most recent blog
export const FEATURED_BLOGS: string[] = [
  // Add more exact blog titles here
  // Example: "Your Exact Blog Title Here"
];

/**
 * Configuration Notes:
 * 
 * ⚠️ CRITICAL WARNINGS:
 * - ⛔ ONLY ONE ITEM ALLOWED PER ARRAY - Build will fail otherwise!
 * - Titles MUST match exactly (case-sensitive)
 * - If a title doesn't match any content, it will be ignored
 * - Run `npm run validate:featured` before committing changes
 * 
 * ✅ BEST PRACTICES:
 * - Copy-paste titles directly from markdown files
 * - Comment out old titles instead of deleting (for easy rotation)
 * - Run validation after making changes: `npm run validate:featured`
 * - Use `npm run list:titles` to see all available titles
 * 
 * 📝 HOW TO FIND EXACT TITLES:
 * 1. Run: npm run list:titles
 * 2. Copy the exact title from the output
 * 3. Paste it into the appropriate array above
 * 4. Validate: npm run validate:featured
 * 
 * 🔄 HOW TO ROTATE FEATURED CONTENT:
 * 1. Comment out the current featured title
 * 2. Add the new title
 * 3. Validate: npm run validate:featured
 * 
 * Example:
 * export const FEATURED_BLOGS: string[] = [
 *   "New Featured Blog Title",
 *   // "Old Featured Blog Title",  // Rotated out on 2024-11-11
 * ];
 */
