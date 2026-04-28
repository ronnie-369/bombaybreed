INSERT INTO public.tcd_tiers (slug, name, rank, billing_period, price_inr, sort_order, is_active, tagline, description, features)
VALUES (
  'enthusiasts',
  'Enthusiasts',
  0,
  'monthly',
  425,
  0,
  true,
  'Deeper than the free Substack',
  'Professional readers, sustainability teams and journalists who want analytical reads beyond the free Substack.',
  '[]'::jsonb
)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    rank = EXCLUDED.rank,
    billing_period = EXCLUDED.billing_period,
    price_inr = EXCLUDED.price_inr,
    sort_order = EXCLUDED.sort_order,
    is_active = EXCLUDED.is_active,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    updated_at = now();