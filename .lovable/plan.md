

# Plan: Add "India's Renewable Grid at Breaking Point" Insights Page

## Overview

Convert the uploaded `grid-analysis.jsx` into a native React page component at `/india-renewable-grid-analysis` that serves as the second showcase article on the Insights page. This strategic intelligence briefing analyzes India's grid infrastructure crisis, the thermal-RE gap, and the investment required for grid stabilization.

---

## Content Summary

The article is a 6-section interactive analysis covering:

| Section | Title | Key Content |
|---------|-------|-------------|
| 1 | The Chokepoint Crisis | 203 GW RE capacity, 18% solar curtailed, Rajasthan 51.5% curtailment during peak |
| 2 | The Thermal-RE Gap | Duck curve visualization, 4 critical gaps (inertia, reactive power, ramping, transmission) |
| 3 | Solutions Map | 6-solution readiness matrix (Grid-Forming Inverters, BESS, Pumped Hydro, etc.) |
| 4 | Infrastructure Requirements | 5 pillars (Transmission, Storage, Flexibility, Smart Grid, Manufacturing) |
| 5 | Investment Case | Investment waterfall chart, Space/Finance/Intent triad |
| 6 | Article Assessment | Scorecard evaluating Mint article's intent vs. action analysis |

---

## SEO Optimization Strategy

### Primary Keyword Targeting

| Keyword Cluster | Target URL Slug |
|-----------------|-----------------|
| India renewable energy grid | `/india-renewable-grid-analysis` |
| Energy transition India | Semantic coverage |
| Solar curtailment India | Long-tail capture |
| Grid stability renewable | Technical SEO |
| BESS India storage | Infrastructure focus |

### Schema Markup

```json
{
  "@type": "Article",
  "headline": "India's Renewable Grid at Breaking Point",
  "description": "Strategic analysis of India's 203 GW renewable grid crisis, thermal-RE gaps, and the ₹3.4 lakh crore infrastructure investment required for grid stabilization.",
  "keywords": ["renewable energy India", "grid stability", "energy transition", "solar curtailment", "BESS", "pumped hydro"],
  "author": { "@type": "Organization", "name": "BB Consulting" },
  "datePublished": "2026-02-09"
}
```

### Meta Tags

- **Title**: "India's Renewable Grid at Breaking Point — Strategic Intelligence Briefing | Bombay Breed"
- **Description**: "India's 203 GW renewable grid is hitting structural limits. Analysis of the thermal-RE gap, grid stabilisation solutions, and the ₹3.4 lakh crore infrastructure question."

---

## Design Approach

The uploaded JSX uses a **dark theme** with data journalism aesthetics distinct from the light "Working for the Earth" page:

