

# Plan: Add "Working for the Earth" Dialectic Discourse Page

## Overview

Convert the uploaded HTML article into a native React page component that integrates seamlessly with the Bombay Breed website. This is a thought leadership piece about green jobs and climate justice, featuring rich editorial design with data visualizations.

---

## What We're Building

A new report/insights page at `/working-for-the-earth` that displays the "Working for the Earth — A Dialectic Discourse" article. The page features:

- Editorial magazine-style design with custom typography
- Interactive data visualizations (bar charts, stat grids)
- Dialectic thesis/antithesis/synthesis content blocks
- Pathway timeline with 5 interventions
- Scroll-triggered reveal animations
- Full responsive design

---

## Implementation Approach

### Option A: Pure React Component (Recommended)

Convert the HTML/CSS to a React component using Tailwind CSS + custom CSS module for specialized styles.

**Pros:**
- Consistent with project architecture
- Uses existing UI components (Header, Footer, Badge, Card)
- Full control over animations with React hooks
- SEO-friendly with proper meta tags
- Can add LeadCaptureForm for lead generation

**Cons:**
- More work to translate custom CSS
- Need to recreate the visual styling carefully

### Option B: Embed as iframe/HTML

Keep the HTML as-is and serve it statically.

**Pros:**
- Fastest to implement
- Preserves exact design

**Cons:**
- No Header/Footer integration
- Breaks site consistency
- Poor SEO (no React meta management)
- Can't integrate lead capture

**Recommendation:** Option A - Build as native React component

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/WorkingForTheEarth.tsx` | Create | Main page component |
| `src/pages/WorkingForTheEarth.css` | Create | Custom styles for editorial design |
| `src/App.tsx` | Modify | Add route `/working-for-the-earth` |
| `public/sitemap.xml` | Modify | Add URL entry |

---

## Component Structure

```text
WorkingForTheEarth.tsx
├── Header (existing)
├── Hero Section
│   ├── Label ("A Dialectic Discourse")
│   ├── Title with styled emphasis
│   └── Subtitle + meta info
├── Part I: The Paradox of Green Labour
│   ├── Lead paragraph with drop cap
│   ├── DataCard (241M skills gap)
│   ├── Bar chart visualization
│   └── Divider
├── Part II: Why the Disparity Exists
│   ├── Dialectic blocks (Thesis/Antithesis/Synthesis)
│   ├── Three structural fractures content
│   └── Stat grid (29%, 15%, 22%, 20%)
├── Full-width break ($9T stat)
├── Pull quote (WEF)
├── Part III: Pathway to Just Transition
│   └── 5-step pathway timeline
├── Part IV: The Moral Architecture
│   ├── Closing argument content
│   └── Final pull quote
├── Sources footer
├── LeadCaptureForm (optional)
└── Footer (existing)
```

---

## Technical Details

### 1. Custom Typography (CSS Module)

```css
/* WorkingForTheEarth.css */
.dialectic-page {
  --ink: #1a1a1a;
  --paper: #f7f5f0;
  --accent: #c0392b;
  --gold: #d4a843;
  --teal: #0d7377;
}

.lead-para::first-letter {
  font-family: 'Playfair Display', serif;
  font-size: 4.5rem;
  float: left;
  color: var(--accent);
}

.dialectic-block { /* thesis/antithesis grid */ }
.synthesis-block { /* teal synthesis section */ }
.pathway-node { /* timeline steps */ }
```

### 2. Scroll Animations (React Hook)

```typescript
// Use existing use-in-view hook or create IntersectionObserver effect
const animatedRef = useRef(null);
const isVisible = useInView(animatedRef, { threshold: 0.1 });
```

### 3. Data Visualization Components

Create reusable sub-components:
- `BarChart` - Horizontal bar with animated fill
- `StatGrid` - 2x2 or 4-column stat display
- `DialecticBlock` - Thesis/Antithesis/Synthesis layout
- `PathwayTimeline` - Vertical timeline with numbered nodes
- `DataCard` - Highlighted statistic card
- `PullQuote` - Styled blockquote with citation

### 4. Route Registration

```typescript
// App.tsx
const WorkingForTheEarth = lazy(() => import("./pages/WorkingForTheEarth"));

<Route path="/working-for-the-earth" element={<WorkingForTheEarth />} />
```

---

## Content Sections Summary

| Section | Key Content |
|---------|-------------|
| Part I | Green labour paradox, 241M skills gap by 2030, wage disparities chart |
| Part II | Three structural fractures (knowledge asymmetry, wage decoupling, informal economy), dialectic format |
| Part III | 5 interventions (education, wage floors, gender gap, credentials, finance) |
| Part IV | Moral case, WEF quote, closing argument |

---

## SEO & Sitemap

- **Slug:** `/working-for-the-earth`
- **Title:** "Working for the Earth — A Dialectic Discourse | Bombay Breed"
- **Description:** "The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth are among the least protected themselves."
- **Canonical:** Self-referencing
- **Schema:** Article schema with author "BB Consulting"

---

## Optional Enhancements

1. **Lead Capture Integration:** Add form at bottom for report download
2. **Reading Progress Bar:** Show scroll progress at top
3. **Table of Contents:** Sticky sidebar with section links
4. **Share Buttons:** Social sharing for the article
5. **Related Content:** Link to Green Jobs Report 2026

---

## Estimated Scope

- **Primary:** ~400 lines of TSX + ~200 lines of CSS
- **Complexity:** Medium-High (custom editorial design)
- **Dependencies:** None new (uses existing fonts/components)

