/**
 * Frontend price-display drift guard.
 *
 * 1. Renders <TierPriceText /> for every paid tier in both currencies and
 *    asserts the rendered DOM text matches the canonical valueLadder pricing.
 *    If a component, formatter or tier constant starts producing different
 *    text, this test fails and points at the exact tier + currency.
 *
 * 2. Greps the high-traffic pricing surfaces for any *hardcoded* `USD N / mo`
 *    or `INR N / mo` strings and asserts each one is one of the canonical
 *    values. Catches the "someone pasted USD 12 / mo into a card" failure
 *    mode that the unit render above cannot see.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import TierPriceText from '@/components/insights/TierPriceText';
import {
  TIER_BY_ID,
  type Currency,
  type LadderTier,
} from '@/intelligence/lib/valueLadder';

const PAID_TIER_IDS = ['tcd-paid', 'bb-reader', 'bb-analyst'] as const;

const canonical = (tier: LadderTier, currency: Currency) => {
  const p = tier.pricing!;
  const usd = `USD ${p.usd}`;
  const inr = `INR ${p.inr.toLocaleString('en-IN')}`;
  return currency === 'USD'
    ? { primary: `${usd} / ${p.period}`, secondary: inr }
    : { primary: `${inr} / ${p.period}`, secondary: usd };
};

describe('TierPriceText renders canonical valueLadder pricing', () => {
  for (const id of PAID_TIER_IDS) {
    for (const currency of ['USD', 'INR'] as Currency[]) {
      it(`${id} in ${currency} matches canonical`, () => {
        const tier = TIER_BY_ID[id];
        const { container } = render(
          <TierPriceText tier={tier} currency={currency} />
        );
        const text = container.textContent ?? '';
        const { primary, secondary } = canonical(tier, currency);
        expect(text).toContain(primary);
        expect(text).toContain(`(${secondary})`);
      });
    }
  }
});

// ---------------------------------------------------------------------------
// Hardcoded-price scanner
// ---------------------------------------------------------------------------
const root = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

// Surfaces that talk about price but should NEVER hardcode a non-canonical
// monthly figure. valueLadder.ts itself is excluded - it IS the source.
const SURFACES = [
  'src/intelligence/pages/Checkout.tsx',
  'src/intelligence/pages/Membership.tsx',
  'src/intelligence/pages/ValueLadder.tsx',
  'src/pages/insights/PremiumAccessLounge.tsx',
  'src/components/insights/LadderStickyPill.tsx',
  'src/components/insights/TierPriceText.tsx',
];

const allowedUsd = new Set(
  PAID_TIER_IDS.map((id) => TIER_BY_ID[id].pricing!.usd)
);
const allowedInr = new Set(
  PAID_TIER_IDS.map((id) => TIER_BY_ID[id].pricing!.inr)
);

describe('No non-canonical hardcoded monthly prices in pricing surfaces', () => {
  it.each(SURFACES)('%s', (file) => {
    const src = read(file);

    // Match `USD 10 / mo` style strings in JSX/template/string literals.
    const usdMatches = [...src.matchAll(/USD\s+(\d+(?:[.,]\d+)?)\s*\/\s*mo\b/g)];
    for (const m of usdMatches) {
      const n = Number(m[1].replace(/,/g, ''));
      expect(
        allowedUsd.has(n),
        `Non-canonical USD ${n}/mo in ${file} (allowed: ${[...allowedUsd].join(', ')})`
      ).toBe(true);
    }

    const inrMatches = [...src.matchAll(/INR\s+([\d,]+)\s*\/\s*mo\b/g)];
    for (const m of inrMatches) {
      const n = Number(m[1].replace(/,/g, ''));
      expect(
        allowedInr.has(n),
        `Non-canonical INR ${n}/mo in ${file} (allowed: ${[...allowedInr].join(', ')})`
      ).toBe(true);
    }
  });
});
