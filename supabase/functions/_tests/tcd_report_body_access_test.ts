// End-to-end gating test for tcd_get_report_body.
//
// Verifies the security model:
//   1) Anonymous PostgREST requests cannot EXECUTE tcd_get_report_body or
//      tcd_user_has_report_access (EXECUTE not granted to `anon`).
//   2) Authenticated users without an active subscription get NULL from
//      tcd_get_report_body (function short-circuits on tcd_user_has_report_access).
//   3) Public metadata columns (title, slug) remain readable for anon.
//
// Run via: supabase--test_edge_functions { functions: ["_tests"] }

import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;
const TEST_SLUG = "launch-note-tcd-intelligence";

const anonClient = () =>
  createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

Deno.test("anon cannot execute tcd_get_report_body (EXECUTE revoked)", async () => {
  const { data, error } = await anonClient().rpc("tcd_get_report_body", { _slug: TEST_SLUG });
  assertEquals(data, null);
  assert(error, "anon RPC must be blocked");
  assert(
    /permission denied|42501/i.test(error!.message + " " + (error as any)?.code),
    `expected permission-denied, got: ${error!.message}`,
  );
});

Deno.test("anon cannot execute tcd_user_has_report_access", async () => {
  const { data, error } = await anonClient().rpc("tcd_user_has_report_access", {
    _report_slug: TEST_SLUG,
  });
  assertEquals(data, null);
  assert(error, "anon access-check RPC must be blocked");
  assert(/permission denied|42501/i.test(error!.message + " " + (error as any)?.code));
});

Deno.test("anon: public metadata columns are readable", async () => {
  const { data, error } = await anonClient()
    .from("tcd_reports")
    .select("slug,title,required_tier_rank,is_published")
    .eq("slug", TEST_SLUG)
    .maybeSingle();
  assertEquals(error, null, `unexpected error: ${error?.message}`);
  assert(data && (data as any).slug === TEST_SLUG);
});

Deno.test("authenticated user without active tier: RPC returns null", async () => {
  const sb = anonClient();
  const email = `e2e_${crypto.randomUUID()}@example.com`;
  const password = `Test-${crypto.randomUUID()}-Aa1!`;
  const signup = await sb.auth.signUp({ email, password });

  if (signup.error || !signup.data.session) {
    console.warn(
      `Skipping authenticated path: signup not auto-confirmed (${signup.error?.message ?? "no session"}).`,
    );
    return;
  }

  try {
    const body = await sb.rpc("tcd_get_report_body", { _slug: TEST_SLUG });
    assertEquals(body.error, null, `unexpected error: ${body.error?.message}`);
    assertEquals(body.data, null, "non-subscriber must not receive body_html");

    const access = await sb.rpc("tcd_user_has_report_access", { _report_slug: TEST_SLUG });
    assertEquals(access.error, null);
    assertEquals(access.data, false);
  } finally {
    await sb.auth.signOut();
  }
});
