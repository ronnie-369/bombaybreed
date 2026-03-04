

## Plan: War & Climate Special Feature — Insights Integration, Sitemap, SEO & Source Links

### 1. Add Special Feature banner to Insights page
- Import and place `SpecialFeatureHighlight` component at the top of the Insights page, immediately after the Hero section and before "Featured Analysis"
- This gives it top-banner prominence as the most recent/impactful piece

### 2. Add to `featuredInsights` array
- Add a new entry at position 0 (top) in the `featuredInsights` array on the Insights page:
  - Title: "The One Emitter the Paris Agreement Forgot to Name"
  - Category: "Special Investigation"
  - 5,800 words / ~25 min read
  - Date: March 2026
  - Link: `/special-features/war-climate.html` (target blank)

### 3. Add to sitemap
- Update `generate-sitemap/index.ts` to include a hardcoded static URL entry for `special-features/war-climate.html` in the XML output (alongside the existing static pages like `/`, `/resources`, `/credentials`)
- Priority: 0.90, changefreq: monthly

### 4. SEO enhancements on the HTML page
- Add meta tags to `war-climate.html` `<head>`:
  - `og:title`, `og:description`, `og:type` (article), `og:url`
  - `twitter:card`, `twitter:title`, `twitter:description`
  - Canonical URL: `https://bombaybreed.com/special-features/war-climate.html`
  - `meta description`
- Add Article structured data (JSON-LD) with:
  - headline, datePublished (March 2026), author (Bombay Breed), publisher, wordCount (5800)

### 5. Add source hyperlinks to the HTML article
Insert hyperlinks in the footnotes section (lines 2105-2119) linking cited sources to their homepages or exact report pages:

| Source | URL |
|--------|-----|
| CEOBS Military Emissions Gap | `https://ceobs.org/estimating-the-militarys-global-greenhouse-gas-emissions/` |
| SIPRI Military Expenditure | `https://www.sipri.org/media/press-release/2025/unprecedented-rise-global-military-expenditure-european-and-middle-east-spending-surges` |
| Belfer Center (Colgan) | `https://www.belfercenter.org/publication/fueling-fire-pathways-oil-war` |
| Queen Mary Univ Gaza study | `https://www.qmul.ac.uk/media/news/2024/hss/new-study-reveals-substantial-carbon-emissions-from-the-ongoing-israel-gaza-conflict.html` |
| UNEP Gaza Assessment | `https://www.unep.org/resources/report/environmental-impact-conflict-gaza-preliminary-assessment-environmental-impacts` |
| UNEP Emissions Gap 2025 | `https://www.unep.org/resources/emissions-gap-report-2025` |
| IEA China Energy Investment | `https://www.iea.org/reports/world-energy-investment-2025/china` |
| Ember China Review 2025 | `https://ember-energy.org/latest-insights/china-energy-transition-review-2025/` |
| Brown Univ Costs of War | `https://costsofwar.watson.brown.edu/` |
| Global Carbon Project 2024 | `https://globalcarbonbudget.org/gcb-2024/` |
| CCPI 2024 (Germanwatch) | `https://ccpi.org/download/climate-change-performance-index-2024/` |
| OECD Climate Finance | `https://www.oecd.org/` |

These will be added as `<a href="..." target="_blank" rel="noopener noreferrer">` links wrapping the source names in the footnotes.

### Files to modify
- `src/pages/Insights.tsx` — import SpecialFeatureHighlight, add banner + featured entry
- `supabase/functions/generate-sitemap/index.ts` — add static URL for the special feature
- `public/special-features/war-climate.html` — add meta/OG tags, JSON-LD schema, hyperlinks in footnotes

