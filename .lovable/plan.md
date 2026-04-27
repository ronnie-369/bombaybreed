## Audit of the Free Library

The library has **17 publications** across 4 topics. The "repeats in subsections" you're seeing are real - here is what is actually wrong:

### Problem 1 — Flagship items appear twice
The 5 Flagship Reports show in the **Flagship Research** band at the top, then **again** inside their topic cluster below. That is the duplication.

- Mitigation and Adaptation (Himachal) → Flagship + Carbon Markets
- India's CCUS Gap → Flagship + Regulatory Intel
- India's Carbon Playbook → Flagship + Carbon Markets
- WEF Global Risks 2026 → Flagship + Board Governance
- (every flagship is double-shown)

### Problem 2 — Carbon Markets cluster is bloated (9 of 17, 53%)
Reads as one long undifferentiated list. Several items overlap heavily:
- *Carbon Market Outlook 2025-2030*, *Carbon Playbook*, *Energy Transition Playbook*, *From Compliance to Credibility (CCTS/CBAM)* - all cover compliance / market sizing.
- *India Power Sector Investment Presentation* and *India's Renewable Grid at Breaking Point* - power-sector overlap.

### Problem 3 — Thin items with no link / no destination
Dead weight that adds noise without giving the reader anywhere to go:
- *India's Climate Inflection Point* (Perspective, no link)
- *Asia Climate Emissions and Article 6* (Brief, no link)
- *Mining the Transition* (Brief, no link)
- *India Power Sector Investment Presentation* (Brief, no link)

### Problem 4 — Search bar was buried at the bottom
Currently `#search` sits below the listing. You want it back at the top.

### Problem 5 — Topic taxonomy is uneven
Carbon Markets 9 · Regulatory Intel 4 · ESG Communications 2 · Board Governance 2. The lopsidedness is what makes it feel repetitive.

---

## Proposed Optimisation

### A. Deduplicate Flagship vs. clusters
Flagships stay in the **Flagship Research** band only. Remove them from the topic clusters below. The All Intelligence count drops from 17 → 12 in the clusters (5 flagships + 12 briefs = 17 total, but each shown once).

### B. Retire / merge the 4 dead-end items
Cleanest cut. Removes 4 noise items, leaves a tighter library of **13 publications** (5 Flagship + 8 Briefs/Perspectives), every one with a destination.

The 4 retired items are old (Oct-Dec 2025), have no link, and their themes are already covered by linked briefs (CCTS/CBAM, grid analysis, Article 6 readiness, Asia comparatives).

### C. Re-cluster Carbon Markets into 2 readable sub-shelves
Within the Carbon Markets cluster, split into two visually-distinct sub-groupings so the eye can parse it:

```text
Carbon Markets
  ├─ Markets & Compliance     (Microsoft CDR, Compliance to Credibility, Carbon Market Outlook)
  └─ Power & Transition       (Renewable Grid, Energy Transition Playbook)
```

Sub-shelves are rendered as small italic serif sub-labels inside the cluster - no new cards, no new chrome.

### D. Bring search bar back to the top
Move the search input + topic/type filters back above the **Flagship Research** band, immediately under the H1. Single compact row:
- Search input (left, ~60% width)
- Topic dropdown + Type dropdown (right)

When any filter is active, the page switches to the existing flat filtered list (Flagship band hides). When cleared, returns to clustered view.

### E. Sticky section nav cleanup
Remove the now-redundant `#search` section nav chip (search lives at the top permanently). Section nav becomes: Premium · Flagship · Carbon Markets · Regulatory Intel · ESG Communications · Board Governance · Subscribe.

---

## Final shape

```text
Intelligence Briefs                          [H1]
[ Search _______________ ]  [Topic ▾] [Type ▾]   ← restored

[ sticky section nav ]

Premium Access Lounge

Flagship Research (5)                         ← only place flagships live
  Himachal · CCUS Gap · Carbon Playbook · WEF · (any new)

All Intelligence · 8 briefs                   ← briefs only, no flagship dupes
  Carbon Markets (5)
    – Markets & Compliance (3)
    – Power & Transition (2)
  Regulatory Intel (2)
  ESG Communications (2)
  Board Governance (1)

Subscribe
```

13 pieces total (down from 17), zero duplication, every item links somewhere, and the eye has clear shelves to rest on.

---

## Technical Section

**File:** `src/pages/Insights.tsx`

1. **Data:** remove the 4 link-less items from the `publications` array (Climate Inflection Point, Asia Climate Emissions, Mining the Transition, India Power Sector Investment Presentation).
2. **Cluster filter:** in the `showFlagship` clustered branch (line ~570), filter out items whose `contentType === 'Flagship Report'` so flagships only render in the top band.
3. **Sub-shelves:** add an optional `subCluster?: 'Markets & Compliance' | 'Power & Transition'` field to the 5 Carbon Markets briefs. In the Carbon Markets cluster, group by `subCluster` with a small `<h3>` label (`text-[12px] italic font-serif text-muted-foreground`).
4. **Search relocation:** lift the `#search` section's contents (search input + 2 filter rows) into a new compact bar placed inside the hero section right after the H1. Drop the dedicated `#search` section and its sticky-nav entry.
5. **Sticky nav:** remove `'search'` from the `sections` array (line ~255).
6. **Counts:** "All Intelligence · X items" now counts non-flagship items only.

No new dependencies, no route changes, no schema/SEO regressions (the JSON-LD `ItemList` continues to use `filteredPublications` so it still includes flagships via the top band).

