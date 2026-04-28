import { useState } from "react";
import { Link } from "react-router-dom";
import { TIERS, formatTierPrice, formatTierCtaLabel, type LadderTier } from "@/intelligence/lib/valueLadder";
import { useCurrency } from "@/intelligence/lib/useCurrency";
import CurrencyToggle from "@/components/insights/CurrencyToggle";
import { trackOutboundClick } from "@/utils/outboundAnalytics";
import SponsorInquiryDialog from "@/components/SponsorInquiryDialog";

/**
 * Embedded 5-column ladder strip for the /insights page.
 * Condensed version of the canonical ValueLadder page hero - drives
 * Insights visitors into the right tier (or Substack, or sponsorship)
 * before they scroll into the publication grid.
 */

const trackCta = (tier: LadderTier) => {
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
      surface: "insights_hero",
    };
    if (typeof w.gtag === "function") w.gtag("event", "ladder_cta_click", payload);
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: "ladder_cta_click", ...payload });
  } catch {
    /* analytics never break UX */
  }
};

const LadderHero = () => {
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [currency] = useCurrency();

  return (
    <section className="border-y border-border/60 bg-background">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
              Choose how you read us
            </p>
            <h2 className="mt-2 text-section font-serif tracking-tight">
              Five ways in. Free to flagship.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              The Climate Desk on Substack is editorial. Bombay Breed
              Intelligence is research and advisory. Sponsorship underwrites
              specific reports. Pick the one that fits.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-3">
            <CurrencyToggle surface="insights_hero" />
            <Link
              to="/intelligence/value-ladder"
              className="text-sm font-medium text-primary hover:text-primary/80 whitespace-nowrap"
            >
              Compare all five →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {TIERS.map((tier) => {
            const isSponsor = tier.ladder === "B2B";
            const containerClass = `rounded-lg border p-4 flex flex-col h-full ${
              isSponsor
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-card"
            }`;

            const ctaInner = (
              <span className="mt-3 inline-flex items-center text-[12px] font-medium text-primary group-hover:underline underline-offset-4">
                {formatTierCtaLabel(tier, currency)} →
              </span>
            );

            const body = (
              <>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {tier.ladder === "TCD"
                    ? "Substack"
                    : tier.ladder === "BB"
                    ? "Bombay Breed"
                    : "B2B"}
                </div>
                <div className="mt-1 font-serif text-[16px] leading-tight tracking-tight text-foreground">
                  {tier.name}
                </div>
                <div className="mt-1 text-[12px] font-medium text-foreground/85">
                  {formatTierPrice(tier, currency)}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground leading-snug flex-1">
                  {tier.audience}
                </p>
                {ctaInner}
              </>
            );

            if (tier.cta.kind === "internal") {
              return (
                <Link
                  key={tier.id}
                  to={tier.cta.href}
                  onClick={() => trackCta(tier)}
                  className={`${containerClass} group hover:border-primary/50 transition-colors`}
                >
                  {body}
                </Link>
              );
            }
            if (tier.cta.kind === "outbound") {
              return (
                <a
                  key={tier.id}
                  href={tier.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackCta(tier);
                    trackOutboundClick({
                      location: "ladder_insights_hero",
                      org_name: tier.name,
                      link_url: tier.cta.kind === "outbound" ? tier.cta.href : "",
                    });
                  }}
                  className={`${containerClass} group hover:border-primary/50 transition-colors`}
                >
                  {body}
                </a>
              );
            }
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => {
                  trackCta(tier);
                  setSponsorOpen(true);
                }}
                className={`${containerClass} group text-left hover:border-primary/50 transition-colors`}
              >
                {body}
              </button>
            );
          })}
        </div>
      </div>

      <SponsorInquiryDialog
        open={sponsorOpen}
        onOpenChange={setSponsorOpen}
        project="Sponsorship inquiry from Insights ladder hero"
      />
    </section>
  );
};

export default LadderHero;
