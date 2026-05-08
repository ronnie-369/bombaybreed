import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
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

const ALLOWED_TAGS = [
  "h1","h2","h3","h4","h5","h6","p","br","hr","strong","em","b","i","u","s",
  "ul","ol","li","blockquote","pre","code","a","img","figure","figcaption",
  "table","thead","tbody","tfoot","tr","th","td","span","div"
];
const ALLOWED_ATTR = ["href","title","alt","src","colspan","rowspan","class"];

const ReportDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [bodyHtml, setBodyHtml] = useState<string>("");
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const [{ data: r }, { data: access }] = await Promise.all([
        supabase
          .from("tcd_reports")
          .select("id,slug,title,summary,category,required_tier_rank,published_at,reading_minutes")
          .eq("slug", slug)
          .eq("is_published", true)
          .maybeSingle(),
        supabase.rpc("tcd_user_has_report_access", { _report_slug: slug }),
      ]);
      setReport(r as Report | null);
      setHasAccess(!!access);
      if (access) {
        supabase.rpc("tcd_log_report_view", { _report_slug: slug });
        const { data: body } = await supabase.rpc("tcd_get_report_body", { _slug: slug });
        setBodyHtml(typeof body === "string" ? body : "");
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <IntelligenceLayout>
        <div className="max-w-2xl mx-auto px-6 pt-24">
          <p className="text-[13px] text-bb-gray">Loading...</p>
        </div>
      </IntelligenceLayout>
    );
  }

  if (!report) {
    return (
      <IntelligenceLayout>
        <div className="max-w-2xl mx-auto px-6 pt-24">
          <h1 className="font-serif text-[32px] text-bb-near-black">Report not found.</h1>
          <Link to="/intelligence/dashboard" className="text-bb-slate underline mt-6 inline-block">
            Back to dashboard
          </Link>
        </div>
      </IntelligenceLayout>
    );
  }

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>{report.title} — TCD Intelligence</title>
      </Helmet>

      <article className="max-w-3xl mx-auto px-6 pt-20 pb-24">
        <SectionLabel>{report.category ?? "Report"}</SectionLabel>
        <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[40px] md:text-[52px] leading-[1.05] text-bb-near-black">
          {report.title}
        </h1>
        {report.summary && (
          <p className="mt-6 text-[18px] leading-[1.6] text-bb-gray">{report.summary}</p>
        )}
        <div className="mt-6 flex items-center gap-4 text-[12px] text-bb-gray">
          {report.published_at && (
            <span>
              {new Date(report.published_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
          {report.reading_minutes && <span>{report.reading_minutes} min read</span>}
        </div>

        <hr className="my-10 border-t border-bb-border" />

        {hasAccess ? (
          <div
            className="prose prose-lg max-w-none font-serif text-bb-near-black"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bodyHtml, { ALLOWED_TAGS, ALLOWED_ATTR, FORBID_ATTR: ["style","onerror","onload","onclick"] }) }}
          />
        ) : (
          <div className="bg-white border border-bb-border rounded-xl p-8 text-center">
            <SectionLabel>Locked</SectionLabel>
            <h2 className="mt-4 font-serif text-[24px] text-bb-near-black">
              This report needs a higher tier.
            </h2>
            <p className="mt-3 text-[14px] text-bb-gray">
              Upgrade to unlock. Required tier rank: {report.required_tier_rank}.
            </p>
            <Link
              to="/intelligence/membership"
              className="mt-6 inline-flex items-center h-11 px-6 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition"
            >
              See membership tiers
            </Link>
          </div>
        )}
      </article>
    </IntelligenceLayout>
  );
};

export default ReportDetail;
