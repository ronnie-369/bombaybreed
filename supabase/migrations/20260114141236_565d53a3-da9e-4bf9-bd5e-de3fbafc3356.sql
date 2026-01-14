-- Insert 5 core capabilities
INSERT INTO public.seo_capabilities (slug, name, buyer_intent, contract_value, decision_maker, conversion_cta, description, is_active)
VALUES 
  ('energy-optimisation-consulting', 'Energy Utilisation Optimisation', 'high', 'high', 'COO', 'Request an Energy Diagnostic', 'Strategic advisory to reduce energy costs and emissions intensity in heavy industry through process optimization, demand management, and renewable integration.', true),
  ('industrial-decarbonisation-strategy', 'Industrial Decarbonisation Strategy', 'high', 'high', 'CEO', 'Request a Decarbonisation Roadmap', 'End-to-end transition planning for hard-to-abate sectors including cement, steel, chemicals, and heavy manufacturing.', true),
  ('article-6-advisory', 'Article 6 Advisory', 'high', 'high', 'CSO', 'Request an Article 6 Review', 'Strategic guidance on Paris Agreement Article 6 mechanisms, corresponding adjustments, and international carbon market participation.', true),
  ('dmrv-integrity-due-diligence', 'DMRV Integrity Due Diligence', 'high', 'medium', 'CFO', 'Request a DMRV Assessment', 'Independent assessment of digital monitoring, reporting and verification systems to ensure carbon credit integrity and investor confidence.', true),
  ('climate-investment-readiness', 'Climate Investment Readiness', 'high', 'high', 'CFO', 'Request an Investment Readiness Review', 'Preparing climate assets and transition projects for institutional capital through rigorous due diligence, documentation, and stakeholder alignment.', true);

-- Insert some initial geographies
INSERT INTO public.seo_geographies (slug, name, geo_type, dominant_industries, regulatory_context, energy_profile, capital_presence, is_active)
VALUES
  ('india', 'India', 'country', ARRAY['cement', 'steel', 'power', 'chemicals'], 'national', 'coal-heavy transitioning', 'Growing climate finance presence', true),
  ('gujarat', 'Gujarat', 'state', ARRAY['cement', 'chemicals', 'textiles'], 'state', 'industrial coal-intensive', 'Major industrial investment hub', true),
  ('maharashtra', 'Maharashtra', 'state', ARRAY['steel', 'power', 'manufacturing'], 'state', 'mixed with renewable growth', 'Financial capital, strong ESG focus', true),
  ('uae', 'UAE', 'country', ARRAY['oil-gas', 'power', 'real-estate'], 'national', 'hydrocarbon transitioning', 'Sovereign wealth climate mandates', true),
  ('singapore', 'Singapore', 'country', ARRAY['finance', 'shipping', 'data-centres'], 'national', 'low-carbon imported', 'Regional climate finance hub', true);

-- Insert initial industries
INSERT INTO public.seo_industries (slug, name, emission_profile, energy_intensity, regulation_exposure, typical_roles, description, is_active)
VALUES
  ('cement', 'Cement Industry', 'hard-to-abate', 'high', ARRAY['CBAM', 'PAT', 'CCTS'], ARRAY['CEO', 'COO', 'CSO'], 'Heavy process emissions from clinker production requiring fundamental technology shifts.', true),
  ('steel', 'Steel Industry', 'hard-to-abate', 'high', ARRAY['CBAM', 'PAT', 'CCTS'], ARRAY['CEO', 'COO', 'CFO'], 'Blast furnace emissions and energy intensity driving green steel transition.', true),
  ('power', 'Power Sector', 'transition sector', 'high', ARRAY['RPO', 'carbon-pricing', 'stranded-assets'], ARRAY['CEO', 'CFO', 'CRO'], 'Coal phase-out pressures and renewable integration challenges.', true),
  ('oil-gas', 'Oil & Gas', 'transition sector', 'high', ARRAY['scope-3', 'methane', 'stranded-assets'], ARRAY['CEO', 'CSO', 'CFO'], 'Upstream emissions, methane leakage, and energy transition positioning.', true),
  ('data-centres', 'Data Centres', 'growth sector', 'high', ARRAY['RE100', 'PUE', 'water'], ARRAY['CTO', 'COO', 'CSO'], 'Exponential energy demand growth requiring 24/7 carbon-free energy strategies.', true);

-- Insert initial regulations
INSERT INTO public.seo_regulations (slug, name, jurisdiction, risk_type, urgency, description, is_active)
VALUES
  ('article-6', 'Article 6', 'international', 'integrity', 'high', 'Paris Agreement mechanism for international carbon market cooperation and corresponding adjustments.', true),
  ('cbam', 'CBAM', 'international', 'compliance', 'high', 'EU Carbon Border Adjustment Mechanism imposing carbon costs on imports.', true),
  ('corresponding-adjustments', 'Corresponding Adjustments', 'international', 'integrity', 'high', 'Double-counting prevention mechanism under Article 6.2 bilateral agreements.', true),
  ('pat-scheme', 'PAT Scheme', 'national', 'compliance', 'medium', 'India Perform Achieve Trade scheme for industrial energy efficiency.', true),
  ('ccts', 'Carbon Credit Trading Scheme', 'national', 'compliance', 'medium', 'India domestic carbon market framework under development.', true);