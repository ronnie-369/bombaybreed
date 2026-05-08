import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TIERS, formatTierCtaLabel, type LadderTier } from "@/intelligence/lib/valueLadder";
import { useCurrency } from "@/intelligence/lib/useCurrency";
import TierPriceText from "@/components/insights/TierPriceText";
import CurrencyToggle from "@/components/insights/CurrencyToggle";
import SponsorInquiryDialog from "@/components/SponsorInquiryDialog";
import { trackOutboundClick } from "@/utils/outboundAnalytics";

/**
 * TierFinder - guided 3-question selector that recommends one of the
 * five ladder tiers and routes the visitor to signup. Reads tier data
 * from the single source of truth (`valueLadder.ts`) so price, label,
 * and CTA href stay in lock-step with the rest of the site.
 */

type TierId = LadderTier["id"];

interface Option {
  label: string;
  /** Score added to each tier when this option is chosen. */
  scores: Partial<Record<TierId, number>>;
  /**
   * Only valid on the "budget" question. Lists every tier the visitor
   * is willing to consider given their stated budget. Acts as a HARD
   * ceiling - any tier outside this set is excluded from the result.
   */
  allowedTiers?: TierId[];
}

interface Question {
  id: string;
  prompt: string;
  options: Option[];
}

/**
 * Canonical tier ordering, derived directly from the value-ladder source
 * of truth so any reordering / addition / removal of tiers in
 * `valueLadder.ts` flows through here automatically. Order is cheapest →
 * richest, which doubles as the deterministic tie-break ranking.
 */
export const ALL_TIERS: TierId[] = TIERS.map((t) => t.id);

/** Map of tier id → ladder rank (0 = cheapest). Derived, not declared. */
export const TIER_RANK: Record<TierId, number> = ALL_TIERS.reduce(
  (acc, id, i) => {
    acc[id] = i;
    return acc;
  },
  {} as Record<TierId, number>
);

/**
 * Return every tier whose monthly USD price sits at or below `maxUsd`.
 * `maxUsd === null` means no ceiling (institutional budget). Tiers with no
 * `pricing` (Sponsor) are only included when there is no ceiling.
 */
export const tiersUnderBudget = (maxUsd: number | null): TierId[] => {
  if (maxUsd === null) return ALL_TIERS;
  return TIERS
    .filter((t) => (t.pricing ? t.pricing.usd <= maxUsd : false))
    .map((t) => t.id);
};

/**
 * Budget option ceilings in USD/month. The `allowedTiers` array on each
 * budget option below is derived from these so it cannot drift from the
 * real pricing in `valueLadder.ts`.
 */
export const BUDGET_CEILINGS_USD: Record<string, number | null> = {
  free: 0,
  usd1: 1,
  usd10: 10,
  usd20: 20,
  institutional: null,
};

const QUESTIONS: Question[] = [
  {
    id: "goal",
    prompt: "What do you want from us?",
    options: [
      {
        label: "Stay aware of Indian climate news",
        scores: { "tcd-free": 3, "tcd-paid": 1 },
      },
      {
        label: "Read deeper editorial commentary",
        scores: { "tcd-paid": 3, "bb-reader": 1 },
      },
      {
        label: "Track CCTS, sectoral and regional intelligence",
        scores: { "bb-reader": 3, "bb-analyst": 2 },
      },
      {
        label: "Run diligence or deploy capital in Indian climate",
        scores: { "bb-analyst": 4, "bb-reader": 1 },
      },
      {
        label: "Underwrite a specific report or research line",
        scores: { sponsor: 5 },
      },
    ],
  },
  {
    id: "role",
    prompt: "Which best describes you?",
    options: [
      {
        label: "Curious reader or student",
        scores: { "tcd-free": 3, "tcd-paid": 1 },
      },
      {
        label: "Sustainability lead, consultant, journalist",
        scores: { "tcd-paid": 2, "bb-reader": 3 },
      },
      {
        label: "Investor, fund analyst, family office, DFI",
        scores: { "bb-analyst": 4, "bb-reader": 1 },
      },
      {
        label: "Corporate or institution underwriting research",
        scores: { sponsor: 4, "bb-analyst": 1 },
      },
    ],
  },
  {
    id: "budget",
    prompt: "What budget range fits?",
    options: [
      {
        label: "Free",
        scores: { "tcd-free": 2 },
        allowedTiers: tiersUnderBudget(BUDGET_CEILINGS_USD.free),
      },
      {
        label: "USD 1 / month",
        scores: { "tcd-paid": 2, "tcd-free": 1 },
        allowedTiers: tiersUnderBudget(BUDGET_CEILINGS_USD.usd1),
      },
      {
        label: "USD 10 / month (research-grade editorial)",
        scores: { "bb-reader": 2, "tcd-paid": 1 },
        allowedTiers: tiersUnderBudget(BUDGET_CEILINGS_USD.usd10),
      },
      {
        label: "USD 20 / month (research + advisory)",
        scores: { "bb-analyst": 2, "bb-reader": 1 },
        allowedTiers: tiersUnderBudget(BUDGET_CEILINGS_USD.usd20),
      },
      {
        label: "Institutional / project-scale",
        scores: { sponsor: 2, "bb-analyst": 1 },
        allowedTiers: tiersUnderBudget(BUDGET_CEILINGS_USD.institutional),
      },
    ],
  },
];


