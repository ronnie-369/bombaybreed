import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Status = "fixed" | "pending";

interface Finding {
  id: string;
  title: string;
  severity: "error" | "warn" | "info";
  status: Status;
  source: string;
  description: string;
  remediation: string;
}

const FINDINGS: Finding[] = [
  {
    id: "mock_sub_bypass",
    title: "Mock subscription RPC granted free premium access",
    severity: "error",
    status: "fixed",
    source: "agent_security",
    description:
      "tcd_mock_activate_subscription(uuid) was a SECURITY DEFINER function callable by any signed-in user. Razorpay being live, the mock function effectively gave free premium tier access.",
    remediation:
      "Dropped public.tcd_mock_activate_subscription(uuid) entirely via migration. Razorpay is the only path to activate a paid subscription.",
  },
  {
    id: "report_body_html_xss",
    title: "Premium report HTML rendered without sanitization",
    severity: "warn",
    status: "fixed",
    source: "agent_security",
    description:
      "ReportDetail.tsx rendered report.body_html via dangerouslySetInnerHTML without sanitization, creating a stored-XSS vector once the gated RPC was wired in.",
    remediation:
      "src/intelligence/pages/ReportDetail.tsx now fetches body via supabase.rpc('tcd_get_report_body') and renders through DOMPurify with a strict ALLOWED_TAGS / ALLOWED_ATTR allowlist (no script, no inline style, no event handlers).",
  },
  {
    id: "suggest_links_no_auth",
    title: "suggest-internal-links edge function exposed draft SEO pages",
    severity: "warn",
    status: "fixed",
    source: "agent_security",
    description:
      "supabase/functions/suggest-internal-links had no JWT verification or admin check. Any unauthenticated caller could read full draft seo_pages content via the service-role client.",
    remediation:
      "Function now requires a valid JWT, calls has_role(user_id, 'admin') before proceeding, and the currentPage lookup is restricted to is_published = true.",
  },
  {
    id: "premium_rpc_access_tightening",
    title: "Premium report RPCs callable by any authenticated user",
    severity: "warn",
    status: "fixed",
    source: "manual_review",
    description:
      "tcd_get_report_body, tcd_user_has_report_access, tcd_log_report_view and tcd_current_tier_rank were executable by anon and any authenticated caller.",
    remediation:
      "EXECUTE revoked from PUBLIC and anon, granted only to authenticated. tcd_log_report_view now also enforces tcd_user_has_report_access (admin or active paid tier) before logging a view.",
  },
  {
    id: "SUPA_anon_security_definer_function_executable",
    title: "SECURITY DEFINER functions callable without signing in",
    severity: "warn",
    status: "pending",
    source: "supabase_linter",
    description:
      "Supabase linter flags every SECURITY DEFINER function callable by the anon role. Most of these (has_role, get_current_user_role, unsubscribe_newsletter, update_updated_at_column) are intentionally callable - they self-gate or perform safe public operations.",
    remediation:
      "Reviewed: each remaining function either checks auth.uid() internally, is needed by RLS policies, or supports a public-by-design action (newsletter unsubscribe via single-use token). No change required - acknowledged risk.",
  },
  {
    id: "SUPA_authenticated_security_definer_function_executable",
    title: "SECURITY DEFINER functions callable by signed-in users",
    severity: "warn",
    status: "pending",
    source: "supabase_linter",
    description:
      "Linter flag for SECURITY DEFINER functions callable by the authenticated role. The premium-report functions intentionally remain authenticated-callable; they self-gate via tcd_user_has_report_access / has_role.",
    remediation:
      "Acknowledged. Functions self-gate; revoking from authenticated would break legitimate subscriber flows.",
  },
];

const sevColor = (s: Finding["severity"]) =>
  s === "error" ? "destructive" : s === "warn" ? "secondary" : "outline";

const AdminSecurity = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
      setLoading(false);
    })();
  }, [navigate]);

  if (loading) {
    return <div className="container mx-auto px-6 py-24 text-bb-gray">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-6 py-24">
        <h1 className="font-serif text-3xl text-bb-near-black">Not authorized.</h1>
      </div>
    );
  }

  const fixed = FINDINGS.filter((f) => f.status === "fixed").length;
  const pending = FINDINGS.length - fixed;

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <Helmet>
        <title>Security findings - Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <header className="mb-10">
        <p className="text-[11px] tracking-[0.18em] uppercase text-bb-gray">Admin / Security</p>
        <h1 className="mt-3 font-serif text-[40px] leading-[1.1] text-bb-near-black">
          Security findings
        </h1>
        <p className="mt-4 text-bb-gray text-[15px] leading-[1.6]">
          {fixed} fixed - {pending} pending. Each item lists the original finding and the exact
          remediation step taken.
        </p>
      </header>

      <div className="space-y-5">
        {FINDINGS.map((f) => (
          <Card key={f.id} className="border-bb-border">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <CardTitle className="font-serif text-[20px] text-bb-near-black">
                    {f.title}
                  </CardTitle>
                  <CardDescription className="text-[12px] text-bb-gray">
                    {f.source} - {f.id}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={sevColor(f.severity)} className="uppercase text-[10px] tracking-wider">
                    {f.severity}
                  </Badge>
                  <Badge
                    variant={f.status === "fixed" ? "default" : "outline"}
                    className={
                      f.status === "fixed"
                        ? "bg-emerald-600 hover:bg-emerald-600 text-white uppercase text-[10px] tracking-wider"
                        : "uppercase text-[10px] tracking-wider"
                    }
                  >
                    {f.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-[11px] tracking-[0.14em] uppercase text-bb-gray mb-1.5">
                  Finding
                </p>
                <p className="text-[14px] leading-[1.65] text-bb-near-black">{f.description}</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.14em] uppercase text-bb-gray mb-1.5">
                  Remediation
                </p>
                <p className="text-[14px] leading-[1.65] text-bb-near-black">{f.remediation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSecurity;
