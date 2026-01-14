-- Insert geography-specific capability pages

-- Energy optimisation Gujarat
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, geography_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'energy-optimisation-consulting-gujarat',
  'combined'::page_type,
  c.id,
  g.id,
  'Energy Optimisation Consulting Gujarat | Bombay Breed',
  'Reduce industrial energy costs in Gujarat through strategic optimization. Expert advisory for cement, chemicals, and manufacturing facilities across the state.',
  'Energy Optimisation Consulting for Gujarat Industries',
  'Gujarat industries achieve 10-18% energy cost reduction through process optimization, waste heat recovery, and renewable integration. With Gujarats industrial intensity and solar potential, the economics of optimization are particularly compelling.',
  '[
    {"question": "What industries in Gujarat benefit most from energy optimization?", "answer": "Cement plants in Saurashtra, chemical facilities in GIDC areas, and textile manufacturing across the state show the highest savings potential. Energy-intensive industries with 24/7 operations typically achieve 12-18% cost reduction."},
    {"question": "How does Gujarats solar potential affect optimization strategies?", "answer": "Gujarats excellent solar irradiance makes captive solar highly attractive. Combined with efficiency measures, industrial facilities can achieve 30-40% reduction in grid dependence, insulating against tariff volatility while reducing emissions."},
    {"question": "What are typical payback periods for Gujarat industrial facilities?", "answer": "Quick wins like VFD installations show 6-12 month payback. Solar integration typically returns in 3-4 years with current incentives. Waste heat recovery systems show 2-4 year returns depending on thermal load profiles."},
    {"question": "How do PAT scheme obligations affect Gujarat manufacturers?", "answer": "Many Gujarat industrial facilities are designated consumers under PAT. Energy optimization directly reduces compliance costs and can generate tradeable ESCerts. Well-executed programs turn PAT from a cost center into a revenue opportunity."},
    {"question": "Do you work with facilities across Gujarat?", "answer": "Yes. We work with industrial facilities across Gujarat including Ahmedabad, Surat, Vadodara, Rajkot, and GIDC clusters. Our approach combines on-site diagnostics with remote monitoring and optimization support."}
  ]'::jsonb,
  '{
    "the_problem": "Gujarat is Indias most industrialized state, with energy-intensive cement, chemicals, textiles, and manufacturing sectors. Rising grid tariffs and PAT scheme obligations are pressuring margins. Most facilities operate 15-25% below optimal efficiency.",
    "why_this_fails": "Internal optimization efforts often lack sector benchmarking and fail to capture system-level opportunities. Engineering teams focus on individual equipment while missing integration benefits. Financial teams undervalue efficiency projects without proper modeling.",
    "what_changes": "Strategic energy optimization identifies the highest-value interventions across the facility. Process efficiency, waste heat recovery, renewable integration, and demand management are coordinated for maximum impact. PAT compliance becomes a strategic advantage rather than a cost.",
    "our_approach": "We begin with rapid energy diagnostics benchmarking your facility against sector and regional best practices. We identify quick wins, capital projects, and strategic opportunities specific to Gujarat market conditions and incentive structures.",
    "market_risks": "Rising grid tariffs continue to pressure margins. PAT scheme stringency is increasing. Export-focused manufacturers face CBAM exposure. Early movers in efficiency capture cost advantages that become harder for laggards to close."
  }'::jsonb,
  '[
    {"slug": "energy-optimisation-consulting", "title": "Energy Optimisation Consulting", "type": "capability"},
    {"slug": "energy-optimisation-cement-industry", "title": "Cement Energy Optimisation", "type": "capability"},
    {"slug": "india", "title": "India Market", "type": "geography"}
  ]'::jsonb,
  true,
  75
FROM public.seo_capabilities c, public.seo_geographies g 
WHERE c.slug = 'energy-optimisation-consulting' AND g.slug = 'gujarat';

