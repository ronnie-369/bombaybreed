import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";
import {
  TIERS,
  JOBS,
  SPONSOR_BANDS,
  SPONSOR_TERMS,
  INTERSECTION,
  TIER_BY_ID,
  formatTierPrice,
  formatTierCtaLabel,
  formatIntersectionBody,
  formatIntersectionIntro,
  type LadderTier,
} from "../lib/valueLadder";
import { useCurrency } from "../lib/useCurrency";
import CurrencyToggle from "@/components/insights/CurrencyToggle";
import TierPriceText from "@/components/insights/TierPriceText";
import SponsorInquiryDialog from "@/components/SponsorInquiryDialog";
import { trackOutboundClick } from "@/utils/outboundAnalytics";

// Visual treatment per group. Sponsor (B2B) is tinted to mark it as a
// structurally different revenue line, not a subscriber tier (per memo).
const ladderBadgeClass: Record<LadderTier["ladder"], string> = {
  TCD: "bg-bb-near-black/5 text-bb-near-black",
  BB: "bg-bb-slate/10 text-bb-slate",
  B2B: "bg-bb-copper/10 text-bb-copper",
};

const ladderLabel: Record<LadderTier["ladder"], string> = {
  TCD: "The Climate Desk",
  BB: "Bombay Breed",
  B2B: "Sponsorship",
};

const smoothScrollToTier = (
  e: React.MouseEvent<HTMLAnchorElement>,
  tierId: string,
) => {
  if (typeof window === "undefined") return;
  const el = document.getElementById(`tier-${tierId}`);
  if (!el) return;
  e.preventDefault();
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
  // Update the URL hash without jumping
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, "", `#tier-${tierId}`);
  }
};

const trackLadderCta = (tier: LadderTier, surface: string) => {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    const payload = {
      tier_id: tier.id,
      tier_name: tier.name,
      ladder: tier.ladder,
      surface,
    };
    if (typeof w.gtag === "function") {
      w.gtag("event", "ladder_cta_click", payload);
    }
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: "ladder_cta_click", ...payload });
    }
  } catch {
    /* analytics never break UX */
  }
};

interface TierCtaProps {
  tier: LadderTier;
  surface: string;
  variant?: "primary" | "secondary";
  onSponsorClick: () => void;
  currency: "USD" | "INR";
}

const TierCta = ({ tier, surface, variant = "primary", onSponsorClick, currency }: TierCtaProps) => {
  const baseClass =
    "inline-flex items-center justify-center h-11 px-5 rounded-[10px] text-[13px] font-medium transition w-full";
  const styleClass =
    variant === "primary"
      ? "bg-bb-slate text-bb-off-white hover:opacity-90"
      : "bg-bb-off-white border border-bb-slate text-bb-slate hover:bg-bb-slate/5";
  const label = formatTierCtaLabel(tier, currency);

  if (tier.cta.kind === "internal") {
    return (
      <Link
        to={tier.cta.href}
        onClick={() => trackLadderCta(tier, surface)}
        className={`${baseClass} ${styleClass}`}
      >
        {label}
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
          trackLadderCta(tier, surface);
          trackOutboundClick({
            location: `ladder_${surface}`,
            org_name: tier.name,
            link_url: tier.cta.kind === "outbound" ? tier.cta.href : "",
          });
        }}
        className={`${baseClass} ${styleClass}`}
      >
        {label}
      </a>
    );
  }
  // dialog
  return (
    <button
      type="button"
      onClick={() => {
        trackLadderCta(tier, surface);
        onSponsorClick();
      }}
      className={`${baseClass} ${styleClass}`}
    >
      {label}
    </button>
  );
};