const trackEvent = (name: string, payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    if (typeof w.gtag === "function") w.gtag("event", name, payload);
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: name, ...payload });
  } catch {
    /* analytics never break UX */
  }
};

const TierFinder = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [currency] = useCurrency();

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  const recommendation = useMemo<{
    tier: LadderTier;
    stretchTier: LadderTier | null;
    diagnostics: {
      scores: Record<TierId, number>;
      budgetScores: Partial<Record<TierId, number>>;
      allowed: TierId[];
      ranked: [TierId, number][];
      idealId: TierId;
      winnerId: TierId;
      tieAtTop: boolean;
      budgetCappedIdeal: boolean;
      answerLabels: Record<string, string>;
    };
  } | null>(() => {
    if (!allAnswered) return null;

    // 1. Aggregate goal + role + budget scores across all tiers.
    const scores: Record<TierId, number> = {
      "tcd-free": 0,
      "tcd-paid": 0,
      "bb-reader": 0,
      "bb-analyst": 0,
      sponsor: 0,
    };
    let allowed: TierId[] = ALL_TIERS;
    let budgetScores: Partial<Record<TierId, number>> = {};
    const answerLabels: Record<string, string> = {};
    for (const q of QUESTIONS) {
      const idx = answers[q.id];
      const opt = q.options[idx];
      if (!opt) continue;
      answerLabels[q.id] = opt.label;
      for (const [tid, val] of Object.entries(opt.scores)) {
        scores[tid as TierId] += val ?? 0;
      }
      // Budget option carries the hard ceiling AND a tie-break signal.
      if (q.id === "budget") {
        if (opt.allowedTiers) allowed = opt.allowedTiers;
        budgetScores = opt.scores;
      }
    }

    // Tier order from cheapest to richest - used for deterministic
    // tie-breaks that prefer the higher tier when the visitor's stated
    // budget explicitly allows it. Without this, ties fall back to JS
    // object insertion order and we end up recommending the $1/mo plan
    // to someone who told us they would spend $20/mo.
    const tierRank: Record<TierId, number> = {
      "tcd-free": 0,
      "tcd-paid": 1,
      "bb-reader": 2,
      "bb-analyst": 3,
      sponsor: 4,
    };

    // 2. Rank tiers by total score, then by budget signal, then by
    //    ladder height. All deterministic.
    const ranked = (Object.entries(scores) as [TierId, number][]).sort(
      (a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        const ba = budgetScores[a[0]] ?? 0;
        const bb = budgetScores[b[0]] ?? 0;
        if (bb !== ba) return bb - ba;
        return tierRank[b[0]] - tierRank[a[0]];
      }
    );
    const idealId = ranked[0][0];
    const tieAtTop = ranked.length > 1 && ranked[0][1] === ranked[1][1];

    // 3. Apply budget ceiling. Pick the highest-scoring tier the visitor
    //    can actually afford.
    const allowedSet = new Set(allowed);
    const affordable = ranked.filter(([tid]) => allowedSet.has(tid));
    const winnerId: TierId = affordable.length > 0 ? affordable[0][0] : idealId;
    const budgetCappedIdeal = idealId !== winnerId && !allowedSet.has(idealId);

    const tier = TIERS.find((t) => t.id === winnerId) ?? null;
    if (!tier) return null;

    // 4. If the unconstrained pick is different and was excluded only by
    //    budget, surface it as an upgrade hint.
    const stretchTier = budgetCappedIdeal
      ? TIERS.find((t) => t.id === idealId) ?? null
      : null;

    return {
      tier,
      stretchTier,
      diagnostics: {
        scores,
        budgetScores,
        allowed,
        ranked,
        idealId,
        winnerId,
        tieAtTop,
        budgetCappedIdeal,
        answerLabels,
      },
    };
  }, [answers, allAnswered]);

  const recommendedTier = recommendation?.tier ?? null;
  const stretchTier = recommendation?.stretchTier ?? null;

  // Emit a structured analytics event whenever the recommendation engine
  // settles on a result. The payload captures inputs, raw tier scores,
  // budget tie-break signals and which rules fired so we can spot future
  // mismatches (e.g. budget-capped picks, top-of-ranking ties).
  const lastLoggedKey = useRef<string | null>(null);
  useEffect(() => {
    if (!recommendation) return;
    const { diagnostics, tier, stretchTier: stretch } = recommendation;
    const key = JSON.stringify({ a: answers, w: diagnostics.winnerId });
    if (lastLoggedKey.current === key) return;
    lastLoggedKey.current = key;
    trackEvent("tier_finder_recommendation", {
      surface: "insights_tier_finder",
      tier_id: tier.id,
      tier_name: tier.name,
      stretch_tier_id: stretch?.id ?? null,
      stretch_tier_name: stretch?.name ?? null,
      ideal_tier_id: diagnostics.idealId,
      tie_at_top: diagnostics.tieAtTop,
      budget_capped_ideal: diagnostics.budgetCappedIdeal,
      scores: diagnostics.scores,
      budget_signal: diagnostics.budgetScores,
      allowed_tiers: diagnostics.allowed,
      ranked: diagnostics.ranked.map(([id, score]) => ({ id, score })),
      answers: diagnostics.answerLabels,
    });
  }, [recommendation, answers]);


  const handleSelect = (qid: string, idx: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const handleReset = () => {
    setAnswers({});
    trackEvent("tier_finder_reset", { surface: "insights_tier_finder" });
  };

  const renderRecommendationCta = (tier: LadderTier) => {
    const label = formatTierCtaLabel(tier, currency);
    const onClick = () =>
      trackEvent("tier_finder_cta_click", {
        surface: "insights_tier_finder",
        tier_id: tier.id,
        tier_name: tier.name,
      });

    if (tier.cta.kind === "internal") {
      return (
        <Link
          to={tier.cta.href}
          onClick={onClick}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {label} →
        </Link>
      );
    }
    if (tier.cta.kind === "outbound") {
      return (
        <a
          href={tier.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            onClick();
            trackOutboundClick({
              location: "insights_tier_finder",
              org_name: tier.name,
              link_url: tier.cta.kind === "outbound" ? tier.cta.href : "",
            });
          }}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {label} →
        </a>
      );
    }
    return (
      <button
        type="button"
        onClick={() => {
          onClick();
          setSponsorOpen(true);
        }}
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        {label} →
      </button>
    );
  };

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  return (
    <section
      id="tier-finder"
      className="border-b border-border/60 bg-secondary/30 scroll-mt-32"
    >
      <div className="container mx-auto max-w-[1100px] px-6 md:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
              Find your plan
            </p>
            <h2 className="mt-2 text-section font-serif tracking-tight">
              Three questions. One recommended plan.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Tell us why you are here and what fits your budget. We will
              point you to the membership best suited to your needs.
            </p>
          </div>
          <CurrencyToggle surface="insights_tier_finder" />
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="h-[2px] bg-border/60 w-full overflow-hidden rounded-full">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {answeredCount} of {QUESTIONS.length} answered
          </p>
        </div>

        {/* Questions */}
        <div className="grid md:grid-cols-3 gap-5">
          {QUESTIONS.map((q, qi) => (
            <div
              key={q.id}
              className="rounded-lg border border-border bg-card p-4 flex flex-col"
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Step {qi + 1}
              </div>
              <h3 className="mt-1 font-serif text-[15px] leading-tight tracking-tight text-foreground">
                {q.prompt}
              </h3>
              <div className="mt-3 flex flex-col gap-1.5">
                {q.options.map((opt, oi) => {
                  const isSelected = answers[q.id] === oi;
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => handleSelect(q.id, oi)}
                      className={`text-left text-[12.5px] leading-snug px-3 py-2 rounded-md border transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background hover:border-primary/40 text-foreground/85"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        {recommendedTier && (
          <div className="mt-8 rounded-lg border border-primary/40 bg-primary/5 p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                  Recommended for you
                </p>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-serif text-[22px] tracking-tight text-foreground">
                    {recommendedTier.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {recommendedTier.ladder === "TCD"
                      ? "Substack"
                      : recommendedTier.ladder === "BB"
                      ? "Bombay Breed"
                      : "Sponsorship"}
                  </span>
                </div>
                <p className="mt-1 text-[13px] font-medium text-foreground/85">
                  <TierPriceText tier={recommendedTier} currency={currency} />
                </p>
                <p className="mt-2 text-[13px] text-muted-foreground leading-snug max-w-xl">
                  {recommendedTier.audience}
                </p>
                {stretchTier && (
                  <p className="mt-3 text-[12px] text-muted-foreground leading-snug max-w-xl border-t border-border/60 pt-3">
                    <span className="font-medium text-foreground">If your budget allowed,</span>{" "}
                    <Link
                      to="/intelligence/value-ladder"
                      className="text-primary hover:text-primary/80 underline underline-offset-2"
                    >
                      {stretchTier.name}
                    </Link>{" "}
                    ({" "}
                    <TierPriceText tier={stretchTier} currency={currency} />
                    {" "}) is the closer fit for what you described.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 md:items-end shrink-0">
                {renderRecommendationCta(recommendedTier)}
                <div className="flex items-center gap-3 text-[11px]">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    Start over
                  </button>
                  <Link
                    to="/intelligence/value-ladder"
                    className="text-primary hover:text-primary/80"
                  >
                    Compare all five →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SponsorInquiryDialog
        open={sponsorOpen}
        onOpenChange={setSponsorOpen}
        project="Sponsorship inquiry from Insights tier finder"
      />
    </section>
  );
};

export default TierFinder;
