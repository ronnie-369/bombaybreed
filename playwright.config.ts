import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config - scoped to visual regression for SpotlightCard tones.
 *
 * Goldens live alongside the spec in `tests/visual/__screenshots__/`.
 * Re-generate with:  `npx playwright test --update-snapshots`
 *
 * Vitest still owns logic/unit tests (`src/**\/*.test.ts(x)`); Playwright
 * is intentionally constrained to the `tests/` folder so the two runners
 * never collide.
 */
export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1,
  },
  expect: {
    toHaveScreenshot: {
      // Tight threshold - tones are subtle; we want to catch palette drift.
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  snapshotPathTemplate:
    "{testDir}/__screenshots__/{testFilePath}/{arg}-{projectName}{ext}",
});
