

# Plan Status: Homepage Redesign

## Completed

- **1. Drop Dark Mode** — Done. No `.dark` block in CSS, no `darkMode` in tailwind config, no `ThemeProvider` in App.tsx, no `ThemeToggle` in Header. The `ThemeToggle.tsx` file still exists but is unused (dead code).
- **2. Switch Fonts** — Done. `index.html` loads Inter + Playfair Display. Tailwind config has correct `fontFamily` entries.
- **3. Rewrite Homepage Hero** — Done. `ExecutiveHero.tsx` is centered, text-only with two CTAs.
- **4. SectionLabel component** — Done. Created and in use (numbering prefix later removed per your request).
- **5. ClientLogoStrip** — Done. Grayscale logos with hover effect, rendered on homepage.
- **6. ProofStat** — Done. Centered stat section on homepage.
- **7. StickyCtaBar** — Done. Fixed bottom bar with IntersectionObserver.
- **8. Homepage section order** — Done. Matches the plan (quote moved into TrackRecord header per your request).
- **9. Footer dark background** — Done. Dark ink background applied.
- **10. Organization JSON-LD** — Done. Schema exists in `index.html` with founder info.
- **P1 SEO pages** — Done. `/brsr-reporting-advisory-india` and `/carbon-credit-trading-scheme-india` created with routes.
- **OG images + meta utility** — Done. `og-meta.ts` utility created, OG tags set on all core pages.
- **About page redesign** — Done. Narrative layout with timeline and testimonials.
- **Services page redesign** — Done. Three-pillar model with engagement models.
- **Insights page redesign** — Done. Rebranded as "Intelligence Briefs."
- **DirectContact simplification** — Done.
- **SEO template update** — Done. Editorial typography + author box.

## Pending / Cleanup

1. **Delete `src/components/ui/ThemeToggle.tsx`** — Dead code; file still exists but is no longer imported anywhere.

That's it — everything from the plan has been implemented. The only remaining item is deleting the orphaned `ThemeToggle.tsx` file.

