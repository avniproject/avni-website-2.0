# Avni - AI Powered Digital Field Work Platform
---

## 🌟 About Avni

Avni is an open-source digital platform designed specifically for NGOs and social sector organizations.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 with App Router & Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Markdown with gray-matter
- **Forms:** sign-up via n8n webhook (with reCAPTCHA), contact via Netlify Forms
- **Analytics:** Google Analytics 4 (ready)
- **Deployment:** Netlify (static export, built from GitHub)
- **SEO:** Complete Open Graph, Twitter Cards, JSON-LD

---

## ⭐ Featured Content Management

### Overview
Featured content (blogs and case studies) is managed in **one centralized file**:
```
config/featured-content.ts
```

### ⚠️ Critical Rules
1. **ONLY ONE featured blog allowed**
2. **ONLY ONE featured case study allowed**
3. **Build will FAIL if you add more than one**
4. **Titles must be in double quotes without spaces**

### How to Make Content Featured

#### Step 1: Find the Exact Title
```bash
npm run list:titles
```
This lists all available blog and case study titles.

#### Step 2: Edit Configuration
Open `config/featured-content.ts` and add the exact title:

```typescript
// For Case Studies (ONLY ONE)
export const FEATURED_CASE_STUDIES: string[] = [
  "How Goonj Uses Avni To Digitise Offline Data Collection And Inventory Flow",
];

// For Blogs (ONLY ONE)
export const FEATURED_BLOGS: string[] = [
  "Technical Deep Dive: Offline-First Architecture",
];
```

**Important:**
- ✅ Use double quotes `"`
- ✅ No spaces before/after title
- ✅ Exact match (case-sensitive)
- ✅ Copy-paste from `npm run list:titles`

#### Step 3: Validate
```bash
npm run validate:featured
```

### What Happens If Build Fails?

If you add more than one featured item, the build will fail with:

```
❌ VALIDATION FAILED

❌ ERROR: 2 featured blogs found. Only 1 is allowed.
   Please remove extra titles from FEATURED_BLOGS array.

📝 TO FIX:
   1. Open: config/featured-content.ts
   2. Keep only ONE title in each array
   3. Comment out or remove extra titles
   4. Run: npm run validate:featured
```

**The build process will:**
- ❌ Stop immediately
- ❌ Show clear error message
- ❌ Prevent deployment
- ❌ Require you to fix before continuing

### Rotating Featured Content

To change featured content, comment out the old title:

```typescript
export const FEATURED_BLOGS: string[] = [
  "New Featured Blog Title",
  // "Old Featured Blog Title",  // Rotated out on 2024-11-11
];
```

### Quick Commands

| Command | Purpose |
|---------|---------|
| `npm run list:titles` | List all available titles |
| `npm run validate:featured` | Validate configuration |
| `npm run build` | Build (auto-validates) |

---

## 🚀 Installation & Deployment

### Local Development

```bash
# 1. Clone repository
git clone <repository-url>
cd avni-website

# 2. Install dependencies
npm install

# 3. Create environment file (optional)
cp .env.example .env.local
# Add your Google Analytics ID if you have one

# 4. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Editing content (CMS)

Blogs and case studies are edited in **Pages CMS** (https://app.pagescms.org): sign in with
GitHub, open `avniproject/avni-website-2.0`, pick the branch the site builds from. Saving
commits to GitHub and Netlify rebuilds the site. Fields are defined in `.pages.yml`; they must
match the frontmatter read in `lib/markdown.ts`.

### Production Deployment (Netlify)

The site is hosted on Netlify (Samanvay Foundation team), connected to this GitHub repo:
every push to the deployed branch rebuilds and publishes the site.

**Netlify Build Settings** (read from `netlify.toml`):
- Build command: `npm run build`
- Publish directory: `out`
- Node version: `20` (required for Next.js 16)

Old-site URLs that moved are redirected in `public/_redirects`; security headers are in `public/_headers`.

---

**Built with ❤️ for NGOs making a difference**
