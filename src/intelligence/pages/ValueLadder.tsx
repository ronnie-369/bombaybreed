import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  B2B: "bg-bb-gold/10 text-bb-gold",
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
    "inline-flex items-center justify-center h-11 px-5 rounded-none text-[13px] font-semibold tracking-wide transition w-full border";
  const styleClass =
    variant === "primary"
      ? "border-bb-near-black bg-bb-near-black text-white hover:bg-bb-paper hover:text-bb-near-black"
      : "border-bb-near-black bg-bb-paper text-bb-near-black hover:bg-bb-near-black hover:text-white";
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
      className={`group rounded-none border p-6 flex flex-col h-full transition hover:border-bb-near-black ${
        isSponsor
          ? "border-bb-near-black/30 bg-bb-paper"
          : "border-bb-border bg-bb-paper"
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
    <>
      <Header />
      <main className="bg-bb-paper text-bb-near-black">
      <Helmet>
        <title>Membership tiers - TCD Intelligence and Bombay Breed</title>
        <meta
          name="description"
          content="Five membership tiers across The Climate Desk, Bombay Breed Intelligence and project sponsorship. Prices, what each tier delivers, and how to choose."
        />
        <link rel="canonical" href="https://bombaybreed.com/intelligence/value-ladder" />
      </Helmet>

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-14">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href = "/insights";
            }
          }}
          className="inline-flex items-center gap-2 text-[12px] font-medium tracking-tight text-bb-gray hover:text-bb-near-black transition-colors mb-8"
          aria-label="Go back to previous page"
        >
          <span aria-hidden>←</span> Back
        </button>
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
            the <a href="#tier-bb-reader" onClick={(e) => smoothScrollToTier(e, "bb-reader")} className="text-bb-near-black font-medium underline decoration-bb-border underline-offset-4 hover:decoration-bb-near-black">Market Makers</a> tier.
          </p>
          <p>
            If you are an investor who needs to be sure about where to put
            your investments, the <a href="#tier-bb-analyst" onClick={(e) => smoothScrollToTier(e, "bb-analyst")} className="text-bb-near-black font-medium underline decoration-bb-border underline-offset-4 hover:decoration-bb-near-black">Investment Intelligence</a> tier is just for you.
          </p>
          <p>
            The <a href="#tier-sponsor" onClick={(e) => smoothScrollToTier(e, "sponsor")} className="text-bb-near-black font-medium underline decoration-bb-border underline-offset-4 hover:decoration-bb-near-black">Sponsor</a> tier exists for anyone looking to sponsor a study, validate a hypothesis or commission research.
          </p>
        </div>
        <div className="mt-8">
          <CurrencyToggle surface="value_ladder_hero" />
        </div>
      </section>

      {/* COMPARE THE FIVE TIERS - TABLE */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        <SectionLabel>Compare the five tiers</SectionLabel>

        {/* Desktop / tablet table */}
        <div className="mt-8 hidden md:block border border-bb-border rounded-none bg-bb-paper">
          <table className="w-full border-collapse text-left table-fixed">
            <colgroup>
              <col style={{ width: "180px" }} />
              {TIERS.map((tier) => (
                <col key={tier.id} style={{ width: `calc((100% - 180px) / ${TIERS.length})` }} />
              ))}
            </colgroup>
            <thead>
              <tr className="align-top h-px">
                <th className="w-[220px] p-5 text-[11px] uppercase tracking-[0.18em] text-bb-gray font-medium bg-bb-paper border-b border-bb-border h-full">
                  What you get
                </th>
                {TIERS.map((tier) => {
                  const isSponsor = tier.ladder === "B2B";
                  return (
                    <th
                      key={tier.id}
                      className="p-5 align-top border-l border-b border-bb-border h-full bg-bb-paper"
                    >
                      <div className="flex flex-col h-full min-h-full min-w-0 gap-1">
                        <span
                          className={`inline-block self-start text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded ${ladderBadgeClass[tier.ladder]}`}
                        >
                          {ladderLabel[tier.ladder]}
                        </span>
                        <a
                          href={`#tier-${tier.id}`}
                          onClick={(e) => smoothScrollToTier(e, tier.id)}
                          className="mt-3 font-serif text-[20px] tracking-tight text-bb-near-black leading-tight hover:underline decoration-bb-border underline-offset-4 break-words hyphens-auto"
                        >
                          {tier.name}
                        </a>
                        <div className="mt-2 text-[13px] text-bb-near-black/85 font-medium break-words">
                          <TierPriceText tier={tier} currency={currency} />
                        </div>
                        <p className="mt-2 text-[12px] text-bb-gray leading-snug break-words">
                          {tier.audience}
                        </p>
                        <div className="mt-auto pt-6 relative z-10">
                          <TierCta
                            tier={tier}
                            surface="comparison_table"
                            onSponsorClick={openSponsor}
                            currency={currency}
                          />
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {JOBS.map((job) => (
                <tr key={job.n} className="border-b border-bb-border/70 last:border-0 align-top">
                  <td className="p-5 text-[13px] leading-[1.5] text-bb-near-black">
                    <span className="text-bb-gold font-medium mr-1">{job.n}.</span>
                    {job.title}
                  </td>
                  {TIERS.map((tier) => {
                    const isSponsor = tier.ladder === "B2B";
                    const cell = job.byTier[tier.id];
                    const isNo = /^no\b/i.test(cell.trim());
                    return (
                      <td
                        key={tier.id}
                        className={`p-5 text-[12px] leading-[1.55] border-l border-bb-border ${
                          isSponsor ? "bg-bb-paper" : ""
                        } ${isNo ? "text-bb-gray/70" : "text-bb-near-black/85"}`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-bb-paper align-top">
                <td className="p-5 text-[11px] uppercase tracking-[0.18em] text-bb-gray font-medium">
                  Select your plan
                </td>
                {TIERS.map((tier) => {
                  const isSponsor = tier.ladder === "B2B";
                  return (
                    <td
                      key={tier.id}
                      className={`p-5 border-l border-bb-border ${
                        isSponsor ? "bg-bb-gold/10" : ""
                      }`}
                    >
                      <TierCta
                        tier={tier}
                        surface="comparison_table_footer"
                        onSponsorClick={openSponsor}
                        currency={currency}
                      />
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile fallback - stacked cards retain comparability via the explainers below */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              surface="canonical_overview_mobile"
              onSponsorClick={openSponsor}
              currency={currency}
            />
          ))}
        </div>

        <p className="mt-6 text-[12px] text-bb-gray max-w-2xl">
          Sponsor (B2B) is structurally different from the four subscriber
          tiers. Sponsors underwrite the production of specific reports that
          are then published to the entire subscriber base. A sponsor can also
          be (and frequently will be) an Investment Intelligence tier subscriber separately.
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
                className={`scroll-mt-24 rounded-none border p-7 md:p-10 bg-bb-paper ${
                  isSponsor
                    ? "border-bb-near-black/30"
                    : "border-bb-border"
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
                          <span className="text-bb-gold mr-2 font-medium">{j.n}.</span>
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
              Market Makers to Investment Intelligence is not a natural progression - it is a
              decision made on professional context (am I deploying capital? do
              I need named diligence?).
            </p>
            <Link
              to={INTERSECTION.ctaHref}
              onClick={() => trackLadderCta(toTier, "intersection")}
              className="mt-7 inline-flex items-center justify-center h-12 px-6 rounded-none border border-bb-near-black bg-bb-near-black text-bb-paper text-[14px] font-medium tracking-wide hover:bg-bb-paper hover:text-bb-near-black transition"
            >
              {INTERSECTION.ctaLabel}
            </Link>
          </div>
          <div className="border border-bb-border bg-bb-paper rounded-none p-6">
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
            <div className="mt-5 text-[12px] text-bb-near-black bg-bb-gold/10 border border-bb-gold/30 rounded px-3 py-2">
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
          that get published to the Market Makers and Investment Intelligence tiers with attribution
          credit. The deliverable is a published report, not private
          intelligence. Editorial independence is non-negotiable.
        </p>

        <div className="mt-10 grid gap-4">
          {SPONSOR_BANDS.map((band) => (
            <div
              key={band.engagement}
              className="rounded-none border border-bb-border bg-bb-paper p-6 grid md:grid-cols-[260px_180px_1fr] gap-4 md:gap-6"
            >
              <div>
                <div className="font-serif text-[18px] tracking-tight text-bb-near-black leading-snug">
                  {band.engagement}
                </div>
              </div>
              <div className="text-[14px] font-medium text-bb-gold">
                {band.price}
              </div>
              <p className="text-[13px] text-bb-gray leading-[1.65]">
                {band.scope}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.36em] text-bb-gold">
            Standard sponsor terms
          </h3>
          <ol className="mt-5 grid md:grid-cols-2 gap-x-10 gap-y-4">
            {SPONSOR_TERMS.map((term, i) => (
              <li key={i} className="text-[13px] text-bb-near-black/85 leading-[1.65] flex gap-3">
                <span className="text-bb-gold font-medium shrink-0">{i + 1}.</span>
                <span>{term}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={openSponsor}
            className="inline-flex items-center justify-center h-12 px-7 rounded-none border border-bb-near-black bg-transparent text-bb-near-black text-[14px] font-medium tracking-wide hover:bg-bb-near-black hover:text-bb-paper transition"
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

      {/* READER TESTIMONIALS - social proof before sponsorship CTA */}
      <section
        aria-labelledby="ladder-testimonials-heading"
        className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 border-t border-bb-border"
      >
        <SectionLabel>What readers say</SectionLabel>
        <h2 id="ladder-testimonials-heading" className="mt-6 font-serif font-normal tracking-[-0.02em] text-[28px] md:text-[36px] leading-[1.15] text-bb-near-black max-w-3xl">
          Quotes from readers
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[
            { quote: 'Brilliantly insightful.', name: 'Chris Sherwood', title: 'Chairman', org: 'Negative Emissions Platform', orgHref: 'https://www.negative-emissions.org/' },
            { quote: 'Wonderful writing. Deep analysis. Highly insightful.', name: 'Mitchell Beer', title: 'Founder', org: 'The Energy Mix', orgHref: 'https://www.theenergymix.com' },
            { quote: 'Excellent reporting from India.', name: 'Christian Haberli', title: 'Climate lawyer', org: 'EU' },
          ].map((q, i) => (
            <figure key={i} className="border border-bb-border bg-bb-paper p-6 flex flex-col">
              <blockquote className="font-serif text-[15px] text-bb-near-black leading-relaxed mb-5 flex-1 [text-wrap:pretty]">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="text-[12px] text-bb-gray border-t border-bb-border pt-4 leading-snug">
                <div className="font-semibold text-bb-near-black">{q.name}</div>
                <div>{q.title}</div>
                <div className="text-bb-gray">
                  {q.orgHref ? (
                    <a href={q.orgHref} target="_blank" rel="noopener noreferrer" className="hover:text-bb-near-black underline decoration-bb-border underline-offset-2">{q.org}</a>
                  ) : q.org}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>


      <SponsorInquiryDialog
        open={sponsorOpen}
        onOpenChange={setSponsorOpen}
        project="Sponsorship inquiry from value ladder page"
      />
      </main>
      <Footer />
    </>
  );
};

export default ValueLadder;
