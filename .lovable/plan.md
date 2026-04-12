

## Plan: Add "The Market That Ran on One Buyer" Intelligence Brief

### What we're building
A new free-to-read Intelligence Brief article on the Insights hub, based on the uploaded HTML article about Microsoft's CDR market pause. This includes adding the article data to the insights registry, listing it on the Insights page, and updating the homepage's `SpecialFeatureHighlight` and `FeaturedInsight` components to promote it.

### Content extraction from the uploaded HTML

**Title:** The Market That Ran on One Buyer
**Subtitle:** Microsoft's pause on carbon removal purchases is not a corporate anomaly. The data show the concentration risk was documented, quantified, and reported for three years before it arrived.
**Topic:** Carbon Markets
**Content Type:** Intelligence Brief
**Author:** Theresa Ronnie
**Date:** 12 April 2026
**Read time:** 7 min
**Slug:** `microsoft-cdr-market-pause`

The article contains rich body content including: a "Signal" block, analysis sections, pull quotes, data points (90% stat), a "What Others Miss" section, and inline charts (base64 images). All of this will be converted to the `bodyContent` HTML field used by the `ReadAnalysisPage` template.

### Steps

1. **Extract chart images from the HTML and save to `public/`**
   - The uploaded HTML contains 4 inline base64-encoded chart images. Extract them to `public/charts/` as PNGs so they can be referenced in the body content without bloating the data file.

2. **Add new entry to `src/data/insights.ts`**
   - Key: `microsoft-cdr-market-pause`
   - Content type: `Intelligence Brief` (renders via `ReadAnalysisPage`)
   - Stats: `90%` / Microsoft's share of durable CDR volume; `45M tonnes` / contracted in 2025; `16` / developers with no other buyer
   - Stats source: CDR.fyi; ClimeFi 2025 CDR Market Review
   - Executive summary from the article's deck/signal
   - `bodyContent`: Full article HTML (adapted to work with the `insight-prose` class), including all sections, pull quotes, data points, charts, and the "What Others Miss" block
   - FAQ: 3-4 questions derived from the article content
   - Siblings: `ccus-policy-gap`, `carbon-playbook`, `compliance-to-credibility`
   - `midArticleCta`: type `flagship`, pointing to `ccus-policy-gap`

3. **Add `insight-prose` CSS styles to `src/index.css`**
   - Style the HTML body content elements (signal blocks, pull quotes, data points, zone labels, "what others miss" blocks, captions, charts) to match the brand-compliant design from the uploaded HTML, using the site's existing CSS variables.

4. **Add article to `src/pages/Insights.tsx` publications array**
   - Insert as the first item in the publications list (most recent).

5. **Update homepage components**
   - **`SpecialFeatureHighlight`**: Rotate to promote this new article. Update the section label to "Carbon Markets - New", headline to the article title, description from the deck, and link to `/insights/microsoft-cdr-market-pause` with "Read the Analysis" CTA.
   - **`FeaturedInsight`**: Keep or update to point to the CCUS report (push previous content down).

### Files to create/modify
- `public/charts/` - 4 new PNG files extracted from base64
- `src/data/insights.ts` - New entry
- `src/index.css` - Add `insight-prose` styles
- `src/pages/Insights.tsx` - New publication entry
- `src/components/SpecialFeatureHighlight.tsx` - Update to feature new article

