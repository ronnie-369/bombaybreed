## What the uploads say

Two source documents read in full:

- **`BB_Strategic_Memo_Value_Ladder-2.docx`** — the strategic logic. Headline: *"Two ladders, one intersection point, plus a parallel B2B revenue line."* Resolves four tensions, defines tiers, prices the intersection (Paid Substack → Reader upgrade discount), and sets the JTBD principle.
- **`BB_Value_Ladder_Comparison-2.xlsx`** — the customer-facing reference. Eight sheets: Cover, Tier overview, Jobs comparison (the heart), Editorial deliverables, Network goods, Data partnerships, Sponsor pricing, Revenue model.

Five tiers, two ladders:

```text
TCD ladder (Substack)            BB ladder (Razorpay/Stripe)        B2B (parallel)
─────────────────────            ──────────────────────────         ──────────────
Free Substack                    Reader (BB)                        Sponsor
USD 0                            INR 10,000 / mo                    INR 15L–1Cr+ per engagement
Paid Substack          ───►      Analyst Lens (BB)
USD 5 / mo (INR 425)             INR 50,000 / mo
        │
        └── intersection: Paid Substack ↔ Reader (3-month discount, INR 7,500/mo)
```

Sachin's compounding categories (editorial · community · research-product) are the *production* logic. The *customer-facing* logic is JTBD — eight jobs scored across the five tiers.

## What's wrong on the site today

- `/insights` and `/intelligence/membership` show three BB tiers (`foundational` / `professional` / `executive`) that do not match the memo. The memo defines **two priced BB tiers + Free/Paid Substack + Sponsor**.
- TCD Substack ($0 and $5) is invisible as a *tier* anywhere. The Substack CTA only appears in `Insights.tsx:868` as a generic "Subscribe on Substack" footer.
- The `PremiumAccessLounge` already uses memo language ("Industry Reader", "Analyst Lens") but ignores Free / Paid Substack and routes via slugs the Membership page doesn't recognise (already noted in `.lovable/plan.md`).
- Sponsor surface lacks the memo's transparent pricing bands (INR 15-30L sectoral, INR 20-35L regional, INR 25L+ custom, INR 1Cr+ annual calendar).
- No JTBD comparison anywhere. No persistent "choose your read" decision moment for the visitor.

## What we'll build

A single canonical Value Ladder surface at `/intelligence/value-ladder`, embedded as the discovery hero on `/insights`, with per-card access badges and a sticky pill so every Insights visitor encounters the decision.

### 1. New canonical route: `/intelligence/value-ladder`

Authoritative page. Single source of truth for tiers, prices, JTBD, sponsor bands.

Sections, in order:

1. **Hero** — "Two ladders, one intersection. Plus sponsorship." Sub: the memo's framing in two sentences.
2. **The five tiers at a glance** — 5-column strip (Sponsor visually tinted to mark it as B2B, not a subscriber tier). Each column: name · ladder badge (TCD / BB / B2B) · price · one-line audience · primary CTA.
3. **Jobs to be done** — the 8-row × 5-column comparison table from Sheet 3 of the spreadsheet, verbatim language. Mobile collapses to per-tier accordions ("What I get as an Analyst Lens subscriber").
4. **Editorial deliverables** — Sheet 4, collapsible.
5. **Network and access goods** — Sheet 5, collapsible.
6. **The intersection** — explicit Paid Substack → Reader upgrade callout with the INR 7,500 first-quarter discount.
7. **Sponsorship (B2B)** — pricing bands table (Sheet 7) + standard sponsor terms (8 numbered terms verbatim) + Formspree inquiry CTA.
8. **Data partnerships transparency** — collapsed by default, opens to the realistic-now / wishlist split (Sheet 6). Builds credibility for Reader/Analyst pricing.

All CTAs route by tier:

