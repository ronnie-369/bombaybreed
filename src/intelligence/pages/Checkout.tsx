import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";

interface Tier {
  id: string;
  slug: string;
  name: string;
  price_inr: number;
  billing_period: string;
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const Checkout = () => {
  const [params] = useSearchParams();
  const tierSlug = params.get("tier") ?? "foundational";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [tier, setTier] = useState<Tier | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("tcd_tiers")
        .select("id, slug, name, price_inr, billing_period")
        .eq("slug", tierSlug)
        .maybeSingle();
      setTier(data as Tier | null);
    })();
  }, [tierSlug]);

  const handleMockPay = async () => {
    if (!tier) return;
    setProcessing(true);

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    if (!userId) {
      navigate("/intelligence/signup");
      return;
    }

    // Ensure subscriber exists
    const { data: sub } = await supabase
      .from("tcd_subscribers")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    let subscriberId = sub?.id;
    if (!subscriberId) {
      const email = sessionData.session?.user.email ?? "";
      const { data: created, error: createErr } = await supabase
        .from("tcd_subscribers")
        .insert({ user_id: userId, email, full_name: email.split("@")[0] })
        .select("id")
        .single();
      if (createErr) {
        toast({ title: "Could not create profile", description: createErr.message, variant: "destructive" });
        setProcessing(false);
        return;
      }
      subscriberId = created.id;
    }

    // Create subscription as pending, then admin will activate (mock).
    const { data: subRow, error: subErr } = await supabase
      .from("tcd_subscriptions")
      .insert({
        subscriber_id: subscriberId,
        tier_id: tier.id,
        status: "pending",
        provider: "mock",
      })
      .select("id")
      .single();

    if (subErr) {
      toast({ title: "Could not create subscription", description: subErr.message, variant: "destructive" });
      setProcessing(false);
      return;
    }

    await supabase.from("tcd_payments").insert({
      subscription_id: subRow.id,
      amount_inr: tier.price_inr,
      currency: "INR",
      provider: "mock",
      status: "pending",
      metadata: { note: "Mock checkout. Real Razorpay wiring pending." },
    });

    toast({ title: "Order placed", description: "An admin will activate your subscription shortly." });
    navigate("/intelligence/onboarding");
  };

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>Checkout — TCD Intelligence</title>
      </Helmet>

      <section className="max-w-2xl mx-auto px-6 pt-20 pb-24">
        <SectionLabel>Checkout</SectionLabel>
        <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[36px] leading-[1.1] text-bb-near-black">
          Confirm your membership
        </h1>

        {tier ? (
          <div className="mt-10 bg-white border border-bb-border rounded-xl p-8">
            <div className="flex items-baseline justify-between border-b border-bb-border pb-5">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.36em] text-bb-copper">
                  {tier.name}
                </div>
                <p className="mt-2 text-[13px] text-bb-gray">Billed {tier.billing_period}.</p>
              </div>
              <div className="font-serif text-[32px] tracking-tight text-bb-near-black">
                {formatPrice(Number(tier.price_inr))}
              </div>
            </div>

            <div className="mt-6 rounded-[10px] bg-bb-off-white border border-bb-border p-5">
              <p className="text-[13px] text-bb-gray leading-relaxed">
                Razorpay is not wired in yet. This step records a pending order and a pending
                payment in your account. An administrator will mark the subscription active in the
                admin dashboard. The full Razorpay flow can be plugged in here later without
                changing the rest of the experience.
              </p>
            </div>

            <button
              onClick={handleMockPay}
              disabled={processing}
              className="mt-8 w-full h-12 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {processing ? "Placing order..." : "Place order (mock)"}
            </button>
          </div>
        ) : (
          <p className="mt-10 text-[13px] text-bb-gray">Loading tier...</p>
        )}
      </section>
    </IntelligenceLayout>
  );
};

export default Checkout;
