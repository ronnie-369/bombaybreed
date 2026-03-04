

# Implementation Plan: Site Refresh per Guide v2

## What's Already Done (Skipping)

- Design system (colors, typography, spacing) — implemented
- Fonts (Inter + Playfair Display) — implemented
- Dark mode removal — done
- Hero rewrite (ExecutiveHero.tsx) — done, matches prototype
- SectionLabel, ClientLogoStrip, ProofStat, StickyCtaBar — done
- Footer dark background — done
- Organization JSON-LD — done
- P1 SEO pages (BRSR, CCTS) — done
- OG images + meta utility — done
- About, Services, Insights pages — redesigned
- Author box on SEO pages — done
- FAQ sections with schema — done

---

## What Still Needs Work

Comparing the guide and the two HTML prototypes against the current codebase, here are the gaps organized into three areas:

### A. Homepage Gaps

**A1. Remove glass-morphism / backdrop-blur globally**
The guide explicitly says: "Delete all glass-morphism styles globally." The current code still has:
- `glass-card` class in `index.css` (line 84-88) with `backdrop-blur-sm` and hover translate/scale effects
- `feature-card` class (line 91-94) with hover translate and scale
- Header uses `bg-background/90 backdrop-blur-sm` — guide says transparent on hero, solid `paper` after scroll
- `apple-card` class uses hover border transitions

Action: Remove `glass-card`, `feature-card` hover transforms, and the Header backdrop-blur. Header should be transparent initially, gain paper background + border on scroll (matching the prototype's scroll behavior).

**A2. Homepage section order doesn't match prototype**
The prototype shows: Hero → Logo Strip → Proof Stat → **Service Pillars (3 cards)** → Featured Insight → Testimonial → Final CTA → Footer.

Current homepage has: Hero → Logo Strip → Proof Stat → BoardValue → SpecialFeatureHighlight → ReportsCarousel → ServicesHub → Testimonial → TrackRecord → DirectContact → Footer.

The `ServicesHub` component is a complex multi-section block with Supabase queries, icon cards, "Who We Work With," and "Browse by Region." The prototype calls for three simple flat pillar cards (Carbon Strategy / Board Governance / ESG Communications) with 1px border, no shadows, no icons.

Action: Replace `ServicesHub` on the homepage with a new `ServicePillars` component — three flat cards matching the prototype exactly. Keep the existing `ServicesHub` for the `/services` route only.

**A3. Featured Insight section missing from homepage**
The prototype has a "Latest Intelligence" section between Service Pillars and Testimonial — a text-only section linking to the latest report. Currently the homepage uses `ReportsCarousel` and `SpecialFeatureHighlight` which don't match the guide's clean single-item treatment.

Action: Replace `ReportsCarousel` and `SpecialFeatureHighlight` with a simple `FeaturedInsight` component showing the latest report title, one-sentence summary, and "Read the Brief →" link.

**A4. Remove `BoardValue` from homepage**
The prototype doesn't include this section. Move its content to `/about` if needed or remove entirely from the homepage.

**A5. Remove `TrackRecord` from homepage**
The prototype's homepage ends with Testimonial → Final CTA → Footer. No track record section on homepage.

**A6. Simplify the homepage to match prototype flow exactly**
Final homepage order: Hero → ClientLogoStrip → ProofStat → ServicePillars (new) → FeaturedInsight (new) → Testimonial → DirectContact (final CTA) → Footer + StickyCtaBar.

---

### B. Intelligence Hub (Insights Page) Gaps

The intelligence hub benchmark document describes a significantly more advanced Insights page than what currently exists. Key additions:

**B1. Content type taxonomy and badges**
Add a `ContentType` system with four types: Flagship Report, Intelligence Brief, Regulatory Alert, Perspective. Each gets a colored badge (Deep Blue, Ink, Red, Warm respectively).

**B2. Topic + Content Type dual-axis filtering**
Add two rows of pill-button filters above the listing:
- Row 1 (Topics): All | Carbon Markets | Board Governance | ESG Communications | Regulatory Intel
- Row 2 (Types): All Types | Flagship Reports | Intelligence Briefs | Regulatory Alerts | Perspectives

Client-side filtering, no page reload, real-time.

**B3. Search bar**
Simple text search above filters that filters on title + summary. Debounced 200ms.

**B4. Flagship Research section**
Two large featured cards at the top of the listing (below filters) for Carbon Playbook and WEF Risks report. Visually distinct from regular listing items with type badge, Playfair headline, summary, and date + read time.

**B5. Enhanced listing cards (Economist model)**
Each card shows: content type badge + topic tag → bold headline → one-line summary → date + read time. No images. No thumbnails. Text-only.

**B6. Pagination**
6 items per page with numbered pagination. No infinite scroll.

**B7. Read time + Author attribution on listing**
Add `readTimeMinutes` to each item. Show "By Theresa Ronnie" implicitly or explicitly.

**B8. Update data model**
Extend the `Publication` interface to include `contentType`, `topic`, `readTimeMinutes`, `series`, and `siblings` fields.

---

### C. SEO Landing Page Template Gaps

Comparing the guide's Section 4 against the current `ServicePageTemplate`:

**C1. Stats bar missing**
The guide calls for a 3-column "Key Stats Bar" below the hero with relevant numbers. The template doesn't have this. Add an optional `stats` prop with `{label, value}[]` and render a three-column bar.

**C2. Table of Contents missing**
The guide specifies jump links to all H2 sections below the hero. Add auto-generated TOC from content sections.

**C3. Content sections need long-tail keyword H2s**
Current template uses generic titles ("The Problem", "Why This Fails Today"). The guide says each H2 should target a long-tail keyword. Add an optional `title` override to each content section so the BRSR/CCTS pages can use keyword-rich headings.

**C4. Remove section icons**
Current `ContentSection` renders Lucide icons (AlertTriangle, Target, etc.) next to section titles. The prototype and guide show no icons — just clean editorial H2s.

**C5. Mid-page download CTA**
Guide calls for a mid-content email-only gate: "Download the full brief (PDF)". The template currently has no mid-page CTA.

---

## Implementation Order

This is a substantial refresh. I recommend implementing in this order:

1. **CSS cleanup** — Remove glass-morphism, backdrop-blur, hover transforms from `index.css` and Header
2. **Homepage restructure** — New `ServicePillars` and `FeaturedInsight` components, reorder `Index.tsx`
3. **Insights page rebuild** — Content type system, filters, search, flagship cards, pagination
4. **SEO template enhancements** — Stats bar, TOC, keyword H2 overrides, mid-page CTA

Estimated scope: 8-10 distinct file changes across 4 implementation steps.

