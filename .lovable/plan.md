

# Inner Pages: Report Landing + Read Analysis Templates

## Current State

The site has ~10 individual report/analysis pages, each hand-coded with gradient heroes, icon cards, and inconsistent layouts. The instructions define **two reusable templates** that all Intelligence Hub content should use:

1. **Report Landing Page** — for Flagship Reports (gated, PDF download, conversion-focused)
2. **Read Analysis Page** — for Intelligence Briefs, Regulatory Alerts, Perspectives (open access, full read)

## What We'll Build

### New Shared Components (6 files)

| Component | Purpose |
|---|---|
| `ContentTypeBadge` | Colored pill badge per content type |
| `TopicTag` | Border-pill for topic taxonomy |
| `KeyStatsBar` | 3-4 column large numbers section |
| `AuthorBox` | Horizontal author card (Theresa, 56px circle, bio, link) |
| `RelatedIntelligence` | 3 text-only sibling cards |
| `NewsletterCapture` | Dark ink-background email capture section |

### Two Template Components

**`ReportLandingPage.tsx`** — Flagship Reports
- Two-column hero: cover image (400x560) left, title/CTA right
- Key Findings stats bar
- Executive Summary (ungated, 150-200 words)
- "What's Inside" table of contents (numbered chapters)
- Download gate form (Name, Email, Organisation only — simplified from current 6-field LeadCaptureForm)
- Author box, Related Intelligence, Series Navigation

**`ReadAnalysisPage.tsx`** — Briefs, Alerts, Perspectives
- Single-column centered hero, typography-only, no image
- Content type badge + topic tag
- Key Stats Bar (optional)
- Executive Summary (featured snippet target)
- Table of Contents with optional sticky sidebar on desktop
- Full article body (max-width 680px, proper prose styling)
- Mid-article CTA at ~60% (consultation or flagship promotion)
- FAQ with schema markup
- Author box, Related Intelligence, Newsletter CTA
- Content-type variations: urgency banner + action checklist for Regulatory Alerts; no stats/FAQ for Perspectives

### Data Model

Create an `insightData` registry mapping slugs to structured data:

```typescript
interface InsightData {
  slug: string;
  title: string;
  subtitle?: string;
  contentType: ContentType;
  topic: Topic;
  metaLine: string;          // "By Theresa Ronnie · March 2026 · 28 pages"
  readTimeMinutes: number;
  coverImage?: string;       // Flagship only
  stats?: { value: string; label: string }[];
  executiveSummary: string;
  tableOfContents?: { title: string; description: string }[];
  bodyContent?: string;      // HTML for Read Analysis
  faq?: { question: string; answer: string }[];
  siblings: string[];        // slugs of related content
  series?: { name: string; items: { slug: string; title: string; year: string }[] };
  pdfUrl?: string;           // Flagship only
  complianceDeadline?: string; // Regulatory Alert only
}
```

### Routing Changes

- Add a dynamic route `/insights/:slug` in `App.tsx`
- Create `InsightDetail.tsx` page that loads data by slug, checks `contentType`, renders either `ReportLandingPage` or `ReadAnalysisPage`
- Keep existing routes as redirects to `/insights/[slug]` for backward compatibility (e.g., `/carbon-playbook` → `/insights/carbon-playbook`)

### Download Form Simplification

The current `LeadCaptureForm` has 6 fields (name, email, designation, company, phone, consent checkbox). The instructions say **3 fields only**: Full Name, Work Email, Organisation. Will create a new `ReportDownloadForm` component that:
- Has only 3 fields
- Auto-subscribes (no consent checkbox)
- Shows success state with auto-download trigger
- Posts to existing Supabase edge function

### Schema Markup

- Report Landing: Article (Report) + BreadcrumbList + Organization
- Read Analysis: Article + FAQPage (if FAQ exists) + BreadcrumbList + Organization
- Injected via `react-helmet-async`

### Files Changed/Created

```
Created:
  src/components/insights/ContentTypeBadge.tsx
  src/components/insights/TopicTag.tsx
  src/components/insights/KeyStatsBar.tsx
  src/components/insights/AuthorBox.tsx
  src/components/insights/RelatedIntelligence.tsx
  src/components/insights/NewsletterCapture.tsx
  src/components/insights/ReportDownloadForm.tsx
  src/components/insights/MidArticleCta.tsx
  src/components/insights/UrgencyBanner.tsx
  src/components/insights/ActionChecklist.tsx
  src/components/insights/StickyToc.tsx
  src/components/insights/SeriesNavigation.tsx
  src/components/insights/ReportLandingPage.tsx
  src/components/insights/ReadAnalysisPage.tsx
  src/data/insights.ts              (content registry)
  src/pages/InsightDetail.tsx        (slug router)

Modified:
  src/App.tsx                        (add /insights/:slug route + redirects)
  src/pages/Insights.tsx             (update links to /insights/[slug])
  src/index.css                      (article body prose styles, badge colors, callout-bg token)
```

Existing individual report pages (CarbonPlaybook.tsx, WEFGlobalRisksReport.tsx, etc.) will be replaced by the template system. Their content moves into `src/data/insights.ts`.

### Implementation Order

1. Shared components (Badge, Tag, Stats, Author, Related, Newsletter, Download Form)
2. Data registry with content for all existing reports
3. `ReportLandingPage` template (for Carbon Playbook + WEF)
4. `ReadAnalysisPage` template (for all Briefs, Alerts, Perspectives)
5. `InsightDetail` router page + App.tsx routing + redirects
6. CSS tokens (callout-bg, badge colors, prose styles)
7. Schema markup injection

