// Edge Function: get-payment-status
//
// Public, read-only status lookup for the post-checkout result screen.
// Given a Razorpay order_id (which the frontend already knows), return a
// minimal status payload so the UI can show pending / success / failed
// without exposing any PII.
//
// Response shape:
//   {
//     status: 'pending' | 'success' | 'failed' | 'unknown',
//     order_id: string,
//     plan_id?: 'industry_reader' | 'analyst_lens',
//     plan_label?: string,
//     billing_cycle?: 'monthly' | 'annual',
//     amount_inr?: number,
//     expires_at?: string | null,
//     payment_id?: string,
//     // Razorpay-side status, only used to disambiguate when our DB has
//     // not yet caught up (e.g. UPI confirmation still pending).
//     provider_order_status?: string,
//   }
//
// Resolution order:
//   1. Look at tcd_payments for any row with provider_payment_id linked to
//      this order via tcd_subscriptions.provider_subscription_id.
//      - status='succeeded' -> success (with subscription expires_at).
//      - status='failed'    -> failed.
//   2. If nothing found, query Razorpay /v1/orders/{id} directly.
//      - status='paid'      -> pending (DB will catch up via webhook).
//      - status='attempted' -> pending.
//      - status='created'   -> pending.
//      - other              -> unknown.
//   3. If Razorpay returns 4xx for the order id -> unknown.
//
// We intentionally do NOT return the customer email, name, phone or
// company. The order_id alone is shareable in the URL.

import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ORDER_ID_RE = /^order_[A-Za-z0-9]{6,40}$/;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const keyId = Deno.env.get('RAZORPAY_KEY_ID');
  const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

  if (!supabaseUrl || !serviceRoleKey || !keyId || !keySecret) {
    console.error('get-payment-status: missing required env');
    return jsonResponse({ error: 'Server misconfigured' }, 500);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const orderId = typeof body?.order_id === 'string' ? body.order_id.trim() : '';
  if (!orderId || !ORDER_ID_RE.test(orderId)) {
    return jsonResponse({ error: 'Invalid order_id' }, 400);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 1) Check our DB - the source of truth once webhook/verify has run.
  const { data: subscription } = await admin
    .from('tcd_subscriptions')
    .select('id, status, expires_at, admin_notes, tier:tcd_tiers(slug, name)')
    .eq('provider', 'razorpay')
    .eq('provider_subscription_id', orderId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (subscription) {
    const { data: payment } = await admin
      .from('tcd_payments')
      .select('status, amount_inr, provider_payment_id, metadata')
      .eq('subscription_id', subscription.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const meta = (payment?.metadata ?? {}) as Record<string, unknown>;
    const planId = (meta.plan_id as string | undefined) ?? undefined;
    const planLabel = (meta.plan_label as string | undefined) ?? undefined;
    const billingCycle = (meta.billing_cycle as string | undefined) ?? undefined;

    if (payment?.status === 'succeeded' && subscription.status === 'active') {
      return jsonResponse({
        status: 'success',
        order_id: orderId,
        plan_id: planId,
        plan_label: planLabel,
        billing_cycle: billingCycle,
        amount_inr: payment.amount_inr ? Number(payment.amount_inr) : undefined,
        expires_at: subscription.expires_at,
        payment_id: payment.provider_payment_id ?? undefined,
      });
    }

    if (payment?.status === 'failed') {
      return jsonResponse({
        status: 'failed',
        order_id: orderId,
        plan_id: planId,
        plan_label: planLabel,
        billing_cycle: billingCycle,
      });
    }
    // Subscription row exists but payment row not yet succeeded -> pending.
    return jsonResponse({
      status: 'pending',
      order_id: orderId,
      plan_id: planId,
      plan_label: planLabel,
      billing_cycle: billingCycle,
    });
  }

  // 2) Fall back to Razorpay - tells us if the order even exists and whether
  // the customer at least started (or completed) a payment attempt.
  const auth = btoa(`${keyId}:${keySecret}`);
  const orderRes = await fetch(
    `https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`,
    { headers: { Authorization: `Basic ${auth}` } },
  );
  const orderJson: any = await orderRes.json().catch(() => ({}));

  if (!orderRes.ok) {
    if (orderRes.status === 400 || orderRes.status === 404) {
      return jsonResponse({ status: 'unknown', order_id: orderId });
    }
    console.error('get-payment-status: Razorpay order fetch failed', orderRes.status, orderJson);
    return jsonResponse({ status: 'pending', order_id: orderId });
  }

  const providerStatus: string = orderJson?.status ?? 'unknown';
  const planIdFromNotes = orderJson?.notes?.plan_id as string | undefined;
  const planLabelFromNotes = orderJson?.notes?.plan_label as string | undefined;
  const billingCycleFromNotes = orderJson?.notes?.billing_cycle as string | undefined;
  const amountInr =
    typeof orderJson?.amount === 'number' ? orderJson.amount / 100 : undefined;

  // Razorpay considers an order 'paid' once at least one payment is captured,
  // but our DB hasn't recorded it yet -> pending until webhook lands.
  let status: 'pending' | 'failed' | 'unknown' = 'pending';
  if (providerStatus === 'created' || providerStatus === 'attempted' || providerStatus === 'paid') {
    status = 'pending';
  } else if (providerStatus === 'failed') {
    status = 'failed';
  } else {
    status = 'unknown';
  }

  return jsonResponse({
    status,
    order_id: orderId,
    plan_id: planIdFromNotes,
    plan_label: planLabelFromNotes,
    billing_cycle: billingCycleFromNotes,
    amount_inr: amountInr,
    provider_order_status: providerStatus,
  });
});
