# Apple-style hyperlink styling on /insights

Refine the two existing link styles on `/insights` to match the Apple-like editorial pattern used across light pages: foreground-toned text, no resting underline, hairline underline only on hover/focus.

## Pattern

- Resting: text in `text-foreground/80` (slightly heavier than the surrounding muted body so the link is discoverable), no underline.
- Hover/focus: text strengthens to `text-foreground`, a 0.5px underline appears in `decoration-foreground/30`, sitting `underline-offset-[5px]` below the baseline.
- Transition: `duration-200`, colour and decoration only - no scale, no glow, no colour shift to blue.
- Focus-visible: keyboard users get the same underline plus the global `focus-visible` ring already used elsewhere.

## Edits

Both in `src/pages/insights/PremiumAccessLounge.tsx`.

1. **Line 481 - reader org link in Quotes from Readers** (Negative Emissions Platform, The Energy Mix). Replace the current always-on `underline decoration-border` with the resting/hover pattern above. Same className applies whether the card sits on the tinted band or, in future, on paper.

2. **Line 739 - inline link in the Sponsor block.** Already uses a similar hover-underline pattern but with `decoration-border/50` which disappears on the tinted background. Align it to the same `decoration-foreground/30` token for consistency. Keep the existing `inline whitespace-nowrap` so it doesn't wrap mid-phrase.

No structural, layout, or copy changes. No new dependencies.

## Out of scope

- Tier-card CTAs and primary buttons - those are already typed buttons, not text links.
- Any link on dark backgrounds (Members Only zone, Analyst Lens tier card) - those need a different inverted treatment and will be handled separately if asked.