| Tier | CTA | Destination |
|---|---|---|
| Free Substack | Subscribe free | `https://theclimatedesk.substack.com` (outbound, tracked) |
| Paid Substack | Upgrade — $5/mo | Substack paid URL (outbound, tracked) |
| Reader (BB) | Join Reader | `/intelligence/signup?tier=foundational&ref=ladder` |
| Analyst Lens (BB) | Join Analyst Lens | `/intelligence/signup?tier=professional&ref=ladder` |
| Sponsor | Inquire about sponsorship | opens `SponsorInquiryDialog` with `engagement_type` preset |

### 2. `/insights` — embedded ladder hero + per-card badges + sticky pill

- **Hero strip** above the existing Insights grid: condensed 5-column ladder (name, price, one-line value, CTA). "Compare all five →" links to `/intelligence/value-ladder`. This replaces the current Substack-only footer block as the dominant decision moment.
- **Per-card access badges** on every publication card: `Free` · `Paid TCD` · `BB Reader` · `BB Analyst`. Derived from existing card metadata (no new DB fields — map by publication category in `src/data/insights.ts`).
- **Sticky ladder pill** (bottom-right, dismissible, persists via `localStorage`): "Free email · $10 paid · ₹10k+ membership". Tap opens a 5-row mini-sheet with the same routing as the canonical page. Shown on `/insights` and Insight detail pages.
- The existing `#sponsor` anchor on `/insights` is repointed to the new sponsorship section on the value-ladder page (or kept as a brief teaser that scrolls/links out).

### 3. `/intelligence/membership` — narrowed to BB only, with rails

The memo is explicit: **the BB page is one ladder of two**. So:

- Reframe H1 to "Bombay Breed Intelligence — the research and advisory ladder." Sub explains this is one of two ladders; if you want editorial-only at Substack price points, see TCD.
- Show only the two BB tiers (Reader, Analyst Lens) with memo language and the deliverable detail from Sheets 4-5.
- Keep the existing `?tier=` deep-link logic from `.lovable/plan.md` (slug aliases `industry-reader → foundational`, `analyst-lens → professional`).
- Add two "rails" at the bottom: *"Looking for editorial only? → TCD on Substack"* and *"Funding research production? → Sponsorship"*.

### 4. `PremiumAccessLounge` — kept, but rewired

