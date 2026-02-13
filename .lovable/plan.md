

# Green Jobs Quiz -- Homepage Highlight + Full Page

## Overview

Add a prominent, eye-catching "Green Jobs Quiz" teaser section to the homepage that appears immediately after the hero (first scroll), driving every visitor to take the personality quiz. The full interactive quiz lives on its own page at `/green-jobs-guide`.

## 1. Homepage Teaser Section

A visually striking section placed directly after `ExecutiveHero` on the homepage (before `BoardValue`). It will feature:

- Forest green gradient background (matching site primary)
- Bold headline: "Your Future is Green. Here's the Map."
- The 4 personality emoji icons as visual hooks
- Key stat: "375M net new jobs by 2035"
- Large CTA button linking to `/green-jobs-guide`
- Subtitle: "30 seconds . Personalised career matches . Based on WRI data"

This section uses the site's existing design system (Tailwind classes, ScrollReveal, Button component) -- not the inline styles from the uploaded file.

## 2. Full Green Jobs Guide Page

Convert the uploaded `green-jobs-guide.jsx` into a proper TypeScript React component at `src/pages/GreenJobsGuide.tsx` (note: there is already a `src/pages/GreenJobsReport.tsx` -- this is a different page). The component will be adapted to:

- Use TypeScript with proper type annotations
- Replace inline `style={}` with Tailwind classes where practical, but keep inline styles for complex/dynamic values (charts, color-driven UI)
- Replace hardcoded font imports with the site's existing Georgia / system fonts
- Include the site's `Header` and `Footer` components
- Wire up the lead capture form to Supabase (using the existing `submit-lead-and-generate-download` edge function or a direct insert)
- Remove the debug analytics dashboard (fixed bottom-right panel)

## 3. Routing

Add a route for `/green-jobs-guide` in `App.tsx` pointing to the new page component.

## Files to Create / Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/GreenJobsTeaser.tsx` | Create | Homepage teaser section with CTA |
| `src/pages/GreenJobsGuide.tsx` | Create | Full quiz page (adapted from uploaded JSX) |
| `src/pages/Index.tsx` | Modify | Insert `GreenJobsTeaser` after `ExecutiveHero` |
| `src/App.tsx` | Modify | Add `/green-jobs-guide` route |

## Technical Details

### Homepage Teaser Component (`GreenJobsTeaser.tsx`)

```text
+--------------------------------------------------------+
|  [Forest green gradient background]                     |
|                                                         |
|  A CLIMATE DIGEST CAREER GUIDE                          |
|                                                         |
|  Your Future is Green. Here's the Map.                  |
|                                                         |
|  [emoji icons]  375M net new jobs by 2035               |
|                                                         |
|  [ Take the Free Quiz -> ]   (large CTA button)        |
|                                                         |
|  30 sec . Personalised matches . Based on WRI data      |
+--------------------------------------------------------+
```

- Uses `ScrollReveal` for entrance animation
- Uses site `Button` component with `gradient` variant
- Links via `react-router-dom` `Link` to `/green-jobs-guide`
- Responsive: stacks on mobile, side-by-side on desktop

### Full Page Adaptation

- All 4 personality types preserved (Builder, Earth Keeper, Systems Thinker, Community Catalyst)
- All charts preserved (SectorJobsChart, ChurnDonut, AdaptationROI, SkillTransferSankey)
- Lead capture gate with name/email/phone preserved
- Job cards with expandable details preserved
- Color palette mapped to site theme variables where possible
- Wrapped with site Header/Footer

### Index.tsx Change

Insert `<GreenJobsTeaser />` between `ExecutiveHero` and `BoardValue` so it's visible on first scroll.

