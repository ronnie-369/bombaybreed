## Add a price-band explainer to "Currently open projects"

Add a single short editorial paragraph directly beneath the **Currently open projects** heading in `src/pages/insights/PremiumAccessLounge.tsx` that explains what drives lower vs upper end of each INR range. One paragraph for all cards (the drivers are universal) - no per-card tooltips, no new icons, no chrome.

### Copy

> **What moves the price within each band:** lower end assumes desk research, 6-10 expert interviews, one site visit and a single review cycle. Upper end reflects deeper fieldwork (multi-state travel, 20-30 interviews), primary data collection, additional methodology peer review, and a compressed timeline. Final scope is agreed in writing before work begins.

### Placement

Sits between the section heading and the project grid:

```text
CURRENTLY OPEN PROJECTS
What moves the price within each band: ...   ← new paragraph
[ 01  CCUS ... ]   [ 02  JCM ... ]
```

### Styling

- `text-xs text-muted-foreground/90 leading-relaxed`
- `max-w-[68ch]` to keep the line length editorial
- Lead phrase ("What moves the price within each band:") in `text-foreground/80` for emphasis
- Hyphens only, no em dashes (per house rule)

### File

- `src/pages/insights/PremiumAccessLounge.tsx` (one insertion, ~10 lines, no logic changes)
