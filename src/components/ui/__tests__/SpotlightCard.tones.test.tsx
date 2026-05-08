import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import SpotlightCard, {
  SPOTLIGHT_TONES,
  type SpotlightTone,
} from "../SpotlightCard";

/**
 * Visual regression coverage for SpotlightCard tones.
 *
 * jsdom cannot rasterize the radial gradient, so we lock the inputs that
 * drive the visual: the resolved `--spotlight-color` CSS variable, the
 * `card-spotlight` class hook (which the CSS file targets), and the
 * mouse-tracked `--mouse-x` / `--mouse-y` variables.
 *
 * Brand palette ref: mem://design/visual-identity-and-color-palette
 * - Warm Gold  #C5A059 -> rgb(197, 160, 89)
 * - Ink        #0A0A0B -> rgb(10, 10, 11)
 * - Deep Blue  #1A3D5C -> rgb(26, 61, 92)
 *
 * Opacities stay <= 0.28 so the effect reads as a polished sheen on the
 * Apple-like Paper (#FDFCFB) background, never as a neon glow.
 */

const PALETTE_SNAPSHOT: Record<SpotlightTone, string> = {
  gold: "rgba(197, 160, 89, 0.16)",
  "gold-strong": "rgba(197, 160, 89, 0.26)",
  ink: "rgba(10, 10, 11, 0.08)",
  blue: "rgba(26, 61, 92, 0.14)",
  paper: "rgba(197, 160, 89, 0.10)",
};

const tones = Object.keys(PALETTE_SNAPSHOT) as SpotlightTone[];

describe("SpotlightCard tone visual regression", () => {
  it("freezes the brand-aligned palette map", () => {
    // If this snapshot drifts, a designer has changed the spotlight palette.
    // Re-validate against mem://design/visual-identity-and-color-palette
    // before updating, and re-run any per-tone visual review.
    expect(SPOTLIGHT_TONES).toEqual(PALETTE_SNAPSHOT);
  });

  it.each(tones)(
    "renders tone=%s with the expected --spotlight-color variable",
    (tone) => {
      const { container } = render(
        <SpotlightCard tone={tone} data-testid={`spot-${tone}`}>
          <span>content</span>
        </SpotlightCard>
      );
      const root = container.firstChild as HTMLElement;
      expect(root).toBeInTheDocument();
      expect(root.className).toContain("card-spotlight");
      expect(root.style.getPropertyValue("--spotlight-color")).toBe(
        PALETTE_SNAPSHOT[tone]
      );
    }
  );

  it("keeps every tone within the editorial opacity ceiling (<= 0.28)", () => {
    // Guards against accidentally introducing a neon / SaaS-glow tone.
    for (const value of Object.values(SPOTLIGHT_TONES)) {
      const match = value.match(/rgba\([^)]+,\s*([0-9.]+)\)$/);
      expect(match, `tone value '${value}' must be rgba()`).not.toBeNull();
      const opacity = Number(match![1]);
      expect(opacity).toBeGreaterThan(0);
      expect(opacity).toBeLessThanOrEqual(0.28);
    }
  });

  it("defaults to the warm-gold tone when no prop is given", () => {
    const { container } = render(
      <SpotlightCard>
        <span>content</span>
      </SpotlightCard>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue("--spotlight-color")).toBe(
      PALETTE_SNAPSHOT.gold
    );
  });

  it("lets an explicit spotlightColor override the tone preset", () => {
    const override = "rgba(0, 0, 0, 0.5)";
    const { container } = render(
      <SpotlightCard tone="gold-strong" spotlightColor={override}>
        <span>content</span>
      </SpotlightCard>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue("--spotlight-color")).toBe(override);
  });

  it("tracks the cursor by writing --mouse-x / --mouse-y on move", () => {
    const { container } = render(
      <SpotlightCard tone="ink">
        <span>content</span>
      </SpotlightCard>
    );
    const root = container.firstChild as HTMLElement;
    // jsdom getBoundingClientRect returns zeros, so clientX/Y maps 1:1.
    fireEvent.mouseMove(root, { clientX: 42, clientY: 17 });
    expect(root.style.getPropertyValue("--mouse-x")).toBe("42px");
    expect(root.style.getPropertyValue("--mouse-y")).toBe("17px");
  });

  it("merges custom className alongside the card-spotlight hook", () => {
    const { container } = render(
      <SpotlightCard tone="blue" className="custom-card">
        <span>content</span>
      </SpotlightCard>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("card-spotlight");
    expect(root.className).toContain("custom-card");
  });
});
