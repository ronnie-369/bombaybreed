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
      navigate(`/intelligence/signup?redirect=/intelligence/checkout?tier=${tierSlug}`);
      return;
    }

    const { error } = await supabase.rpc("tcd_mock_activate_subscription", {
      _tier_id: tier.id,
    });

    if (error) {
      toast({
        title: "Could not activate membership",
        description: error.message,
        variant: "destructive",
      });
      setProcessing(false);
      return;
    }

    toast({
      title: "Payment successful (mock)",
      description: `${tier.name} membership is now active.`,
    });
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
