
-- Recalibrate BB tier names and pricing per April 2026 strategic update.
-- USD primary, INR equivalent shown to users in product UI.
-- Annual price_inr stored as the canonical INR figure for invoicing.
--   Market Readers   = USD 100 / mo  ~= INR  8,500 / mo  -> annual INR 1,02,000
--   Investor Readers = USD 500 / mo  ~= INR 42,500 / mo  -> annual INR 5,10,000
UPDATE public.tcd_tiers
SET name = 'Market Readers',
    tagline = 'Editorial intelligence at research-grade discipline. USD 100 / month (~INR 8,500).',
    price_inr = 102000
WHERE slug = 'foundational';

UPDATE public.tcd_tiers
SET name = 'Investor Readers',
    tagline = 'Research and advisory product for capital deployers. USD 500 / month (~INR 42,500).',
    price_inr = 510000
WHERE slug = 'professional';

-- The third historic tier ('institutional') is folded into Sponsorship (B2B).
-- Keep the row for audit history but hide it from the membership grid.
UPDATE public.tcd_tiers
SET is_active = false
WHERE slug = 'institutional';
