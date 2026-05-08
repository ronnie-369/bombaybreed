/**
 * Renders a tier price with the primary currency at the inherited size and
 * the secondary currency rendered smaller, muted, and wrapped in proper
 * parentheses. No tilde, no orphaned brackets.
 *
 * The secondary styling is intentionally locked here (not exposed as a prop)
 * so every surface - Value Ladder cards, comparison table, intersection box,
 * Premium Access Lounge tier cards, Insights ladder hero - renders the
 * bracketed currency identically.
 *
 * Example output (with USD primary):
 *   USD 10 / mo  (INR 850)
 *                ^^^^^^^^^ smaller, muted, never breaks across lines
 */
import {
  getTierPriceParts,
  type Currency,
  type LadderTier,
} from "@/intelligence/lib/valueLadder";
import { cn } from "@/lib/utils";

interface Props {
  tier: LadderTier;
  currency: Currency;
  /** Optional wrapper classes applied to the outer span. */
  className?: string;
  /**
   * On dark backgrounds (e.g. the Investment Intelligence card in the Lounge) the
   * default `text-bb-gray` token is invisible. Set this to true to switch the
   * secondary currency to a translucent light tone instead.
   */
  onDark?: boolean;
}

const TierPriceText = ({ tier, currency, className, onDark = false }: Props) => {
  const { primary, secondary } = getTierPriceParts(tier, currency);

  // Locked secondary styling - same on every surface.
  // - 0.78em keeps it proportionally smaller than the primary at any font size
  // - whitespace-nowrap prevents "(USD" wrapping away from "100)"
  // - tabular-nums keeps the digits visually aligned with the primary number
  // - tracking-normal undoes any uppercase/wide tracking inherited from the parent
  const secondaryClass = cn(
    "text-[0.78em] font-normal tracking-normal tabular-nums whitespace-nowrap ml-1.5",
    onDark ? "text-current/60" : "text-bb-gray"
  );

  return (
    <span className={cn("whitespace-nowrap", className)}>
      <span className="tabular-nums">{primary}</span>
      {secondary && <span className={secondaryClass}>({secondary})</span>}
    </span>
  );
};

export default TierPriceText;
