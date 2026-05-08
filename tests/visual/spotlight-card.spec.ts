import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Tones inlined here (rather than imported from SpotlightCard.tsx) so the
 * Playwright loader does not try to parse the component's `.css` import.
 * The vitest suite `SpotlightCard.tones.test.tsx` already locks the in-app
 * `SPOTLIGHT_TONES` map against this exact palette, so any drift fails
 * there before this file is reached.
 */
type SpotlightTone = "gold" | "gold-strong" | "ink" | "blue" | "paper";
const SPOTLIGHT_TONES: Record<SpotlightTone, string> = {
  gold: "rgba(197, 160, 89, 0.16)",
  "gold-strong": "rgba(197, 160, 89, 0.26)",
  ink: "rgba(10, 10, 11, 0.08)",
  blue: "rgba(26, 61, 92, 0.14)",
  paper: "rgba(197, 160, 89, 0.10)",
};

/**
 * Visual regression for SpotlightCard tones - real browser, real CSS.
 *
 * jsdom (vitest) cannot rasterize the radial gradient that defines the
 * spotlight effect. This Playwright spec loads the actual SpotlightCard
 * stylesheet, renders one card per tone on the brand Paper background,
 * pins the cursor to the card centre, forces the hover overlay on, and
 * captures a PNG. Goldens live next to this file under __screenshots__/.
 *
 * Re-generate after intentional palette changes:
 *   npx playwright test --update-snapshots
 */

const SPOTLIGHT_CSS = readFileSync(
  resolve(__dirname, "../../src/components/ui/SpotlightCard.css"),
  "utf8"
);

const PAPER = "#FDFCFB";
const INK = "#0A0A0B";

function fixture(tone: SpotlightTone): string {
  const color = SPOTLIGHT_TONES[tone];
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        background: ${PAPER};
        color: ${INK};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .stage {
        width: 480px;
        height: 320px;
        margin: 40px;
        display: flex;
      }
      .card {
        flex: 1;
        background: ${PAPER};
        border: 1px solid rgba(10, 10, 11, 0.08);
        border-radius: 12px;
        padding: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        letter-spacing: 0.02em;
      }
      ${SPOTLIGHT_CSS}
      /* Force the hover overlay on so the screenshot is deterministic
         regardless of pointer state in headless Chromium. */
      .card-spotlight.force-show::before { opacity: 1 !important; }
    </style>
  </head>
  <body>
    <div class="stage">
      <div
        class="card-spotlight force-show card"
        style="--spotlight-color: ${color}; --mouse-x: 240px; --mouse-y: 160px;"
        data-tone="${tone}"
      >
        SpotlightCard - tone: ${tone}
      </div>
    </div>
  </body>
</html>`;
}

const tones = Object.keys(SPOTLIGHT_TONES) as SpotlightTone[];

for (const tone of tones) {
  test(`SpotlightCard tone=${tone} matches golden`, async ({ page }) => {
    await page.setContent(fixture(tone), { waitUntil: "domcontentloaded" });
    const card = page.locator(`[data-tone="${tone}"]`);
    await expect(card).toBeVisible();
    // Stage is 560x400 including 40px margin - clip to it for a stable frame.
    await expect(page).toHaveScreenshot(`spotlight-${tone}.png`, {
      clip: { x: 0, y: 0, width: 560, height: 400 },
    });
  });
}
