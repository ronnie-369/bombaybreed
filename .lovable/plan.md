# Wire real readership into the /insights "Who is reading" block

## What changes

The placeholder "Investors / Companies" logo grids on `/insights` (under section **03 — Who is reading**) get replaced with a **typeset name block** grouped exactly the way the Climate Desk Media Deck presents readership on slides 5 and 11. No logo files needed.

### New layout for section #readers

```text
03 — WHO IS READING

Investors and companies on the list

14,946 subscribers across 81 countries.
1,270+ in investor & climate finance.

MULTILATERAL
United Nations · FAO · IFC / World Bank · WHO · Asian Development Bank · UNDP · AKDN

GLOBAL CORPORATES
ArcelorMittal · Oracle · Unilever · H&M · Infosys · Siemens Energy ·
Volkswagen · BASF · ABB · GE · Meta · S&P Global

INDIAN INDUSTRY
JSW Group · Tata Motors · Mahindra · Adani · Axis Bank · IREDA ·
Dr Reddy's · Welspun · Apollo Hospitals

GOVERNMENT
Government of India (central ministries) · Japan Ministry of the Environment

MEDIA & INTELLIGENCE
Argus Media · BBC · Bloomberg · Singapore Press Holdings · France Televisions

CLIMATE & ESG
SBTi · Ellen MacArthur Foundation · ClimateImpactX · 3Degrees · ReNew Energy

INVESTORS & CLIMATE FINANCE
Development Finance Institutions · Climate & Carbon Investment funds ·
Venture Capital · Wealth Management & Family Offices · Financial Advisory & Services
```

Each group: small uppercase tracked label (matches `SectionLabel` style), then a flowing list of names separated by middle dots, in editorial serif. No icons, no boxes, no aspect-ratio cells.

### Why this instead of logos

- The deck itself uses text grouping for readership on slides 5 and 11 — same authority signal, same typographic register.
- 25+ logos across 7 categories would need permission, SVG sourcing, and visual normalisation. None of that adds credibility beyond what the names alone do.
- Names index well for SEO; logo images do not.
- One-pager headline ("14,946 subscribers, 81 countries, 1,270+ investor cohort") becomes the proof line above the names.

## Files touched

- `src/pages/insights/PremiumAccessLounge.tsx` — replace the `LOGOS` constant + the two logo-grid sub-blocks inside `<section id="readers">` with a `READERSHIP` constant (array of `{group, names[]}`) and a single mapped block. Headline stat line added above the groups. Caption about dropping logo files into `/public/logos/intelligence-readers/` removed.

No other files change. No new routes, no asset uploads, no DB work.

## Out of scope

- If you later want logo strips for a hand-picked top-tier subset (e.g. IFC, FAO, JSW, Siemens), I can add a 6-up logo row above the text groups in a follow-up. Not doing it now because it doubles the maintenance and would need real SVGs.
- The "Investors & Climate Finance" group keeps category names (DFIs, VC, etc.) rather than fund-level names because the deck does the same — naming individual LPs in public marketing is a different conversation.
