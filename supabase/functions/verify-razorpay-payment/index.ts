// Edge Function: verify-razorpay-payment
//
// Verifies a Razorpay checkout success payload and then activates the
// selected Premium Access Lounge plan as a real subscription.
//
// Request body (sent by the frontend Razorpay handler callback):
//   {
//     razorpay_order_id: string,
//     razorpay_payment_id: string,
//     razorpay_signature: string,
//     customer: { email: string, full_name?: string, company?: string, phone?: string }
//   }
//
// Flow:
//   1. HMAC-SHA256(order_id|payment_id, RAZORPAY_KEY_SECRET) === signature
//      -> standard Razorpay verification, the only trustworthy check.
//   2. GET /v1/orders/{order_id} from Razorpay to recover the planId,
//      billingCycle and amount we set as notes when creating the order.
//      (Don't trust client-supplied plan/amount.)
//   3. Resolve the matching tcd_tier row, upsert a tcd_subscribers row
//      keyed on the customer email, cancel any prior active subscriptions
//      for that subscriber, then insert a new active tcd_subscriptions
//      row + a succeeded tcd_payments row. This mirrors the activation
//      logic in the tcd_mock_activate_subscription RPC, but uses the
//      service role so it works for guest payers (no auth.uid()).
//
// Pricing/plan -> tier mapping. Both Lounge plans are billed monthly inside
// Razorpay (single one-off charge per cycle) but the existing tcd_tiers rows
// are all 'annual', so we map onto whichever existing tier rank best
// corresponds to the access level: industry_reader -> Foundational (rank 1),
// analyst_lens -> Professional (rank 2). Annual cycles get a 12-month
// expiry; monthly cycles get a 1-month expiry.

import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type PlanId = 'enthusiasts' | 'industry_reader' | 'analyst_lens';
type BillingCycle = 'monthly' | 'annual';

