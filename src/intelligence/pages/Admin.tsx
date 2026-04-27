import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";

interface SubscriberRow {
  id: string;
  email: string;
  full_name: string;
  company: string | null;
  created_at: string;
}

interface SubscriptionRow {
  id: string;
  status: string;
  starts_at: string | null;
  expires_at: string | null;
  created_at: string;
  subscriber_id: string;
  tcd_tiers: { name: string; rank: number } | null;
  tcd_subscribers: { full_name: string; email: string; company: string | null } | null;
}

interface PaymentRow {
  id: string;
  amount_inr: number;
  status: string;
  created_at: string;
  subscription_id: string;
}

interface ViewRow {
  id: string;
  viewed_at: string;
  tcd_reports: { title: string; slug: string } | null;
  tcd_subscribers: { full_name: string; email: string } | null;
}

const Admin = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState<"subs" | "subscribers" | "payments" | "views">("subs");
  const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [views, setViews] = useState<ViewRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [subsR, subscribersR, paysR, viewsR] = await Promise.all([
      supabase
        .from("tcd_subscriptions")
        .select(
          "id, status, starts_at, expires_at, created_at, subscriber_id, tcd_tiers(name, rank), tcd_subscribers(full_name, email, company)"
        )
        .order("created_at", { ascending: false }),
      supabase.from("tcd_subscribers").select("id, email, full_name, company, created_at").order("created_at", { ascending: false }),
      supabase.from("tcd_payments").select("id, amount_inr, status, created_at, subscription_id").order("created_at", { ascending: false }),
      supabase
        .from("tcd_report_views")
        .select("id, viewed_at, tcd_reports(title, slug), tcd_subscribers(full_name, email)")
        .order("viewed_at", { ascending: false })
        .limit(200),
    ]);

    setSubscriptions((subsR.data as unknown as SubscriptionRow[]) ?? []);
    setSubscribers((subscribersR.data as SubscriberRow[]) ?? []);
    setPayments((paysR.data as PaymentRow[]) ?? []);
    setViews((viewsR.data as unknown as ViewRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const activate = async (id: string) => {
    const now = new Date();
    const expires = new Date(now);
    expires.setFullYear(expires.getFullYear() + 1);
    const { error } = await supabase
      .from("tcd_subscriptions")
      .update({ status: "active", starts_at: now.toISOString(), expires_at: expires.toISOString() })
      .eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Activated" });
      load();
    }
  };

  const setStatus = async (id: string, status: string) => {
    const patch: Record<string, unknown> = { status };
    if (status === "cancelled") patch.cancelled_at = new Date().toISOString();
    const { error } = await supabase.from("tcd_subscriptions").update(patch).eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else load();
  };

  const markPaymentPaid = async (id: string) => {
    const { error } = await supabase
      .from("tcd_payments")
      .update({ status: "succeeded", paid_at: new Date().toISOString() })
      .eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else load();
  };

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>Admin — TCD Intelligence</title>
      </Helmet>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 pb-24">
        <SectionLabel>Admin dashboard</SectionLabel>
        <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[36px] md:text-[44px] leading-[1.1] text-bb-near-black">
          TCD Intelligence operations
        </h1>

        <div className="mt-10 flex gap-2 border-b border-bb-border">
          {([
            ["subs", "Subscriptions"],
            ["subscribers", "Subscribers"],
            ["payments", "Payments"],
            ["views", "Report views"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 h-11 text-[13px] font-medium border-b-2 -mb-px transition ${
                tab === key
                  ? "border-bb-slate text-bb-near-black"
                  : "border-transparent text-bb-gray hover:text-bb-near-black"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading && <p className="mt-8 text-[13px] text-bb-gray">Loading...</p>}

        {!loading && tab === "subs" && (
          <div className="mt-8 bg-white border border-bb-border rounded-xl divide-y divide-bb-border">
            {subscriptions.length === 0 && <p className="p-6 text-[13px] text-bb-gray">No subscriptions.</p>}
            {subscriptions.map((s) => (
              <div key={s.id} className="p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-[14px] text-bb-near-black">
                    {s.tcd_subscribers?.full_name ?? "(no name)"} · {s.tcd_subscribers?.email}
                  </div>
                  <div className="text-[12px] text-bb-gray mt-1">
                    {s.tcd_tiers?.name} · {s.tcd_subscribers?.company ?? "—"} · created{" "}
                    {new Date(s.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] px-2 py-1 rounded border border-bb-border text-bb-gray">
                    {s.status}
                  </span>
                  {s.status !== "active" && (
                    <button
                      onClick={() => activate(s.id)}
                      className="px-3 h-9 rounded-[10px] bg-bb-slate text-bb-off-white text-[12px] font-medium hover:opacity-90"
                    >
                      Activate
                    </button>
                  )}
                  {s.status === "active" && (
                    <>
                      <button
                        onClick={() => setStatus(s.id, "paused")}
                        className="px-3 h-9 rounded-[10px] border border-bb-border text-bb-near-black text-[12px] font-medium hover:bg-bb-off-white"
                      >
                        Pause
                      </button>
                      <button
                        onClick={() => setStatus(s.id, "cancelled")}
                        className="px-3 h-9 rounded-[10px] border border-bb-border text-bb-near-black text-[12px] font-medium hover:bg-bb-off-white"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && tab === "subscribers" && (
          <div className="mt-8 bg-white border border-bb-border rounded-xl divide-y divide-bb-border">
            {subscribers.map((s) => (
              <div key={s.id} className="p-6">
                <div className="font-medium text-[14px] text-bb-near-black">{s.full_name}</div>
                <div className="text-[12px] text-bb-gray mt-1">
                  {s.email} · {s.company ?? "—"} · joined {new Date(s.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && tab === "payments" && (
          <div className="mt-8 bg-white border border-bb-border rounded-xl divide-y divide-bb-border">
            {payments.length === 0 && <p className="p-6 text-[13px] text-bb-gray">No payments.</p>}
            {payments.map((p) => (
              <div key={p.id} className="p-6 flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-[14px] text-bb-near-black">
                    ₹{Number(p.amount_inr).toLocaleString("en-IN")}
                  </div>
                  <div className="text-[12px] text-bb-gray mt-1">
                    {new Date(p.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] px-2 py-1 rounded border border-bb-border text-bb-gray">
                    {p.status}
                  </span>
                  {p.status !== "succeeded" && (
                    <button
                      onClick={() => markPaymentPaid(p.id)}
                      className="px-3 h-9 rounded-[10px] bg-bb-slate text-bb-off-white text-[12px] font-medium hover:opacity-90"
                    >
                      Mark paid
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && tab === "views" && (
          <div className="mt-8 bg-white border border-bb-border rounded-xl divide-y divide-bb-border">
            {views.length === 0 && <p className="p-6 text-[13px] text-bb-gray">No reads logged yet.</p>}
            {views.map((v) => (
              <div key={v.id} className="p-6 flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-[14px] text-bb-near-black">
                    {v.tcd_reports?.title ?? "—"}
                  </div>
                  <div className="text-[12px] text-bb-gray mt-1">
                    {v.tcd_subscribers?.full_name ?? "—"} · {v.tcd_subscribers?.email ?? "—"}
                  </div>
                </div>
                <div className="text-[12px] text-bb-gray">
                  {new Date(v.viewed_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </IntelligenceLayout>
  );
};

export default Admin;
