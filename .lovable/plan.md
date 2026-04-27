# Replace /insights with the Intelligence conversion page

## What changes for the visitor

`/insights` stops being an editorial Substack hub. It becomes a single, scrollable conversion page for TCD Intelligence — built around your sketch:

```text
 PREMIUM ACCESS LOUNGE
 Intelligence Briefs                 ← page title + one-line positioning

 ┌────────────────────┐  ┌────────────────────┐
 │ View past reports  │  │ Sign up for reports│
 │ (3-up grid of      │  │ (primary CTA →     │
 │  recent reports)   │  │  /intelligence/    │
 │                    │  │  membership)       │
 └────────────────────┘  └────────────────────┘

 1. What you get          (4 checklist items)
 2. What the industry     (3 testimonial quote cards — placeholder copy)
    has to say
 3. Who is reading        (logo grid — placeholder boxes labelled
    our reports             "Investors" and "Companies", you send logos)
 4. Sponsor the research — INR 6 lakh / year     ← headline offer
    ┌──────── Analyst ────────┐  ┌──────── Reader ────────┐
    │ • dedicated analyst     │  │ • all reports           │
    │ • bespoke research      │  │ • sectoral analysis     │
    │ • ...                   │  │ • briefings             │
    └─────────────────────────┘  └─────────────────────────┘
    Why?  • • • •  (4 short reasons)

    How much — Corporate deal
      a) Reports
      b) Sectoral analysis
      c) 1-on-1 access to your team for any investment thesis
         you want vetted — 30 mins / month
                                       [ Talk to us → /contact ]
```

Sticky in-page nav becomes: **Reports · Sign up · What you get · Industry · Readers · Sponsor**.

## What gets removed from /insights

The current page has four sections. After this change:

- `#flagship` (CCUS flagship card) — **removed from /insights**. Still reachable via the brief's own URL and via the new "View past reports" grid (CCUS will be one of the 3 cards).
- `#all-intelligence` (search + filters + full publication grid) — **removed from /insights**. Repurposed into the compact "View past reports" grid up top (latest 3, with a "See all reports" link to a new `/insights/archive` route that keeps the existing search/filter UI for anyone who wants the full library).
- `#subscribe` (Substack signup) — **removed from /insights**. Substack signup remains on `/newsletter` (already the canonical location per existing memory).
- `#download` (CCUS Formspree download form) — **removed from /insights**. Kept reachable from the CCUS brief page itself.

The full editorial library is preserved at `/insights/archive` so no SEO value or deep links are lost — `/insights` just stops being the library and starts being the offer.

## Routing & funnel

- Top-right **"Sign up for reports"** button → `/intelligence/membership` (your three tiers stay where they are; this page does not duplicate them).
- **"Sponsor the research — INR 6L/yr"** CTA → `/contact?topic=intelligence-sponsorship` (prefills the contact form subject; sponsorship is sales-led, not self-serve).
- **"View past reports"** cards → existing brief detail routes (`/insights/microsoft-cdr-market-pause`, `/insights/india-renewable-grid-203gw-crisis`, etc.).
- **"See all reports"** → `/insights/archive` (new route hosting today's search + filter + full grid).
- Old `/insights` deep links (anchors like `#download`, `#subscribe`) → resolved by adding a small redirect handler so `/insights#download` lands on the CCUS brief and `/insights#subscribe` lands on `/newsletter`.

## Quotes block

You didn't pick a source for the testimonials, so I'll wire **3 placeholder quote cards with realistic structure (quote, name, title, org)** and leave the strings empty/lorem so you can drop real ones in without me touching layout. If you'd rather I seed them from `/case-studies` copy, say so before approval and I'll switch.

## Logos block

Placeholder grid: 8 slots, two rows of four, split into "Investors" (top row) and "Companies" (bottom row), each slot a soft-bordered box with the file name as alt text. You drop logos into `public/logos/intelligence-readers/` and they show up — no code change needed for additions beyond the manifest.

## Technical details

**Files touched**
- `src/pages/Insights.tsx` — rewritten. Keeps `PageHead`, footer, header. Replaces the four sections above with the six new sections. Reuses `SectionLabel`, `insight-prose`, existing button styles, and the editorial type system per the design memory.
- `src/pages/InsightsArchive.tsx` — **new**. Lifts the current `#all-intelligence` block (search input, tag filter, publication grid, `filteredPublications` memo) verbatim into its own page with a back-link to `/insights`.
- `src/App.tsx` — register `/insights/archive` route; add a tiny `useEffect` on `Insights` that maps legacy hashes (`#download`, `#subscribe`, `#flagship`, `#all-intelligence`) to their new homes via `Navigate`.
- `src/components/site/Header.tsx` (or wherever the nav lives) — no link change; "Insights" still points to `/insights`. The five-item global nav stays per `mem://architecture/content-consolidation-and-navigation`.
- SEO meta on `/insights` updated: title becomes "TCD Intelligence — Premium Access Lounge", description reframed around membership and corporate sponsorship. `/insights/archive` gets its own meta with the previous editorial-hub copy so we don't lose the keyword footprint.
- `public/sitemap.xml` and `public/robots.txt` — add `/insights/archive`; keep `/insights` priority.
- No DB migration. No new edge function. No changes to `/intelligence/*` pages, `TcdAuthGate`, `Checkout`, or the `tcd_mock_activate_subscription` RPC.

**Components introduced (all in `src/pages/Insights.tsx`, no new shared primitives)**
- `<PastReportsGrid />` — pulls the 3 most recent items from the existing `publications` array used today by `#all-intelligence`.
- `<WhatYouGet />` — 4 checklist rows (icon-free per `mem://design/iconography-editorial-standard`, uses a 1px rule + serif headers).
- `<IndustryQuotes />` — 3 placeholder testimonial cards.
- `<ReaderLogos />` — 2-row logo grid driven by a local manifest array (`investors: string[]`, `companies: string[]`).
- `<SponsorOffer />` — the INR 6L/yr block with Analyst | Reader columns, Why row, "How much: Corporate deal" list, and CTA to `/contact?topic=intelligence-sponsorship`.

**Conventions followed**
- No em dashes (per typography memory).
- No decorative Lucide icons in headers (per iconography memory).
- Currency shown as `₹6,00,000 / year` with `INR 6 lakh / year` as the visible label, matching Indian editorial convention.
- Copy is evergreen — no publication dates on the past-reports cards (per `mem://content/insights-evergreen-strategy`).

## Out of scope (call out before approval if you want them in)

- No changes to the three tier cards on `/intelligence/membership`.
- No new Stripe / live payment work — checkout still uses the mock activation RPC you approved earlier.
- No real testimonial copy or logo files — placeholders only; you supply the assets after.
- No analytics events on the new CTAs (can add a follow-up if you want conversion tracking).