-- Article 6 consulting India
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, geography_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'article-6-consulting-india',
  'combined'::page_type,
  c.id,
  g.id,
  'Article 6 Consulting India | Carbon Markets Advisory | Bombay Breed',
  'Navigate Indias Article 6 framework and bilateral carbon trading agreements. Strategic advisory for Indian companies and projects seeking international carbon market access.',
  'Article 6 Consulting for India',
  'India is positioning to become a major Article 6 credit supplier through bilateral agreements with Singapore, Japan, and European buyers. Indian companies can access international carbon markets, but navigating the regulatory framework requires specialized guidance.',
  '[
    {"question": "What is Indias position on Article 6?", "answer": "India is actively negotiating bilateral agreements under Article 6.2 while maintaining that certain project types should not be exported. The framework is evolving, with the Bureau of Energy Efficiency playing a coordinating role."},
    {"question": "Which Indian projects can generate Article 6 credits?", "answer": "Renewable energy, industrial efficiency, and select nature-based solutions are eligible. India has indicated that large hydro and certain forest projects may be retained for domestic NDC achievement rather than exported."},
    {"question": "How do corresponding adjustments work for India?", "answer": "When India authorizes credit exports under bilateral agreements, it must apply corresponding adjustments to its NDC accounting. This ensures no double-counting between Indian claims and buyer country claims."},
    {"question": "What opportunities exist for Indian companies?", "answer": "Indian companies can: develop projects generating authorized Article 6 credits, access premium prices in international markets, and participate in bilateral programs with Japan, Singapore, and others. First movers are establishing positions now."},
    {"question": "How does this relate to Indias domestic carbon market?", "answer": "India is developing a domestic Carbon Credit Trading Scheme (CCTS). The relationship between domestic credits and Article 6 exports is still being defined. Strategic positioning requires understanding both frameworks."}
  ]'::jsonb,
  '{
    "the_problem": "Indian companies and projects can access premium international carbon markets through Article 6, but the regulatory framework is complex and evolving. Early positioning is critical, but missteps can result in stranded projects or missed opportunities.",
    "why_this_fails": "Most Indian project developers lack understanding of Article 6 requirements and bilateral agreement structures. Carbon brokers often oversimplify the authorization process. Projects developed without proper Article 6 alignment cannot access premium markets.",
    "what_changes": "Strategic Article 6 positioning means understanding Indias bilateral agreements, authorization requirements, and market access pathways. Projects are structured from inception to meet international standards and access premium buyers.",
    "our_approach": "We provide end-to-end Article 6 advisory for Indian context: regulatory analysis, project structuring, authorization pathway guidance, and buyer introductions. We help clients navigate Indias evolving framework while accessing international opportunities.",
    "market_risks": "Bilateral agreements are being signed now. Early participants establish positions and relationships. Projects without Article 6 alignment will be limited to domestic markets or discounted voluntary sales."
  }'::jsonb,
  '[
    {"slug": "article-6-advisory", "title": "Article 6 Advisory", "type": "capability"},
    {"slug": "dmrv-integrity-due-diligence", "title": "DMRV Due Diligence", "type": "capability"},
    {"slug": "gujarat", "title": "Gujarat Market", "type": "geography"}
  ]'::jsonb,
  true,
  80
FROM public.seo_capabilities c, public.seo_geographies g 
WHERE c.slug = 'article-6-advisory' AND g.slug = 'india';

