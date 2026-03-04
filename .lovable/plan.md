

# Implementation Plan: Homepage Redesign, Font Change & Dark Mode Removal

## Overview
Redesign the homepage per the implementation guide, switch fonts to Inter + Playfair Display, drop dark mode entirely — while **keeping** all glass-morphism effects and movement animations.

---

## 1. Drop Dark Mode

**Files:** `src/index.css`, `tailwind.config.ts`, `src/App.tsx`, `src/components/Header.tsx`, `src/components/ui/ThemeToggle.tsx`

- Remove the `.dark { ... }` block (lines 45-79) from `index.css`
- Remove `darkMode: ["class"]` from `tailwind.config.ts`
- Remove `ThemeProvider` wrapper in `App.tsx`, or set it to `forcedTheme="light"` and remove `enableSystem`
- Remove `<ThemeToggle />` from `Header.tsx` (both desktop nav line 181 and mobile nav line 196)
- Remove the theme transition CSS (lines 90-112 in `index.css`) since there's no toggle anymore

---

## 2. Switch Fonts: Plus Jakarta Sans → Inter + Playfair Display

**Files:** `index.html`, `tailwind.config.ts`

- Replace the Google Fonts `<link>` in `index.html` to load:
  - `Inter:wght@400;500;600;700` (body/UI)
  - `Playfair+Display:wght@400;600;700;900&display=swap` (headings/serif)
- Update `tailwind.config.ts` fontFamily:
  - `sans` / `heading` / `logo` → `['Inter', 'system-ui', 'sans-serif']`
  - `serif` → `['Playfair Display', 'Georgia', 'serif']`

---

## 3. Rewrite Homepage Hero (Centered, Text-Only)

**File:** `src/components/ExecutiveHero.tsx`

Replace the current two-column hero (portrait + text) with a centered, text-only layout:
- Section label: `"01 — Strategic Carbon Advisory"`
- Headline (using `font-serif`): `"I ensure climate transition strategy is credible, compliant, and investable in India."`
- Subhead: the existing advisor description
- Two CTAs: "Schedule Consultation" (BookingDialog) + "View Credentials" (scroll to track-record)
- Portrait image is removed from hero (stays on About page)
- The floating testimonial quote card is removed from hero

---

## 4. New Component: SectionLabel

**File:** `src/components/ui/SectionLabel.tsx` (new)

A small reusable component rendering `<span className="...">01 — Label</span>` with monospace uppercase tracking. Used across all homepage sections for consistent numbering.

---

## 5. New Component: ClientLogoStrip

**File:** `src/components/ClientLogoStrip.tsx` (new)

- Grayscale horizontal row of 6-8 client logos from existing `src/assets/client-logos/`
- Use logos: Microsoft, KPMG, Ford, Volkswagen, Heineken, ITC, Apollo Hospitals, Publicis
- All rendered with `filter: grayscale(100%) opacity(0.5)`, hover to full color
- Subtle label above: "Trusted by leadership teams at"

---

## 6. New Component: ProofStat

**File:** `src/components/ProofStat.tsx` (new)

A single centered stat section:
- Large number: a key proof point (e.g., "₹12,000 Cr+" or "18 Years")
- Subtitle explaining it
- Clean, minimal layout with generous vertical padding

---

## 7. New Component: StickyCtaBar

**File:** `src/components/StickyCtaBar.tsx` (new)

- A thin bar fixed to bottom of viewport, appears after hero scrolls out of view
- Contains: site name + "Schedule Consultation" button
- Uses `IntersectionObserver` on the hero section to toggle visibility
- Glass-morphism background (`bg-background/80 backdrop-blur-sm`)

---

## 8. Rewrite Homepage Section Order

**File:** `src/pages/Index.tsx`

New order:
1. **Header**
2. **ExecutiveHero** (centered text-only)
3. **ClientLogoStrip** (trust signals)
4. **ProofStat** (single proof number)
5. **BoardValue** (core competencies — keep as-is)
6. **SpecialFeatureHighlight** (war-climate banner)
7. **ReportsCarousel** (featured reports)
8. **ServicesHub** (service pillars — keep as-is)
9. **Quote Section** (keep the existing "It will take all of us" quote)
10. **TrackRecord** (credentials — keep as-is)
11. **DirectContact** (contact form — keep as-is)
12. **Footer**
13. **StickyCtaBar** (floating bottom bar)

---

## 9. Footer: Dark Background

**File:** `src/components/Footer.tsx`

- Change background to dark ink: `bg-[#0A0A0B] text-[#FDFCFB]`
- Update all text colors to light variants
- Keep existing structure and links
- Adjust border colors to work on dark background

---

## 10. Organization + Person JSON-LD (SEO)

**File:** `index.html`

- The Organization schema already exists — update `founder.jobTitle` if needed
- No Person schema needed on homepage (that's for About page, future task)

---

## Files Summary

| File | Action |
|------|--------|
| `src/index.css` | Remove `.dark` block, remove theme transition CSS |
| `tailwind.config.ts` | Remove `darkMode`, update `fontFamily` |
| `index.html` | Swap Google Fonts links to Inter + Playfair Display |
| `src/App.tsx` | Remove/simplify `ThemeProvider` |
| `src/components/Header.tsx` | Remove `ThemeToggle` imports and usage |
| `src/components/ExecutiveHero.tsx` | Rewrite to centered text-only hero |
| `src/components/ui/SectionLabel.tsx` | New component |
| `src/components/ClientLogoStrip.tsx` | New component |
| `src/components/ProofStat.tsx` | New component |
| `src/components/StickyCtaBar.tsx` | New component |
| `src/pages/Index.tsx` | Restructure section order, add new components |
| `src/components/Footer.tsx` | Dark background treatment |

Glass-morphism (`glass-card`, `backdrop-blur`, `feature-card` hover transforms) and all ScrollReveal animations are **preserved** — no changes to those systems.

