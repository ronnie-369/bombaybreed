import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";

// ---- Razorpay checkout modal types ----
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = RAZORPAY_SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

interface Tier {
  id: string;
  slug: string;
  name: string;
  price_inr: number;
  billing_period: string;
}

// Map TCD tier slugs to the Premium Access Lounge plan ids the
// create-razorpay-order / verify-razorpay-payment edge functions expect.
const TIER_TO_PLAN: Record<string, "industry_reader" | "analyst_lens"> = {
  foundational: "industry_reader",
  professional: "analyst_lens",
};

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

// Map low-level error strings from the edge function / network to a friendly,
// user-facing message + a hint about whether retrying is likely to help.
interface CheckoutError {
  title: string;
  description: string;
  retryable: boolean;
}

function classifyOrderError(args: {
  invokeError?: { message?: string } | null;
  responseError?: string | null;
  hasOrderId: boolean;
}): CheckoutError {
  const raw = (args.invokeError?.message ?? args.responseError ?? "").toLowerCase();

  // No internet / DNS / fetch-level failure
  if (
    raw.includes("failed to fetch") ||
    raw.includes("networkerror") ||
    raw.includes("network error") ||
    raw.includes("load failed")
  ) {
    return {
      title: "We could not reach the payment server",
      description:
        "Please check your internet connection and try again. No charge has been made.",
      retryable: true,
    };
  }

  // Server-side misconfiguration (missing Razorpay keys etc.)
  if (
    raw.includes("not configured") ||
    raw.includes("misconfigured") ||
    raw.includes("missing razorpay")
  ) {
    return {
      title: "Online checkout is temporarily unavailable",
      description:
        "Our payment provider is not responding. Please try again in a few minutes, or email theresa.ronnie@bombaybreed.com to activate your membership manually.",
      retryable: true,
    };
  }

  // Plan / cycle validation failure (shouldn't happen via the UI, but guard)
  if (raw.includes("invalid planid") || raw.includes("invalid billingcycle")) {
    return {
      title: "This plan cannot be checked out online yet",
      description:
        "Please refresh the page and reselect the plan. If the problem persists, email theresa.ronnie@bombaybreed.com.",
      retryable: false,
    };
  }

  // Razorpay rejected the order create call (5xx / 502 from our function)
  if (
    raw.includes("razorpay order creation failed") ||
    raw.includes("non-2xx") ||
    raw.includes("502") ||
    raw.includes("503") ||
    raw.includes("504")
  ) {
    return {
      title: "The payment provider is busy",
      description:
        "Razorpay rejected this attempt. Please wait a moment and try again. No charge has been made.",
      retryable: true,
    };
  }

  // Generic fallback
  return {
    title: "Could not start checkout",
    description: args.hasOrderId
      ? "Something went wrong handing off to Razorpay. Please try again."
      : "We could not create your order. Please try again, or contact us if the problem continues.",
    retryable: true,
  };
}

