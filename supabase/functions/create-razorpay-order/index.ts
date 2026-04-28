// Edge Function: create-razorpay-order
// Creates a Razorpay order for one of the Premium Access Lounge plans.
//
// Request body: { planId: 'industry_reader' | 'analyst_lens', billingCycle: 'monthly' | 'annual' }
// Response: { order_id, amount, currency, key_id, plan: { id, label, billingCycle, amount_inr } }
//
// Server-side pricing (in INR), so the client cannot tamper with amounts:
//   industry_reader · monthly = INR 10,000           (no discount)
//   industry_reader · annual  = INR  7,000 x 12 = 84,000 upfront
//   analyst_lens    · monthly = INR 50,000           (no discount)
//   analyst_lens    · annual  = INR 35,000 x 12 = 420,000 upfront
//
// Razorpay expects amounts in the smallest currency unit (paise for INR),
// so we multiply by 100 before calling the orders API.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type PlanId = 'industry_reader' | 'analyst_lens';
type BillingCycle = 'monthly' | 'annual';

interface PlanConfig {
  label: string;
  monthly_inr: number;       // single-month price (no discount)
  annual_monthly_inr: number; // discounted per-month price when paid yearly
}

const PLANS: Record<PlanId, PlanConfig> = {
  industry_reader: {
    label: 'Industry Reader',
    monthly_inr: 10_000,
    annual_monthly_inr: 7_000,
  },
  analyst_lens: {
    label: 'Analyst Lens',
    monthly_inr: 50_000,
    annual_monthly_inr: 35_000,
  },
};

function priceInInr(plan: PlanConfig, cycle: BillingCycle): number {
  return cycle === 'annual' ? plan.annual_monthly_inr * 12 : plan.monthly_inr;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!keyId || !keySecret) {
      console.error('Missing Razorpay credentials');
      return new Response(
        JSON.stringify({ error: 'Payment provider not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { planId, billingCycle, notes } = (body ?? {}) as {
      planId?: string;
      billingCycle?: string;
      notes?: Record<string, string>;
    };

    if (planId !== 'industry_reader' && planId !== 'analyst_lens') {
      return new Response(
        JSON.stringify({ error: 'Invalid planId. Expected industry_reader or analyst_lens.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
    if (billingCycle !== 'monthly' && billingCycle !== 'annual') {
      return new Response(
        JSON.stringify({ error: 'Invalid billingCycle. Expected monthly or annual.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const plan = PLANS[planId as PlanId];
    const amountInr = priceInInr(plan, billingCycle as BillingCycle);
    const amountPaise = amountInr * 100;

    // Razorpay receipts are limited to 40 chars.
    const receipt = `bb_${planId.slice(0, 6)}_${billingCycle.slice(0, 3)}_${Date.now()}`.slice(0, 40);

    const safeNotes: Record<string, string> = {
      plan_id: planId,
      plan_label: plan.label,
      billing_cycle: billingCycle,
      source: 'premium_access_lounge',
    };
    if (notes && typeof notes === 'object') {
      for (const [k, v] of Object.entries(notes)) {
        if (typeof v === 'string' && v.length <= 256 && Object.keys(safeNotes).length < 15) {
          safeNotes[`u_${k}`.slice(0, 256)] = v;
        }
      }
    }

    const auth = btoa(`${keyId}:${keySecret}`);
    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
        receipt,
        notes: safeNotes,
      }),
    });

    const rzpJson = await rzpRes.json().catch(() => ({}));

    if (!rzpRes.ok) {
      console.error('Razorpay order creation failed', rzpRes.status, rzpJson);
      return new Response(
        JSON.stringify({
          error: 'Razorpay order creation failed',
          details: rzpJson?.error?.description ?? null,
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({
        order_id: rzpJson.id,
        amount: rzpJson.amount,
        currency: rzpJson.currency,
        key_id: keyId, // publishable; needed by the frontend Checkout modal
        plan: {
          id: planId,
          label: plan.label,
          billingCycle,
          amount_inr: amountInr,
        },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('create-razorpay-order error', err);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
