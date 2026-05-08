import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SectionLabel from "../components/SectionLabel";

// /intelligence/checkout/result?order=order_XXXXXXXXXXXX
//
// Polls the get-payment-status edge function every 2.5s for up to 60s.
// Renders one of four states: pending, success, failed, unknown.
// Pending state explains the UPI / async-confirm case so users don't bounce.

type Status = "pending" | "success" | "failed" | "unknown" | "signature_failed";

interface StatusPayload {
  status: Status;
  order_id: string;
  plan_id?: string;
  plan_label?: string;
  billing_cycle?: "monthly" | "annual" | string;
  amount_inr?: number;
  expires_at?: string | null;
  payment_id?: string;
  provider_order_status?: string;
  error_message?: string;
}

const POLL_INTERVAL_MS = 2_500;
const MAX_POLL_MS = 60_000;

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const formatDate = (iso?: string | null) => {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

const billingLabel = (cycle?: string) => {
  if (cycle === "annual") return "Annual (12 months upfront)";
  if (cycle === "monthly") return "Monthly";
  return cycle ?? null;
};

export default function CheckoutResult() {
  const [params] = useSearchParams();
  const orderId = params.get("order") ?? "";

  const [payload, setPayload] = useState<StatusPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [pollingStopped, setPollingStopped] = useState(false);

  const startedAtRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  // Validate the order id format up front - guards against junk URLs.
  const orderIdLooksValid = /^order_[A-Za-z0-9]{6,40}$/.test(orderId);

  useEffect(() => {
    if (!orderIdLooksValid) return;

    let cancelled = false;

    const poll = async () => {
      const { data, error: invokeError } = await supabase.functions.invoke(
        "get-payment-status",
        { body: { order_id: orderId } },
      );

      if (cancelled) return;

      if (invokeError) {
        setError(invokeError.message ?? "Could not check payment status.");
      } else if (data) {
        setPayload(data as StatusPayload);
        setError(null);
      }

      const elapsed = Date.now() - startedAtRef.current;
      setElapsedMs(elapsed);

      const terminalStatus = (data as StatusPayload | undefined)?.status;
      const isTerminal =
        terminalStatus === "success" ||
        terminalStatus === "failed" ||
        terminalStatus === "signature_failed";

      if (isTerminal) {
        setPollingStopped(true);
        return;
      }

      if (elapsed >= MAX_POLL_MS) {
        setPollingStopped(true);
        return;
      }

      timerRef.current = window.setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();

    return () => {
      cancelled = true;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [orderId, orderIdLooksValid]);

  const status: Status = payload?.status ?? (orderIdLooksValid ? "pending" : "unknown");

  // No auto-redirect - this dedicated success page IS the destination.
  // Visitor decides whether to head to onboarding, the dashboard, or
  // their account from the actions below.

  return (
    <div className="min-h-screen bg-bb-off-white text-bb-near-black font-sans antialiased">
      <Helmet>
        <title>
          {status === "success"
            ? "Subscription confirmed - TCD Intelligence"
            : "Payment status - TCD Intelligence"}
        </title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <header className="border-b border-bb-border">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-[13px] font-medium text-bb-gray hover:text-bb-near-black inline-flex items-center gap-1.5"
            aria-label="Back to Bombay Breed home"
          >
            <span aria-hidden>←</span> Home
          </Link>
          <Link to="/intelligence" className="font-serif text-[16px] tracking-tight text-bb-near-black">
            TCD Intelligence
          </Link>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 pt-20 pb-24">
        <SectionLabel>Checkout</SectionLabel>
        <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[36px] leading-[1.1] text-bb-near-black">
          {status === "success" && "Payment confirmed"}
          {status === "pending" && "Confirming your payment"}
          {status === "failed" && "Payment did not go through"}
          {status === "unknown" && "We could not find this payment"}
          {status === "signature_failed" && "We could not verify this payment"}
        </h1>

        {!orderIdLooksValid && (
          <p className="mt-6 text-[15px] text-bb-gray leading-relaxed">
            This page needs a valid order reference. If you just paid and were
            redirected here without one, please contact support and quote the
            time of your payment.
          </p>
        )}

        {orderIdLooksValid && (
          <div className="mt-10 bg-white border border-bb-border rounded-xl p-8">
            <StatusBadge status={status} />

            {/* Plan summary, shown as soon as we know it */}
            {payload?.plan_label && (
              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-[14px]">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.32em] text-bb-copper">
                    Plan
                  </dt>
                  <dd className="mt-1 text-bb-near-black">{payload.plan_label}</dd>
                </div>
                {billingLabel(payload.billing_cycle) && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.32em] text-bb-copper">
                      Billing
                    </dt>
                    <dd className="mt-1 text-bb-near-black">
                      {billingLabel(payload.billing_cycle)}
                    </dd>
                  </div>
                )}
                {typeof payload.amount_inr === "number" && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.32em] text-bb-copper">
                      Amount
                    </dt>
                    <dd className="mt-1 text-bb-near-black">
                      {formatPrice(payload.amount_inr)}
                    </dd>
                  </div>
                )}
                {status === "success" && formatDate(payload.expires_at ?? null) && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.32em] text-bb-copper">
                      Renews
                    </dt>
                    <dd className="mt-1 text-bb-near-black">
                      {formatDate(payload.expires_at ?? null)}
                    </dd>
                  </div>
                )}
              </dl>
            )}

            {/* Reference */}
            <div className="mt-6 pt-5 border-t border-bb-border text-[12px] text-bb-gray font-mono break-all">
              Order: {orderId}
              {payload?.payment_id && (
                <>
                  <br />
                  Payment: {payload.payment_id}
                </>
              )}
            </div>

            {/* State-specific copy + actions */}
            <div className="mt-6 text-[14px] leading-relaxed text-bb-gray">
              {status === "success" && (
                <p>
                  Your membership is active. You will be redirected to onboarding
                  in a moment, or{" "}
                  <Link
                    to="/intelligence/onboarding"
                    className="text-bb-near-black underline underline-offset-4 hover:text-bb-copper"
                  >
                    continue now
                  </Link>
                  .
                </p>
              )}

              {status === "pending" && !pollingStopped && (
                <p>
                  We have your payment and are waiting for the bank or UPI app
                  to confirm. This usually takes a few seconds. Please do not
                  close this tab.
                </p>
              )}

              {status === "pending" && pollingStopped && (
                <div className="space-y-4">
                  <p>
                    Confirmation is taking longer than usual. Your payment is
                    safe - if it succeeds, your membership will activate
                    automatically and we will email you. You can refresh this
                    page or check back later.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center px-5 py-2.5 border border-bb-near-black text-[12px] font-semibold uppercase tracking-[0.18em] text-bb-near-black hover:bg-bb-near-black hover:text-white transition-colors"
                  >
                    Refresh status
                  </button>
                </div>
              )}

              {status === "failed" && (
                <div className="space-y-4">
                  <p>
                    The payment was declined or cancelled. No charge has been
                    captured. You can try again with a different method.
                  </p>
                  <Link
                    to="/intelligence/checkout"
                    className="inline-flex items-center px-5 py-2.5 border border-bb-near-black text-[12px] font-semibold uppercase tracking-[0.18em] text-bb-near-black hover:bg-bb-near-black hover:text-white transition-colors"
                  >
                    Return to checkout
                  </Link>
                </div>
              )}

              {status === "unknown" && (
                <p>
                  We could not find this order with the payment provider. If you
                  believe this is a mistake, contact{" "}
                  <a
                    href="mailto:theresa.ronnie@bombaybreed.com"
                    className="text-bb-near-black underline underline-offset-4 hover:text-bb-copper"
                  >
                    theresa.ronnie@bombaybreed.com
                  </a>{" "}
                  and quote the order reference above.
                </p>
              )}

              {status === "signature_failed" && (
                <div className="space-y-4 rounded-[10px] border border-red-700/30 bg-red-50 p-5">
                  <p className="text-red-900">
                    {payload?.error_message ??
                      "We could not verify the payment confirmation from Razorpay."}{" "}
                    For your safety, we have not activated the membership. If
                    your account was charged, we will refund it automatically -
                    please email us with the order reference below so we can
                    investigate immediately.
                  </p>
                  <a
                    href={`mailto:theresa.ronnie@bombaybreed.com?subject=Payment%20verification%20failed%20-%20${encodeURIComponent(orderId)}`}
                    className="inline-flex items-center px-5 py-2.5 border border-red-800 text-[12px] font-semibold uppercase tracking-[0.18em] text-red-800 hover:bg-red-800 hover:text-white transition-colors"
                  >
                    Email support
                  </a>
                </div>
              )}

              {error && status === "pending" && (
                <p className="mt-3 text-bb-copper">
                  Status check error: {error}. Retrying...
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </IntelligenceLayout>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; className: string; dot: string }> = {
    success: {
      label: "Confirmed",
      className: "border-green-700/30 text-green-800 bg-green-50",
      dot: "bg-green-600",
    },
    pending: {
      label: "Pending",
      className: "border-amber-700/30 text-amber-800 bg-amber-50",
      dot: "bg-amber-500 animate-pulse",
    },
    failed: {
      label: "Failed",
      className: "border-red-700/30 text-red-800 bg-red-50",
      dot: "bg-red-600",
    },
    unknown: {
      label: "Unknown",
      className: "border-bb-border text-bb-gray bg-bb-cream",
      dot: "bg-bb-gray",
    },
    signature_failed: {
      label: "Verification failed",
      className: "border-red-700/30 text-red-800 bg-red-50",
      dot: "bg-red-600",
    },
  };
  const c = map[status];
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-[11px] font-semibold uppercase tracking-[0.24em] ${c.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </div>
  );
}
