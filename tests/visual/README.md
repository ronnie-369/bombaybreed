# Visual regression - SpotlightCard tones

Playwright screenshots that lock the rendered look of every `SpotlightCard`
tone against the Bombay Breed editorial palette (Paper #FDFCFB, Ink #0A0A0B,
Warm Gold #C5A059, Deep Blue #1A3D5C).

The vitest suite (`src/components/ui/__tests__/SpotlightCard.tones.test.tsx`)
covers the React props / CSS-variable contract. This Playwright suite covers
what the contract actually *renders* in a real browser, since jsdom cannot
rasterize the radial-gradient overlay.

## Run

```bash
# Verify against committed goldens
npx playwright test

# Re-generate goldens (after an intentional palette change)
npx playwright test --update-snapshots
```

Goldens live in `__screenshots__/spotlight-card.spec.ts/` and ARE committed.

## Scope

- One screenshot per tone: `gold`, `gold-strong`, `ink`, `blue`, `paper`
- Hover state forced on (`force-show` class) so the gradient is captured
  deterministically without relying on synthetic mouse events
- 1024x768 viewport, 560x400 clip per shot, animations disabled
- `maxDiffPixelRatio: 0.01` to catch palette / opacity drift while tolerating
  sub-pixel font antialiasing

## CI / cross-platform note

Goldens were generated on Linux Chromium in the Lovable sandbox. Browsers and
OS font stacks render gradients and text slightly differently, so first
runs on macOS / Windows may diff. If a teammate hits a false positive, regen
locally on the same OS the CI uses (Linux) - do NOT commit OS-specific
goldens.
