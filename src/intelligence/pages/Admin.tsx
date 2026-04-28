import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";

interface SubscriberRow {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  company: string | null;
  created_at: string;
}

interface TierRow {
  id: string;
  slug: string;
  name: string;
  rank: number;
  sort_order: number;
}

interface SubscriptionRow {
  id: string;
  status: string;
  starts_at: string | null;
  expires_at: string | null;
  created_at: string;
  subscriber_id: string;
  tier_id: string;
  tcd_tiers: { id: string; name: string; rank: number; slug: string } | null;
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

interface OrderAttemptRow {
  id: string;
  created_at: string;
  user_id: string | null;
  plan_id: string | null;
  billing_cycle: string | null;
  amount_inr: number | null;
  currency: string | null;
  order_id: string | null;
  status: string;
  error_message: string | null;
  request_metadata: Record<string, unknown> | null;
}

const TAB_DEFS = [
  ["members", "Members"],
  ["subs", "Subscriptions"],
  ["payments", "Payments"],
  ["views", "Report views"],
  ["orders", "Order attempts"],
] as const;

type TabKey = (typeof TAB_DEFS)[number][0];

const oneYearISO = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString();
};

const Admin = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState<TabKey>("members");
  const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [views, setViews] = useState<ViewRow[]>([]);
  const [tiers, setTiers] = useState<TierRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [memberFilter, setMemberFilter] = useState("");
  const [orders, setOrders] = useState<OrderAttemptRow[]>([]);
  const [orderPlanFilter, setOrderPlanFilter] = useState("");
  const [orderCycleFilter, setOrderCycleFilter] = useState<string>("all");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [orderFromDate, setOrderFromDate] = useState<string>("");
  const [orderToDate, setOrderToDate] = useState<string>("");

  const load = async () => {
    setLoading(true);
    const [subsR, subscribersR, paysR, viewsR, tiersR, ordersR] = await Promise.all([
      supabase
        .from("tcd_subscriptions")
        .select(
          "id, status, starts_at, expires_at, created_at, subscriber_id, tier_id, tcd_tiers(id, name, rank, slug), tcd_subscribers(full_name, email, company)"
        )
        .order("created_at", { ascending: false }),
      supabase
        .from("tcd_subscribers")
        .select("id, user_id, email, full_name, company, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("tcd_payments")
        .select("id, amount_inr, status, created_at, subscription_id")
        .order("created_at", { ascending: false }),
      supabase
        .from("tcd_report_views")
        .select("id, viewed_at, tcd_reports(title, slug), tcd_subscribers(full_name, email)")
        .order("viewed_at", { ascending: false })
        .limit(200),
      supabase
        .from("tcd_tiers")
        .select("id, slug, name, rank, sort_order")
        .eq("is_active", true)
        .order("sort_order"),
    ]);

    setSubscriptions((subsR.data as unknown as SubscriptionRow[]) ?? []);
    setSubscribers((subscribersR.data as SubscriberRow[]) ?? []);
    setPayments((paysR.data as PaymentRow[]) ?? []);
    setViews((viewsR.data as unknown as ViewRow[]) ?? []);
    setTiers((tiersR.data as TierRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  // Index: subscriber_id -> their currently-active subscription (if any)
  const activeBySubscriber = useMemo(() => {
    const map = new Map<string, SubscriptionRow>();
    for (const s of subscriptions) {
      if (s.status !== "active") continue;
      const existing = map.get(s.subscriber_id);
      if (!existing || new Date(s.created_at) > new Date(existing.created_at)) {
        map.set(s.subscriber_id, s);
      }
    }
    return map;
  }, [subscriptions]);

  const filteredMembers = useMemo(() => {
    const q = memberFilter.trim().toLowerCase();
    if (!q) return subscribers;
    return subscribers.filter(
      (s) =>
        s.email.toLowerCase().includes(q) ||
        s.full_name.toLowerCase().includes(q) ||
        (s.company ?? "").toLowerCase().includes(q)
    );
  }, [subscribers, memberFilter]);

  const setMemberTier = async (subscriber: SubscriberRow, tierId: string) => {
    setPendingId(subscriber.id);
    const current = activeBySubscriber.get(subscriber.id);

    if (tierId === "none") {
      if (!current) {
        setPendingId(null);
        return;
      }
      const { error } = await supabase
        .from("tcd_subscriptions")
        .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
        .eq("id", current.id);
      if (error) {
        toast({ title: "Failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Membership removed", description: `${subscriber.email} has no active tier.` });
        await load();
      }
      setPendingId(null);
      return;
    }

    if (current) {
      const { error } = await supabase
        .from("tcd_subscriptions")
        .update({
          tier_id: tierId,
          starts_at: new Date().toISOString(),
          expires_at: oneYearISO(),
          status: "active",
        })
        .eq("id", current.id);
      if (error) {
        toast({ title: "Failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Tier updated" });
        await load();
      }
    } else {
      const { error } = await supabase.from("tcd_subscriptions").insert({
        subscriber_id: subscriber.id,
        tier_id: tierId,
        status: "active",
        starts_at: new Date().toISOString(),
        expires_at: oneYearISO(),
        provider: "admin",
      });
      if (error) {
        toast({ title: "Failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Membership granted" });
        await load();
      }
    }
    setPendingId(null);
  };

  const setStatus = async (id: string, status: string) => {
    const patch: Record<string, unknown> = { status };
    if (status === "cancelled") patch.cancelled_at = new Date().toISOString();
    if (status === "active") {
      patch.starts_at = new Date().toISOString();
      patch.expires_at = oneYearISO();
    }
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

        <div className="mt-10 flex gap-2 border-b border-bb-border overflow-x-auto">
          {TAB_DEFS.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 h-11 text-[13px] font-medium border-b-2 -mb-px transition whitespace-nowrap ${
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

        {!loading && tab === "members" && (
          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <input
                value={memberFilter}
                onChange={(e) => setMemberFilter(e.target.value)}
                placeholder="Filter by name, email or company..."
                className="h-11 px-4 rounded-[10px] border border-bb-border bg-white text-[13px] w-full sm:w-[360px] focus:outline-none focus:border-bb-slate"
              />
              <p className="text-[12px] text-bb-gray">
                {filteredMembers.length} of {subscribers.length} members
              </p>
            </div>

            <div className="bg-white border border-bb-border rounded-xl overflow-hidden">
              <div className="hidden md:grid grid-cols-[2fr_1.4fr_1fr_1.2fr] gap-4 px-6 py-3 bg-bb-off-white border-b border-bb-border text-[10px] uppercase tracking-[0.24em] text-bb-gray font-semibold">
                <div>Member</div>
                <div>Company</div>
                <div>Current tier</div>
                <div className="text-right">Set tier</div>
              </div>

              {filteredMembers.length === 0 && (
                <p className="p-6 text-[13px] text-bb-gray">No members yet.</p>
              )}

              <div className="divide-y divide-bb-border">
                {filteredMembers.map((m) => {
                  const current = activeBySubscriber.get(m.id);
                  const currentTierId = current?.tier_id ?? "none";
                  const currentTierName = current?.tcd_tiers?.name ?? "None";
                  const isPending = pendingId === m.id;
                  const expires = current?.expires_at
                    ? new Date(current.expires_at).toLocaleDateString()
                    : null;

                  return (
                    <div
                      key={m.id}
                      className="grid grid-cols-1 md:grid-cols-[2fr_1.4fr_1fr_1.2fr] gap-3 md:gap-4 px-6 py-5 items-center"
                    >
                      <div>
                        <div className="font-medium text-[14px] text-bb-near-black">
                          {m.full_name || "(no name)"}
                        </div>
                        <div className="text-[12px] text-bb-gray mt-0.5 truncate">{m.email}</div>
                      </div>
                      <div className="text-[13px] text-bb-near-black">
                        {m.company ?? <span className="text-bb-gray">—</span>}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`inline-flex w-fit items-center text-[11px] uppercase tracking-[0.2em] px-2 py-1 rounded border ${
                            current
                              ? "border-bb-copper/40 text-bb-copper bg-bb-copper/5"
                              : "border-bb-border text-bb-gray"
                          }`}
                        >
                          {currentTierName}
                        </span>
                        {expires && (
                          <span className="mt-1 text-[11px] text-bb-gray">until {expires}</span>
                        )}
                      </div>
                      <div className="md:text-right">
                        <select
                          value={currentTierId}
                          disabled={isPending}
                          onChange={(e) => setMemberTier(m, e.target.value)}
                          className="h-10 px-3 pr-8 rounded-[10px] border border-bb-border bg-white text-[13px] w-full md:w-auto disabled:opacity-50"
                        >
                          <option value="none">No membership</option>
                          {tiers.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} (rank {t.rank})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-bb-gray pt-2">
              Changing a tier here writes directly to the active subscription. Use this to verify
              that <code>/intelligence/dashboard</code> and report routes gate correctly per rank.
            </p>
          </div>
        )}

        {!loading && tab === "subs" && (
          <div className="mt-8 bg-white border border-bb-border rounded-xl divide-y divide-bb-border">
            {subscriptions.length === 0 && (
              <p className="p-6 text-[13px] text-bb-gray">No subscriptions.</p>
            )}
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
                      onClick={() => setStatus(s.id, "active")}
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
            {views.length === 0 && (
              <p className="p-6 text-[13px] text-bb-gray">No reads logged yet.</p>
            )}
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
