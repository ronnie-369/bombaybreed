-- Insert Industry Landing Pages
INSERT INTO seo_pages (
  slug, page_type, meta_title, meta_description, h1_headline, direct_answer_block, 
  content_sections, faq_items, internal_links, industry_id, is_published, priority
) VALUES
-- Steel Industry Landing Page
(
  'steel-industry',
  'industry',
  'Steel Industry Decarbonisation Advisory | Bombay Breed',
  'Strategic sustainability communications and climate advisory for steel manufacturers. Navigate energy transition, carbon markets, and regulatory compliance.',
  'Steel Industry Sustainability & Decarbonisation Advisory',
  'The steel industry accounts for 7-9% of global CO2 emissions. We help steel manufacturers navigate energy transition, carbon market opportunities, and regulatory compliance across India, UAE, and Singapore.',
  '{"intro": "Steel production is at the heart of industrial decarbonisation. With increasing pressure from CBAM, BRSR mandates, and investor scrutiny, steel manufacturers need strategic guidance to transform operations while maintaining competitiveness.", "approach": "We combine deep sector expertise with regulatory intelligence to help steel companies develop credible decarbonisation roadmaps, access carbon markets, and communicate their climate journey to stakeholders.", "benefits": "Our clients in the steel sector have successfully navigated CBAM reporting requirements, secured climate finance, and built authentic sustainability narratives that resonate with global buyers."}'::jsonb,
  '[{"question": "How does CBAM affect Indian steel exporters?", "answer": "CBAM requires embedded carbon reporting for steel exports to the EU. We help steel manufacturers establish MRV systems and develop strategic responses to maintain market access."}, {"question": "What decarbonisation pathways are available for steel?", "answer": "Options include energy efficiency, renewable integration, hydrogen-based DRI, and carbon capture. We help prioritise investments based on your specific context and timeline."}]'::jsonb,
  '[{"title": "Steel Decarbonisation Strategy", "url": "/industrial-decarbonisation-strategy-steel", "description": "Comprehensive decarbonisation roadmaps for steel manufacturers"}, {"title": "Energy Optimisation for Steel", "url": "/energy-optimisation-consulting-steel", "description": "Reduce energy intensity and costs in steel production"}]'::jsonb,
  '635fa88b-ef75-4f99-b3e8-30e51331c6df',
  true,
  80
),
-- Cement Industry Landing Page
(
  'cement-industry',
  'industry',
  'Cement Industry Climate Advisory | Bombay Breed',
  'Strategic sustainability communications for cement manufacturers. Navigate decarbonisation, carbon markets, and CBAM compliance across emerging markets.',
  'Cement Industry Sustainability & Climate Advisory',
  'Cement accounts for 8% of global CO2 emissions. We help cement manufacturers develop credible decarbonisation strategies, navigate carbon markets, and meet evolving regulatory requirements.',
  '{"intro": "The cement industry faces unique decarbonisation challenges with process emissions that cannot be eliminated through fuel switching alone. Strategic planning and authentic communication are essential.", "approach": "We help cement companies develop science-aligned targets, explore alternative binders and carbon capture, and build stakeholder confidence through transparent sustainability communications.", "benefits": "Our cement sector clients have established industry-leading climate commitments, secured green finance, and navigated complex regulatory landscapes across multiple jurisdictions."}'::jsonb,
  '[{"question": "How can cement companies address process emissions?", "answer": "While process emissions are challenging, strategies include clinker substitution, alternative binders, and carbon capture. We help develop phased approaches aligned with technology readiness."}, {"question": "What carbon market opportunities exist for cement?", "answer": "Cement companies can access carbon credits through energy efficiency, alternative fuels, and emerging methodologies for clinker substitution. We help identify and develop these opportunities."}]'::jsonb,
  '[{"title": "Cement Decarbonisation Strategy", "url": "/industrial-decarbonisation-strategy-cement", "description": "Tailored decarbonisation roadmaps for cement manufacturers"}, {"title": "Energy Optimisation for Cement", "url": "/energy-optimisation-consulting-cement", "description": "Optimise thermal and electrical energy use in cement production"}]'::jsonb,
  'c8355272-2a85-49c6-9ba8-2145924d2daf',
  true,
  80
),
-- Oil & Gas Landing Page
(
  'oil-gas',
  'industry',
  'Oil & Gas Energy Transition Advisory | Bombay Breed',
  'Strategic advisory for oil and gas companies navigating energy transition. Develop credible climate strategies and stakeholder communications.',
  'Oil & Gas Energy Transition Advisory',
  'Oil and gas companies face unprecedented pressure to demonstrate credible transition strategies. We help develop authentic climate narratives and navigate the complex stakeholder landscape.',
  '{"intro": "The oil and gas sector is at the centre of the energy transition debate. Companies need strategic guidance to balance operational realities with stakeholder expectations and emerging regulations.", "approach": "We help oil and gas companies develop credible transition plans, communicate authentically about climate action, and identify opportunities in low-carbon energy and carbon markets.", "benefits": "Our O&G clients have built stakeholder trust through transparent communications, identified new revenue streams in carbon markets, and navigated complex regulatory requirements."}'::jsonb,
  '[{"question": "How should oil and gas companies communicate on climate?", "answer": "Authenticity is essential. We help develop communications that acknowledge challenges while demonstrating genuine commitment to transition, avoiding greenwashing risks."}, {"question": "What carbon market opportunities exist for O&G?", "answer": "Opportunities include methane reduction credits, CCUS projects, and nature-based solutions. We help identify and develop projects aligned with your transition strategy."}]'::jsonb,
  '[{"title": "Energy Transition Strategy", "url": "/industrial-decarbonisation-strategy-oil-gas", "description": "Develop credible transition roadmaps for oil and gas operations"}, {"title": "Carbon Markets for O&G", "url": "/article-6-advisory-oil-gas", "description": "Navigate carbon market opportunities and compliance"}]'::jsonb,
  '1ad6b943-c121-48c0-8e87-16a19d529241',
  true,
  80
),
-- Power & Utilities Landing Page
(
  'power-utilities',
  'industry',
  'Power Sector Decarbonisation Advisory | Bombay Breed',
  'Strategic climate advisory for power utilities and energy companies. Navigate grid decarbonisation, renewable integration, and regulatory compliance.',
  'Power & Utilities Climate Advisory',
  'Power sector transformation is central to achieving net-zero. We help utilities and energy companies navigate decarbonisation, communicate credibly, and access climate finance.',
  '{"intro": "The power sector is undergoing rapid transformation with renewable integration, grid modernisation, and evolving market structures. Strategic advisory helps navigate this complexity.", "approach": "We combine deep sector knowledge with regulatory expertise to help power companies develop transition strategies, access green finance, and communicate effectively with stakeholders.", "benefits": "Our power sector clients have secured climate finance, navigated complex regulatory transitions, and built authentic sustainability narratives."}'::jsonb,
  '[{"question": "How should utilities approach coal phase-out communications?", "answer": "Transparent communication about timelines, worker transition, and community impact builds stakeholder trust. We help develop narratives that balance ambition with operational realities."}, {"question": "What climate finance is available for power sector transition?", "answer": "Options include green bonds, transition finance, and multilateral funding. We help identify appropriate instruments and develop compelling investment cases."}]'::jsonb,
  '[{"title": "Power Sector Decarbonisation", "url": "/industrial-decarbonisation-strategy-power", "description": "Comprehensive decarbonisation strategies for power utilities"}, {"title": "Climate Investment Readiness", "url": "/climate-investment-readiness-power", "description": "Prepare for climate finance and green investments"}]'::jsonb,
  '259065e1-e63b-4a45-9b1e-270eca994b7e',
  true,
  80
),
-- Data Centres Landing Page
(
  'data-centres',
  'industry',
  'Data Centre Sustainability Advisory | Bombay Breed',
  'Strategic sustainability advisory for data centre operators. Navigate energy efficiency, renewable procurement, and stakeholder communications.',
  'Data Centre Sustainability & Climate Advisory',
  'Data centres consume 1-2% of global electricity, growing rapidly with AI. We help operators optimise energy use, procure renewables, and communicate sustainability commitments credibly.',
  '{"intro": "Data centre sustainability is increasingly scrutinised as digital infrastructure expands. Energy efficiency, renewable procurement, and water management are critical focus areas.", "approach": "We help data centre operators develop comprehensive sustainability strategies, navigate renewable energy procurement, and communicate credibly about environmental performance.", "benefits": "Our data centre clients have achieved industry-leading PUE metrics, secured 100% renewable energy procurement, and built authentic sustainability brands."}'::jsonb,
  '[{"question": "How can data centres achieve 100% renewable energy?", "answer": "Options include PPAs, RECs, and on-site generation. We help develop procurement strategies aligned with additionality principles and stakeholder expectations."}, {"question": "What sustainability metrics matter for data centres?", "answer": "Beyond PUE, metrics include WUE, CUE, renewable percentage, and Scope 3 emissions. We help develop comprehensive reporting frameworks."}]'::jsonb,
  '[{"title": "Data Centre Energy Optimisation", "url": "/energy-optimisation-consulting-data-centres", "description": "Optimise energy efficiency and reduce operational costs"}, {"title": "Climate Investment for Data Centres", "url": "/climate-investment-readiness-data-centres", "description": "Attract climate-conscious investors and tenants"}]'::jsonb,
  'd9f976b1-c2a7-48e1-bf3c-1cd6e805b04e',
  true,
  80
);

