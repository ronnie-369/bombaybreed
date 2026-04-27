import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";

interface Report {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  category: string | null;
  required_tier_rank: number;
  published_at: string | null;
  reading_minutes: number | null;
}

const Dashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [tierRank, setTierRank] = useState<number>(0);
  const [tierName, setTierName] = useState<string>("Pending");
  const [fullName, setFullName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: reportsData }, { data: rankRow }, { data: subData }] = await Promise.all([
        supabase
          .from("tcd_reports")
          .select("id, slug, title, summary, category, required_tier_rank, published_at, reading_minutes")
          .eq("is_published", true)
          .order("published_at", { ascending: false }),
        supabase.rpc("tcd_current_tier_rank"),
        supabase.from("tcd_subscribers").select("full_name").maybeSingle(),
      ]);

      setReports((reportsData as Report[]) ?? []);
      const rank = (rankRow as number | null) ?? 0;
      setTierRank(rank);
      setFullName(subData?.full_name ?? "");

      if (rank > 0) {
        const { data: tierRow } = await supabase
          .from("tcd_tiers")
          .select("name")
          .eq("rank", rank)
          .maybeSingle();
        if (tierRow?.name) setTierName(tierRow.name);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>Dashboard — TCD Intelligence</title>
      </Helmet>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-12">
        <SectionLabel>Subscriber dashboard</SectionLabel>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-serif font-normal tracking-[-0.025em] text-[36px] md:text-[44px] leading-[1.1] text-bb-near-black">
            {fullName ? `Welcome back, ${fullName.split(" ")[0]}.` : "Your reading library."}
          </h1>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.3em] text-bb-gray">Current tier</div>
            <div className="font-serif text-[20px] text-bb-near-black mt-1">{tierName}</div>
          </div>
        </div>
      </section>

      <hr className="border-t border-bb-border max-w-[1200px] mx-auto" />

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-12">
        <h2 className="font-serif text-[24px] tracking-tight text-bb-near-black mb-8">Published reports</h2>

        {loading ? (
          <p className="text-[13px] text-bb-gray">Loading...</p>
        ) : reports.length === 0 ? (
          <p className="text-[13px] text-bb-gray">No reports published yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {reports.map((r) => {
              const accessible = tierRank >= r.required_tier_rank;
              return (
                <Link
                  key={r.id}
                  to={`/intelligence/reports/${r.slug}`}
                  className="bg-white border border-bb-border rounded-xl p-7 hover:border-bb-slate transition group"
                >
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-bb-copper">
                    <span>{r.category ?? "Report"}</span>
                    <span className="text-bb-gray">
                      {accessible ? "Open" : `Tier ${r.required_tier_rank}+`}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-[20px] tracking-tight text-bb-near-black leading-snug group-hover:text-bb-slate transition">
                    {r.title}
                  </h3>
                  {r.summary && (
                    <p className="mt-3 text-[14px] text-bb-gray leading-relaxed line-clamp-3">
                      {r.summary}
                    </p>
                  )}
                  {r.reading_minutes && (
                    <p className="mt-4 text-[12px] text-bb-gray">{r.reading_minutes} min read</p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </IntelligenceLayout>
  );
};

export default Dashboard;
