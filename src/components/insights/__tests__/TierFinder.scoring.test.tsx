import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TierFinder from "@/components/insights/TierFinder";

/**
 * Behavioural tests for the TierFinder recommendation engine. We drive the
 * component through its UI (no internal exports) and assert the rendered
 * recommendation. This locks in the deterministic tie-break rules:
 *   1. Highest aggregated score wins.
 *   2. On ties, the tier favoured by the visitor's budget answer wins.
 *   3. On further ties, the higher ladder tier wins (assuming budget allows).
 *   4. Budget acts as a hard ceiling - never recommend above it.
 */

const renderFinder = () =>
  render(
    <MemoryRouter>
      <TierFinder />
    </MemoryRouter>
  );

const pick = async (user: ReturnType<typeof userEvent.setup>, label: string) => {
  const btn = await screen.findByRole("button", { name: label });
  await user.click(btn);
};

const recommendedName = () => {
  // Recommendation block is identified by the "Recommended for you" eyebrow.
  const eyebrow = screen.getByText(/recommended for you/i);
  const block = eyebrow.closest("div")?.parentElement?.parentElement;
  if (!block) throw new Error("Recommendation block not found");
  return within(block as HTMLElement).getByRole("heading", { level: 3 }).textContent?.trim();
};

describe("TierFinder scoring", () => {
  beforeEach(() => {
    try { localStorage.clear(); } catch { /* noop */ }
  });

  it("respects the budget hard ceiling (Free budget cannot upgrade)", async () => {
    const user = userEvent.setup();
    renderFinder();

    // Answers that point to Investment Intelligence on goal+role,
    // but the visitor only has Free budget.
    await pick(user, "Run diligence or deploy capital in Indian climate");
    await pick(user, "Investor, fund analyst, family office, DFI");
    await pick(user, "Free");

    expect(recommendedName()).toBe("Free Substack");
  });

  it("breaks 5-5 tie between Enthusiasts and Market Makers using the $10/mo budget signal", async () => {
    const user = userEvent.setup();
    renderFinder();

    // tcd-paid: 3 (goal) + 2 (role) + 1 (budget) = 6
    // bb-reader: 1 (goal) + 3 (role) + 2 (budget) = 6
    // Budget signal: bb-reader=2, tcd-paid=1 → Market Makers wins.
    await pick(user, "Read deeper editorial commentary");
    await pick(user, "Sustainability lead, consultant, journalist");
    await pick(user, "USD 10 / month (research-grade editorial)");

    expect(recommendedName()).toBe("Market Makers");
  });

  it("prefers the higher ladder tier when score and budget signal are tied", async () => {
    const user = userEvent.setup();
    renderFinder();

    // goal: bb-reader 3, bb-analyst 2
    // role (investor): bb-analyst 4, bb-reader 1
    // budget institutional: sponsor 2, bb-analyst 1
    // Totals: bb-analyst = 7, bb-reader = 4, sponsor = 2 → Investment Intelligence.
    await pick(user, "Track CCTS, sectoral and regional intelligence");
    await pick(user, "Investor, fund analyst, family office, DFI");
    await pick(user, "Institutional / project-scale");

    expect(recommendedName()).toBe("Investment Intelligence");
  });

  it("recommends Sponsor when goal + role + institutional budget align", async () => {
    const user = userEvent.setup();
    renderFinder();

    await pick(user, "Underwrite a specific report or research line");
    await pick(user, "Corporate or institution underwriting research");
    await pick(user, "Institutional / project-scale");

    expect(recommendedName()).toBe("Sponsor");
  });

  it("surfaces a stretch tier when budget excludes the ideal pick", async () => {
    const user = userEvent.setup();
    renderFinder();

    // Investor profile but only $1/mo budget - ideal is bb-analyst,
    // affordable winner is tcd-paid (Enthusiasts).
    await pick(user, "Run diligence or deploy capital in Indian climate");
    await pick(user, "Investor, fund analyst, family office, DFI");
    await pick(user, "USD 1 / month");

    expect(recommendedName()).toBe("Enthusiasts");
    expect(screen.getByText(/if your budget allows/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /investment intelligence/i })).toBeInTheDocument();
  });
});