-- Insert Geography Landing Pages
INSERT INTO seo_pages (
  slug, page_type, meta_title, meta_description, h1_headline, direct_answer_block, 
  content_sections, faq_items, internal_links, geography_id, is_published, priority
) VALUES
-- India Landing Page
(
  'india',
  'geography',
  'India Climate & Sustainability Advisory | Bombay Breed',
  'Strategic sustainability communications and climate advisory for companies operating in India. Navigate BRSR, SEBI ESG, and carbon market opportunities.',
  'India Climate & Sustainability Advisory',
  'India is central to the global energy transition with ambitious climate targets and rapidly evolving regulations. We help companies navigate BRSR compliance, carbon markets, and stakeholder communications.',
  '{"intro": "India presents unique opportunities and challenges for sustainability leaders. With BRSR mandates, growing carbon markets, and ambitious renewable targets, strategic guidance is essential.", "approach": "We combine deep understanding of Indian regulatory landscape with global best practices to help companies develop credible sustainability strategies and communications.", "benefits": "Our India-based clients have successfully navigated BRSR reporting, accessed carbon market opportunities, and built authentic sustainability narratives for domestic and international stakeholders."}'::jsonb,
  '[{"question": "What are the key sustainability regulations in India?", "answer": "Key frameworks include BRSR (mandatory for top 1000 listed companies), SEBI ESG disclosure requirements, and the emerging carbon market under the Energy Conservation Act."}, {"question": "How can companies access India carbon markets?", "answer": "India is developing a compliance carbon market alongside existing voluntary markets. We help companies understand eligibility, develop projects, and navigate regulatory requirements."}]'::jsonb,
  '[{"title": "BRSR Compliance Advisory", "url": "/brsr-compliance", "description": "Navigate BRSR reporting requirements"}, {"title": "India Carbon Markets", "url": "/article-6-advisory-india", "description": "Access emerging carbon market opportunities"}]'::jsonb,
  '3cac1df6-093a-485b-9edf-75e569c36baf',
  true,
  85
),
-- Gujarat Landing Page
(
  'gujarat',
  'geography',
  'Gujarat Sustainability Advisory | Bombay Breed',
  'Climate and sustainability advisory for industries in Gujarat. Navigate energy transition for steel, cement, chemicals, and manufacturing sectors.',
  'Gujarat Industrial Sustainability Advisory',
  'Gujarat is India industrial powerhouse with significant decarbonisation opportunities. We help Gujarat-based industries navigate energy transition, carbon markets, and regulatory compliance.',
  '{"intro": "Gujarat hosts major industrial clusters in steel, cement, chemicals, and manufacturing. With proximity to renewable resources and port infrastructure, the state offers unique decarbonisation opportunities.", "approach": "We understand Gujarat industrial landscape and help companies develop context-specific sustainability strategies that leverage local advantages and address unique challenges.", "benefits": "Our Gujarat clients have developed leading decarbonisation roadmaps, accessed state and central incentives, and built credible sustainability narratives."}'::jsonb,
  '[{"question": "What renewable energy opportunities exist in Gujarat?", "answer": "Gujarat has excellent solar and wind resources, supportive policies, and green hydrogen ambitions. We help industries develop renewable procurement and green hydrogen strategies."}, {"question": "How can Gujarat industries prepare for CBAM?", "answer": "Many Gujarat exporters face CBAM implications. We help develop MRV systems, calculate embedded carbon, and plan strategic responses."}]'::jsonb,
  '[{"title": "Gujarat Steel Decarbonisation", "url": "/industrial-decarbonisation-strategy-steel-gujarat", "description": "Decarbonisation strategies for Gujarat steel industry"}, {"title": "Energy Optimisation Gujarat", "url": "/energy-optimisation-consulting-gujarat", "description": "Optimise energy use in Gujarat industries"}]'::jsonb,
  '9c3b70fc-fb18-4046-9dff-215dfcf465b6',
  true,
  75
),
-- Maharashtra Landing Page
(
  'maharashtra',
  'geography',
  'Maharashtra Climate Advisory | Bombay Breed',
  'Sustainability and climate advisory for Maharashtra industries. Navigate decarbonisation for manufacturing, power, and industrial sectors.',
  'Maharashtra Industrial Climate Advisory',
  'Maharashtra diverse industrial base presents varied decarbonisation challenges. We help companies across manufacturing, power, and services navigate sustainability requirements.',
  '{"intro": "Maharashtra is India largest industrial state with diverse sectors from automotive to chemicals. Each sector faces unique sustainability challenges and opportunities.", "approach": "We provide tailored advisory for Maharashtra industries, combining regulatory expertise with sector-specific knowledge to develop practical sustainability strategies.", "benefits": "Our Maharashtra clients have achieved compliance with state and national regulations, accessed green finance, and developed authentic sustainability communications."}'::jsonb,
  '[{"question": "What sustainability incentives are available in Maharashtra?", "answer": "Maharashtra offers various incentives for renewable energy, energy efficiency, and green manufacturing. We help identify and access relevant schemes."}, {"question": "How is Maharashtra addressing industrial emissions?", "answer": "The state is developing policies for industrial decarbonisation aligned with national targets. We help companies prepare for evolving requirements."}]'::jsonb,
  '[{"title": "Maharashtra Industrial Decarbonisation", "url": "/industrial-decarbonisation-strategy-maharashtra", "description": "Decarbonisation strategies for Maharashtra industries"}, {"title": "Climate Investment Maharashtra", "url": "/climate-investment-readiness-maharashtra", "description": "Access climate finance in Maharashtra"}]'::jsonb,
  '71aa7d95-9c88-4f5d-b773-e6a31059acbd',
  true,
  75
),
-- UAE Landing Page
(
  'uae',
  'geography',
  'UAE Sustainability Advisory | Bombay Breed',
  'Strategic climate advisory for companies in UAE. Navigate Net Zero 2050, carbon markets, and sustainability communications in the Gulf region.',
  'UAE Climate & Sustainability Advisory',
  'UAE is positioning as a regional sustainability leader with Net Zero 2050 targets. We help companies navigate evolving regulations, carbon markets, and stakeholder expectations.',
  '{"intro": "UAE has emerged as a regional climate leader, hosting COP28 and committing to Net Zero by 2050. Companies operating in UAE face growing sustainability expectations and opportunities.", "approach": "We help companies in UAE develop sustainability strategies aligned with national ambitions, access regional carbon markets, and communicate credibly to diverse stakeholders.", "benefits": "Our UAE clients have developed leading sustainability programs, navigated regional carbon market opportunities, and built authentic narratives for local and international audiences."}'::jsonb,
  '[{"question": "How is UAE carbon market developing?", "answer": "UAE is developing voluntary and compliance carbon market mechanisms. We help companies understand emerging frameworks and identify participation opportunities."}, {"question": "What sustainability reporting is required in UAE?", "answer": "Requirements are evolving with ADX and DFM introducing ESG disclosure guidelines. We help companies prepare for current and anticipated requirements."}]'::jsonb,
  '[{"title": "UAE Decarbonisation Strategy", "url": "/industrial-decarbonisation-strategy-uae", "description": "Develop decarbonisation roadmaps for UAE operations"}, {"title": "UAE Carbon Markets", "url": "/article-6-advisory-uae", "description": "Navigate UAE carbon market opportunities"}]'::jsonb,
  'dcb7efdf-cd45-4d50-af27-4031419b6cb8',
  true,
  80
),
-- Singapore Landing Page
(
  'singapore',
  'geography',
  'Singapore Climate Advisory | Bombay Breed',
  'Strategic sustainability advisory for Singapore-based companies. Navigate carbon tax, green finance, and regional climate leadership.',
  'Singapore Climate & Sustainability Advisory',
  'Singapore is Southeast Asia green finance hub with progressive carbon pricing. We help Singapore-based companies navigate carbon tax, access green finance, and lead on sustainability.',
  '{"intro": "Singapore combines ambitious climate targets with its role as a regional business hub. Companies based here face high expectations for sustainability leadership and disclosure.", "approach": "We help Singapore-based companies develop sustainability strategies that reflect the city-state high standards, access green finance, and communicate effectively to sophisticated stakeholders.", "benefits": "Our Singapore clients have achieved sustainability leadership positions, accessed green bond markets, and developed communications that resonate with discerning investors and customers."}'::jsonb,
  '[{"question": "How does Singapore carbon tax work?", "answer": "Singapore carbon tax applies to facilities emitting 25,000+ tCO2e annually, with rates increasing to S$50-80 by 2030. We help companies optimise their carbon tax position."}, {"question": "What green finance opportunities exist in Singapore?", "answer": "Singapore offers various green finance instruments including green bonds, sustainability-linked loans, and blended finance. We help develop compelling investment cases."}]'::jsonb,
  '[{"title": "Singapore Decarbonisation", "url": "/industrial-decarbonisation-strategy-singapore", "description": "Develop decarbonisation strategies for Singapore operations"}, {"title": "Climate Investment Singapore", "url": "/climate-investment-readiness-singapore", "description": "Access Singapore green finance ecosystem"}]'::jsonb,
  'ddb56910-e34d-4744-974f-4a1c3872d7e8',
  true,
  80
);