- Update CTA copy to reflect the two-ladder framing (Industry Reader / Analyst Lens copy stays; add a third "Read free on Substack" rail for visitors who aren't ready to pay).
- Fix the routing bug from `.lovable/plan.md` (alias map, `?tier=` forwarded with `v` and `ref`).
- Sponsor block on the Lounge keeps its current form but pulls pricing bands from a shared `valueLadder.ts` constant so memo and site can never drift.

### 5. Header / navigation

- Add **"Pricing"** to the primary nav, pointing at `/intelligence/value-ladder`. This is the single discoverable answer to "what does this cost and what do I get?"
- Existing 5-item nav cap (per memory) — replace the lowest-priority item to stay at 5 (suggest swapping out `/intelligence` landing, since the ladder page becomes the natural intelligence entry point), or accept a 6th item. Confirm in implementation.

## Single source of truth

New `src/intelligence/lib/valueLadder.ts` exporting:

```ts
export const TIERS = [
  { id: 'tcd-free',    name: 'Free Substack',  ladder: 'TCD', priceLabel: 'Free',
    audience: 'Anyone tracking Indian climate', cta: { label: 'Subscribe free', href: SUBSTACK_FREE_URL, kind: 'outbound' } },
  { id: 'tcd-paid',    name: 'Paid Substack',  ladder: 'TCD', priceLabel: 'USD 5 / mo',
    audience: 'Professional readers wanting depth', cta: { ... outbound paid url ... } },
  { id: 'bb-reader',   name: 'Reader',         ladder: 'BB',  priceLabel: 'INR 10,000 / mo',
    audience: 'Consultants, sustainability leads, fund analysts',
    cta: { label: 'Join Reader', href: '/intelligence/signup?tier=foundational&ref=ladder', kind: 'internal' } },
  { id: 'bb-analyst',  name: 'Analyst Lens',   ladder: 'BB',  priceLabel: 'INR 50,000 / mo',
    audience: 'Climate VCs, PE diligence, family offices, DFIs',
    cta: { label: 'Join Analyst Lens', href: '/intelligence/signup?tier=professional&ref=ladder', kind: 'internal' } },
  { id: 'sponsor',     name: 'Sponsor',        ladder: 'B2B', priceLabel: 'INR 15L–1Cr+',
    audience: 'Corporates underwriting research', cta: { label: 'Inquire', kind: 'dialog' } },
] as const;

export const JOBS = [ /* 8 rows from Sheet 3, verbatim */ ];
export const SPONSOR_BANDS = [ /* Sheet 7 verbatim */ ];
export const SPONSOR_TERMS = [ /* the 8 numbered terms verbatim */ ];
export const INTERSECTION = { fromTier: 'tcd-paid', toTier: 'bb-reader',
  discountLabel: 'INR 7,500/mo for first 3 months', terms: '...' };
```

`/intelligence/value-ladder`, `/insights` hero, `Membership.tsx`, `PremiumAccessLounge`, and the sticky pill all import from this file. Updating the memo = updating one file.

## Tracking

Reuse existing `outboundAnalytics` and `sponsorAnalytics`. New events:

- `ladder_view` (page or hero impression, with `surface: 'canonical'|'insights_hero'|'sticky_pill'`)
- `ladder_cta_click` (with `tier_id`, `surface`, `ref`)
- `intersection_cta_click` (Paid Substack → Reader upgrade)
- Existing `sponsor_*` events continue as-is

CTAs forward `ref=ladder|insights_hero|sticky_pill|lounge` so we can attribute conversions back to the surface that produced them.

## What this is not

- No DB schema changes. BB tier slugs in `tcd_tiers` stay `foundational` / `professional`. Substack tiers are display-only (no signup row created for them on our side).
- No payment integration changes. BB checkout is unchanged. Substack and Sponsorship are off-platform/inquiry flows respectively.
- No new content. All copy comes verbatim from the memo and spreadsheet.
- The existing third BB tier on `Membership.tsx` ("executive") will be hidden from the value-ladder surface to match the memo. If it remains in the DB, it stays accessible via a direct link only — confirm whether to deprecate it entirely in implementation.

## Files touched

**New**
- `src/intelligence/lib/valueLadder.ts` — single source of truth
- `src/intelligence/pages/ValueLadder.tsx` — canonical `/intelligence/value-ladder` page
- `src/components/insights/LadderHero.tsx` — embedded 5-col strip for `/insights`
- `src/components/insights/LadderStickyPill.tsx` — dismissible pill
- `src/components/insights/AccessBadge.tsx` — per-card badge

**Edited**
- `src/App.tsx` — register `/intelligence/value-ladder`
- `src/pages/Insights.tsx` — mount `LadderHero`, add `AccessBadge` to cards, mount `LadderStickyPill`
- `src/pages/InsightDetail.tsx` — mount `LadderStickyPill`
- `src/intelligence/pages/Membership.tsx` — narrow to BB-only, add rails, fix `?tier=` aliasing (folds in `.lovable/plan.md`)
- `src/pages/insights/PremiumAccessLounge.tsx` — read from `valueLadder.ts`, fix tier routing, add Substack rail
- `src/components/Header.tsx` — add "Pricing" nav item
- `src/utils/outboundAnalytics.ts` — add ladder events

## Open questions before build

I'll ask these as a single `ask_questions` call once you approve the shape:

1. **Substack URLs** — confirm the exact Free and Paid Substack URLs to wire into the CTAs.
2. **Header nav** — add a 6th item ("Pricing"), or replace one of the current 5? If replace, which?
3. **The "executive" tier** currently in `Membership.tsx` — drop entirely (memo defines only Reader + Analyst), or keep as a hidden enterprise option reachable by direct link?
4. **Sticky pill scope** — `/insights` + insight detail only (proposed), or also article-style intelligence brief pages?
