import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';

/**
 * /razorpay-test - internal QA page for verifying the Razorpay integration end to end.
 *
 * Flow:
 *   1. Pick plan + billing cycle (Industry Reader / Analyst Lens · monthly / annual).
 *   2. Enter test customer email + name (prefilled).
 *   3. Click "Pay" -> calls create-razorpay-order, opens Razorpay Checkout modal.
 *   4. Use the test card (4111 1111 1111 1111 · 12/26 · CVV 123) or test UPI (test@razorpay).
 *   5. On success, the modal handler calls verify-razorpay-payment, which validates
 *      the signature and activates the subscription. The status panel shows every
 *      step: order created, modal opened, signature verified, subscription activated.
 *
 * This page is intentionally noindex - it is QA only.
 */

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type PlanId = 'industry_reader' | 'analyst_lens';
type BillingCycle = 'monthly' | 'annual';

const PLAN_LABELS: Record<PlanId, string> = {
  industry_reader: 'Market Makers',
  analyst_lens: 'Investor Intel',
};

const PRICE_INR: Record<PlanId, Record<BillingCycle, number>> = {
  industry_reader: { monthly: 10_000, annual: 84_000 },
  analyst_lens: { monthly: 50_000, annual: 420_000 },
};

type LogLevel = 'info' | 'success' | 'error';
type LogEntry = { ts: string; level: LogLevel; message: string; data?: unknown };

const RAZORPAY_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Razorpay) return resolve(true);

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener('load', () => resolve(true), { once: true });
      existing.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

