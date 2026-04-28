import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";
import { logSubscribeConversion } from "@/lib/abTest";

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
  }, [navigate, redirect, tier, billing]);

  // Tick down the resend cooldown timer.
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = window.setInterval(() => setResendCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [resendCooldown]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // The Welcome page reads tier+billing from the URL after the email link.
  // We set them on emailRedirectTo so they survive the round-trip even if the
  // user opens the link on a different device. localStorage is a backup.
  const buildEmailRedirect = () => {
    const url = new URL(`${window.location.origin}/intelligence/welcome`);
    url.searchParams.set("tier", tier);
    url.searchParams.set("billing", billing);
    return url.toString();
  };

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

  const resendConfirmation = async () => {
    if (!submittedEmail || resendCooldown > 0) return;
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: submittedEmail,
      options: { emailRedirectTo: buildEmailRedirect() },
    });
    if (error) {
      toast({ title: "Could not resend", description: error.message, variant: "destructive" });
      return;
    }
    setResendCooldown(45);
    toast({ title: "Email sent", description: "Check your inbox for the confirmation link." });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: buildEmailRedirect(),
          data: {
            full_name: form.fullName,
            company: form.company || null,
            designation: form.designation || null,
            intended_tier: tier,
            intended_billing: billing,
          },
        },
      });

      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }

      // If Supabase email confirmation is enabled (the default for this project),
      // data.session will be null until the user clicks the link. We only try to
      // upsert the subscriber row if we already have a session - otherwise RLS
      // would reject the insert. The Welcome page handles the upsert post-confirm.
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

      // A/B: attribute the conversion to whichever subscribe-CTA variant
      // brought this visitor in (within the 7-day attribution window).
      logSubscribeConversion({ tier, source: 'signup' });

      // If the project happens to have email confirmation disabled and we got
      // a session straight away, skip the inline state and continue to checkout.
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
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }
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
            <SectionLabel>Confirm your email</SectionLabel>
            <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[36px] leading-[1.1] text-bb-near-black">
              Check your inbox
            </h1>
            <p className="mt-3 text-[14px] text-bb-gray leading-relaxed">
              We sent a confirmation link to <span className="text-bb-near-black font-medium">{submittedEmail}</span>.
              Click it to verify your address - you will be brought back to confirm your tier and complete payment.
            </p>

            <div className="mt-8 bg-white border border-bb-border rounded-xl p-7 space-y-5">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bb-gray">
                  Tier on hold
                </div>
                <div className="mt-2 text-[15px] text-bb-near-black">
                  {tier === "professional" ? "Investor Readers" : "Market Readers"}
                  <span className="text-bb-gray"> - {billing === "annual" ? "Annual" : "Monthly"} billing</span>
                </div>
              </div>

              <div className="text-[12px] text-bb-gray leading-relaxed">
                Did not receive it? Check spam, or resend below. The link expires in 24 hours.
              </div>

              <button
                type="button"
                onClick={resendConfirmation}
                disabled={resendCooldown > 0}
                className="w-full h-11 rounded-[10px] border border-bb-slate text-bb-slate text-[13px] font-medium hover:bg-bb-slate hover:text-bb-off-white transition disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-bb-slate"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend confirmation email"}
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

export default Signup;
