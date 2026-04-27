## Context

The HP Investor Synthesis report already has a sticky horizontal TOC with scrollspy, smooth scroll, URL hash sync, and auto-expand of collapsed sections (shipped in the prior streamlining pass).

This plan adds the two genuinely missing pieces that improve navigation without duplicating what's there:

1. A **mobile "Jump to" dropdown** — the current horizontal bar requires sideways scrolling on phones to reach Parts VII–IX, which kills jumpability. Replacing it with a native `<select>` on mobile gives one-tap access to all 12 sections.
2. **Sub-section anchors inside Parts III, IV, VI, IX** — these are the four Parts that actually contain multiple distinct H3 sub-topics worth jumping to. The TOC will expand to reveal sub-links when the parent Part becomes active, then collapse when the reader moves on.

Together these turn the TOC from a 12-link top strip into a navigation system that adapts to depth (sub-anchors when relevant) and surface (dropdown on mobile, bar on desktop).

## What changes

### 1. Mobile dropdown (replaces the horizontal scroll on small screens)

- Below `.toc-sticky`, render a hidden `<select id="tocSelect">` with the same 12 options as the existing links, plus any sub-anchors.
- CSS: hide `.toc-inner` below `768px`, show the `<select>`. Above `768px`, swap.
- JS: on `change`, trigger the same scroll/auto-open logic the existing click handler uses. On scrollspy section change, update `select.value` so the dropdown always reflects current position.

### 2. Sub-section anchors (added to four Parts)

Add `id` attributes to the existing H3s that already exist in these Parts (no content changes):

- **Part III · Evidence** — `#part-iii-thermal` (30°C thermal range), `#part-iii-rainfall` (rainfall signal), `#part-iii-2023` (2023 break point), `#part-iii-water` (water column)
- **Part IV · Investor Map** — `#part-iv-table` (sector table), `#part-iv-deepdive` (Part IV-B research cards), `#part-iv-field` (Field Record videos)
- **Part VI · UNFCCC Frame** — `#part-vi-market` (market opportunity H3)
- **Part IX · Playbook** — eight `#playbook-1` … `#playbook-8` anchors on each move

In the TOC, render sub-links as a second tier (smaller, indented) that appears only when its parent Part is the active scrollspy target. When you scroll past, sub-links collapse.

Desktop (bar) treatment: sub-links appear inline in a second row below the active part.
Mobile (dropdown): sub-links appear as indented `<option>`s grouped under their parent, e.g. `  → Thermal range`.

### 3. Active-state polish

- Update `IntersectionObserver` to also observe sub-section IDs and highlight the deepest one currently in view (sub takes precedence over its parent Part).
- Keep the existing copper-underline treatment on the active link.

## Files touched

- `public/special-features/tcd-hp-investor-synthesis.html` only. All work is inside this single static file (markup, CSS, and the existing inline `<script>` block at line 2362).

## Out of scope (not changing)

- The existing top horizontal TOC, scrollspy, smooth-scroll behaviour, and auto-expand of `<details>` — kept exactly as is on desktop.
- Section content, headings, copy, ordering.
- The reading-time strip, TLDR card, Field Record gallery, or any other element from the prior streamlining pass.
- Other reports (HP Compounding Losses, HP Crop Hardiness, etc.) — only this file.

## Acceptance check (will run after implementation)

- Resize to 375px wide: dropdown appears, horizontal bar hidden, selecting any option scrolls to and expands the right section.
- Desktop: scrolling into Part III reveals the four sub-links inline; scrolling into Part IV reveals its three; scrolling out collapses them.
- Clicking `#playbook-5` on desktop scrolls to move 5, not the top of Part IX.
- URL hash updates on every jump for shareable deep links.
