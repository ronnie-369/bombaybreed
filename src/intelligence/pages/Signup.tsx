import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";
import { logSubscribeConversion } from "@/lib/abTest";
import { prefetchCheckout } from "../lib/routePrefetch";
import {
  logAuthDiagnostic,
  extractErrorMessage,
  interpretAuthError,
  type AuthHint,
} from "../lib/authDiagnostics";

// Member signup: low-friction password rules. Admin auth keeps its stricter
// 12-char policy in src/pages/Auth.tsx. Supabase Leaked Password Protection
// also rejects known-compromised passwords as a second layer.
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Include at least one letter")
  .regex(/[0-9]/, "Include at least one number");


const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [params] = useSearchParams();
  const tier = params.get("tier") ?? "foundational";
  const billing = (params.get("billing") === "monthly" ? "monthly" : "annual") as
    | "monthly"
    | "annual";
  const redirect = params.get("redirect");

  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [loading, setLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [authHint, setAuthHint] = useState<AuthHint | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    designation: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(redirect || `/intelligence/checkout?tier=${tier}&billing=${billing}`, { replace: true });
    });
    // Warm Checkout chunk so the post-signup hop is instant.
    prefetchCheckout();
  }, [navigate, redirect, tier, billing]);

  // Tick down the resend cooldown timer.
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = window.setInterval(() => setResendCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [resendCooldown]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const persistIntent = () => {
    try {
      localStorage.setItem(
        "tcd_signup_intent",
        JSON.stringify({ tier, billing, ts: Date.now() }),
      );
      // Profile snapshot - lets the Welcome page backfill tcd_subscribers
      // even if Supabase user_metadata comes back empty (e.g. cross-device
      // confirmation, or older accounts re-confirming).
      localStorage.setItem(
        "tcd_signup_profile",
        JSON.stringify({
          full_name: form.fullName,
          company: form.company || null,
          designation: form.designation || null,
        }),
      );
    } catch {
      /* ignore */
    }
  };

  const reportFailure = async (
    event: Parameters<typeof logAuthDiagnostic>[0]["event"],
    rawMessage: string,
    email?: string | null,
  ) => {
    const hint = interpretAuthError(event, rawMessage);
    setAuthHint(hint);
    toast({
      title: hint.title,
      description: hint.description,
      variant: hint.severity === "info" ? "default" : "destructive",
    });
    await logAuthDiagnostic({
      event,
      email: email ?? null,
      status: "failure",
      errorMessage: rawMessage || null,
    });
  };

  const reportSuccess = async (
    event: Parameters<typeof logAuthDiagnostic>[0]["event"],
    email?: string | null,
  ) => {
    setAuthHint(null);
    await logAuthDiagnostic({ event, email: email ?? null, status: "success" });
  };

  const resendConfirmation = async () => {
    if (!submittedEmail || resendCooldown > 0) return;
    const { error } = await supabase.functions.invoke("intelligence-signup", {
      body: {
        action: "resend",
        email: submittedEmail,
        tier,
        billing,
        origin: window.location.origin,
      },
    });
    if (error) {
      await reportFailure("resend", await extractErrorMessage(error), submittedEmail);
      return;
    }
    setResendCooldown(45);
    await reportSuccess("resend", submittedEmail);
    toast({ title: "Email sent", description: "Check your inbox (and spam) for the secure access link." });
  };

  const sendMagicLink = async () => {
    const email = form.email.trim();
    if (!email) {
      toast({ title: "Enter your email", description: "We need your email to send a sign-in link.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.functions.invoke("intelligence-signup", {
      body: {
        action: "resend",
        email,
        tier,
        billing,
        origin: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      await reportFailure("magic_link", await extractErrorMessage(error), email);
      return;
    }
    setSubmittedEmail(email);
    setResendCooldown(45);
    await reportSuccess("magic_link", email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthHint(null);

    if (mode === "signup") {
      const pwdResult = passwordSchema.safeParse(form.password);
      if (!pwdResult.success) {
        toast({ title: "Weak password", description: pwdResult.error.errors[0].message, variant: "destructive" });
        setLoading(false);
        return;
      }
      if (!form.fullName.trim()) {
        toast({ title: "Name required", variant: "destructive" });
        setLoading(false);
        return;
      }

      persistIntent();

      const { error } = await supabase.functions.invoke("intelligence-signup", {
        body: {
          action: "signup",
          email: form.email,
          password: form.password,
          fullName: form.fullName,
          company: form.company || null,
          designation: form.designation || null,
          tier,
          billing,
          origin: window.location.origin,
        },
      });

      if (error) {
        await reportFailure("signup", await extractErrorMessage(error), form.email);
        setLoading(false);
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (signInError) {
        setSubmittedEmail(form.email);
        setResendCooldown(45);
        await logAuthDiagnostic({
          event: "signin_password",
          email: form.email,
          status: "failure",
          errorMessage: signInError.message,
        });
        setLoading(false);
        return;
      }

      if (data.user && data.session) {
        await supabase.from("tcd_subscribers").upsert(
          {
            user_id: data.user.id,
            email: form.email,
            full_name: form.fullName,
            company: form.company || null,
            designation: form.designation || null,
          },
          { onConflict: "user_id" }
        );
      }

      logSubscribeConversion({ tier, source: 'signup' });
      await reportSuccess("signup", form.email);

      if (data.session) {
        toast({ title: "Account created", description: "Continue to membership selection." });
        navigate(`/intelligence/checkout?tier=${tier}&billing=${billing}`);
      } else {
        setSubmittedEmail(form.email);
        setResendCooldown(45);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) {
        await reportFailure("signin_password", error.message, form.email);
        setLoading(false);
        return;
      }
      await reportSuccess("signin_password", form.email);
      navigate(redirect || "/intelligence/dashboard");
    }

    setLoading(false);
  };

  return (
    <IntelligenceLayout>
      <Helmet>
        <title>{mode === "signup" ? "Create account" : "Sign in"} — TCD Intelligence</title>
      </Helmet>

      <section className="max-w-md mx-auto px-6 pt-20 pb-24">
        {submittedEmail ? (
          <>
          <SectionLabel>Check your email</SectionLabel>
            <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[36px] leading-[1.1] text-bb-near-black">
              Check your inbox
            </h1>
            <p className="mt-3 text-[14px] text-bb-gray leading-relaxed">
              We sent a secure access link to <span className="text-bb-near-black font-medium">{submittedEmail}</span>.
              Click it to return here, confirm your tier, and complete payment.
            </p>

            <div className="mt-8 bg-white border border-bb-border rounded-xl p-7 space-y-5">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bb-gray">
                  Tier on hold
                </div>
                <div className="mt-2 text-[15px] text-bb-near-black">
                  {tier === "professional" ? "Investor Intel" : "Market Makers"}
                  <span className="text-bb-gray"> - {billing === "annual" ? "Annual" : "Monthly"} billing</span>
                </div>
              </div>

              <div className="text-[12px] text-bb-gray leading-relaxed">
                Did not receive it? Check spam, or resend below. The link expires automatically.
              </div>

              {authHint && <HintBanner hint={authHint} />}

              <button
                type="button"
                onClick={resendConfirmation}
                disabled={resendCooldown > 0}
                className="w-full h-11 rounded-[10px] border border-bb-slate text-bb-slate text-[13px] font-medium hover:bg-bb-slate hover:text-bb-off-white transition disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-bb-slate"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend access email"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmittedEmail(null);
                  setForm((f) => ({ ...f, password: "" }));
                }}
                className="w-full text-[13px] text-bb-gray hover:text-bb-near-black transition"
              >
                Use a different email
              </button>
            </div>
          </>
        ) : (
          <>
            <SectionLabel>{mode === "signup" ? "Create account" : "Welcome back"}</SectionLabel>
            <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[36px] leading-[1.1] text-bb-near-black">
              {mode === "signup" ? "Begin your membership" : "Sign in to continue"}
            </h1>
            <p className="mt-3 text-[14px] text-bb-gray">
              {mode === "signup"
                ? "I keep the platform deliberately small. Identify yourself clearly so I can serve the right material."
                : "Access your dashboard, account, and reports."}
            </p>

            {authHint && <div className="mt-6"><HintBanner hint={authHint} /></div>}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5 bg-white border border-bb-border rounded-xl p-7">
              {mode === "signup" && (
                <>
                  <Field label="Full name" required value={form.fullName} onChange={update("fullName")} />
                  <Field label="Company" value={form.company} onChange={update("company")} />
                  <Field label="Designation" value={form.designation} onChange={update("designation")} />
                </>
              )}
              <Field label="Email" type="email" required value={form.email} onChange={update("email")} />
              <Field label="Password" type="password" required value={form.password} onChange={update("password")} />
              {mode === "signup" && (
                <p className="text-[12px] text-bb-gray">
                  At least 8 characters, with one letter and one number.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Working..." : mode === "signup" ? "Create account" : "Sign in"}
              </button>

              {mode === "signin" && (
                <>
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-bb-gray">
                    <span className="h-px flex-1 bg-bb-border" />
                    or
                    <span className="h-px flex-1 bg-bb-border" />
                  </div>
                  <button
                    type="button"
                    onClick={sendMagicLink}
                    disabled={loading}
                    className="w-full h-11 rounded-[10px] border border-bb-slate text-bb-slate text-[13px] font-medium hover:bg-bb-slate hover:text-bb-off-white transition disabled:opacity-50"
                  >
                    Email me a sign-in link
                  </button>
                  <p className="text-[12px] text-bb-gray text-center -mt-1">
                    No password needed. We will send a secure access link.
                  </p>
                </>
              )}

              <div className="text-center text-[13px] text-bb-gray">
                {mode === "signup" ? (
                  <>
                    Already a member?{" "}
                    <button type="button" onClick={() => setMode("signin")} className="text-bb-slate font-medium underline-offset-2 hover:underline">
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    New here?{" "}
                    <button type="button" onClick={() => setMode("signup")} className="text-bb-slate font-medium underline-offset-2 hover:underline">
                      Create an account
                    </button>
                  </>
                )}
              </div>
            </form>

            <p className="mt-6 text-[12px] text-bb-gray text-center">
              See{" "}
              <Link to="/intelligence/membership" className="underline hover:text-bb-near-black">
                tier comparison
              </Link>
              .
            </p>
          </>
        )}
      </section>
    </IntelligenceLayout>
  );
};

const Field = ({
  label,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label className="block">
    <span className="block text-[12px] font-medium text-bb-near-black mb-2">
      {label}
      {required && <span className="text-bb-copper ml-1">*</span>}
    </span>
    <input
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full h-11 px-3 rounded-[10px] border border-bb-border bg-bb-off-white text-[14px] text-bb-near-black focus:outline-none focus:border-bb-slate transition"
    />
  </label>
);

const HintBanner = ({ hint }: { hint: AuthHint }) => {
  const tone =
    hint.severity === "error"
      ? "border-bb-copper/40 bg-bb-copper/5"
      : hint.severity === "warning"
      ? "border-bb-slate/30 bg-bb-slate/5"
      : "border-bb-border bg-bb-off-white";
  return (
    <div className={`rounded-[10px] border ${tone} p-4`}>
      <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-bb-near-black">
        {hint.title}
      </div>
      <div className="mt-2 text-[13px] text-bb-gray leading-relaxed">
        {hint.description}
      </div>
    </div>
  );
};

export default Signup;