const RazorpayTest: React.FC = () => {
  const [planId, setPlanId] = useState<PlanId>('industry_reader');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [email, setEmail] = useState('test+lounge@bombaybreed.com');
  const [fullName, setFullName] = useState('QA Tester');
  const [company, setCompany] = useState('Bombay Breed (QA)');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const log = (level: LogLevel, message: string, data?: unknown) => {
    setLogs((prev) => [
      ...prev,
      { ts: new Date().toLocaleTimeString(), level, message, data },
    ]);
    // Mirror to console for deeper inspection.
    // eslint-disable-next-line no-console
    console[level === 'error' ? 'error' : 'log'](`[razorpay-test] ${message}`, data ?? '');
  };

  const clearLogs = () => setLogs([]);

  // Pre-warm the Razorpay script on mount so the modal opens instantly.
  useEffect(() => {
    void loadRazorpayScript().then((ok) => {
      if (ok) log('info', 'Razorpay checkout script ready');
      else log('error', 'Failed to load Razorpay checkout script');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePay = async () => {
    if (busy) return;
    setBusy(true);
    clearLogs();

    try {
      log('info', `Creating order for ${PLAN_LABELS[planId]} (${billingCycle})`, {
        amount_inr: PRICE_INR[planId][billingCycle],
      });

      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: { planId, billingCycle, notes: { source: 'razorpay-test-page' } },
        },
      );

      if (orderError || !orderData?.order_id) {
        log('error', 'create-razorpay-order failed', orderError ?? orderData);
        setBusy(false);
        return;
      }

      log('success', `Order created: ${orderData.order_id}`, orderData);

      const scriptOk = await loadRazorpayScript();
      if (!scriptOk || !window.Razorpay) {
        log('error', 'Razorpay script not available - cannot open checkout');
        setBusy(false);
        return;
      }

      const options: Record<string, unknown> = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Bombay Breed',
        description: `${PLAN_LABELS[planId]} - ${billingCycle === 'annual' ? 'Annual (12 months upfront)' : 'Monthly'}`,
        order_id: orderData.order_id,
        prefill: {
          name: fullName,
          email,
          contact: phone || undefined,
        },
        notes: {
          plan_id: planId,
          billing_cycle: billingCycle,
          source: 'razorpay-test-page',
        },
        theme: { color: '#1A3D5C' },
        modal: {
          ondismiss: () => {
            log('info', 'Checkout dismissed by user');
            setBusy(false);
          },
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          log('success', 'Payment captured by Razorpay', response);
          log('info', 'Verifying signature server-side...');

          const { data: verifyData, error: verifyError } =
            await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer: {
                  email,
                  full_name: fullName,
                  company: company || undefined,
                  phone: phone || undefined,
                },
              },
            });

          if (verifyError || !verifyData?.success) {
            log('error', 'verify-razorpay-payment failed', verifyError ?? verifyData);
          } else {
            log('success', 'Subscription activated', verifyData);
          }
          setBusy(false);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      log('info', 'Checkout modal opened');
    } catch (err) {
      log('error', 'Unexpected error in test flow', String(err));
      setBusy(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Razorpay Test - Bombay Breed (Internal QA)</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground px-6 md:px-8 py-12">
        <div className="container mx-auto max-w-[860px]">
          <div className="mb-10">
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              Internal QA · noindex
            </span>
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight mt-3 mb-3">
              Razorpay integration test
            </h1>
            <p className="text-sm text-muted-foreground max-w-[640px]">
              Exercises <code>create-razorpay-order</code> -&gt; Razorpay Checkout modal -&gt;{' '}
              <code>verify-razorpay-payment</code> -&gt; subscription activation. Use the
              Razorpay test credentials:
            </p>
            <ul className="text-sm text-muted-foreground mt-3 space-y-1">
              <li>
                Test card: <code>4111 1111 1111 1111</code> · CVV <code>123</code> · Expiry{' '}
                <code>12/26</code>
              </li>
              <li>
                Test UPI: <code>test@razorpay</code>
              </li>
            </ul>
          </div>

          <section className="grid gap-8 md:grid-cols-[1fr_1fr]">
            {/* Left column - form */}
            <div className="bg-secondary/30 border border-border rounded-xl p-6">
              <h2 className="font-serif text-lg mb-4">Configure test charge</h2>

              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Plan
              </label>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {(Object.keys(PLAN_LABELS) as PlanId[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlanId(p)}
                    className={`text-sm border rounded-md px-3 py-2 transition-colors ${
                      planId === p
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {PLAN_LABELS[p]}
                  </button>
                ))}
              </div>

              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Billing cycle
              </label>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {(['monthly', 'annual'] as BillingCycle[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setBillingCycle(c)}
                    className={`text-sm border rounded-md px-3 py-2 transition-colors ${
                      billingCycle === c
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {c === 'annual' ? 'Annual (12 mo upfront)' : 'Monthly'}
                  </button>
                ))}
              </div>

              <div className="rounded-md bg-background border border-border px-4 py-3 mb-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Charge amount
                </div>
                <div className="font-serif text-2xl tracking-tight">
                  {fmtINR(PRICE_INR[planId][billingCycle])}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handlePay}
                disabled={busy}
                className="mt-6 w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
              >
                {busy ? 'Working...' : `Pay ${fmtINR(PRICE_INR[planId][billingCycle])}`}
              </button>
            </div>

            {/* Right column - log panel */}
            <div className="bg-secondary/30 border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg">Status log</h2>
                <button
                  type="button"
                  onClick={clearLogs}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              </div>

              {logs.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  No events yet. Click Pay to start.
                </p>
              ) : (
                <ol className="space-y-3">
                  {logs.map((entry, i) => (
                    <li
                      key={i}
                      className={`text-xs leading-relaxed border-l-2 pl-3 ${
                        entry.level === 'error'
                          ? 'border-destructive text-destructive'
                          : entry.level === 'success'
                          ? 'border-green-600 text-foreground'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">
                        {entry.ts} · {entry.level}
                      </div>
                      <div className="mt-0.5">{entry.message}</div>
                      {entry.data !== undefined && (
                        <pre className="mt-1 font-mono text-[11px] bg-background border border-border rounded px-2 py-1.5 overflow-x-auto whitespace-pre-wrap break-all">
                          {typeof entry.data === 'string'
                            ? entry.data
                            : JSON.stringify(entry.data, null, 2)}
                        </pre>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default RazorpayTest;
