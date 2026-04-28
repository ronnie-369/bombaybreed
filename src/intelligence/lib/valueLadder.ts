/**
 * Value Ladder - single source of truth.
 *
 * Encodes the strategic memo "Two ladders, one intersection point, plus a
 * parallel B2B revenue line." (BB_Strategic_Memo_Value_Ladder, April 2026)
 * and the accompanying comparison spreadsheet.
 *
 * All visitor-facing surfaces (canonical /intelligence/value-ladder page,
 * /insights ladder hero, sticky pill, PremiumAccessLounge, Membership) read
 * from this file. Update here = update everywhere.
 */

export type LadderId = "TCD" | "BB" | "B2B";

// Substack URLs - REPLACE with the live The Climate Desk URLs when confirmed.
// Free and paid signup land on the same Substack page; the paid CTA links to
// the explicit "subscribe" route which surfaces the paid plan.
export const SUBSTACK_FREE_URL = "https://theclimatedesk.earth";
export const SUBSTACK_PAID_URL = "https://theclimatedesk.earth/subscribe";

export type LadderCta =
  | { kind: "internal"; label: string; href: string }
  | { kind: "outbound"; label: string; href: string }
  | { kind: "dialog"; label: string; dialog: "sponsor" };

export interface LadderTier {
  id: "tcd-free" | "tcd-paid" | "bb-reader" | "bb-analyst" | "sponsor";
  /** Short badge name used everywhere in UI. */
  name: string;
  /** Which of the two ladders (or B2B) this tier belongs to. */
  ladder: LadderId;
  /**
   * Static fallback price label. Prefer `pricing` (when present) +
   * `formatTierPrice(tier, currency)` so the visitor's currency toggle wins.
   */
  priceLabel: string;
  /**
   * Structured price for currency-toggle surfaces. Optional - some tiers
   * (Free, Sponsor B2B) have no toggle and rely on `priceLabel` directly.
   * Numbers are rounded "advertised" figures, not precise FX conversions.
   */
  pricing?: {
    usd: number; // monthly USD
    inr: number; // monthly INR (advertised round figure)
    period: "mo" | "yr";
  };
  /** One-line audience description (verbatim from spreadsheet Sheet 2). */
  audience: string;
  /** Strategic role - shown in the canonical page only. */
  strategicRole: string;
  /** Primary CTA from this tier card. */
  cta: LadderCta;
  /**
   * Optional CTA label template. `{price}` is replaced with the
   * currency-aware short price (e.g. "USD 10 / mo" or "INR 850 / mo").
   * If omitted, `cta.label` is used as-is.
   */
  ctaLabelTemplate?: string;
}

export const TIERS: LadderTier[] = [
  {
    id: "tcd-free",
    name: "Free Substack",
    ladder: "TCD",
    priceLabel: "Free",
    audience: "Anyone interested in Indian climate news",
    strategicRole: "Top of funnel; brand and discovery",
    cta: {
      kind: "outbound",
      label: "Subscribe free",
      href: SUBSTACK_FREE_URL,
    },
  },
  {
    id: "tcd-paid",
    name: "Enthusiasts",
    ladder: "TCD",
    priceLabel: "USD 1 / mo",
    pricing: { usd: 1, inr: 100, period: "mo" },
    audience:
      "Professional readers, sustainability teams, journalists who want deeper reports than the free Substack",
    strategicRole:
      "Capture professional reader willingness-to-pay; funnel to BB",
    cta: {
      kind: "internal",
      label: "Upgrade - USD 1 / mo",
      href: "/intelligence/signup?tier=enthusiasts&billing=monthly&ref=ladder",
    },
    ctaLabelTemplate: "Upgrade - {price}",
  },
  {
    id: "bb-reader",
    name: "Market Makers",
    ladder: "BB",
    priceLabel: "INR 8,500 / mo (USD 100)",
    pricing: { usd: 100, inr: 8500, period: "mo" },
    audience:
      "Developers, verification agencies, service providers, consultants and advisors working in the Indian carbon market",
    strategicRole: "Editorial intelligence at research-grade discipline",
    cta: {
      kind: "internal",
      label: "Join Market Makers",
      href: "/intelligence/signup?tier=foundational&ref=ladder",
    },
  },
  {
    id: "bb-analyst",
    name: "Investment Intelligence",
    ladder: "BB",
    priceLabel: "INR 42,500 / mo (USD 500)",
    pricing: { usd: 500, inr: 42500, period: "mo" },
    audience:
      "Climate VCs, PE running diligence, family offices, DFI staff",
    strategicRole:
      "Research and advisory product for capital deployers",
    cta: {
      kind: "internal",
      label: "Join Investment Intelligence",
      href: "/intelligence/signup?tier=professional&ref=ladder",
    },
  },
  {
    id: "sponsor",
    name: "Sponsor",
    ladder: "B2B",
    priceLabel: "INR 15L - 1Cr+",
    audience: "Corporates and institutions underwriting research",
    strategicRole:
      "Underwrite editorial production; credibility and revenue",
    cta: {
      kind: "internal",
      label: "See current and bespoke projects",
      href: "/intelligence/value-ladder#sponsor",
    },
  },
];

