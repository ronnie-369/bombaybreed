

# OG Image & Meta Tag Overhaul

## Problem
Social shares show a generic black tile with no visual distinction between pages. The current `setOGMeta` utility manipulates the DOM directly but misses key tags (`og:type`, `og:image:width/height`, `og:site_name`, `twitter:card`, canonical). Insight detail pages use Helmet but also lack OG image tags.

## Approach
Since Lovable can't run Node.js build scripts (Satori/resvg), we'll use **Option A: static images**. The existing `public/og/` PNGs will be moved to `public/images/og/` as the spec requires, and new ones will need to be created externally for pages that don't have them yet.

## Plan

### 1. Create a `PageHead` component
**File:** `src/components/PageHead.tsx`

A reusable component using `react-helmet-async` (already installed and wrapped in `main.tsx`) that injects all required meta tags: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`, `og:site_name`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, canonical URL, and optional `article:published_time` / `article:author` for insight pages.

Props: `title`, `description`, `path`, `ogType?`, `ogImage?` (slug), `article?` (publishedDate, author).

Image URL pattern: `https://bombaybreed.com/og/{slug}.png` (using existing `/public/og/` directory and PNG format to match current assets).

### 2. Replace `setOGMeta` across all pages
Remove the `useEffect`-based `setOGMeta` calls and replace with `<PageHead>` in each page component:

- **`src/pages/Index.tsx`** -- ogType: `website`, ogImage: `og-home`
- **`src/pages/About.tsx`** -- ogType: `profile`, ogImage: `og-about`
- **`src/pages/Services.tsx`** -- ogType: `website`, ogImage: `og-services`
- **`src/pages/Insights.tsx`** -- ogType: `website`, ogImage: `og-insights`
- **`src/components/seo/ServicePageTemplate.tsx`** -- ogType: `article`, ogImage: fallback to `og-home`

### 3. Add OG tags to insight detail pages
Both `ReportLandingPage.tsx` and `ReadAnalysisPage.tsx` already use `<Helmet>` but lack OG/Twitter tags. Add the full set of OG and Twitter meta tags inside their existing `<Helmet>` blocks, using `og:type="article"` and `article:published_time`. Image will default to `og-insights` unless a per-slug image exists.

### 4. Delete `src/utils/og-meta.ts`
No longer needed once all pages use `<PageHead>` or inline Helmet tags.

### 5. OG image mapping
Current images in `public/og/`: `og-home.png`, `og-about.png`, `og-services.png`, `og-insights.png`, `og-brsr.png`, `og-ccts.png`. These cover the core pages. Insight detail pages and other special pages will fall back to `og-home.png` until dedicated images are created externally.

### Files changed
| File | Action |
|---|---|
| `src/components/PageHead.tsx` | Create |
| `src/pages/Index.tsx` | Replace setOGMeta with PageHead |
| `src/pages/About.tsx` | Replace setOGMeta with PageHead |
| `src/pages/Services.tsx` | Replace setOGMeta with PageHead |
| `src/pages/Insights.tsx` | Replace setOGMeta with PageHead |
| `src/components/seo/ServicePageTemplate.tsx` | Replace setOGMeta with PageHead |
| `src/components/insights/ReportLandingPage.tsx` | Add OG/Twitter meta to existing Helmet |
| `src/components/insights/ReadAnalysisPage.tsx` | Add OG/Twitter meta to existing Helmet |
| `src/utils/og-meta.ts` | Delete |

### Post-deploy note
After publishing, clear social platform caches using Facebook Sharing Debugger, LinkedIn Post Inspector, and Twitter Card Validator as described in the uploaded spec.

