import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";
import { logSubscribeConversion } from "@/lib/abTest";

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Add an uppercase letter")
  .regex(/[a-z]/, "Add a lowercase letter")
  .regex(/[0-9]/, "Add a number")
  .regex(/[^A-Za-z0-9]/, "Add a special character");

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [params] = useSearchParams();
  const tier = params.get("tier") ?? "foundational";
  const redirect = params.get("redirect");

  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    designation: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(redirect || `/intelligence/checkout?tier=${tier}`, { replace: true });
    });
  }, [navigate, redirect, tier]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

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

      const redirectUrl = `${window.location.origin}/intelligence/checkout?tier=${tier}`;
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { emailRedirectTo: redirectUrl },
      });

      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }

      if (data.user) {
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

      toast({ title: "Account created", description: "Continue to membership selection." });
      navigate(`/intelligence/checkout?tier=${tier}`);
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
              Minimum 12 characters with uppercase, lowercase, number, and special character.
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
