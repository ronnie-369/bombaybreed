/**
 * USD / INR pricing toggle. Shared across the canonical Value Ladder page,
 * the Premium Access Lounge, and the Insights ladder hero.
 *
 * - Editorial styling: 1px border, no SaaS-style fills. Active option is the
 *   ink colour, inactive is muted. Matches the broader minimalist brand.
 * - Two surface tones: 'paper' (default, light contexts) and 'ink' (dark
 *   tier card on the Lounge Investment Intelligence card).
 * - Emits an analytics event on every toggle so we can see whether
 *   visitors actually use it.
 */

import type { Currency } from "@/intelligence/lib/valueLadder";
import { useCurrency } from "@/intelligence/lib/useCurrency";

interface CurrencyToggleProps {
  /** Where this toggle lives - used in analytics. */
  surface: string;
  /** Visual treatment for light vs dark backgrounds. */
  tone?: "paper" | "ink";
  /** Optional preceding label, e.g. "Show prices in". */
  label?: string;
  className?: string;
}

const trackToggle = (next: Currency, surface: string) => {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    const payload = { currency: next, surface };
    if (typeof w.gtag === "function") {
      w.gtag("event", "pricing_currency_toggle", payload);
    }
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: "pricing_currency_toggle", ...payload });
    }
  } catch {
    /* analytics never break UX */
  }
};

const CurrencyToggle = ({
  surface,
  tone = "paper",
  label = "Show prices in",
  className = "",
}: CurrencyToggleProps) => {
  const [currency, setCurrency] = useCurrency();

  const onSelect = (next: Currency) => {
    if (next === currency) return;
    setCurrency(next);
    trackToggle(next, surface);
  };

  const isInk = tone === "ink";
  const labelClass = isInk ? "text-background/60" : "text-bb-gray";
  const groupClass = isInk
    ? "border-background/30 bg-transparent"
    : "border-bb-border bg-white";
  const buttonBase =
    "px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-current";
  const activeClass = isInk
    ? "bg-background text-foreground"
    : "bg-bb-near-black text-bb-off-white";
  const inactiveClass = isInk
    ? "text-background/70 hover:text-background"
    : "text-bb-gray hover:text-bb-near-black";

  return (
    <div
      className={`inline-flex items-center gap-3 ${className}`}
      role="group"
      aria-label="Display currency"
    >
      {label && (
        <span
          className={`text-[10px] uppercase tracking-[0.22em] ${labelClass}`}
        >
          {label}
        </span>
      )}
      <div
        className={`inline-flex items-stretch rounded-full border overflow-hidden ${groupClass}`}
      >
        {(["USD", "INR"] as const).map((opt) => {
          const active = currency === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(opt)}
              className={`${buttonBase} ${active ? activeClass : inactiveClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CurrencyToggle;
