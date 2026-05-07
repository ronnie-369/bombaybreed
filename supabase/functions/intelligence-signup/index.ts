import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const allowedOrigins = new Set([
  "https://bombaybreed.com",
  "https://bombaybreed.lovable.app",
  "https://id-preview--5955eacd-3e3f-43a9-8f9e-083589abc0bd.lovable.app",
  "http://localhost:5173",
]);

const isValidEmail = (email: string) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
const clean = (value: unknown, max = 200) =>
  typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function appOrigin(raw: unknown): string {
  if (typeof raw !== "string") return "https://bombaybreed.com";
  try {
    const url = new URL(raw);
    const origin = url.origin;
    if (allowedOrigins.has(origin) || origin.endsWith(".lovable.app")) return origin;
  } catch {
    // fall through
  }
  return "https://bombaybreed.com";
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return jsonResponse({ error: "Server misconfigured" }, 500);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const action = body.action === "resend" ? "resend" : "signup";
  const email = clean(body.email, 255)?.toLowerCase() ?? "";
  const password = clean(body.password, 256) ?? "";
  const fullName = clean(body.fullName) ?? email.split("@")[0] ?? "Member";
  const company = clean(body.company);
  const designation = clean(body.designation);
  const tier = body.tier === "professional" ? "professional" : "foundational";
  const billing = body.billing === "monthly" ? "monthly" : "annual";
  const origin = appOrigin(body.origin);

  if (!isValidEmail(email)) return jsonResponse({ error: "Valid email is required" }, 400);
  if (action === "signup" && password.length < 8) return jsonResponse({ error: "Password must be at least 8 characters" }, 400);

  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const linkType: "signup" | "magiclink" = action === "signup" ? "signup" : "magiclink";
  let canSetPassword = action === "signup";

  let generated = await admin.auth.admin.generateLink(
    linkType === "signup"
      ? {
          type: "signup",
          email,
          password,
          options: {
            data: { full_name: fullName, company, designation, intended_tier: tier, intended_billing: billing },
          },
        }
      : { type: "magiclink", email },
  );

  if (generated.error && action === "signup") {
    canSetPassword = false;
    generated = await admin.auth.admin.generateLink({ type: "magiclink", email });
  }

  if (generated.error || !generated.data.user?.id) {
    return jsonResponse({ error: generated.error?.message ?? "Could not create access link" }, 400);
  }

  if (generated.data.user?.id) {
    await admin.from("tcd_subscribers").upsert(
      { user_id: generated.data.user.id, email, full_name: fullName, company, designation },
      { onConflict: "user_id" },
    );
  }

  if (generated.data.user?.id) {
    const updatePayload = canSetPassword
      ? {
          email_confirm: true,
          password,
          user_metadata: { full_name: fullName, company, designation, intended_tier: tier, intended_billing: billing },
        }
      : {
          email_confirm: true,
          user_metadata: { full_name: fullName, company, designation, intended_tier: tier, intended_billing: billing },
        };
    const { error: confirmError } = await admin.auth.admin.updateUserById(generated.data.user.id, updatePayload);
    if (confirmError) return jsonResponse({ error: confirmError.message }, 400);
  }

  return jsonResponse({ success: true, autoConfirmed: true });
});
