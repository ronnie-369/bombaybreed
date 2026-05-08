import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";
import { formatIntlBracket } from "../lib/currency";
import { prefetchMembershipFunnel, ctaHoverPrefetch } from "../lib/routePrefetch";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface Tier {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price_inr: number;
  billing_period: string;
  rank: number;
  features: string[] | unknown;
  sort_order: number;
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

// Public-facing tier slugs (used in deep-links from the Premium Access Lounge
// and other marketing surfaces) mapped onto the canonical DB slugs.
const TIER_ALIAS: Record<string, string> = {
  "industry-reader": "foundational",
  "analyst-lens": "professional",
  // identity passthroughs so DB slugs in the URL also work
  foundational: "foundational",
  professional: "professional",
};

const TierCard = ({
  tier,
  featured,
  ctaHref,
  ctaLabel,
}: {
  tier: Tier;
  featured: boolean;
  ctaHref: string;
  ctaLabel: string;
}) => {
  const features = Array.isArray(tier.features) ? (tier.features as string[]) : [];
  return (
    <SpotlightCard
      className={`bg-white rounded-xl border p-8 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${
        featured ? "border-bb-slate" : "border-bb-border"
      }`}
      spotlightColor={featured ? "rgba(197, 160, 89, 0.28)" : "rgba(197, 160, 89, 0.18)"}
    >
      {featured && (
        <div className="self-start mb-4 px-2 py-1 rounded text-[10px] uppercase tracking-[0.2em] text-bb-off-white bg-bb-slate">
          Most chosen
        </div>
      )}
      <div className="text-[11px] font-semibold uppercase tracking-[0.36em] text-bb-copper">
        {tier.name}
      </div>
      <p className="mt-3 text-[14px] text-bb-gray leading-snug">{tier.tagline}</p>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-serif text-[40px] tracking-tight text-bb-near-black">
          {formatPrice(Number(tier.price_inr))}
        </span>
        <span className="text-[13px] text-bb-gray">/ {tier.billing_period}</span>
      </div>
      <div className="mt-2 text-[12px] text-bb-gray">
        ({formatIntlBracket(Number(tier.price_inr))})
      </div>
      <p className="mt-2 text-[12px] text-bb-gray leading-snug">
        Billed monthly. Cancel anytime.
      </p>
      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex gap-3 text-[14px] text-bb-near-black/85 leading-snug">
            <span className="mt-[7px] w-1 h-1 rounded-full bg-bb-copper shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        to={ctaHref}
        {...ctaHoverPrefetch}
        className={`cta-gold-underline mt-8 inline-flex items-center justify-center h-12 px-6 rounded-[10px] text-[14px] font-medium transition ${
          featured
            ? "bg-bb-slate text-bb-off-white hover:opacity-90"
            : "bg-bb-off-white border border-bb-slate text-bb-slate hover:bg-bb-slate/5"
        }`}
      >
        {ctaLabel}
      </Link>
    </SpotlightCard>
  );
};

const Membership = () => {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [params] = useSearchParams();
  const inactiveNotice = params.get("reason") === "inactive";

  const rawTier = params.get("tier");
  const variant = params.get("v");
  const ref = params.get("ref");
  const focusedSlug = rawTier ? TIER_ALIAS[rawTier.toLowerCase()] ?? null : null;

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("tcd_tiers")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      setTiers((data as Tier[]) ?? []);
      setLoading(false);
    })();
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
    });
    // Warm Signup + Checkout chunks while the user reads the page.
    prefetchMembershipFunnel();
  }, []);

  const focusedTier = useMemo(
    () => (focusedSlug ? tiers.find((t) => t.slug === focusedSlug) ?? null : null),
    [tiers, focusedSlug]
  );
  const otherTiers = useMemo(
    () => (focusedTier ? tiers.filter((t) => t.id !== focusedTier.id) : []),
    [tiers, focusedTier]
  );

  // Build a CTA href that preserves attribution params (v, ref) for analytics.
  const buildCtaHref = (slug: string, base: "signup" | "checkout") => {
    const qs = new URLSearchParams({ tier: slug });
    if (variant) qs.set("v", variant);
    if (ref) qs.set("ref", ref);
    return `/intelligence/${base}?${qs.toString()}`;
  };

  const isFocused = !!focusedTier;
  const focusedDestination = hasSession ? "checkout" : "signup";
  const pageTitle = focusedTier
    ? `${focusedTier.name} membership — TCD Intelligence`
    : "Membership tiers — TCD Intelligence";

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-24 pb-12">
        <SectionLabel>Membership</SectionLabel>
        {isFocused && focusedTier ? (
          <>
            <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[44px] md:text-[56px] leading-[1.05] text-bb-near-black max-w-3xl">
              {focusedTier.name}.
              <span className="block text-bb-gray mt-2">
                {focusedTier.tagline ?? "Working research, on the day of release."}
              </span>
            </h1>
            <p className="mt-6 text-[16px] leading-[1.7] text-bb-gray max-w-xl">
              You picked this tier from the Premium Access Lounge. Confirm it below and continue
              to {hasSession ? "checkout" : "create your account"}.
            </p>
          </>
        ) : (
          <>
            <p className="mt-6 text-[16px] leading-[1.7] text-bb-gray max-w-xl">
              Tier 1 Market Makers and Tier 2 Investment Intelligence share the same
              editorial spine. Pricing is shown in INR with the USD equivalent
              alongside; billed monthly, cancel anytime. For a side-by-side
              comparison against the Substack tiers and Sponsorship, see the{" "}
              <Link
                to="/intelligence/value-ladder"
                className="text-bb-near-black underline decoration-bb-border underline-offset-4 hover:decoration-bb-near-black"
              >
                full value ladder
              </Link>
              .
            </p>
          </>
        )}
        {inactiveNotice && (
          <div className="mt-8 max-w-xl border border-bb-copper/40 bg-bb-copper/5 rounded-xl p-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-bb-copper">Membership required</p>
            <p className="mt-2 text-[14px] text-bb-near-black leading-relaxed">
              That area is reserved for active members. Choose a tier below to continue.
            </p>
          </div>
        )}
      </section>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24">
        {loading ? (
          <p className="text-[13px] text-bb-gray">Loading tiers...</p>
        ) : isFocused && focusedTier ? (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <TierCard
                  tier={focusedTier}
                  featured
                  ctaHref={buildCtaHref(focusedTier.slug, focusedDestination)}
                  ctaLabel={hasSession ? `Continue to checkout` : `Continue with ${focusedTier.name}`}
                />
              </div>
              <aside className="bg-white rounded-xl border border-bb-border p-8 flex flex-col">
                <div className="text-[11px] font-semibold uppercase tracking-[0.36em] text-bb-copper">
                  Need to compare?
                </div>
                <p className="mt-3 text-[14px] text-bb-gray leading-snug">
                  All three tiers share the same editorial line. Higher tiers add flagship reports
                  and direct analyst access.
                </p>
                <a
                  href="#all-tiers"
                  className="mt-6 inline-flex items-center justify-center h-11 px-5 rounded-[10px] text-[13px] font-medium bg-bb-off-white border border-bb-slate text-bb-slate hover:bg-bb-slate/5 transition"
                >
                  Compare all tiers
                </a>
              </aside>
            </div>

            {otherTiers.length > 0 && (
              <div id="all-tiers" className="mt-20 pt-12 border-t border-bb-border">
                <SectionLabel>Other tiers</SectionLabel>
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  {otherTiers.map((tier) => (
                    <TierCard
                      key={tier.id}
                      tier={tier}
                      featured={false}
                      ctaHref={buildCtaHref(tier.slug, "signup")}
                      ctaLabel={`Choose ${tier.name}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tiers.map((tier) => (
              <TierCard
                key={tier.id}
                tier={tier}
                featured={tier.slug === "professional"}
                ctaHref={`/intelligence/signup?tier=${tier.slug}`}
                ctaLabel={`Choose ${tier.name}`}
              />
            ))}
          </div>
        )}
      </section>
    </IntelligenceLayout>
  );
};

export default Membership;