const Checkout = () => {
  const [params] = useSearchParams();
  const tierSlug = params.get("tier") ?? "foundational";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [tier, setTier] = useState<Tier | null>(null);
  const [processing, setProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual"
  );
  const [checkoutError, setCheckoutError] = useState<CheckoutError | null>(null);

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

  // Pre-warm the Razorpay script so the modal opens instantly on click.
  useEffect(() => {
    void loadRazorpayScript();
  }, []);

  const planId = TIER_TO_PLAN[tierSlug];

  const handlePay = async () => {
    if (!tier || processing) return;

    // Clear any previous error so the panel disappears as soon as the user retries.
    setCheckoutError(null);

    if (!planId) {
      setCheckoutError({
        title: "This tier is not yet available for online checkout",
        description:
          "Please email theresa.ronnie@bombaybreed.com to activate this membership manually.",
        retryable: false,
      });
      return;
    }

    // Auth still required - subscriptions are tied to a user account.
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;
    if (!session) {
      navigate(
        `/intelligence/signup?redirect=/intelligence/checkout?tier=${tierSlug}`
      );
      return;
    }

    setProcessing(true);

    try {
      // 1. Create the Razorpay order on the server (server-side pricing).
      const { data: orderData, error: orderError } =
        await supabase.functions.invoke("create-razorpay-order", {
          body: {
            planId,
            billingCycle,
            notes: { tier_slug: tierSlug, source: "intelligence_checkout" },
          },
        });

      if (orderError || !orderData?.order_id) {
        setCheckoutError(
          classifyOrderError({
            invokeError: orderError,
            responseError: (orderData as { error?: string } | undefined)?.error ?? null,
            hasOrderId: Boolean(orderData?.order_id),
          }),
        );
        setProcessing(false);
        return;
      }

      // 2. Make sure the Razorpay JS is loaded.
      const ok = await loadRazorpayScript();
      if (!ok || !window.Razorpay) {
        setCheckoutError({
          title: "Razorpay checkout failed to load",
          description:
            "Check your internet connection (or any ad blocker / strict browser privacy mode) and try again.",
          retryable: true,
        });
        setProcessing(false);
        return;
      }

      const userEmail = session.user.email ?? "";
      const userName =
        (session.user.user_metadata?.full_name as string | undefined) ??
        (userEmail ? userEmail.split("@")[0] : "Member");

      // 3. Open the Razorpay checkout modal.
      const rzp = new window.Razorpay({
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Bombay Breed",
        description: `${tier.name} - ${
          billingCycle === "annual" ? "Annual (12 months upfront)" : "Monthly"
        }`,
        order_id: orderData.order_id,
        prefill: { name: userName, email: userEmail },
        notes: {
          plan_id: planId,
          billing_cycle: billingCycle,
          tier_slug: tierSlug,
        },
        theme: { color: "#1A3D5C" },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            toast({
              title: "Checkout closed",
              description: "You can resume payment whenever you're ready.",
            });
          },
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // Hand off to the result screen immediately. It polls
          // get-payment-status until the webhook (or the in-browser verify
          // call below) confirms activation, so the UX works even when the
          // verify call is slow or fails outright (e.g. UPI async confirms).
          const resultUrl = `/intelligence/checkout/result?order=${encodeURIComponent(
            response.razorpay_order_id,
          )}`;

          // Fire-and-forget verify call. The webhook is the durable path -
          // this just speeds up the happy case for cards.
          supabase.functions
            .invoke("verify-razorpay-payment", {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer: { email: userEmail, full_name: userName },
              },
            })
            .catch((err) => {
              console.warn("verify-razorpay-payment fire-and-forget failed", err);
            });

          setProcessing(false);
          navigate(resultUrl);
        },
      });

      rzp.open();
    } catch (err) {
      setCheckoutError(
        classifyOrderError({
          invokeError: err instanceof Error ? { message: err.message } : null,
          responseError: null,
          hasOrderId: false,
        }),
      );
      setProcessing(false);
    }
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
                <p className="mt-2 text-[13px] text-bb-gray">
                  Billed {tier.billing_period}.
                </p>
              </div>
              <div className="font-serif text-[32px] tracking-tight text-bb-near-black">
                {formatPrice(Number(tier.price_inr))}
              </div>
            </div>

            {planId && (
              <div className="mt-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bb-gray mb-3">
                  Billing cycle
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["monthly", "annual"] as const).map((cycle) => (
                    <button
                      key={cycle}
                      type="button"
                      onClick={() => setBillingCycle(cycle)}
                      className={`text-[13px] border rounded-[10px] px-4 py-3 transition-colors ${
                        billingCycle === cycle
                          ? "border-bb-slate bg-bb-slate/5 text-bb-near-black"
                          : "border-bb-border text-bb-gray hover:text-bb-near-black"
                      }`}
                    >
                      {cycle === "annual"
                        ? "Annual (12 months upfront)"
                        : "Monthly"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-[10px] bg-bb-off-white border border-bb-border p-5">
              <p className="text-[13px] text-bb-gray leading-relaxed">
                You will be redirected to Razorpay's secure checkout to complete
                payment. Your membership activates automatically once the
                payment is verified.
              </p>
            </div>

            <button
              onClick={handlePay}
              disabled={processing}
              className="mt-8 w-full h-12 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {processing ? "Opening checkout..." : "Pay with Razorpay"}
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
