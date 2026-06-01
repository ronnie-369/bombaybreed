// End-to-end security test: ensures tcd_get_report_body and direct column
// access on tcd_reports.body_html are properly gated.
//
// Verifies:
//   1) Anonymous PostgREST calls to rpc("tcd_get_report_body") return null
//      (function short-circuits via tcd_user_has_report_access -> auth.uid()).
//   2) Authenticated users without an active subscription also get null.
//   3) Direct SELECT of body_html via PostgREST is denied (column-level revoke).
//   4) Public metadata columns (title, slug) remain readable.

import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;
const TEST_SLUG = "launch-note-tcd-intelligence";

function anonClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

Deno.test("anon: tcd_get_report_body returns null (no auth.uid)", async () => {
  const sb = anonClient();
  const { data, error } = await sb.rpc("tcd_get_report_body", { _slug: TEST_SLUG });
  assertEquals(error, null, `unexpected error: ${error?.message}`);
  assertEquals(data, null, "anon must not receive body_html");
});

Deno.test("anon: tcd_user_has_report_access returns false", async () => {
  const sb = anonClient();
  const { data, error } = await sb.rpc("tcd_user_has_report_access", { _report_slug: TEST_SLUG });
  assertEquals(error, null);
  assertEquals(data, false);
});

Deno.test("anon: direct SELECT of body_html is denied at column level", async () => {
  const sb = anonClient();
  const { data, error } = await sb.from("tcd_reports").select("body_html").eq("slug", TEST_SLUG);
  assert(error !== null, "expected permission error selecting body_html as anon");
  assertEquals(data, null);
  // PostgREST surfaces Postgres 42501 (insufficient_privilege)
  assert(
    /permission|denied|42501/i.test(error!.message + " " + (error as any)?.code),
    `expected permission-denied error, got: ${error!.message}`,
  );
});

Deno.test("anon: metadata columns remain readable", async () => {
  const sb = anonClient();
  const { data, error } = await sb
    .from("tcd_reports")
    .select("slug,title,required_tier_rank,is_published")
    .eq("slug", TEST_SLUG)
    .maybeSingle();
  assertEquals(error, null, `unexpected error: ${error?.message}`);
  assert(data, "metadata row should be readable");
  assertEquals((data as any).slug, TEST_SLUG);
});

Deno.test("authenticated (no membership): tcd_get_report_body returns null", async () => {
  const sb = anonClient();
  const email = `e2e_${crypto.randomUUID()}@example.com`;
  const password = `Test-${crypto.randomUUID()}-Aa1!`;
  const signup = await sb.auth.signUp({ email, password });
  if (signup.error || !signup.data.session) {
    console.warn(
      `Skipping authenticated-path assertion (signup not auto-confirmed): ${signup.error?.message ?? "no session"}`,
    );
    return;
  }
  const { data, error } = await sb.rpc("tcd_get_report_body", { _slug: TEST_SLUG });
  assertEquals(error, null, `unexpected error: ${error?.message}`);
  assertEquals(data, null, "authenticated user without active tier must not get body");

  const access = await sb.rpc("tcd_user_has_report_access", { _report_slug: TEST_SLUG });
  assertEquals(access.data, false);

  await sb.auth.signOut();
});
