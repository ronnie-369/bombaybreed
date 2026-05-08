import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";
import { logAuthDiagnostic, interpretAuthError, type AuthHint } from "../lib/authDiagnostics";

// Marketing slugs may still appear in older confirmation links - normalize.
const TIER_ALIAS: Record<string, string> = {
  "industry-reader": "foundational",
  "analyst-lens": "professional",
  foundational: "foundational",
  professional: "professional",
};

const TIER_LABEL: Record<string, string> = {
  foundational: "Market Makers",
  professional: "Investor Intel",
};

type Billing = "monthly" | "annual";

interface Intent {
  tier: string;
  billing: Billing;
}

const readStoredIntent = (): Intent | null => {
  try {
    const raw = localStorage.getItem("tcd_signup_intent");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { tier?: string; billing?: string };
    if (!parsed?.tier) return null;
    return {
      tier: TIER_ALIAS[parsed.tier] ?? "foundational",
      billing: parsed.billing === "monthly" ? "monthly" : "annual",
    };
  } catch {
    return null;
  }
};

const Welcome = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Supabase appends auth tokens to the URL hash after the email link is
  // clicked. The SDK consumes them automatically via detectSessionInUrl.
  const [sessionState, setSessionState] = useState<"loading" | "ready" | "missing">(
    "loading",
  );
  const [email, setEmail] = useState<string | null>(null);
  const [verifyHint, setVerifyHint] = useState<AuthHint | null>(null);

  const intent = useMemo<Intent>(() => {
    const urlTier = params.get("tier");
    const urlBilling = params.get("billing");
    if (urlTier) {
      return {
        tier: TIER_ALIAS[urlTier] ?? "foundational",
        billing: urlBilling === "monthly" ? "monthly" : "annual",
      };
    }
    return (
      readStoredIntent() ?? { tier: "foundational", billing: "annual" }
    );
  }, [params]);

  const [tier, setTier] = useState(intent.tier);
  const [billing, setBilling] = useState<Billing>(intent.billing);

  useEffect(() => {
    let cancelled = false;

    const resolve = async () => {
      const tokenHash = params.get("token_hash");
      const tokenType = params.get("type");
      if (tokenHash && (tokenType === "signup" || tokenType === "magiclink")) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: tokenType,
        });
        if (error) {
          console.warn("[Welcome] email link verification failed", error.message);
          setVerifyHint(interpretAuthError("verify_email_link", error.message));
          await logAuthDiagnostic({
            event: "verify_email_link",
            status: "failure",
            errorMessage: error.message,
          });
        } else {
          await logAuthDiagnostic({ event: "verify_email_link", status: "success" });
        }

        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete("token_hash");
        cleanUrl.searchParams.delete("type");
        window.history.replaceState({}, "", `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
      }

      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        setEmail(data.session.user.email ?? null);
        setSessionState("ready");

        // Backfill subscriber row. Auth metadata is the primary source (set at
        // signup), but on cross-device confirmations or older accounts it can
        // be empty. Fall back to localStorage intent (captured pre-submit),
        // then to a derived name from the email local-part.
        const user = data.session.user;
        const meta = (user.user_metadata ?? {}) as Record<string, unknown>;

        let storedProfile: Record<string, unknown> = {};
        try {
          const raw = localStorage.getItem("tcd_signup_profile");
          if (raw) storedProfile = JSON.parse(raw) as Record<string, unknown>;
        } catch {
          /* ignore parse errors */
        }

        const pick = (key: string): string | null => {
          const fromMeta = meta[key];
          if (typeof fromMeta === "string" && fromMeta.trim()) return fromMeta.trim();
          const fromStore = storedProfile[key];
          if (typeof fromStore === "string" && fromStore.trim()) return fromStore.trim();
          return null;
        };

        const emailLocal = user.email?.split("@")[0]?.replace(/[._-]+/g, " ").trim();
        const derivedName = emailLocal
          ? emailLocal.replace(/\b\w/g, (c) => c.toUpperCase())
          : "Member";

        // Only upsert if we have at least an email - guards against partial rows.
        if (user.email) {
          const { error: upsertError } = await supabase.from("tcd_subscribers").upsert(
            {
              user_id: user.id,
              email: user.email,
              full_name: pick("full_name") ?? derivedName,
              company: pick("company"),
              designation: pick("designation"),
            },
            { onConflict: "user_id" },
          );
          if (upsertError) {
            // Non-fatal: the user can still proceed to checkout. Log only.
            console.warn("[Welcome] subscriber backfill failed", upsertError.message);
          }
        }
      } else {
        setSessionState("missing");
      }
    };

    void resolve();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      if (session) {
        setEmail(session.user.email ?? null);
        setSessionState("ready");
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [params]);

  const proceed = () => {
    navigate(`/intelligence/checkout?tier=${tier}&billing=${billing}`);
  };

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>Welcome - TCD Intelligence</title>
      </Helmet>

      <section className="max-w-xl mx-auto px-6 pt-20 pb-24">
        {sessionState === "loading" && (
          <p className="text-[14px] text-bb-gray">Confirming your email...</p>
        )}

        {sessionState === "missing" && (
          <>
            <SectionLabel>Confirmation needed</SectionLabel>
            <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[32px] leading-[1.15] text-bb-near-black">
              {verifyHint?.title ?? "We could not verify this confirmation link"}
            </h1>
            <p className="mt-4 text-[14px] text-bb-gray leading-relaxed">
              {verifyHint?.description ??
                "The link may have expired or been used already. Sign in with the email and password you just registered, or request a fresh link."}
            </p>
            <div className="mt-6 rounded-[10px] border border-bb-slate/30 bg-bb-slate/5 p-4 text-[13px] text-bb-gray leading-relaxed">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bb-near-black mb-2">
                What to try
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Request a fresh access link from the sign-in page (links expire quickly).</li>
                <li>Make sure you opened the most recent email - older links are invalidated when a new one is sent.</li>
                <li>Check your spam or promotions folder.</li>
                <li>Open the link in the same browser you signed up from.</li>
              </ul>
            </div>
            <div className="mt-8 flex gap-3">
              <Link
                to="/intelligence/signup"
                className="px-5 h-11 inline-flex items-center rounded-[10px] bg-bb-slate text-bb-off-white text-[13px] font-medium hover:opacity-90 transition"
              >
                Request a new link
              </Link>
              <Link
                to="/intelligence/signup"
                className="px-5 h-11 inline-flex items-center rounded-[10px] border border-bb-border text-bb-near-black text-[13px] font-medium hover:bg-bb-off-white transition"
              >
                Sign in with password
              </Link>
            </div>
          </>
        )}

        {sessionState === "ready" && (
          <>
            {verifyHint && (
              <div className="mb-8 rounded-[10px] border border-bb-copper/40 bg-bb-copper/5 p-4">
                <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-bb-near-black">
                  {verifyHint.title}
                </div>
                <div className="mt-2 text-[13px] text-bb-gray leading-relaxed">
                  {verifyHint.description} You are still signed in from a previous session, so you can continue.
                </div>
              </div>
            )}
            <SectionLabel>Welcome</SectionLabel>
            <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[36px] leading-[1.1] text-bb-near-black">
              You have successfully created an account
            </h1>
            <p className="mt-4 text-[14px] text-bb-gray leading-relaxed">
              {email ? (
                <>
                  <span className="text-bb-near-black">{email}</span> is now verified. Confirm the
                  tier you chose and continue to payment.
                </>
              ) : (
                "Your email is verified. Confirm the tier you chose and continue to payment."
              )}
            </p>

            <div className="mt-10 bg-white border border-bb-border rounded-xl p-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bb-gray">
                Your tier
              </div>
              <div className="mt-4 grid gap-3">
                {(["foundational", "professional"] as const).map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => setTier(slug)}
                    className={`text-left border rounded-[10px] px-5 py-4 transition-colors ${
                      tier === slug
                        ? "border-bb-slate bg-bb-slate/5"
                        : "border-bb-border hover:border-bb-near-black/30"
                    }`}
                  >
                    <div className="text-[14px] font-medium text-bb-near-black">
                      {TIER_LABEL[slug]}
                    </div>
                    <div className="mt-1 text-[12px] text-bb-gray">
                      {slug === "foundational"
                        ? "Sector intelligence and weekly briefs."
                        : "Adds analyst notes, deep dives, and direct queries."}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-bb-gray">
                Billing cycle
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(["annual", "monthly"] as const).map((cycle) => (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => setBilling(cycle)}
                    className={`text-[13px] border rounded-[10px] px-4 py-3 transition-colors ${
                      billing === cycle
                        ? "border-bb-slate bg-bb-slate/5 text-bb-near-black"
                        : "border-bb-border text-bb-gray hover:text-bb-near-black"
                    }`}
                  >
                    {cycle === "annual" ? "Annual (save vs monthly)" : "Monthly"}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={proceed}
                className="mt-8 w-full h-12 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition"
              >
                Confirm and continue to payment
              </button>

              <p className="mt-4 text-center text-[12px] text-bb-gray">
                Want to compare tiers first?{" "}
                <Link to="/intelligence/membership" className="underline hover:text-bb-near-black">
                  See full comparison
                </Link>
              </p>
            </div>
          </>
        )}
      </section>
    </IntelligenceLayout>
  );
};

export default Welcome;
