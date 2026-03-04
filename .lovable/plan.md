

# Image Treatment Implementation Plan

Based on the uploaded `LOVABLE-IMAGE-INSTRUCTIONS.md`, here's what needs to change across the site.

## Current Violations Found

### 1. Case Studies page uses stock photos (BANNED)
`src/pages/CaseStudies.tsx` uses:
- An Unsplash stock photo of a forest (`unsplash.com/photo-...`) — explicitly banned
- `green-hydrogen-case-study.jpg` and `creative-workshop-case-study.webp` — likely stock or generic images
- Gradient overlays on images (`bg-gradient-to-t from-foreground/20`) — banned
- Hover scale transforms on images — not in the allowed interaction set

**Fix:** Remove all images from case study cards. Make them text-only (challenge → approach → outcomes). Remove the image column from the grid layout entirely. Remove image imports.

### 2. Client logo strip opacity too high
Guide specifies `opacity: 0.3` at rest, `opacity: 0.8` on hover. Current code uses `opacity-50` (0.5) and `hover:opacity-100`.

**Fix:** Change to `opacity-30 hover:opacity-80` on both `ClientLogoStrip.tsx` and the About page logo grid. Also apply `grayscale` (already done) and ensure `hover:grayscale-0`.

### 3. Client logo strip has too many logos
Guide says max 6–7. Homepage strip has 8, About page has 15. Also, guide says no "Our Clients" or "Trusted By" header — About page's section label "04" implies a header context.

**Fix:** Trim homepage strip to 7 logos (drop least recognizable). Trim About page to 7 as well or keep as a "Featured In" secondary strip if justified.

### 4. Theresa's portrait needs editorial treatment
Guide specifies `filter: saturate(0.85)` and `max-width: 480px`. Current About page renders the portrait at full width in a `16/9` or `2/1` aspect container with no desaturation filter.

**Fix:** Apply `saturate(0.85)` filter, constrain to `max-w-[480px]`, use roughly 3:4 portrait aspect ratio. Add proper descriptive alt text.

### 5. FeaturedReportsCarousel still has cover images
`src/components/FeaturedReportsCarousel.tsx` renders `coverImage` with hover scale. This component may still be used on report detail pages.

**Fix:** Verify if this component is still imported anywhere. If only on Flagship Report detail pages, cover images are allowed there per the guide. If used on listing pages, remove images.

### 6. Logo.tsx uses canvas-based background removal (unnecessary complexity)
The `Logo.tsx` component and `imageProcessing.ts` utility do runtime pixel manipulation to remove white backgrounds. Guide says logos should be SVG or high-res PNG with transparent backgrounds.

**Fix:** This is dead code if not imported anywhere on the live site. Verify usage — if unused, delete both `Logo.tsx` and `imageProcessing.ts`.

### 7. Services page — zero images required
Guide says Services page should have zero images. Need to verify current state.

### 8. Insights listing — no thumbnails
Already implemented as text-only cards in the recent rebuild. Compliant.

### 9. Homepage — no hero image, no background images
Already compliant — `ExecutiveHero` is typography-only.

---

## Implementation Steps

### Step 1: Case Studies — Remove all stock images
- Remove Unsplash URL, `greenHydrogenImg`, `creativeWorkshopImg` imports
- Convert the two-column image+text grid to a single-column text-only layout
- Remove gradient overlays and hover scale on images
- Keep: sector label, title, challenge bullets, approach bullets, outcomes

### Step 2: Client logos — Fix opacity + trim count
- `ClientLogoStrip.tsx`: Change `opacity-50` → `opacity-30`, `hover:opacity-100` → `hover:opacity-80`
- Trim to 7 logos max (keep Microsoft, KPMG, Ford, Volkswagen, Heineken, ITC, Apollo)
- `About.tsx` logo grid: Same opacity fix, trim to top 7

### Step 3: Theresa's portrait — Editorial treatment
- Add `saturate-[0.85]` filter class
- Constrain container to `max-w-[480px]` with `aspect-[3/4]`
- Update alt text to "Theresa Ronnie, Strategic Carbon Communications Advisor"

### Step 4: Delete dead image utilities
- Verify `Logo.tsx` and `imageProcessing.ts` are not imported anywhere
- If unused, delete both files

### Step 5: Verify FeaturedReportsCarousel usage
- If only used on Flagship detail pages, cover images are allowed — no change needed
- If used on listing/homepage, remove images

Total: ~4 files edited, ~2 files deleted

