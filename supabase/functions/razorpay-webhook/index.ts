// Edge Function: razorpay-webhook
//
// Server-to-server webhook from Razorpay. This is the durable, source-of-truth
// activation path - the in-browser verify-razorpay-payment call is best-effort
// (the user can close the tab before it fires), but Razorpay will keep
// retrying this webhook until we 2xx, so subscriptions are guaranteed to
// activate for any successfully captured payment.
//
// Configure in Razorpay Dashboard -> Settings -> Webhooks:
//   URL    : https://<project-ref>.functions.supabase.co/razorpay-webhook
//   Secret : the value stored in RAZORPAY_WEBHOOK_SECRET
//   Events : payment.captured, order.paid
//
// Verification:
//   HMAC-SHA256(raw_body, RAZORPAY_WEBHOOK_SECRET) == X-Razorpay-Signature
//   (Razorpay docs: https://razorpay.com/docs/webhooks/validate-test/)
//
// Idempotency:
//   We dedupe on tcd_payments.provider_payment_id. If a payment row already
//   exists with status 'succeeded' for the same razorpay payment id, we
//   return 200 without touching the database.

import { createClient } from 'jsr:@supabase/supabase-js@2';

type PlanId = 'enthusiasts' | 'industry_reader' | 'analyst_lens';
type BillingCycle = 'monthly' | 'annual';

const PLANS: Record<PlanId, { tierSlug: string; monthly_paise: number; annual_paise: number }> = {
  enthusiasts: {
    tierSlug: 'enthusiasts',
    monthly_paise: 85 * 100,
    annual_paise: 85 * 12 * 100, // unused; monthly-only
  },
  industry_reader: {
    tierSlug: 'foundational',
    monthly_paise: 850 * 100,
    annual_paise: 850 * 12 * 100, // unused
  },
  analyst_lens: {
    tierSlug: 'professional',
    monthly_paise: 1_700 * 100,
    annual_paise: 1_700 * 12 * 100, // unused
  },
};

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
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

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

interface ActivationInput {
  planId: PlanId;
  billingCycle: BillingCycle;
  planLabel: string;
  orderId: string;
  paymentId: string;
  amountPaise: number;
  email: string;
  fullName: string;
  company: string | null;
  phone: string | null;
}

