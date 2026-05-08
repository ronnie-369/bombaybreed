-- Realign tcd_tiers to canonical Value Ladder pricing.
-- Canonical FX: 85 INR/USD. All paid tiers billed monthly.
-- Enthusiasts: USD 1/mo = INR 85/mo
-- foundational (Market Makers): USD 10/mo = INR 850/mo
-- professional (Investment Intelligence): USD 20/mo = INR 1,700/mo
-- Institutional: deactivated. Bespoke is now a contact/sponsor flow, not a DB tier.

UPDATE public.tcd_tiers
SET price_inr = 85, billing_period = 'monthly', name = 'Enthusiasts', updated_at = now()
WHERE slug = 'enthusiasts';

UPDATE public.tcd_tiers
SET price_inr = 850, billing_period = 'monthly', name = 'Market Makers', updated_at = now()
WHERE slug = 'foundational';

UPDATE public.tcd_tiers
SET price_inr = 1700, billing_period = 'monthly', name = 'Investment Intelligence', updated_at = now()
WHERE slug = 'professional';

UPDATE public.tcd_tiers
SET is_active = false, updated_at = now()
WHERE slug = 'institutional';
