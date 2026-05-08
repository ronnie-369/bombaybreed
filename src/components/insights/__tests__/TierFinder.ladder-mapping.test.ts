import { describe, it, expect } from "vitest";
import {
  ALL_TIERS,
  TIER_RANK,
  BUDGET_CEILINGS_USD,
  tiersUnderBudget,
} from "@/components/insights/TierFinder";
import { TIERS } from "@/intelligence/lib/valueLadder";

/**
 * Guardrail: TierFinder's tie-break ordering and budget ceilings are
 * derived from `valueLadder.ts`. These tests fail loudly if anyone
 * reorders, renames, reprices, or removes a tier without updating the
 * finder, preventing silent mismatches in the recommendation engine.
 */

describe("TierFinder ↔ valueLadder mapping", () => {
  it("ALL_TIERS exactly mirrors the canonical TIERS order", () => {
    expect(ALL_TIERS).toEqual(TIERS.map((t) => t.id));
  });

  it("TIER_RANK is contiguous, zero-indexed, cheapest → richest", () => {
    ALL_TIERS.forEach((id, i) => {
      expect(TIER_RANK[id]).toBe(i);
    });
    // Strictly increasing USD price for tiers that have pricing.
    const priced = TIERS.filter((t) => t.pricing).map((t) => ({
      id: t.id,
      usd: t.pricing!.usd,
    }));
    for (let i = 1; i < priced.length; i++) {
      expect(priced[i].usd).toBeGreaterThanOrEqual(priced[i - 1].usd);
    }
  });

  it("every TIERS id is covered by TIER_RANK and ALL_TIERS", () => {
    const ids = new Set(TIERS.map((t) => t.id));
    expect(new Set(ALL_TIERS)).toEqual(ids);
    ids.forEach((id) => expect(TIER_RANK[id]).toBeDefined());
  });

  it("tiersUnderBudget honours the actual ladder pricing", () => {
    expect(tiersUnderBudget(0)).toEqual(["tcd-free"]);
    expect(tiersUnderBudget(1)).toEqual(["tcd-free", "tcd-paid"]);
    expect(tiersUnderBudget(10)).toEqual([
      "tcd-free",
      "tcd-paid",
      "bb-reader",
    ]);
    expect(tiersUnderBudget(20)).toEqual([
      "tcd-free",
      "tcd-paid",
      "bb-reader",
      "bb-analyst",
    ]);
    // Institutional removes the ceiling, so Sponsor (no `pricing`) joins.
    expect(tiersUnderBudget(null)).toEqual(ALL_TIERS);
  });

  it("BUDGET_CEILINGS_USD never exceeds the corresponding tier price", () => {
    const priceFor = (id: string) =>
      TIERS.find((t) => t.id === id)?.pricing?.usd;
    // Each ceiling should match an actual tier price (or null).
    expect(BUDGET_CEILINGS_USD.usd1).toBe(priceFor("tcd-paid"));
    expect(BUDGET_CEILINGS_USD.usd10).toBe(priceFor("bb-reader"));
    expect(BUDGET_CEILINGS_USD.usd20).toBe(priceFor("bb-analyst"));
    expect(BUDGET_CEILINGS_USD.free).toBe(0);
    expect(BUDGET_CEILINGS_USD.institutional).toBeNull();
  });

  it("each budget allowedTiers set is a contiguous prefix of the ladder", () => {
    // Critical invariant: a budget can never allow a higher tier while
    // skipping a lower one. Otherwise the recommendation engine would let
    // a $20/mo visitor accidentally land on Sponsor before Investment
    // Intelligence.
    Object.values(BUDGET_CEILINGS_USD).forEach((ceiling) => {
      const allowed = tiersUnderBudget(ceiling);
      const indices = allowed.map((id) => TIER_RANK[id]);
      const expected = Array.from({ length: indices.length }, (_, i) => i);
      expect(indices).toEqual(expected);
    });
  });
});