// ----------------------------------------------------------------------
// Currency formatting
// ----------------------------------------------------------------------

export type Currency = "USD" | "INR";

const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

/**
 * Primary formatter used by every currency-toggle surface.
 * - If a tier has structured `pricing`, render that in the active currency
 *   with the alternate currency in brackets.
 * - Otherwise fall back to the static `priceLabel` (Free, Sponsor band).
 */
export const formatTierPrice = (
  tier: LadderTier,
  currency: Currency
): string => {
  const p = tier.pricing;
  if (!p) return tier.priceLabel;
  if (currency === "USD") {
    return `USD ${fmtUSD(p.usd)} / ${p.period} (INR ${fmtINR(p.inr)})`;
  }
  return `INR ${fmtINR(p.inr)} / ${p.period} (USD ${fmtUSD(p.usd)})`;
};

/**
 * Structured price parts so UI can render the secondary currency in a
 * smaller / muted style. `secondary` is null for tiers without `pricing`
 * (Free, Sponsor band) - render `primary` only.
 */
export const getTierPriceParts = (
  tier: LadderTier,
  currency: Currency
): { primary: string; secondary: string | null } => {
  const p = tier.pricing;
  if (!p) return { primary: tier.priceLabel, secondary: null };
  if (currency === "USD") {
    return {
      primary: `USD ${fmtUSD(p.usd)} / ${p.period}`,
      secondary: `INR ${fmtINR(p.inr)}`,
    };
  }
  return {
    primary: `INR ${fmtINR(p.inr)} / ${p.period}`,
    secondary: `USD ${fmtUSD(p.usd)}`,
  };
};

/** Compact variant for CTA buttons - no bracket. */
export const formatTierPriceShort = (
  tier: LadderTier,
  currency: Currency
): string => {
  const p = tier.pricing;
  if (!p) return tier.priceLabel;
  return currency === "USD"
    ? `USD ${fmtUSD(p.usd)} / ${p.period}`
    : `INR ${fmtINR(p.inr)} / ${p.period}`;
};

/** CTA label with optional `{price}` template substitution. */
export const formatTierCtaLabel = (
  tier: LadderTier,
  currency: Currency
): string => {
  if (tier.ctaLabelTemplate && tier.pricing) {
    return tier.ctaLabelTemplate.replace(
      "{price}",
      formatTierPriceShort(tier, currency)
    );
  }
  return tier.cta.label;
};

export const TIER_BY_ID: Record<LadderTier["id"], LadderTier> =
  Object.fromEntries(TIERS.map((t) => [t.id, t])) as Record<
    LadderTier["id"],
    LadderTier
  >;

/**
 * Eight jobs to be done - the heart of the comparison (Sheet 3 of the
 * comparison spreadsheet, verbatim language). Each cell describes how
 * completely that tier delivers on the job.
 */
export interface Job {
  n: number;
  title: string;
  byTier: Record<LadderTier["id"], string>;
}

