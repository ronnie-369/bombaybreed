## Diagnosis: tcd-hp-investor-synthesis.html (2,090 lines, 9 numbered Parts + Exec Summary + Closing)

The report is doing **three different jobs** in one scroll:
1. A **board-level brief** (Exec Summary, Endowment, Representation Gap, Downstream Stakes, Playbook)
2. An **evidence dossier** (Part III charts, Part IV-B videos + linked sub-reports)
3. A **thematic deep-dive** (Energy Paradox, UNFCCC Frame, Adventure Economy)

A serious investor lands once and needs to find their layer fast. Right now everything competes equally for attention and the same arguments recur in three places (the "mitigation + adaptation as one capital structure" line appears in Exec Summary line 02, Part VI intro, and Closing).

---

## Recommended streamlining (ranked by impact)

### 1. Add a sticky in-page table of contents (highest leverage)
A 2,090-line scroll has no wayfinding once you leave the hero. Add a left-rail or top-pinned TOC that:
- Lists the 9 Parts with anchor links
- Highlights the active section on scroll
- Collapses on mobile into a single "Jump to" dropdown

This alone makes the existing length feel half as long because readers stop fearing they will lose their place.

### 2. Compress 9 Parts into 3 acts
The Roman-numeral count is doing more harm than good - it signals "long" before the reader has read a word. Re-shell the same content under three acts that mirror an investment memo:

- **Act I - The Asymmetry** (current Parts I + II): what HP holds vs. what HP can lobby for
- **Act II - The Evidence and the Map** (current Parts III + IV + IV-B + V): observed data, sector exposure, deep-dive links, energy paradox
- **Act III - The Instrument and the Stakes** (current Parts VI + VII + VIII + IX + Closing): UNFCCC pathways, adventure economy, downstream beneficiaries, the playbook

Internally each act keeps its own subsections, but the reader sees a 3-step arc instead of nine.

### 3. Pull Part IX (The Playbook) up to a "TL;DR card" near the top
The 8-move playbook is the single most useful artefact for a board reader and it sits at line 1812 of 2090. Solution: put a condensed **"Eight moves"** card immediately after the Executive Summary that lists only the move names + a "see playbook ↓" anchor. Keep the full bulleted version in place at the end. This serves the skim reader without removing depth for the close reader.

### 4. Merge Part IV (Investor Map table) and Part IV-B (Deep Dive cards + videos)
These are one section pretending to be two. Right now the reader sees a 9-row sector table, then immediately a "here are 4 sub-reports" card grid, then two video blocks. Restructure as:
- Sector exposure table (current Part IV)
- Inline "deep dive →" link inside each table row to the relevant sub-report (some already exist, formalise it)
- Move both video blocks into a single **"Field record"** subsection at the end of the act, not in the middle of the analytical flow

### 5. Consolidate the two Keylong/snowfall video blocks into one row of six
The "Ground-truth visual record" (3 videos) and "Fresh snowfall at Keylong" (3 videos) are presented as two separate sections with two separate intros. They were filmed on the same April 2026 recce. Merge into a **single Field Record gallery of 6 clips** with a unified intro paragraph that tells the thermal-range story once, and per-clip captions that locate each video. Saves ~50 lines of repeated scaffolding and reads as one coherent visual evidence base.

### 6. Cut the duplicated "mitigation + adaptation as one capital structure" line
This thesis sentence appears in three places almost verbatim. Keep it once - in Part VI where it belongs - and replace the Exec Summary and Closing instances with a sharper, non-repeating formulation (Exec Summary = the *what*, Part VI = the *how*, Closing = the *so what*).

### 7. Tighten the H3 styling pattern
Inline `style="font-family:'Playfair Display'..."` is repeated on 5 H3s with slightly different sizes (22/24/26px). Promote these to two CSS classes (`.section-h3` and `.section-h3-sm`) so the typographic rhythm becomes consistent and future edits stop drifting.

### 8. Add a "Reading time + Download as PDF" header strip
Below the hero title, add: "27 min read · Download as PDF · Share". The PDF link can point to a print stylesheet that reformats the page for offline reading - investors forward PDFs, not URLs. This is one of the most-requested signals on long-form analytical content.

### 9. Make Part V (Energy Paradox) and Part VII (Adventure Economy) optional/collapsible
These are the two sections most likely to be skipped by a pure-finance reader. Wrap each in a `<details>` element (or a custom expand/collapse) with a one-line summary visible by default. Readers who want them open them; readers who don't get a 30% shorter scroll.

---

## What I would NOT change
- The Executive Summary 5-line numbered structure - it works, do not touch
- The annotated chart layout in Part III - this is the strongest visual moment in the report
- The Endowment ledger in Part I - already optimally compressed
- The Downstream Stakes table in Part VIII - the geographic argument is the report's killer punch and it needs the full table to land

---

## Suggested implementation order (if approved)
1. Add sticky TOC + reading time strip *(small, high impact)*
2. Merge the two video blocks into one Field Record gallery *(small)*
3. Pull Playbook summary card up under Exec Summary *(small)*
4. Promote inline H3 styles to CSS classes *(housekeeping)*
5. Re-shell into 3 Acts with collapsible Energy Paradox + Adventure Economy *(larger structural change - do last so we can confirm direction first)*

Tell me which of these you want and I will execute. The first four can ship in a single edit; the 3-Act re-shell is a separate, larger pass and I would want to confirm the act labels with you before writing.