-- Energy optimisation Maharashtra
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, geography_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'energy-optimisation-consulting-maharashtra',
  'combined'::page_type,
  c.id,
  g.id,
  'Energy Optimisation Consulting Maharashtra | Bombay Breed',
  'Industrial energy optimization for Maharashtra manufacturing. Expert advisory for steel, power, and manufacturing facilities across Pune, Mumbai, Nagpur, and industrial clusters.',
  'Energy Optimisation Consulting for Maharashtra Industries',
  'Maharashtra industries achieve 12-20% energy cost reduction through systematic optimization. With the states mix of heavy industry and growing renewable capacity, integrated energy strategies deliver both cost savings and sustainability improvements.',
  '[
    {"question": "What industries in Maharashtra show highest savings potential?", "answer": "Steel plants in Nagpur region, auto manufacturing in Pune-Chakan, and pharmaceutical facilities across the state show 15-20% savings potential. Power-intensive facilities with demand charges benefit most from optimization."},
    {"question": "How do high industrial tariffs in Maharashtra affect ROI?", "answer": "Maharashtras relatively high industrial tariffs mean efficiency investments pay back faster. A 15% reduction in a facility paying ₹8-9/kWh delivers significantly more value than the same reduction at ₹5-6/kWh."},
    {"question": "What renewable integration opportunities exist?", "answer": "Open access solar and wind are increasingly viable in Maharashtra. Group captive structures, bilateral PPAs, and hybrid projects with storage can reduce grid dependence by 30-50% while locking in long-term price certainty."},
    {"question": "How do we approach facilities with existing ISO 50001 certification?", "answer": "ISO 50001 provides a strong foundation but often focuses on management systems rather than technical optimization. We build on existing EnMS infrastructure to identify and implement high-impact technical interventions."},
    {"question": "Do you work with MIDC industrial clusters?", "answer": "Yes. We work extensively with facilities in MIDC areas including Pune, Nashik, Aurangabad, and emerging industrial zones. We understand cluster-specific infrastructure constraints and opportunities."}
  ]'::jsonb,
  '{
    "the_problem": "Maharashtra has Indias most diverse industrial base but also faces high energy costs and ambitious state-level climate targets. Industrial facilities face margin pressure from tariffs while needing to demonstrate sustainability progress to customers and investors.",
    "why_this_fails": "Many Maharashtra facilities have implemented basic efficiency measures but plateau at 5-10% savings. Breaking through requires system-level optimization, technology upgrades, and integrated renewable strategies that internal teams struggle to develop.",
    "what_changes": "Advanced energy optimization combines deep efficiency improvements with strategic renewable integration. Demand management reduces peak charges. Captive generation reduces grid exposure. The result is 15-25% total energy cost reduction.",
    "our_approach": "We conduct comprehensive energy audits tailored to Maharashtra market conditions and tariff structures. We identify interventions specific to your industry, location, and growth plans. Every recommendation includes financial modeling and implementation roadmaps.",
    "market_risks": "Maharashtra is tightening renewable purchase obligations and environmental compliance. Industrial tariffs continue rising. Competitors with lower energy intensity gain cost advantages. Early optimization creates sustainable competitive advantage."
  }'::jsonb,
  '[
    {"slug": "energy-optimisation-consulting", "title": "Energy Optimisation Consulting", "type": "capability"},
    {"slug": "energy-optimisation-steel-industry", "title": "Steel Energy Optimisation", "type": "capability"},
    {"slug": "india", "title": "India Market", "type": "geography"}
  ]'::jsonb,
  true,
  75
FROM public.seo_capabilities c, public.seo_geographies g 
WHERE c.slug = 'energy-optimisation-consulting' AND g.slug = 'maharashtra';

-- Article 6 consulting UAE
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, geography_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'article-6-consulting-uae',
  'combined'::page_type,
  c.id,
  g.id,
  'Article 6 Consulting UAE | Carbon Markets Advisory | Bombay Breed',
  'Strategic Article 6 advisory for UAE entities navigating international carbon markets. Guidance on bilateral agreements, corresponding adjustments, and carbon credit integrity.',
  'Article 6 Consulting for UAE',
  'The UAE is positioning as both an Article 6 credit buyer and supplier, leveraging its COP28 host status and regional influence. UAE entities can access high-integrity credits while developing domestic projects for international markets.',
  '[
    {"question": "What is UAEs Article 6 strategy?", "answer": "UAE is pursuing bilateral agreements under Article 6.2 and actively shaping Article 6.4 implementation. The country aims to use Article 6 for both NDC achievement and as a revenue opportunity for domestic projects."},
    {"question": "Can UAE entities sell carbon credits internationally?", "answer": "Yes. UAE projects—particularly solar, industrial efficiency, and potentially CCUS—can generate Article 6 credits for international sale. This requires government authorization and corresponding adjustment commitments."},
    {"question": "How does this relate to UAE net-zero commitments?", "answer": "UAE has committed to net-zero by 2050. Article 6 participation must be balanced against domestic NDC needs. Some mitigation will be retained domestically while other projects generate export credits."},
    {"question": "What due diligence should UAE buyers conduct?", "answer": "UAE buyers should verify: host country authorization status, corresponding adjustment commitments, methodology quality, and DMRV robustness. Post-COP28, scrutiny of UAE climate claims is intense—credit integrity is essential."},
    {"question": "How do we navigate UAE regulatory requirements?", "answer": "UAE climate governance is evolving rapidly. Ministry of Climate Change and Environment oversees international engagement while sectoral regulators manage domestic implementation. We help clients navigate this multi-stakeholder landscape."}
  ]'::jsonb,
  '{
    "the_problem": "UAE entities seeking to participate in international carbon markets face a complex and rapidly evolving landscape. As COP28 host, UAE faces intense scrutiny of its climate claims. Credit quality and integrity are essential for credibility.",
    "why_this_fails": "Many UAE entities approach carbon markets tactically—purchasing credits for immediate claims without understanding Article 6 implications or integrity requirements. This creates reputational risk as scrutiny intensifies.",
    "what_changes": "Strategic Article 6 positioning means understanding where the market is heading, not just where it is today. This includes: credit quality assessment, authorization pathway navigation, and portfolio construction for both compliance and credibility.",
    "our_approach": "We provide Article 6 advisory tailored to UAE context: regulatory navigation, credit due diligence, project development support, and stakeholder alignment. We help UAE entities lead rather than follow on carbon market integrity.",
    "market_risks": "Post-COP28 scrutiny of UAE climate claims is intense. Low-quality credits create reputational liability. First movers in high-integrity Article 6 participation establish credibility that becomes harder for followers to match."
  }'::jsonb,
  '[
    {"slug": "article-6-advisory", "title": "Article 6 Advisory", "type": "capability"},
    {"slug": "dmrv-integrity-due-diligence", "title": "DMRV Due Diligence", "type": "capability"},
    {"slug": "singapore", "title": "Singapore Market", "type": "geography"}
  ]'::jsonb,
  true,
  75
