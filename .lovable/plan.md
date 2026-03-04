

# Remove All Em Dashes (—) Sitewide

## Scope
504 occurrences across 26 files. Each `—` will be replaced contextually:

- **Title separators** (`Bombay Breed — Strategic Carbon Advisory`) → use `: ` or ` | `
- **Attribution** (`— Theresa Ronnie`, `— Erik Solheim`) → use `– ` (en dash) or just remove the dash
- **Inline pauses** (`both worlds — and can translate`) → use ` - ` (hyphen with spaces)
- **Table empty cells** (`item.jurisdiction || "—"`) → use `"-"`
- **Content prose** (mid-sentence dramatic pauses) → use ` - `, `;`, or `:` depending on context

## Files to Edit (26 files)

All `.tsx` and `.ts` files in `src/` containing `—`. Key files include:
- `src/pages/About.tsx`, `src/pages/Index.tsx`, `src/pages/Services.tsx`
- `src/pages/CarbonCreditTradingScheme.tsx`, `src/pages/BRSRReportingAdvisory.tsx`
- `src/pages/GridAnalysis.tsx`, `src/pages/WorkingForTheEarth.tsx`
- `src/pages/Insights.tsx`, `src/pages/InsightDetail.tsx`
- `src/data/insights.ts` (bulk of content)
- `src/components/StickyCtaBar.tsx`, `src/components/TrackRecord.tsx`
- `src/components/BlogCarousel.tsx`, `src/components/GreenJobsReport.tsx`
- `src/components/insights/*.tsx` templates
- `src/components/admin/seo/*.tsx` (table placeholders)
- Other component files

## Replacement Rules

| Context | Example | Replacement |
|---|---|---|
| Page titles / meta | `Bombay Breed — About` | `Bombay Breed: About` |
| Attribution lines | `— Theresa Ronnie` | `- Theresa Ronnie` |
| Mid-sentence pause | `both worlds — and can` | `both worlds - and can` |
| List item lead-in | `**Phase 1 — Materiality**` | `**Phase 1: Materiality**` |
| Empty table cell | `"—"` | `"-"` |
| Explanatory clause | `the result — inconsistent data` | `the result: inconsistent data` |

Each replacement will be chosen contextually for readability. No em dashes will remain.

