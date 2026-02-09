

# Corrections to Grid Analysis Page

## 1. Prominent Source Attribution + WSJ Video Link

**Mint Article**: Create a prominent, card-style source attribution block in the hero section (replacing the small text link) with a clear "Read Source Article" call-to-action button linking to the Mint piece. This makes it immediately obvious the analysis is based on that article.

**WSJ YouTube Video**: Add the YouTube link (https://youtu.be/Sq-y-wiZduE) where the WSJ is mentioned in the Overview section (line 417 in GridAnalysis.tsx). This will be an embedded-style link card with a play icon, making it easy to access the video that illustrates the grid stabilisation problem.

## 2. Color Scheme Alignment with Main Website

Replace the dark theme (#0a0a0a background, orange/teal accents) with the main site's color palette while keeping the Georgia + JetBrains Mono fonts and sizing intact.

**Current (dark) to New (site-aligned) mapping:**

| Element | Current | New |
|---------|---------|-----|
| Page background | #0a0a0a (near black) | hsl(210, 20%, 98%) - site background |
| Text primary | #e0e0e0 (light grey) | hsl(210, 15%, 20%) - site foreground |
| Text secondary | #888 | hsl(210, 10%, 45%) - muted foreground |
| Accent (orange) | #FF6B35 | hsl(160, 45%, 25%) - forest green primary |
| Accent (teal) | #00A896 | hsl(200, 60%, 40%) - ocean blue accent |
| Accent (gold) | #FFB347 | hsl(160, 40%, 35%) - mid green |
| Accent (red/warning) | #FF4757 | hsl(0, 70%, 50%) - site destructive |
| Card backgrounds | rgba(255,255,255,0.03) | White with subtle border |
| Borders | rgba(255,255,255,0.06) | hsl(210, 15%, 90%) - site border |
| Nav background | #0a0a0a | White, sticky |
| Hero gradient | Dark gradient | Subtle green-tinted light gradient |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/GridAnalysis.tsx` | Add prominent Mint source card in hero, add WSJ YouTube link card in overview section |
| `src/pages/GridAnalysis.css` | Rewrite all color values to use site's light theme palette; keep font families, sizes, and layout unchanged |

## Technical Details

### Source Attribution Card (Hero)
```text
+--------------------------------------------------+
| SOURCE ARTICLE                                    |
| Mint - Centre steps in to resolve electricity     |
| curtailment issue, tasks CEA and national grid    |
| operator to find a resolution                     |
| [Read on Mint ->]                                 |
+--------------------------------------------------+
```

### WSJ Video Link (Overview Section)
```text
+--------------------------------------------------+
| WATCH: WSJ on Grid Stabilisation                  |
| Understanding why grids built for thermal power   |
| struggle with variable renewables                 |
| [Watch on YouTube ->]                             |
+--------------------------------------------------+
```

### CSS Color Overhaul
- Remove `!important` dark overrides on header/footer
- Change all hardcoded dark colors to site-aligned light values
- Update callout backgrounds from dark rgba to light-appropriate tints
- Update stat cards, solution cards, pillar containers to white/light backgrounds
- Adjust bar chart fills and score dots to use primary green and accent blue
