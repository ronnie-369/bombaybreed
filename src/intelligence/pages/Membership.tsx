import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";

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

const Membership = () => {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>Membership tiers — TCD Intelligence</title>
      </Helmet>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-24 pb-12">
        <SectionLabel>Membership</SectionLabel>
        <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[44px] md:text-[56px] leading-[1.05] text-bb-near-black max-w-3xl">
          Three tiers. One editorial line.
        </h1>
        <p className="mt-6 text-[16px] leading-[1.7] text-bb-gray max-w-xl">
          Annual billing. All tiers include the published intelligence layer. Higher tiers add
          flagship reports, sector deep dives, and direct analyst access.
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24">
        {loading ? (
          <p className="text-[13px] text-bb-gray">Loading tiers...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => {
              const features = Array.isArray(tier.features) ? (tier.features as string[]) : [];
              const isFeatured = tier.slug === "professional";
              return (
                <div
                  key={tier.id}
                  className={`bg-white rounded-xl border p-8 flex flex-col ${
                    isFeatured ? "border-bb-slate" : "border-bb-border"
                  }`}
                >
                  {isFeatured && (
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
                  <ul className="mt-6 space-y-3 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex gap-3 text-[14px] text-bb-near-black/85 leading-snug">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-bb-copper shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/intelligence/signup?tier=${tier.slug}`}
                    className={`mt-8 inline-flex items-center justify-center h-12 px-6 rounded-[10px] text-[14px] font-medium transition ${
                      isFeatured
                        ? "bg-bb-slate text-bb-off-white hover:opacity-90"
                        : "bg-bb-off-white border border-bb-slate text-bb-slate hover:bg-bb-slate/5"
                    }`}
                  >
                    Choose {tier.name}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </IntelligenceLayout>
  );
};

export default Membership;