const TierCard = ({
  tier,
  surface,
  onSponsorClick,
  currency,
}: {
  tier: LadderTier;
  surface: string;
  onSponsorClick: () => void;
  currency: "USD" | "INR";
}) => {
  const isSponsor = tier.ladder === "B2B";
  const explainerHref = `#tier-${tier.id}`;
  return (
    <div
      className={`group rounded-xl border p-6 flex flex-col h-full transition hover:border-bb-near-black/40 hover:shadow-sm ${
        isSponsor
          ? "border-bb-copper/40 bg-bb-copper/5"
          : "border-bb-border bg-white"
      }`}
    >
      <a
        href={explainerHref}
        onClick={(e) => smoothScrollToTier(e, tier.id)}
        className="flex flex-col flex-1 cursor-pointer"
        aria-label={`Read more about ${tier.name}`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded ${ladderBadgeClass[tier.ladder]}`}
          >
            {ladderLabel[tier.ladder]}
          </span>
        </div>
        <div className="mt-3 font-serif text-[22px] tracking-tight text-bb-near-black leading-snug group-hover:underline decoration-bb-border underline-offset-4">
          {tier.name}
        </div>
        <div className="mt-1 text-[14px] text-bb-near-black/85 font-medium">
          <TierPriceText tier={tier} currency={currency} />
        </div>
        <p className="mt-3 text-[13px] text-bb-gray leading-relaxed flex-1">
          {tier.audience}
        </p>
        <span className="mt-4 text-[11px] uppercase tracking-[0.18em] text-bb-gray group-hover:text-bb-near-black">
          Read more ↓
        </span>
      </a>
      <div className="mt-5">
        <TierCta tier={tier} surface={surface} onSponsorClick={onSponsorClick} currency={currency} />
      </div>
    </div>
  );
};

const ValueLadder = () => {
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const openSponsor = () => setSponsorOpen(true);
  const [currency] = useCurrency();

  const fromTier = TIER_BY_ID[INTERSECTION.fromTierId];
  const toTier = TIER_BY_ID[INTERSECTION.toTierId];

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>Membership tiers - TCD Intelligence and Bombay Breed</title>
        <meta
          name="description"
          content="Five membership tiers across The Climate Desk, Bombay Breed Intelligence and project sponsorship. Prices, what each tier delivers, and how to choose."
        />
        <link rel="canonical" href="https://bombaybreed.com/intelligence/value-ladder" />
      </Helmet>

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-14">
        <SectionLabel>Membership tiers</SectionLabel>
        <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[44px] md:text-[60px] leading-[1.02] text-bb-near-black max-w-3xl">
          It will take all of us, to do this for all of us.
        </h1>
        <div className="mt-6 space-y-4 text-[16px] leading-[1.7] text-bb-gray max-w-2xl">
          <p>
            We have something for everyone. Whether you are a student looking
            to join climate action, or a media professional aiming to
            increase your access to knowledge, <a href="#tier-tcd-free" onClick={(e) => smoothScrollToTier(e, "tcd-free")} className="text-bb-near-black underline decoration-bb-border underline-offset-4 hover:decoration-bb-near-black">The Climate Desk</a> has answers for everyone.
          </p>
          <p>
            If you are a climate enthusiast looking for information on how
            to increase your earning potential or gain more access to
            projects, the <a href="#tier-tcd-paid" onClick={(e) => smoothScrollToTier(e, "tcd-paid")} className="text-bb-near-black font-medium underline decoration-bb-border underline-offset-4 hover:decoration-bb-near-black">Enthusiasts</a> tier is for you.
          </p>
          <p>
            If you are working in the market - a developer, enterprise,
            supplier or service provider - you will want to be subscribed to
            the <a href="#tier-bb-reader" onClick={(e) => smoothScrollToTier(e, "bb-reader")} className="text-bb-near-black font-medium underline decoration-bb-border underline-offset-4 hover:decoration-bb-near-black">Market Readers</a> tier.
          </p>
          <p>
            If you are an investor who needs to be sure about where to put
            your investments, the <a href="#tier-bb-analyst" onClick={(e) => smoothScrollToTier(e, "bb-analyst")} className="text-bb-near-black font-medium underline decoration-bb-border underline-offset-4 hover:decoration-bb-near-black">Investor Readers</a> tier is just for you.
          </p>
          <p>
            The <a href="#tier-sponsor" onClick={(e) => smoothScrollToTier(e, "sponsor")} className="text-bb-near-black font-medium underline decoration-bb-border underline-offset-4 hover:decoration-bb-near-black">Sponsor</a> tier exists for anyone looking to sponsor a study, validate a hypothesis or commission research.
          </p>
        </div>
        <div className="mt-8">
          <CurrencyToggle surface="value_ladder_hero" />
        </div>
      </section>

      {/* FIVE TIERS AT A GLANCE */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        <SectionLabel>The five tiers at a glance</SectionLabel>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              surface="canonical_overview"
              onSponsorClick={openSponsor}
              currency={currency}
            />
          ))}
        </div>
        <p className="mt-6 text-[12px] text-bb-gray max-w-2xl">
          Sponsor (B2B) is structurally different from the four subscriber
          tiers. Sponsors underwrite the production of specific reports that
          are then published to the entire subscriber base. A sponsor can also
          be (and frequently will be) an Investor Readers tier subscriber separately.
        </p>
      </section>

      {/* PER-TIER EXPLAINERS - anchor targets for the hero hyperlinks and the cards above */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-4">
        <div className="space-y-12">
          {TIERS.map((tier) => {
            const jobsForTier = JOBS
              .map((j) => ({ n: j.n, title: j.title, body: j.byTier[tier.id] }))
              .filter((j) => j.body && !/^no$/i.test(j.body.trim()));
            const isSponsor = tier.ladder === "B2B";
            return (
              <article
                key={tier.id}
                id={`tier-${tier.id}`}
                className={`scroll-mt-24 rounded-2xl border p-7 md:p-10 ${
                  isSponsor
                    ? "border-bb-copper/40 bg-bb-copper/5"
                    : "border-bb-border bg-white"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded ${ladderBadgeClass[tier.ladder]}`}>
                    {ladderLabel[tier.ladder]}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-bb-gray">
                    Tier explainer
                  </span>
                </div>
                <h3 className="mt-4 font-serif font-normal tracking-[-0.02em] text-[28px] md:text-[36px] leading-[1.1] text-bb-near-black">
                  {tier.name}
                </h3>
                <div className="mt-2 text-[15px] text-bb-near-black/85 font-medium">
                  <TierPriceText tier={tier} currency={currency} />
                </div>
                <div className="mt-6 grid md:grid-cols-[1.4fr_1fr] gap-10">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-bb-gray">Who it is for</p>
                    <p className="mt-2 text-[15px] leading-[1.7] text-bb-near-black/90">
                      {tier.audience}
                    </p>
                    <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-bb-gray">Why it exists</p>
                    <p className="mt-2 text-[15px] leading-[1.7] text-bb-near-black/90">
                      {tier.strategicRole}
                    </p>
                    <div className="mt-7 max-w-xs">
                      <TierCta
                        tier={tier}
                        surface="tier_explainer"
                        onSponsorClick={openSponsor}
                        currency={currency}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-bb-gray">What you get</p>
                    <ul className="mt-3 space-y-3">
                      {jobsForTier.map((j) => (
                        <li key={j.n} className="text-[13px] leading-[1.6] text-bb-gray">
                          <span className="text-bb-copper mr-2 font-medium">{j.n}.</span>
                          <span className="text-bb-near-black/90">{j.title}.</span>{" "}
                          {j.body}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* JTBD COMPARISON */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 border-t border-bb-border">
        <SectionLabel>Jobs to be done</SectionLabel>
        <h2 className="mt-6 font-serif font-normal tracking-[-0.02em] text-[32px] md:text-[40px] leading-[1.1] text-bb-near-black max-w-3xl">
          Eight jobs. Five tiers. Pick the column that fits.
        </h2>
        <p className="mt-4 text-[14px] leading-[1.7] text-bb-gray max-w-2xl">
          This comparison is structured around outcomes subscribers want to
          achieve, not features they pay for. The differentiation between
          tiers is in how completely each tier delivers on the job.
        </p>

        {/* Desktop: full table */}
        <div className="mt-10 hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse text-[12px] leading-[1.55]">
            <thead>
              <tr className="border-b border-bb-border">
                <th className="text-left align-bottom py-3 pr-4 w-[260px] text-[11px] uppercase tracking-[0.18em] text-bb-gray font-medium">
                  Job to be done
                </th>
                {TIERS.map((t) => (
                  <th
                    key={t.id}
                    className={`text-left align-bottom py-3 px-3 text-[11px] uppercase tracking-[0.18em] font-medium ${
                      t.ladder === "B2B" ? "text-bb-copper" : "text-bb-near-black"
                    }`}
                  >
                    <div>{t.name}</div>
                    <div className="text-[10px] normal-case tracking-normal text-bb-gray font-normal mt-1">
                      <TierPriceText tier={t} currency={currency} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {JOBS.map((job, idx) => (
                <tr
                  key={job.n}
                  className={idx % 2 === 0 ? "bg-bb-off-white/40" : "bg-white"}
                >
                  <td className="align-top py-4 pr-4 text-bb-near-black font-medium">
                    <span className="text-bb-copper mr-2">{job.n}.</span>
                    {job.title}
                  </td>
                  {TIERS.map((t) => (
                    <td
                      key={t.id}
                      className={`align-top py-4 px-3 text-bb-gray ${
                        t.ladder === "B2B" ? "bg-bb-copper/5" : ""
                      }`}
                    >
                      {job.byTier[t.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / tablet: per-tier accordions */}
        <div className="mt-10 lg:hidden space-y-3">
          {TIERS.map((t) => (
            <details
              key={t.id}
              className={`rounded-xl border p-5 ${
                t.ladder === "B2B"
                  ? "border-bb-copper/40 bg-bb-copper/5"
                  : "border-bb-border bg-white"
              }`}
            >
              <summary className="cursor-pointer flex items-baseline justify-between gap-4">
                <span className="font-serif text-[18px] tracking-tight text-bb-near-black">
                  {t.name}
                </span>
                <TierPriceText tier={t} currency={currency} className="text-[12px] text-bb-gray" />
              </summary>
              <ul className="mt-4 space-y-3">
                {JOBS.map((job) => (
                  <li key={job.n} className="text-[13px] leading-[1.6]">
                    <div className="text-bb-near-black font-medium">
                      <span className="text-bb-copper mr-2">{job.n}.</span>
                      {job.title}
                    </div>
                    <div className="mt-1 text-bb-gray">{job.byTier[t.id]}</div>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      {/* INTERSECTION */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 border-t border-bb-border">
        <SectionLabel>The intersection</SectionLabel>
        <div className="mt-6 grid md:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <div>
            <h2 className="font-serif font-normal tracking-[-0.02em] text-[28px] md:text-[36px] leading-[1.1] text-bb-near-black">
              {INTERSECTION.headline}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-bb-gray max-w-xl">
              {formatIntersectionBody(currency)}
            </p>
            <p className="mt-4 text-[13px] text-bb-gray italic max-w-xl">
              Beyond this intersection, the tiers run on parallel tracks.
              Market Readers to Investor Readers is not a natural progression - it is a
              decision made on professional context (am I deploying capital? do
              I need named diligence?).
            </p>
            <Link
              to={INTERSECTION.ctaHref}
              onClick={() => trackLadderCta(toTier, "intersection")}
              className="mt-7 inline-flex items-center justify-center h-12 px-6 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition"
            >
              {INTERSECTION.ctaLabel}
            </Link>
          </div>
          <div className="border border-bb-border bg-white rounded-xl p-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-bb-gray">
              From
            </div>
            <div className="mt-1 font-serif text-[20px] tracking-tight text-bb-near-black">
              {fromTier.name}
            </div>
            <TierPriceText tier={fromTier} currency={currency} className="text-[13px] text-bb-gray" />
            <div className="my-4 h-px bg-bb-border" />
            <div className="text-[11px] uppercase tracking-[0.18em] text-bb-gray">
              To
            </div>
            <div className="mt-1 font-serif text-[20px] tracking-tight text-bb-near-black">
              {toTier.name}
            </div>
            <TierPriceText tier={toTier} currency={currency} className="text-[13px] text-bb-gray" />
            <div className="mt-5 text-[12px] text-bb-near-black bg-bb-copper/10 border border-bb-copper/30 rounded px-3 py-2">
              {formatIntersectionIntro(currency)}
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORSHIP */}
      <section
        id="sponsor"
        className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 border-t border-bb-border scroll-mt-24"
      >
        <SectionLabel>Sponsorship (B2B)</SectionLabel>
        <h2 className="mt-6 font-serif font-normal tracking-[-0.02em] text-[32px] md:text-[40px] leading-[1.1] text-bb-near-black max-w-3xl">
          Underwrite a report. Reach the whole subscriber base.
        </h2>
        <p className="mt-4 text-[15px] leading-[1.7] text-bb-gray max-w-2xl">
          Sponsors do not subscribe. They commission specific research outputs
          that get published to the Market Readers and Investor Readers tiers with attribution
          credit. The deliverable is a published report, not private
          intelligence. Editorial independence is non-negotiable.
        </p>

        <div className="mt-10 grid gap-4">
          {SPONSOR_BANDS.map((band) => (
            <div
              key={band.engagement}
              className="rounded-xl border border-bb-border bg-white p-6 grid md:grid-cols-[260px_180px_1fr] gap-4 md:gap-6"
            >
              <div>
                <div className="font-serif text-[18px] tracking-tight text-bb-near-black leading-snug">
                  {band.engagement}
                </div>
              </div>
              <div className="text-[14px] font-medium text-bb-copper">
                {band.price}
              </div>
              <p className="text-[13px] text-bb-gray leading-[1.65]">
                {band.scope}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.36em] text-bb-copper">
            Standard sponsor terms
          </h3>
          <ol className="mt-5 grid md:grid-cols-2 gap-x-10 gap-y-4">
            {SPONSOR_TERMS.map((term, i) => (
              <li key={i} className="text-[13px] text-bb-near-black/85 leading-[1.65] flex gap-3">
                <span className="text-bb-copper font-medium shrink-0">{i + 1}.</span>
                <span>{term}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={openSponsor}
            className="inline-flex items-center justify-center h-12 px-7 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition"
          >
            Inquire about sponsorship
          </button>
          <p className="mt-3 text-[12px] text-bb-gray">
            Or write directly to{" "}
            <a
              href="mailto:theresa.ronnie@bombaybreed.com"
              className="underline underline-offset-2 hover:text-bb-near-black"
            >
              theresa.ronnie@bombaybreed.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* DATA TRANSPARENCY */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 border-t border-bb-border">
        <details className="group">
          <summary className="cursor-pointer flex items-baseline justify-between gap-6 list-none">
            <div>
              <SectionLabel>How we source the intelligence</SectionLabel>
              <h2 className="mt-4 font-serif font-normal tracking-[-0.02em] text-[26px] md:text-[32px] leading-[1.15] text-bb-near-black max-w-3xl">
                Realistic-now data sources, plus the wishlist for scale.
              </h2>
            </div>
            <span className="text-[12px] text-bb-gray group-open:hidden">Show</span>
            <span className="text-[12px] text-bb-gray hidden group-open:inline">Hide</span>
          </summary>
          <div className="mt-8 grid md:grid-cols-2 gap-8 text-[13px] leading-[1.7] text-bb-gray">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bb-near-black mb-3">
                Realistic-now (months 0-12)
              </div>
              <p>
                Public government sources (BEE, MoEFCC, the Indian Carbon Market
                Portal launched March 2026, CEA grid data, SEBI BRSR filings,
                PIB), specialty India and global newsletters (Carbon Pulse,
                ClimateWire, Argus India), the proprietary{" "}
                <em>indiacarbon.climatewise.today</em> database of CCTS-obligated
                entities, voluntary registry data (Verra, Gold Standard,
                Puro.earth), and curated outputs from CEEW, TERI, and Climate
                Action Tracker. Total cost approximately USD 8K to 15K per year.
              </p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bb-near-black mb-3">
                Wishlist (200+ paid subscribers)
              </div>
              <p>
                S&amp;P Global Platts Carbon, Bloomberg NEF, Refinitiv Carbon,
                ICIS Carbon and Energy Transition, Wood Mackenzie Energy
                Transition Service, MSCI Climate Action, S&amp;P Global
                Sustainable1. Institutional pricing only, individually USD 15K
                to 150K per seat per year. The platform grows into this layer
                as the paid subscriber base supports it; it is not what the
                product begins with.
              </p>
            </div>
          </div>
          <p className="mt-6 text-[12px] italic text-bb-gray max-w-3xl">
            Strategic note: the platform does not need wishlist sources in
            phase one. What it needs is the editorial discipline and curation
            skill to make realistic-now sources genuinely valuable. If those
            are right, subscribers will pay; the data layer can be deepened as
            the subscriber base supports it.
          </p>
        </details>
      </section>

      <SponsorInquiryDialog
        open={sponsorOpen}
        onOpenChange={setSponsorOpen}
        project="Sponsorship inquiry from value ladder page"
      />
    </IntelligenceLayout>
  );
};

export default ValueLadder;