// Same plan catalogue as create-razorpay-order, in paise.
const PLANS: Record<PlanId, { tierSlug: string; monthly_paise: number; annual_paise: number }> = {
  enthusiasts: {
    tierSlug: 'enthusiasts',
    monthly_paise: 425 * 100,
    annual_paise: 425 * 12 * 100, // unused; create-razorpay-order rejects annual for this plan
  },
  industry_reader: {
    tierSlug: 'foundational',
    monthly_paise: 10_000 * 100,
    annual_paise: 7_000 * 12 * 100,
  },
  analyst_lens: {
    tierSlug: 'professional',
    monthly_paise: 50_000 * 100,
    annual_paise: 35_000 * 12 * 100,
  },
};

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function hmacSha256Hex(key: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Constant-time string compare to avoid timing leaks during signature check.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  const keyId = Deno.env.get('RAZORPAY_KEY_ID');
  const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!keyId || !keySecret || !supabaseUrl || !serviceRoleKey) {
    console.error('verify-razorpay-payment: missing required env');
    return jsonResponse({ error: 'Server misconfigured' }, 500);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    customer,
  } = body ?? {};

  if (
    typeof razorpay_order_id !== 'string' ||
    typeof razorpay_payment_id !== 'string' ||
    typeof razorpay_signature !== 'string' ||
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    return jsonResponse({ error: 'Missing Razorpay verification fields' }, 400);
  }

  const customerEmail =
    typeof customer?.email === 'string' ? customer.email.trim().toLowerCase() : '';
  const customerName =
    typeof customer?.full_name === 'string'
      ? customer.full_name.trim().slice(0, 200)
      : '';
  const customerCompany =
    typeof customer?.company === 'string' ? customer.company.trim().slice(0, 200) : null;
  const customerPhone =
    typeof customer?.phone === 'string' ? customer.phone.trim().slice(0, 40) : null;

  if (!customerEmail || customerEmail.length > 255 || !EMAIL_RE.test(customerEmail)) {
    return jsonResponse({ error: 'Valid customer email is required' }, 400);
  }
  if (!customerName) {
    return jsonResponse({ error: 'Customer name is required' }, 400);
  }

  // 1) Signature verification
  const expectedSig = await hmacSha256Hex(
    keySecret,
    `${razorpay_order_id}|${razorpay_payment_id}`,
  );
  if (!safeEqual(expectedSig, razorpay_signature)) {
    console.warn('verify-razorpay-payment: signature mismatch', {
      order: razorpay_order_id,
      payment: razorpay_payment_id,
    });
    return jsonResponse({ error: 'Invalid payment signature' }, 400);
  }

  // 2) Recover trusted plan + amount from the order itself
  const auth = btoa(`${keyId}:${keySecret}`);
  const orderRes = await fetch(
    `https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`,
    { headers: { Authorization: `Basic ${auth}` } },
  );
  const orderJson: any = await orderRes.json().catch(() => ({}));
  if (!orderRes.ok) {
    console.error('verify-razorpay-payment: failed to fetch order', orderRes.status, orderJson);
    return jsonResponse({ error: 'Could not verify order with provider' }, 502);
  }
  if (orderJson.status !== 'paid') {
    return jsonResponse(
      { error: `Order is not paid (status: ${orderJson.status ?? 'unknown'})` },
      400,
    );
  }

  const planId = orderJson?.notes?.plan_id as PlanId | undefined;
  const billingCycle = orderJson?.notes?.billing_cycle as BillingCycle | undefined;
  const planLabel = (orderJson?.notes?.plan_label as string | undefined) ?? '';
  if (planId !== 'enthusiasts' && planId !== 'industry_reader' && planId !== 'analyst_lens') {
    return jsonResponse({ error: 'Unrecognised plan on order' }, 400);
  }
  if (billingCycle !== 'monthly' && billingCycle !== 'annual') {
    return jsonResponse({ error: 'Unrecognised billing cycle on order' }, 400);
  }
    return jsonResponse({ error: 'Unrecognised billing cycle on order' }, 400);
  }

  const plan = PLANS[planId];
  const expectedPaise = billingCycle === 'annual' ? plan.annual_paise : plan.monthly_paise;
  if (Number(orderJson.amount) !== expectedPaise) {
    console.error('verify-razorpay-payment: amount mismatch', {
      orderAmount: orderJson.amount,
      expectedPaise,
      planId,
      billingCycle,
    });
    return jsonResponse({ error: 'Order amount does not match plan' }, 400);
  }

  // 3) Activate the subscription (service role, bypasses RLS)
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Resolve target tier
  const { data: tier, error: tierErr } = await admin
    .from('tcd_tiers')
    .select('id, slug, name, price_inr')
    .eq('slug', plan.tierSlug)
    .eq('is_active', true)
    .maybeSingle();
  if (tierErr || !tier) {
    console.error('verify-razorpay-payment: tier lookup failed', tierErr);
    return jsonResponse({ error: 'Subscription tier not found' }, 500);
  }

  // Upsert subscriber on email. tcd_subscribers.user_id is NOT NULL today,
  // but guest checkouts won't have an auth user yet, so we generate a
  // placeholder UUID for them. When the same email later signs up, the
  // admin reconciliation flow can repoint user_id without breaking history.
  const { data: existingSub } = await admin
    .from('tcd_subscribers')
    .select('id, user_id')
    .eq('email', customerEmail)
    .maybeSingle();

  let subscriberId: string;
  if (existingSub) {
    subscriberId = existingSub.id;
    await admin
      .from('tcd_subscribers')
      .update({
        full_name: customerName || undefined,
        company: customerCompany ?? undefined,
        phone: customerPhone ?? undefined,
      })
      .eq('id', subscriberId);
  } else {
    const placeholderUserId = crypto.randomUUID();
    const { data: created, error: createErr } = await admin
      .from('tcd_subscribers')
      .insert({
        user_id: placeholderUserId,
        email: customerEmail,
        full_name: customerName,
        company: customerCompany,
        phone: customerPhone,
      })
      .select('id')
      .single();
    if (createErr || !created) {
      console.error('verify-razorpay-payment: subscriber insert failed', createErr);
      return jsonResponse({ error: 'Could not create subscriber record' }, 500);
    }
    subscriberId = created.id;
  }

  // Cancel prior active subscriptions for this subscriber so rank lookups
  // remain deterministic (mirrors tcd_mock_activate_subscription).
  await admin
    .from('tcd_subscriptions')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('subscriber_id', subscriberId)
    .eq('status', 'active');

  const now = new Date();
  const expires = new Date(now);
  if (billingCycle === 'annual') {
    expires.setFullYear(expires.getFullYear() + 1);
  } else {
    expires.setMonth(expires.getMonth() + 1);
  }

  const { data: subscription, error: subErr } = await admin
    .from('tcd_subscriptions')
    .insert({
      subscriber_id: subscriberId,
      tier_id: tier.id,
      status: 'active',
      starts_at: now.toISOString(),
      expires_at: expires.toISOString(),
      provider: 'razorpay',
      provider_subscription_id: razorpay_order_id,
      admin_notes: `Lounge plan: ${planLabel || planId} (${billingCycle})`,
    })
    .select('id')
    .single();
  if (subErr || !subscription) {
    console.error('verify-razorpay-payment: subscription insert failed', subErr);
    return jsonResponse({ error: 'Could not activate subscription' }, 500);
  }

  const amountInr = expectedPaise / 100;
  const { error: payErr } = await admin.from('tcd_payments').insert({
    subscription_id: subscription.id,
    amount_inr: amountInr,
    currency: 'INR',
    provider: 'razorpay',
    provider_payment_id: razorpay_payment_id,
    status: 'succeeded',
    paid_at: now.toISOString(),
    metadata: {
      order_id: razorpay_order_id,
      plan_id: planId,
      plan_label: planLabel,
      billing_cycle: billingCycle,
    },
  });
  if (payErr) {
    // Subscription already saved - log but don't fail the user.
    console.error('verify-razorpay-payment: payment insert failed', payErr);
  }

  return jsonResponse({
    success: true,
    subscription_id: subscription.id,
    tier: { id: tier.id, slug: tier.slug, name: tier.name },
    plan: { id: planId, label: planLabel, billingCycle, amount_inr: amountInr },
    expires_at: expires.toISOString(),
  });
});
