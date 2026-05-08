import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { TIERS, getTierById } from '@/intelligence/lib/valueLadder';

/**
 * Single source of truth for canonical Value Ladder pricing.
 *
 * If you change any tier price you MUST update this map AND every surface
 * referenced below; otherwise this test will (correctly) fail and tell you
 * exactly where the drift lives.
 *
 * Canonical (USD primary, INR converted at 85 INR/USD, monthly billing):
 *   - tcd-paid           USD 1   /  INR 85   / monthly
 *   - bb-reader          USD 10  /  INR 850  / monthly
 *   - bb-analyst         USD 20  /  INR 1700 / monthly
 *
 * Edge function planId mapping (front-end -> Razorpay):
 *   enthusiasts     -> tcd-paid     (tier slug: enthusiasts)
 *   industry_reader -> bb-reader    (tier slug: foundational)
 *   analyst_lens    -> bb-analyst   (tier slug: professional)
 */
const CANONICAL = {
  enthusiasts:     { tierId: 'tcd-paid',    tierSlug: 'enthusiasts',  usd: 1,  inr: 85   },
  industry_reader: { tierId: 'bb-reader',   tierSlug: 'foundational', usd: 10, inr: 850  },
  analyst_lens:    { tierId: 'bb-analyst',  tierSlug: 'professional', usd: 20, inr: 1700 },
} as const;

const root = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

// ---------------------------------------------------------------------------
// 1. Value Ladder constants (single FE source of truth)
// ---------------------------------------------------------------------------
describe('Value Ladder constants', () => {
  it.each(Object.values(CANONICAL))(
    'tier $tierId is USD $usd / INR $inr monthly',
    ({ tierId, usd, inr }) => {
      const tier = getTierById(tierId);
      expect(tier, `Missing tier ${tierId}`).toBeDefined();
      expect(tier!.pricing).toEqual({ usd, inr, period: 'mo' });
    }
  );

  it('exposes the expected 5-tier ladder (Free, $1, $10, $20, Sponsor)', () => {
    expect(TIERS.map((t) => t.id)).toEqual([
      'tcd-free',
      'tcd-paid',
      'bb-reader',
      'bb-analyst',
      'sponsor',
    ]);
  });

  it('honours the 85 INR/USD FX peg for every paid tier', () => {
    for (const t of TIERS) {
      if (!t.pricing) continue;
      expect(
        t.pricing.inr,
        `${t.id} INR ${t.pricing.inr} should equal USD ${t.pricing.usd} * 85`
      ).toBe(t.pricing.usd * 85);
    }
  });
});

// ---------------------------------------------------------------------------
// 2. Razorpay edge functions - PLANS map must equal canonical paise amounts
// ---------------------------------------------------------------------------
const EDGE_FUNCTIONS = [
  'supabase/functions/create-razorpay-order/index.ts',
  'supabase/functions/verify-razorpay-payment/index.ts',
  'supabase/functions/razorpay-webhook/index.ts',
] as const;

const extractPlanInr = (src: string, planId: string): number | null => {
  // Match either `monthly_inr: 850` (create-order) or `monthly_paise: 850 * 100`
  // (verify + webhook) inside the named PLANS entry.
  const block = src.match(
    new RegExp(`${planId}\\s*:\\s*\\{[^}]*?\\}`, 's')
  )?.[0];
  if (!block) return null;
  const inr = block.match(/monthly_inr:\s*([\d_,]+)/);
  if (inr) return Number(inr[1].replace(/[_,]/g, ''));
  const paise = block.match(/monthly_paise:\s*([\d_,]+)\s*\*\s*100/);
  if (paise) return Number(paise[1].replace(/[_,]/g, ''));
  return null;
};

const extractTierSlug = (src: string, planId: string): string | null => {
  const block = src.match(
    new RegExp(`${planId}\\s*:\\s*\\{[^}]*?\\}`, 's')
  )?.[0];
  return block?.match(/tierSlug:\s*'([^']+)'/)?.[1] ?? null;
};

describe('Razorpay edge functions PLANS map', () => {
  for (const file of EDGE_FUNCTIONS) {
    describe(file, () => {
      const src = read(file);
      it.each(Object.entries(CANONICAL))(
        'planId %s monthly INR equals canonical',
        (planId, expected) => {
          const inr = extractPlanInr(src, planId);
          expect(
            inr,
            `Could not parse ${planId}.monthly price in ${file}`
          ).toBe(expected.inr);
        }
      );

      // verify + webhook also store tierSlug; create-order doesn't.
      if (file !== 'supabase/functions/create-razorpay-order/index.ts') {
        it.each(Object.entries(CANONICAL))(
          'planId %s tierSlug matches canonical',
          (planId, expected) => {
            expect(extractTierSlug(src, planId)).toBe(expected.tierSlug);
          }
        );
      }
    });
  }
});

// ---------------------------------------------------------------------------
// 3. Checkout PLAN_PRICING preview must mirror the canonical monthly INR
// ---------------------------------------------------------------------------
describe('Checkout PLAN_PRICING preview', () => {
  const src = read('src/intelligence/pages/Checkout.tsx');
  it.each(Object.entries(CANONICAL))(
    'planId %s monthly INR matches canonical',
    (planId, expected) => {
      const block = src
        .match(new RegExp(`${planId}\\s*:\\s*\\{[^}]*?\\}`, 's'))?.[0];
      expect(block, `Missing ${planId} in Checkout PLAN_PRICING`).toBeDefined();
      const monthly = block!.match(/monthly:\s*([\d_,]+)/)?.[1];
      expect(Number(monthly?.replace(/[_,]/g, ''))).toBe(expected.inr);
      // monthlyOnly must be true everywhere (annual cycle was retired)
      expect(block).toMatch(/monthlyOnly:\s*true/);
    }
  );
});

// ---------------------------------------------------------------------------
// 4. No legacy / discount marketing copy may leak back into the codebase
// ---------------------------------------------------------------------------
describe('Pricing copy hygiene', () => {
  const FILES = [
    'src/intelligence/lib/valueLadder.ts',
    'src/intelligence/pages/Checkout.tsx',
    'src/intelligence/pages/Membership.tsx',
    'src/pages/insights/PremiumAccessLounge.tsx',
    'src/components/insights/LadderStickyPill.tsx',
  ];

  // Strings that must never reappear (old discounted / inaugural pricing,
  // 3-year lock copy, and pre-FX-peg INR figures).
  const FORBIDDEN = [
    'inaugural offer',
    '30% off',
    '3-year price lock',
    'price lock',
    'INR 425',
    'INR 100 ',
    'INR 8,500',
    'INR 102,000',
    'INR 510,000',
    'INR 240,000',
    'USD 5 / mo',
    'USD 5 a month',
    'USD 100',
  ];

  it.each(FILES)('%s contains no forbidden pricing copy', (file) => {
    const src = read(file);
    for (const needle of FORBIDDEN) {
      expect(
        src.includes(needle),
        `Forbidden pricing copy "${needle}" found in ${file}`
      ).toBe(false);
    }
  });
});