FROM public.seo_capabilities c, public.seo_geographies g 
WHERE c.slug = 'article-6-advisory' AND g.slug = 'uae';

-- Climate investment readiness Singapore
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, geography_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'climate-investment-readiness-singapore',
  'combined'::page_type,
  c.id,
  g.id,
  'Climate Investment Readiness Singapore | Green Finance Hub | Bombay Breed',
  'Prepare climate projects for Singapore-based institutional capital. Investment readiness advisory aligned with MAS sustainability requirements and regional green finance flows.',
  'Climate Investment Readiness for Singapore Capital',
  'Singapore is Southeast Asias green finance hub, with MAS driving sustainability disclosure and taxonomy development. Projects seeking Singapore-based capital must meet rigorous ESG standards and demonstrate genuine climate impact.',
  '[
    {"question": "What makes Singapore capital different?", "answer": "Singapore-based investors—sovereign wealth, banks, asset managers—face MAS sustainability disclosure requirements and reputational pressure for credible climate investments. They conduct rigorous due diligence and reject projects with integrity concerns."},
    {"question": "What standards do Singapore investors expect?", "answer": "Expect alignment with: Singapore-Asia Taxonomy, TCFD disclosure, science-based targets, and robust ESG frameworks. Projects should demonstrate genuine additionality and measurable impact, not just compliance."},
    {"question": "How do we position for Temasek or GIC investment?", "answer": "Sovereign wealth investors require: world-class management teams, clear regulatory pathways, quantified risk matrices, and demonstrated impact measurement. Preparation typically takes 6-12 months to reach their standards."},
    {"question": "What role do Singapore banks play in climate finance?", "answer": "DBS, OCBC, and UOB are all expanding sustainable finance offerings. They can provide green loans, sustainability-linked facilities, and transition finance—but require projects to meet evolving sustainability criteria."},
    {"question": "How does the Singapore carbon tax affect project economics?", "answer": "Singapores carbon tax is rising to SGD 50-80/tonne by 2030. This improves economics for emissions reduction projects and creates demand for high-quality carbon credits under the International Carbon Credit framework."}
  ]'::jsonb,
  '{
    "the_problem": "Singapore has emerged as Southeast Asias green finance hub, but accessing Singapore-based capital requires meeting rigorous sustainability standards. Many climate projects—especially from emerging markets—fail to meet investor expectations.",
    "why_this_fails": "Project developers often approach Singapore investors before completing preparation. They assume strong fundamentals will overcome documentation gaps. Singapore investors—facing their own regulatory pressure—reject rather than remediate.",
    "what_changes": "Investment-ready projects align documentation, governance, and impact measurement with Singapore investor expectations. MAS requirements, taxonomy alignment, and TCFD disclosure are addressed proactively. The result is faster closes and better terms.",
    "our_approach": "We assess project readiness against Singapore investor expectations, identify gaps, and work with teams to close them. We understand MAS requirements, bank sustainability criteria, and sovereign wealth due diligence standards.",
    "market_risks": "Competition for Singapore climate capital is intense. Well-prepared projects capture available capital while unprepared projects wait. Singapore investors are increasingly selective—only the best-prepared projects succeed."
  }'::jsonb,
  '[
    {"slug": "climate-investment-readiness", "title": "Climate Investment Readiness", "type": "capability"},
    {"slug": "article-6-advisory", "title": "Article 6 Advisory", "type": "capability"},
    {"slug": "india", "title": "India Market", "type": "geography"}
  ]'::jsonb,
  true,
  75
FROM public.seo_capabilities c, public.seo_geographies g 
WHERE c.slug = 'climate-investment-readiness' AND g.slug = 'singapore';