async function activateSubscription(
  admin: ReturnType<typeof createClient>,
  input: ActivationInput,
): Promise<{ ok: true; alreadyProcessed?: boolean } | { ok: false; error: string; status: number }> {
  // Idempotency: skip if we've already recorded this payment as succeeded.
  const { data: existingPayment } = await admin
    .from('tcd_payments')
    .select('id, status')
    .eq('provider', 'razorpay')
    .eq('provider_payment_id', input.paymentId)
    .maybeSingle();
  if (existingPayment && existingPayment.status === 'succeeded') {
    return { ok: true, alreadyProcessed: true };
  }

  const plan = PLANS[input.planId];
  const expectedPaise =
    input.billingCycle === 'annual' ? plan.annual_paise : plan.monthly_paise;
  if (input.amountPaise !== expectedPaise) {
    console.error('razorpay-webhook: amount mismatch', {
      paymentId: input.paymentId,
      orderAmount: input.amountPaise,
      expectedPaise,
      planId: input.planId,
      billingCycle: input.billingCycle,
    });
    return { ok: false, error: 'Order amount does not match plan', status: 400 };
  }

  const { data: tier, error: tierErr } = await admin
    .from('tcd_tiers')
    .select('id, slug, name')
    .eq('slug', plan.tierSlug)
    .eq('is_active', true)
    .maybeSingle();
  if (tierErr || !tier) {
    console.error('razorpay-webhook: tier lookup failed', tierErr);
    return { ok: false, error: 'Subscription tier not found', status: 500 };
  }

  // Upsert subscriber on email.
  const { data: existingSub } = await admin
    .from('tcd_subscribers')
    .select('id')
    .eq('email', input.email)
    .maybeSingle();

  let subscriberId: string;
  if (existingSub) {
    subscriberId = existingSub.id as string;
    await admin
      .from('tcd_subscribers')
      .update({
        full_name: input.fullName || undefined,
        company: input.company ?? undefined,
        phone: input.phone ?? undefined,
      })
      .eq('id', subscriberId);
  } else {
    const placeholderUserId = crypto.randomUUID();
    const { data: created, error: createErr } = await admin
      .from('tcd_subscribers')
      .insert({
        user_id: placeholderUserId,
        email: input.email,
        full_name: input.fullName || input.email.split('@')[0],
        company: input.company,
        phone: input.phone,
      })
      .select('id')
      .single();
    if (createErr || !created) {
      console.error('razorpay-webhook: subscriber insert failed', createErr);
      return { ok: false, error: 'Could not create subscriber record', status: 500 };
    }
    subscriberId = created.id as string;
  }

  // If verify-razorpay-payment already activated a subscription for this
  // order, just attach a payment record and exit. Otherwise create a new one.
  const { data: existingForOrder } = await admin
    .from('tcd_subscriptions')
    .select('id, status')
    .eq('provider', 'razorpay')
    .eq('provider_subscription_id', input.orderId)
    .eq('status', 'active')
    .maybeSingle();

  let subscriptionId: string;
  if (existingForOrder) {
    subscriptionId = existingForOrder.id as string;
  } else {
    // Cancel any prior active subs so rank lookups remain deterministic.
    await admin
      .from('tcd_subscriptions')
      .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
      .eq('subscriber_id', subscriberId)
      .eq('status', 'active');

    const now = new Date();
    const expires = new Date(now);
    if (input.billingCycle === 'annual') {
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
        provider_subscription_id: input.orderId,
        admin_notes: `Lounge plan: ${input.planLabel || input.planId} (${input.billingCycle}) - via webhook`,
      })
      .select('id')
      .single();
    if (subErr || !subscription) {
      console.error('razorpay-webhook: subscription insert failed', subErr);
      return { ok: false, error: 'Could not activate subscription', status: 500 };
    }
    subscriptionId = subscription.id as string;
  }

  // Record (or upgrade) the payment row.
  if (existingPayment) {
    await admin
      .from('tcd_payments')
      .update({
        status: 'succeeded',
        paid_at: new Date().toISOString(),
        amount_inr: input.amountPaise / 100,
        subscription_id: subscriptionId,
      })
      .eq('id', existingPayment.id);
  } else {
    const { error: payErr } = await admin.from('tcd_payments').insert({
      subscription_id: subscriptionId,
      amount_inr: input.amountPaise / 100,
      currency: 'INR',
      provider: 'razorpay',
      provider_payment_id: input.paymentId,
      status: 'succeeded',
      paid_at: new Date().toISOString(),
      metadata: {
        order_id: input.orderId,
        plan_id: input.planId,
        plan_label: input.planLabel,
        billing_cycle: input.billingCycle,
        source: 'webhook',
      },
    });
    if (payErr) {
      console.error('razorpay-webhook: payment insert failed', payErr);
    }
  }

  return { ok: true };
}

