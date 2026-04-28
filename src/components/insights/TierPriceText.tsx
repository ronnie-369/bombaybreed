/**
 * Renders a tier price with INR (or USD) primary and the alternate currency
 * in a smaller, muted style inside parentheses. No tilde.
 *
 * Example: "INR 8,500 / mo  (USD 100)"  with the (USD 100) part smaller.
 */
import {
  getTierPriceParts,
  type Currency,
  type LadderTier,
} from "@/intelligence/lib/valueLadder";

interface Props {
  tier: LadderTier;
  currency: Currency;
  /** Tailwind size for the secondary (smaller) currency. Default: text-[10px]. */
  secondaryClassName?: string;
  className?: string;
}

const TierPriceText = ({
  tier,
  currency,
  secondaryClassName = "text-[0.78em] text-bb-gray ml-1.5",
  className,
}: Props) => {
  const { primary, secondary } = getTierPriceParts(tier, currency);
  return (
    <span className={className}>
      {primary}
      {secondary && (
        <span className={secondaryClassName}>({secondary})</span>
      )}
    </span>
  );
};

export default TierPriceText;
