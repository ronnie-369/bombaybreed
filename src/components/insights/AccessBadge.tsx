/**
 * Per-card access badge for /insights publication cards.
 * Communicates upfront whether a piece is free to read, paid TCD,
 * or member-only (Market Makers / Investment Intelligence). No surprises at the paywall.
 */

import type { LadderTier } from "@/intelligence/lib/valueLadder";

export type AccessLevel = "free" | "paid-tcd" | "bb-reader" | "bb-analyst";

interface AccessBadgeProps {
  level: AccessLevel;
  className?: string;
}

const META: Record<
  AccessLevel,
  { label: string; tone: "neutral" | "tcd" | "reader" | "analyst"; tier: LadderTier["id"] }
> = {
  free: { label: "Free", tone: "neutral", tier: "tcd-free" },
  "paid-tcd": { label: "Paid TCD", tone: "tcd", tier: "tcd-paid" },
  "bb-reader": { label: "Market Makers", tone: "reader", tier: "bb-reader" },
  "bb-analyst": { label: "Investment Intelligence", tone: "analyst", tier: "bb-analyst" },
};

const TONE_CLASS: Record<string, string> = {
  neutral:
    "border-border text-muted-foreground bg-background",
  tcd: "border-foreground/20 text-foreground bg-foreground/5",
  reader:
    "border-primary/30 text-primary bg-primary/5",
  analyst:
    "border-primary/40 text-primary-foreground bg-primary",
};

const AccessBadge = ({ level, className = "" }: AccessBadgeProps) => {
  const m = META[level];
  return (
    <span
      className={`inline-flex items-center text-[10px] font-medium uppercase tracking-[0.14em] px-2 py-0.5 rounded border ${TONE_CLASS[m.tone]} ${className}`}
      data-tier={m.tier}
      aria-label={`Access level: ${m.label}`}
    >
      {m.label}
    </span>
  );
};

export default AccessBadge;