| Element | Working for the Earth | Grid Analysis (New) |
|---------|----------------------|---------------------|
| Theme | Light (paper background) | Dark (#0a0a0a background) |
| Typography | Playfair Display + Source Serif 4 | Georgia + JetBrains Mono |
| Accent Color | Teal (#0d7377) + Accent Red | Orange (#FF6B35) + Teal (#00A896) |
| Navigation | Scroll-based sections | Tab-based section navigation |
| Visualizations | Horizontal bar charts, stat grids | Duck curve SVG, solutions matrix, investment waterfall |

This creates visual diversity in the Insights section while maintaining editorial quality.

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/GridAnalysis.tsx` | Create | Main page component (adapted from JSX) |
| `src/pages/GridAnalysis.css` | Create | Custom dark-theme styles |
| `src/App.tsx` | Modify | Add route `/india-renewable-grid-analysis` |
| `src/pages/Insights.tsx` | Modify | Add as 2nd featured insight |
| `public/sitemap.xml` | Modify | Add URL entry |

---

## Component Structure

```text
GridAnalysis.tsx
├── Header (existing site header)
├── Hero Section
│   ├── Category label ("Strategic Intelligence Briefing")
│   ├── Title ("India's Renewable Grid at Breaking Point")
│   └── Subtitle + data sources
├── Tab Navigation (sticky)
│   └── [Crisis | Gap | Solutions | Infrastructure | Investment | Assessment]
├── Section: The Chokepoint Crisis
│   ├── StatCard grid (203 GW, 18%, ₹575-690 Cr, 4 GW)
│   ├── Callout blocks (warning, data, insight types)
│   └── Prose content
├── Section: The Thermal-RE Gap
│   ├── DuckCurve SVG visualization
│   ├── Four Critical Gaps component with severity bars
│   └── Technical analysis
├── Section: Solutions Map
│   ├── SolutionsMatrix (6 solutions with Tech/Cost/Readiness metrics)
│   └── Grid-forming inverters analysis
├── Section: Infrastructure Requirements
│   └── 5 Infrastructure Pillars component
├── Section: Investment Case
│   ├── InvestmentChart (vertical bars)
│   ├── Investment bars (horizontal)
│   └── Space/Finance/Intent triad grid
├── Section: Article Assessment
│   ├── ScoreBar components (6 dimensions)
│   └── Intent/Action/Verdict analysis
├── Sources footer
└── Footer (existing site footer)
```

---

## Technical Implementation Details

### 1. Tab Navigation State

```typescript
const [activeSection, setActiveSection] = useState<string>("overview");

const sections = [
  { id: "overview", label: "The Crisis" },
  { id: "gap", label: "The Gap" },
  { id: "solutions", label: "Solutions Map" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "investment", label: "Investment Case" },
  { id: "assessment", label: "Article Assessment" }
];
```

### 2. Duck Curve SVG Component

The uploaded JSX includes a complete SVG visualization showing:
- Thermal dispatch curve (red)
- Solar generation curve (orange)
- System demand curve (teal/dashed)
- Time axis (00:00-23:00)
- Evening ramp annotation

This will be extracted into a reusable `DuckCurve` component.

### 3. Solutions Matrix Component

6 solutions with 3 metrics each (Tech maturity, Cost viability, India readiness) shown as animated progress bars.

### 4. Custom CSS Variables

```css
.grid-analysis-page {
  --bg-dark: #0a0a0a;
  --accent-orange: #FF6B35;
  --accent-teal: #00A896;
  --accent-gold: #FFB347;
  --accent-red: #FF4757;
  --accent-purple: #9B59B6;
  --text-primary: #e0e0e0;
  --text-secondary: #888;
  --border-subtle: rgba(255,255,255,0.06);
}
```

---

## Internal Linking Strategy

The page will link to related services and content:

| Link Target | Context |
|-------------|---------|
| `/energy-optimisation-consulting` | Grid infrastructure advisory |
| `/industrial-decarbonisation-strategy` | RE integration for industry |
| `/power-utilities` | Power sector industry page |
| `/renewable-energy-procurement-india` | RE procurement services |
| `/decarbonisation-power-sector` | Power sector decarbonisation |
| `/energy-transition-playbook` | Related report |

---

## Insights Page Integration

Add to `featuredInsights` array as the 2nd item (after Working for the Earth):

```typescript
{
  title: "India's Renewable Grid at Breaking Point",
  description: "Strategic analysis of the 203 GW grid crisis, thermal-RE gaps, and the ₹3.4 lakh crore infrastructure investment required for stabilization.",
  category: "Energy Transition",
  readTime: "15 min read",
  link: "/india-renewable-grid-analysis"
}
```

Add to `topicClusters` array (new cluster):

```typescript
{
  title: "Energy Transition",
  description: "Grid infrastructure and RE integration",
  topics: ["Renewable Energy", "Grid Stability", "Energy Storage", "Transmission"],
  serviceLink: "/energy-optimisation-consulting",
  serviceName: "Energy Optimisation"
}
```

---

## Sitemap Entry

```xml
<url>
  <loc>https://bombaybreed.com/india-renewable-grid-analysis</loc>
  <lastmod>2026-02-09</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.75</priority>
</url>
```

---

## Estimated Scope

- **GridAnalysis.tsx**: ~900 lines (adapted from uploaded JSX)
- **GridAnalysis.css**: ~200 lines (dark theme styling)
- **Insights.tsx updates**: ~20 lines
- **App.tsx updates**: ~3 lines
- **sitemap.xml updates**: ~6 lines

---

## Key Differentiators from "Working for the Earth"

| Aspect | Working for the Earth | Grid Analysis |
|--------|----------------------|---------------|
| Content Type | Dialectic discourse (philosophical) | Technical briefing (data-driven) |
| Navigation | Linear scroll | Tab-based sections |
| Theme | Light, editorial | Dark, data journalism |
| Data Viz | Simple bar charts | Complex SVG (duck curve), matrices |
| Call to Action | Green jobs focus | Grid infrastructure investment |

This diversity strengthens the Insights hub by demonstrating range across content types while maintaining high editorial standards.

