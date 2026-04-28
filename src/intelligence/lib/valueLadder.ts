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
  /** Display price, e.g. "Free", "USD 5 / mo", "INR 10,000 / mo". */
  priceLabel: string;
  /** One-line audience description (verbatim from spreadsheet Sheet 2). */
  audience: string;
  /** Strategic role - shown in the canonical page only. */
  strategicRole: string;
  /** Primary CTA from this tier card. */
  cta: LadderCta;
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
    name: "Paid Substack",
    ladder: "TCD",
    priceLabel: "USD 10 / mo",
    audience:
      "Professional readers, sustainability teams, journalists who want deeper reports than the free Substack",
    strategicRole:
      "Capture professional reader willingness-to-pay; funnel to BB",
    cta: {
      kind: "outbound",
      label: "Upgrade - USD 10 / mo",
      href: SUBSTACK_PAID_URL,
    },
  },
  {
    id: "bb-reader",
    name: "Market Readers",
    ladder: "BB",
    priceLabel: "USD 100 / mo (~INR 8,500)",
    audience:
      "Consultants, sustainability leads, fund analysts tracking the Indian carbon transition",
    strategicRole: "Editorial intelligence at research-grade discipline",
    cta: {
      kind: "internal",
      label: "Join Market Readers",
      href: "/intelligence/signup?tier=foundational&ref=ladder",
    },
  },
  {
    id: "bb-analyst",
    name: "Investor Readers",
    ladder: "BB",
    priceLabel: "USD 500 / mo (~INR 42,500)",
    audience:
      "Climate VCs, PE running diligence, family offices, DFI staff",
    strategicRole:
      "Research and advisory product for capital deployers",
    cta: {
      kind: "internal",
      label: "Join Investor Readers",
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
    cta: { kind: "dialog", label: "Inquire about sponsorship", dialog: "sponsor" },
  },
];

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
      "bb-analyst": "Yes, including all Reader content",
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
        "Yes. Reader content plus sectoral cuts on the four CCTS-obligated sectoral reports per year",
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
        "Yes. One thirty-minute portfolio consultation per quarter direct with Theresa, on the record between us",
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
  "Distribution. The deliverable is published to the entire subscriber base (Reader and Analyst tiers). Sponsor does not receive exclusivity.",
  "Timeline. Sectoral and regional reports run on a 10-12 week production cycle; custom reports on a 12-16 week cycle.",
  "Payment. 50 percent on commission, 50 percent on delivery. Payments via direct invoice, GST-compliant.",
  "Cancellation. Either party may cancel in writing; sponsor pays for work completed to that point at standard rates.",
  "Conflict of interest. Sponsor relationships are disclosed in the published deliverable in accordance with editorial standards.",
];

/**
 * The single explicit upgrade path between the two ladders.
 * Paid Substack -> Reader, with a 3-month introductory discount.
 */
export const INTERSECTION = {
  fromTierId: "tcd-paid" as const,
  toTierId: "bb-reader" as const,
  headline: "From Paid Substack to Reader",
  body: "The single explicit upgrade path between the two ladders. Any paid Substack subscriber receives a discount on the first three months of Reader tier (INR 7,500 per month for the first quarter, then INR 10,000 per month thereafter). Substack subscription is paused or refunded for the duration of the discount.",
  ctaLabel: "Upgrade to Reader",
  ctaHref: "/intelligence/signup?tier=foundational&ref=intersection",
};