Deno.serve(async (req) => {
  // Razorpay sends POST only - no preflight, no CORS needed.
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
  const keyId = Deno.env.get('RAZORPAY_KEY_ID');
  const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!webhookSecret || !keyId || !keySecret || !supabaseUrl || !serviceRoleKey) {
    console.error('razorpay-webhook: missing required env');
    return jsonResponse({ error: 'Server misconfigured' }, 500);
  }

  // 1) Read the raw body (required for signature check).
  const rawBody = await req.text();
  const signature = req.headers.get('x-razorpay-signature') ?? '';

  // Try to peek at the order id so signature failures can be surfaced to the
  // user on the result screen. Parsing the raw body before verification is
  // safe because we don't trust the contents - we only use order_id as a
  // lookup key for the audit log.
  let peekedOrderId: string | null = null;
  try {
    const peek = JSON.parse(rawBody);
    const id =
      peek?.payload?.payment?.entity?.order_id ??
      peek?.payload?.order?.entity?.id ??
      null;
    if (typeof id === 'string' && /^order_[A-Za-z0-9]{6,40}$/.test(id)) {
      peekedOrderId = id;
    }
  } catch {
    /* ignore - signature step will reject anyway */
  }

  const adminForLog = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  if (!signature) {
    await adminForLog.from('tcd_order_attempts').insert({
      order_id: peekedOrderId,
      status: 'failed',
      error_message: 'Webhook missing x-razorpay-signature header',
      request_metadata: { source: 'razorpay-webhook', stage: 'signature' },
    }).then(({ error }) => { if (error) console.error('audit insert failed', error); });
    return jsonResponse({ error: 'Missing signature' }, 400);
  }
  const expected = await hmacSha256Hex(webhookSecret, rawBody);
  if (!safeEqual(expected, signature)) {
    console.warn('razorpay-webhook: signature mismatch');
    await adminForLog.from('tcd_order_attempts').insert({
      order_id: peekedOrderId,
      status: 'failed',
      error_message: 'Webhook signature verification failed',
      request_metadata: { source: 'razorpay-webhook', stage: 'signature' },
    }).then(({ error }) => { if (error) console.error('audit insert failed', error); });
    return jsonResponse({ error: 'Invalid signature' }, 401);
  }

  // 2) Parse payload.
  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const event = payload?.event as string | undefined;
  if (!event) return jsonResponse({ error: 'Missing event' }, 400);

  // We only act on successful capture events. Ack everything else with 200
  // so Razorpay does not keep retrying.
  if (event !== 'payment.captured' && event !== 'order.paid') {
    console.log('razorpay-webhook: ignoring event', event);
    return jsonResponse({ ok: true, ignored: event });
  }

  // Both event shapes give us the payment entity; order.paid also gives us
  // the order entity directly.
  const paymentEntity = payload?.payload?.payment?.entity ?? null;
  const orderEntityFromEvent = payload?.payload?.order?.entity ?? null;

  if (!paymentEntity) {
    console.error('razorpay-webhook: no payment entity in payload', event);
    return jsonResponse({ error: 'No payment in payload' }, 400);
  }

  const paymentId: string = paymentEntity.id;
  const orderId: string = paymentEntity.order_id;
  const status: string = paymentEntity.status;
  if (!paymentId || !orderId) {
    return jsonResponse({ error: 'Payment missing ids' }, 400);
  }
  if (status !== 'captured') {
    console.log('razorpay-webhook: payment not captured, status:', status);
    return jsonResponse({ ok: true, ignored: 'status_not_captured' });
  }

  // 3) Recover trusted plan from the ORDER (notes set at creation time).
  // Prefer the order entity from the event to avoid an extra API call.
  let orderJson: any = orderEntityFromEvent;
  if (!orderJson || !orderJson.notes) {
    const auth = btoa(`${keyId}:${keySecret}`);
    const orderRes = await fetch(
      `https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`,
      { headers: { Authorization: `Basic ${auth}` } },
    );
    orderJson = await orderRes.json().catch(() => ({}));
    if (!orderRes.ok) {
      console.error('razorpay-webhook: order fetch failed', orderRes.status, orderJson);
      // 5xx so Razorpay retries.
      return jsonResponse({ error: 'Could not fetch order' }, 502);
    }
  }

  const planId = orderJson?.notes?.plan_id as PlanId | undefined;
  const billingCycle = orderJson?.notes?.billing_cycle as BillingCycle | undefined;
  const planLabel = (orderJson?.notes?.plan_label as string | undefined) ?? '';
  if (planId !== 'enthusiasts' && planId !== 'industry_reader' && planId !== 'analyst_lens') {
    console.warn('razorpay-webhook: unrecognised plan on order', { orderId, planId });
    // Not our order shape - ack so we don't get retried forever.
    return jsonResponse({ ok: true, ignored: 'unknown_plan' });
  }
  if (billingCycle !== 'monthly' && billingCycle !== 'annual') {
    return jsonResponse({ ok: true, ignored: 'unknown_billing_cycle' });
  }

  // 4) Customer details. Prefer order notes (set by the frontend), fall back
  // to the payment entity's email/contact.
  const noteEmail =
    typeof orderJson?.notes?.u_email === 'string' ? orderJson.notes.u_email : '';
  const emailRaw =
    (noteEmail || (typeof paymentEntity.email === 'string' ? paymentEntity.email : ''))
      .trim()
      .toLowerCase();

  if (!emailRaw || !EMAIL_RE.test(emailRaw) || emailRaw.length > 255) {
    console.error('razorpay-webhook: invalid customer email', { paymentId, emailRaw });
    return jsonResponse({ error: 'Valid customer email required' }, 400);
  }

  const fullName =
    (typeof orderJson?.notes?.u_full_name === 'string'
      ? orderJson.notes.u_full_name
      : '') ||
    (typeof paymentEntity.contact === 'string' ? '' : '') ||
    emailRaw.split('@')[0];

  const company =
    typeof orderJson?.notes?.u_company === 'string' && orderJson.notes.u_company
      ? String(orderJson.notes.u_company).slice(0, 200)
      : null;

  const phone =
    (typeof orderJson?.notes?.u_phone === 'string' && orderJson.notes.u_phone) ||
    (typeof paymentEntity.contact === 'string' ? paymentEntity.contact : '') ||
    '';

  // 5) Activate / dedupe.
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const result = await activateSubscription(admin, {
    planId,
    billingCycle,
    planLabel,
    orderId,
    paymentId,
    amountPaise: Number(paymentEntity.amount),
    email: emailRaw,
    fullName: String(fullName).slice(0, 200),
    company,
    phone: phone ? String(phone).slice(0, 40) : null,
  });

  if (!result.ok) {
    return jsonResponse({ error: result.error }, result.status);
  }

  // Fire-and-forget admin notification on a NEW activation (skip duplicates).
  if (!result.alreadyProcessed) {
    const resendKey = Deno.env.get('RESEND_API_KEY');
    const notifyTo = Deno.env.get('SUBSCRIPTION_NOTIFY_TO') || 'ronnie@bombaybreed.com';
    if (resendKey) {
      const amountInr = (Number(paymentEntity.amount) || 0) / 100;
      const inrFmt = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amountInr);
      const esc = (s: unknown) =>
        String(s ?? '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      const subject = `New subscription: ${esc(planLabel || planId)} (${esc(billingCycle)}) - INR ${inrFmt}`;
      const html = `
        <h2>New paid subscription</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td><b>Plan</b></td><td>${esc(planLabel || planId)}</td></tr>
          <tr><td><b>Billing</b></td><td>${esc(billingCycle)}</td></tr>
          <tr><td><b>Amount</b></td><td>INR ${inrFmt}</td></tr>
          <tr><td><b>Email</b></td><td>${esc(emailRaw)}</td></tr>
          <tr><td><b>Name</b></td><td>${esc(String(fullName).slice(0, 200))}</td></tr>
          <tr><td><b>Company</b></td><td>${company ? esc(company) : '-'}</td></tr>
          <tr><td><b>Phone</b></td><td>${phone ? esc(String(phone).slice(0, 40)) : '-'}</td></tr>
          <tr><td><b>Razorpay order</b></td><td>${esc(orderId)}</td></tr>
          <tr><td><b>Razorpay payment</b></td><td>${esc(paymentId)}</td></tr>
        </table>`;
      try {
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Bombay Breed <onboarding@resend.dev>',
            to: [notifyTo],
            subject,
            html,
          }),
        });
        if (!r.ok) {
          console.error('razorpay-webhook: notify email failed', r.status, await r.text());
        }
      } catch (err) {
        console.error('razorpay-webhook: notify email exception', err);
      }
    } else {
      console.warn('razorpay-webhook: RESEND_API_KEY not set, skipping notification');
    }
  }

  return jsonResponse({
    ok: true,
    event,
    payment_id: paymentId,
    order_id: orderId,
    already_processed: result.alreadyProcessed === true,
  });
});
