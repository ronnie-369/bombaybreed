-- Add Fashion and FMCG industries
INSERT INTO public.seo_industries (name, slug, description, is_active)
VALUES 
  ('Fashion', 'fashion', 'Supply chain transparency, scope 3 emissions, circular economy integration.', true),
  ('FMCG', 'fmcg', 'Consumer goods sustainability, packaging, supply chain decarbonization.', true)
ON CONFLICT (slug) DO NOTHING;