export const JOBS: Job[] = [
  {
    n: 1,
    title: "Stay aware of major Indian carbon market developments",
    byTier: {
      "tcd-free":
        "Yes. 8 to 12 articles per month on the major news, with editorial framing",
      "tcd-paid":
        "Yes, plus 2 to 3 paid-only deep articles per month",
      "bb-reader":
        "Yes, plus deeper analytical commentary and curated context",
      "bb-analyst":
        "Yes, plus the same intelligence integrated into structured research",
      sponsor: "Sponsored report content visible to all subscribers",
    },
  },
  {
    n: 2,
    title:
      "Read deeper analytical commentary on carbon, energy transition, climate finance",
    byTier: {
      "tcd-free": "Limited; first 500 words of gated commentary then paywall",
      "tcd-paid": "Yes, full access to all editorial commentary",
      "bb-reader":
        "Yes, with editorial discipline that matches institutional publishing",
      "bb-analyst": "Yes, including all Market Makers content",
      sponsor: "Receives sponsored research findings before publication",
    },
  },
  {
    n: 3,
    title:
      "Track CCTS price discovery, registry data, sectoral compliance trends",
    byTier: {
      "tcd-free": "No",
      "tcd-paid": "Limited: occasional summary articles, not structured data",
      "bb-reader":
        "Yes. Quarterly outlooks on Indian carbon asset classes covering CCTS, VCM credits, registry exposure",
      "bb-analyst":
        "Yes. Market Makers content plus sectoral cuts on the four CCTS-obligated sectoral reports per year",
      sponsor:
        "Sponsored sectoral or regional analysis on a specific compliance area",
    },
  },
  {
    n: 4,
    title:
      "Get sector-specific intelligence on high-emission Indian industrial sectors",
    byTier: {
      "tcd-free": "No",
      "tcd-paid": "No",
      "bb-reader":
        "Limited: editorial commentary on sector developments, not structured research",
      "bb-analyst":
        "Yes. Four sectoral intelligence reports per year, 30 to 50 page briefs",
      sponsor:
        "Underwrites a specific sectoral report with attribution credit",
    },
  },
  {
    n: 5,
    title:
      "Get regional ground truth on Indian states for capital deployment decisions",
    byTier: {
      "tcd-free": "No",
      "tcd-paid": "No",
      "bb-reader":
        "Limited: editorial coverage of major regional developments",
      "bb-analyst":
        "Yes. Four regional analyses per year, investment-grade ground truth at panchayat and watershed level",
      sponsor:
        "Underwrites a specific regional analysis with attribution credit",
    },
  },
  {
    n: 6,
    title:
      "Run pre-investment diligence on a specific Indian climate developer or strategy",
    byTier: {
      "tcd-free": "No",
      "tcd-paid": "No",
      "bb-reader": "No (research is editorial, not advisory)",
      "bb-analyst":
        "Yes. One thirty-minute consultation per quarter, on portfolio considerations.",
      sponsor:
        "Working-session call with Theresa to discuss sponsored research findings",
    },
  },
  {
    n: 7,
    title:
      "Access subject experts and field practitioners through podcast conversations",
    byTier: {
      "tcd-free":
        "Yes. Full audio and video on YouTube and Spotify, edited transcripts on Substack",
      "tcd-paid":
        "Yes, plus quarterly compilation with editorial framing across episodes",
      "bb-reader":
        "Yes, plus top-line summarised notes with quoted highlights for institutional reading",
      "bb-analyst":
        "Yes, plus podcast intelligence integrated into the quarterly outlook reports",
      sponsor:
        "Sponsored reports may include commissioned expert conversations",
    },
  },
  {
    n: 8,
    title:
      "Support the production of independent research on the Indian carbon transition",
    byTier: {
      "tcd-free":
        "Indirect. Sharing and word-of-mouth amplifies the platform",
      "tcd-paid": "Yes, as a paying subscriber",
      "bb-reader":
        "Yes, as a paying subscriber to research-grade editorial",
      "bb-analyst":
        "Yes, as a paying subscriber to research and advisory",
      sponsor:
        "Yes, as a direct underwriter of specific research outputs",
    },
  },
];

/** Sponsor pricing bands (Sheet 7, verbatim). */
export interface SponsorBand {
  engagement: string;
  price: string;
  scope: string;
}

