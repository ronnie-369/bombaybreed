import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";

interface Subscriber {
  id: string;
  email: string;
  full_name: string;
  company: string | null;
  designation: string | null;
  phone: string | null;
  country: string | null;
}

interface SubscriptionRow {
  id: string;
  status: string;
  starts_at: string | null;
  expires_at: string | null;
  tcd_tiers: { name: string; billing_period: string; price_inr: number } | null;
}

interface PaymentRow {
  id: string;
  amount_inr: number;
  currency: string;
  status: string;
  created_at: string;
  paid_at: string | null;
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const Account = () => {
  const { toast } = useToast();
  const [sub, setSub] = useState<Subscriber | null>(null);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: subData } = await supabase.from("tcd_subscribers").select("*").maybeSingle();
      setSub(subData as Subscriber | null);

      if (subData?.id) {
        const [{ data: subs }, { data: pays }] = await Promise.all([
          supabase
            .from("tcd_subscriptions")
            .select("id, status, starts_at, expires_at, tcd_tiers(name, billing_period, price_inr)")
            .eq("subscriber_id", subData.id)
            .order("created_at", { ascending: false }),
          supabase
            .from("tcd_payments")
            .select("id, amount_inr, currency, status, created_at, paid_at, subscription_id")
            .order("created_at", { ascending: false }),
        ]);
        setSubscriptions((subs as unknown as SubscriptionRow[]) ?? []);
        setPayments((pays as PaymentRow[]) ?? []);
      }
    })();
  }, []);

  const update = (key: keyof Subscriber) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!sub) return;
    setSub({ ...sub, [key]: e.target.value });
  };

  const saveProfile = async () => {
    if (!sub) return;
    setSaving(true);
    const { error } = await supabase
      .from("tcd_subscribers")
      .update({
        full_name: sub.full_name,
        company: sub.company,
        designation: sub.designation,
        phone: sub.phone,
        country: sub.country,
      })
      .eq("id", sub.id);
    setSaving(false);
    if (error) toast({ title: "Could not save", description: error.message, variant: "destructive" });
    else toast({ title: "Profile saved" });
  };

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>Account — TCD Intelligence</title>
      </Helmet>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-24">
        <SectionLabel>Account and billing</SectionLabel>
        <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[36px] md:text-[44px] leading-[1.1] text-bb-near-black">
          Your details
        </h1>

        {sub ? (
          <div className="mt-10 bg-white border border-bb-border rounded-xl p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full name" value={sub.full_name} onChange={update("full_name")} />
              <Field label="Email" value={sub.email} disabled />
              <Field label="Company" value={sub.company ?? ""} onChange={update("company")} />
              <Field label="Designation" value={sub.designation ?? ""} onChange={update("designation")} />
              <Field label="Phone" value={sub.phone ?? ""} onChange={update("phone")} />
              <Field label="Country" value={sub.country ?? ""} onChange={update("country")} />
            </div>
            <button
              onClick={saveProfile}
              disabled={saving}
              className="mt-7 h-11 px-6 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        ) : (
          <p className="mt-10 text-[13px] text-bb-gray">
            No subscriber profile yet. Complete checkout to create one.
          </p>
        )}

        <h2 className="mt-16 font-serif text-[24px] tracking-tight text-bb-near-black">Subscriptions</h2>
        <div className="mt-5 bg-white border border-bb-border rounded-xl divide-y divide-bb-border">
          {subscriptions.length === 0 ? (
            <p className="p-6 text-[13px] text-bb-gray">No subscriptions yet.</p>
          ) : (
            subscriptions.map((s) => (
              <div key={s.id} className="p-6 flex items-center justify-between gap-4">
                <div>
                  <div className="font-serif text-[18px] text-bb-near-black">
                    {s.tcd_tiers?.name ?? "Tier"}
                  </div>
                  <div className="text-[12px] text-bb-gray mt-1">
                    {s.tcd_tiers ? `${formatPrice(Number(s.tcd_tiers.price_inr))} / ${s.tcd_tiers.billing_period}` : ""}
                  </div>
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] px-2 py-1 rounded border border-bb-border text-bb-gray">
                  {s.status}
                </span>
              </div>
            ))
          )}
        </div>

        <h2 className="mt-16 font-serif text-[24px] tracking-tight text-bb-near-black">Payments</h2>
        <div className="mt-5 bg-white border border-bb-border rounded-xl divide-y divide-bb-border">
          {payments.length === 0 ? (
            <p className="p-6 text-[13px] text-bb-gray">No payments yet.</p>
          ) : (
            payments.map((p) => (
              <div key={p.id} className="p-6 flex items-center justify-between text-[13px]">
                <div className="text-bb-near-black">
                  {formatPrice(Number(p.amount_inr))}{" "}
                  <span className="text-bb-gray">· {new Date(p.created_at).toLocaleDateString()}</span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-bb-gray">{p.status}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </IntelligenceLayout>
  );
};

const Field = ({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => (
  <label className="block">
    <span className="block text-[12px] font-medium text-bb-near-black mb-2">{label}</span>
    <input
      type="text"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full h-11 px-3 rounded-[10px] border border-bb-border bg-bb-off-white text-[14px] text-bb-near-black focus:outline-none focus:border-bb-slate transition disabled:opacity-60"
    />
  </label>
);

export default Account;