export const SPONSOR_BANDS: SponsorBand[] = [
  {
    engagement: "Sectoral report sponsorship",
    price: "INR 15-30 Lakh per report",
    scope:
      "Underwrites the production of one of the four annual sectoral reports on a CCTS-obligated industrial sector. Range depends on sector complexity, primary research depth, and whether sponsor wants a co-branded executive summary in addition to the published report. Sponsor receives attribution credit and a working-session call.",
  },
  {
    engagement: "Regional analysis sponsorship",
    price: "INR 20-35 Lakh per analysis",
    scope:
      "Underwrites the production of one of the four annual regional analyses on an Indian state or geography. Range reflects ground-truth fieldwork costs which vary substantially by geography and accessibility. Sponsor receives attribution credit and a working-session call.",
  },
  {
    engagement: "Custom commissioned report",
    price: "INR 25 Lakh starting figure",
    scope:
      "A research output not part of the standing editorial calendar, commissioned to sponsor specifications. Final pricing scoped per engagement. Closest to traditional consulting; deliverable is published to the subscriber base with attribution.",
  },
  {
    engagement: "Annual editorial calendar sponsorship",
    price: "INR 1 Crore+ per year",
    scope:
      "Sponsor underwrites multiple reports across the year with first-look access on each, named on every output produced under the sponsorship, with quarterly working-session reviews. The institutional-tier engagement, negotiated per sponsor.",
  },
  {
    engagement: "Research project sponsorship (one-off, non-published)",
    price: "INR 35 Lakh+ starting figure",
    scope:
      "Custom research delivered privately to the sponsor without publication. Higher pricing reflects the loss of subscriber-base distribution. Available only when subject is genuinely sensitive.",
  },
];

/** Standard sponsor terms (Sheet 7, verbatim - the eight numbered terms). */
export const SPONSOR_TERMS: string[] = [
  "Editorial independence. Sponsor pays for production; sponsor does not direct editorial conclusions. This is non-negotiable.",
  "Attribution. Sponsor receives non-promotional credit on the published output: 'This report was produced with research support from [Sponsor Name].'",
  "Working-session call. Sponsor receives one working-session call before publication to discuss findings, plus one team briefing after publication.",
  "Distribution. The deliverable is published to the entire subscriber base (Market Makers and Investment Intelligence tiers). Sponsor does not receive exclusivity.",
  "Timeline. Sectoral and regional reports run on a 10-12 week production cycle; custom reports on a 12-16 week cycle.",
  "Payment. 50 percent on commission, 50 percent on delivery. Payments via direct invoice, GST-compliant.",
  "Cancellation. Either party may cancel in writing; sponsor pays for work completed to that point at standard rates.",
  "Conflict of interest. Sponsor relationships are disclosed in the published deliverable in accordance with editorial standards.",
];

/**
 * The single explicit upgrade path between the two ladders.
 * Enthusiasts -> Market Makers, with a 3-month introductory discount.
 */
export const INTERSECTION = {
  fromTierId: "tcd-paid" as const,
  toTierId: "bb-reader" as const,
  headline: "From Enthusiasts to Market Makers",
  /**
   * Body template - `{intro}` and `{regular}` are substituted at render time
   * with the discounted-quarter rate and the regular rate in the visitor's
   * active currency. See `formatIntersectionBody`.
   */
  body: "The single explicit upgrade path between the two tracks. Any Enthusiasts subscriber receives a discount on the first three months of the Market Makers tier ({intro} for the first quarter, then {regular} thereafter). The Enthusiasts subscription is paused or refunded for the duration of the discount.",
  introPricing: { usd: 75, inr: 6500, period: "mo" as const },
  ctaLabel: "Upgrade to Market Makers",
  ctaHref: "/intelligence/signup?tier=foundational&ref=intersection",
};

/** Render INTERSECTION.body with prices localised to the visitor's currency. */
export const formatIntersectionBody = (currency: Currency): string => {
  const to = TIER_BY_ID[INTERSECTION.toTierId];
  const intro = INTERSECTION.introPricing;
  const introLabel =
    currency === "USD"
      ? `USD ${fmtUSD(intro.usd)} / ${intro.period}`
      : `INR ${fmtINR(intro.inr)} / ${intro.period}`;
  const regularLabel = formatTierPriceShort(to, currency);
  return INTERSECTION.body
    .replace("{intro}", introLabel)
    .replace("{regular}", regularLabel);
};

/** Compact label for the "first quarter at ..." callout. */
export const formatIntersectionIntro = (currency: Currency): string => {
  const intro = INTERSECTION.introPricing;
  return currency === "USD"
    ? `First quarter at USD ${fmtUSD(intro.usd)} / mo`
    : `First quarter at INR ${fmtINR(intro.inr)} / mo`;
};
