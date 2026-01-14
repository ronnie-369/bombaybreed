-- Insert the 5 core capability pages with full content
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'energy-optimisation-consulting',
  'capability'::page_type,
  id,
  'Energy Optimisation Consulting | Bombay Breed',
  'Reduce energy costs by 8-15% in heavy industry through strategic process optimization, demand management, and renewable integration. Expert advisory for cement, steel, and manufacturing.',
  'Energy Utilisation Optimisation for Heavy Industry',
  'Energy optimisation in heavy industry typically delivers 8-15% cost reduction within 18 months when kiln efficiency, heat recovery, and demand-side management are addressed together. The ROI compounds as carbon pricing mechanisms tighten.',
  '[
    {"question": "How much can we realistically save on energy costs?", "answer": "Most heavy industrial facilities achieve 8-15% reduction in energy costs within 18 months. Cement kilns often see 10-12% through waste heat recovery and process optimization. Steel plants typically realize 12-18% through demand management and furnace efficiency."},
    {"question": "What is the typical payback period for energy optimisation investments?", "answer": "Core efficiency measures typically pay back within 12-24 months. Renewable integration projects show 3-5 year returns depending on PPA structures. The key is sequencing investments to use early savings to fund deeper interventions."},
    {"question": "How does this affect our CBAM exposure?", "answer": "Direct emissions reductions from energy efficiency lower your CBAM liability per tonne of product exported to Europe. A 10% emissions intensity reduction translates directly to 10% lower CBAM costs—increasingly material as carbon prices rise."},
    {"question": "What happens if we do nothing?", "answer": "Energy costs continue rising with grid tariffs. Carbon pricing mechanisms increase compliance costs. Competitors who optimise earlier gain cost advantages. Eventually, high-emission facilities face stranded asset risk as procurement standards tighten."},
    {"question": "Do you work with our existing engineering teams?", "answer": "Yes. We work alongside your operations and engineering teams, not replacing them. Our role is strategic prioritisation, financing structures, and implementation oversight—your teams execute with our guidance."}
  ]'::jsonb,
  '{
    "the_problem": "Heavy industry faces a compounding cost crisis: rising grid tariffs, volatile fuel prices, and emerging carbon costs. Most facilities operate 15-25% below optimal energy efficiency due to legacy equipment, fragmented monitoring, and misaligned incentives between operations and finance.",
    "why_this_fails": "Internal energy audits often identify opportunities but fail to prioritize by ROI or sequence investments effectively. Engineering teams optimize individual processes without understanding carbon market implications. Finance teams discount efficiency projects that lack clear payback models.",
    "what_changes": "A systematic approach identifies the 20% of interventions that deliver 80% of value. Process optimization, waste heat recovery, demand management, and strategic renewable integration are sequenced to maximize cash flow and minimize disruption. Carbon cost savings are quantified and included in investment cases.",
    "our_approach": "We begin with a rapid energy diagnostic that maps your facility against sector benchmarks. We identify quick wins, medium-term capital projects, and strategic positioning moves. Every recommendation includes financial modeling, implementation roadmaps, and risk mitigation strategies.",
    "market_risks": "Indian industrial facilities face PAT scheme compliance costs, rising grid tariffs, and impending carbon market integration. Export-focused manufacturers face CBAM exposure. Delay compounds costs as carbon prices rise and early movers capture efficiency gains."
  }'::jsonb,
  '[
    {"slug": "industrial-decarbonisation-strategy", "title": "Industrial Decarbonisation Strategy", "type": "capability"},
    {"slug": "cement", "title": "Cement Industry Solutions", "type": "industry"},
    {"slug": "steel", "title": "Steel Industry Solutions", "type": "industry"}
  ]'::jsonb,
  true,
  95
FROM public.seo_capabilities WHERE slug = 'energy-optimisation-consulting';

-- Industrial Decarbonisation Strategy
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'industrial-decarbonisation-strategy',
  'capability'::page_type,
  id,
  'Industrial Decarbonisation Strategy | Bombay Breed',
  'End-to-end transition planning for hard-to-abate sectors. Strategic decarbonisation roadmaps for cement, steel, chemicals, and heavy manufacturing aligned with 1.5°C pathways.',
  'Industrial Decarbonisation Strategy for Hard-to-Abate Sectors',
  'Industrial decarbonisation requires sector-specific pathways that balance technical feasibility, capital availability, and competitive positioning. Credible transition plans unlock green financing, satisfy investor due diligence, and position companies for regulatory advantage.',
  '[
    {"question": "How do we decarbonise when technology solutions are not yet commercial?", "answer": "Most hard-to-abate sectors can achieve 40-60% emissions reductions with proven technologies today. The remaining reductions require positioning for emerging solutions—hydrogen, CCUS, alternative feedstocks—through strategic partnerships and pilot programs."},
    {"question": "What does a credible transition plan look like to investors?", "answer": "Investors expect science-based targets aligned with 1.5°C pathways, clear milestone timelines, quantified capital requirements, and governance mechanisms. Generic commitments without specificity fail due diligence. Credible plans show the emissions math actually works."},
    {"question": "How do we avoid stranded asset risk?", "answer": "Assets become stranded when emissions intensity exceeds what markets will accept. The solution is early planning: understanding timeline windows, retrofitting where viable, and strategic retirement of assets that cannot be transitioned economically."},
    {"question": "What is the cost of not having a transition plan?", "answer": "Without credible plans, companies face: higher cost of capital, exclusion from green financing, customer defection as procurement standards tighten, regulatory penalties, and talent attrition as employees prefer climate-aligned employers."},
    {"question": "How long does developing a transition plan take?", "answer": "A comprehensive sector-aligned transition plan typically requires 3-4 months of intensive work. This includes emissions baselining, technology assessment, financial modeling, and stakeholder alignment. Rushed plans fail credibility tests."}
  ]'::jsonb,
  '{
    "the_problem": "Hard-to-abate sectors—cement, steel, chemicals, heavy manufacturing—face existential pressure to decarbonise. Generic net-zero pledges without sector-specific pathways destroy credibility. Investors, regulators, and customers increasingly demand evidence that transition plans are technically feasible and financially viable.",
    "why_this_fails": "Most industrial transition plans fail because they are developed by sustainability teams without deep engineering or financial input. They announce targets without mapping technology pathways. They ignore competitive dynamics. They lack the granularity that serious investors require.",
    "what_changes": "A credible transition plan shows exactly how emissions will decline, when capital will be deployed, which technologies will be adopted, and how the company will remain competitive during transition. It becomes a strategic asset that unlocks financing and customer contracts.",
    "our_approach": "We combine deep sector expertise with capital markets understanding. We work with engineering and finance teams to develop plans that are technically grounded and investor-ready. Every plan includes emissions pathways, capital timelines, technology roadmaps, and governance frameworks.",
    "market_risks": "CBAM implementation accelerates pressure on exporters. Institutional investors increasingly exclude companies without credible transition plans. Green procurement standards are tightening across supply chains. First movers capture advantages that become harder to replicate."
  }'::jsonb,
  '[
    {"slug": "energy-optimisation-consulting", "title": "Energy Optimisation Consulting", "type": "capability"},
    {"slug": "climate-investment-readiness", "title": "Climate Investment Readiness", "type": "capability"},
    {"slug": "cement", "title": "Cement Industry Solutions", "type": "industry"}
  ]'::jsonb,
  true,
  95
FROM public.seo_capabilities WHERE slug = 'industrial-decarbonisation-strategy';

-- Article 6 Advisory
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'article-6-advisory',
  'capability'::page_type,
  id,
  'Article 6 Advisory | Paris Agreement Carbon Markets | Bombay Breed',
  'Strategic guidance on Article 6 mechanisms, corresponding adjustments, and international carbon market participation. Navigate complexity, ensure integrity, unlock value.',
  'Article 6 Advisory for International Carbon Markets',
  'Article 6 of the Paris Agreement creates new rules for international carbon trading. Corresponding adjustments prevent double-counting but add complexity. Companies and countries need strategic guidance to participate without integrity risk.',
  '[
    {"question": "What are corresponding adjustments and why do they matter?", "answer": "Corresponding adjustments ensure carbon reductions are not counted by both the host country and the buyer. Without them, the global emissions math does not add up. Post-2024, credits without corresponding adjustments face severe market discounting."},
    {"question": "How do we know if our carbon credits have integrity?", "answer": "Integrity requires: real emissions reductions, accurate measurement, verified additionality, permanence guarantees, and proper authorization under Article 6.2 or 6.4 mechanisms. Many legacy credits fail these tests."},
    {"question": "What is the difference between Article 6.2 and 6.4?", "answer": "Article 6.2 enables bilateral government-to-government carbon trading. Article 6.4 creates a centralized UN mechanism similar to CDM. Companies can participate through either pathway depending on project type and host country preferences."},
    {"question": "How do we avoid reputational risk from carbon credit purchases?", "answer": "Due diligence on credit integrity is essential. This means understanding host country authorization status, verification methodologies, and corresponding adjustment commitments. Low-quality credits are increasingly exposed by media and NGO scrutiny."},
    {"question": "What opportunities does Article 6 create for Indian companies?", "answer": "India can become a major supplier of Article 6 credits through renewable energy, industrial efficiency, and nature-based solutions. Indian companies can also access international credits to meet voluntary commitments. The opportunity is substantial but requires careful navigation."}
  ]'::jsonb,
  '{
    "the_problem": "Article 6 implementation has created a two-tier carbon market. Credits with corresponding adjustments command premiums. Credits without them face discounting or rejection. Many companies hold carbon credit portfolios with uncertain integrity status.",
    "why_this_fails": "Most carbon credit strategies were developed before Article 6 rules were finalized. Brokers often lack understanding of corresponding adjustment requirements. Companies purchase credits that later prove unusable for compliance or credible voluntary claims.",
    "what_changes": "Strategic Article 6 navigation means understanding which credits have genuine integrity, which projects can generate authorized credits, and how to structure portfolios for both compliance and voluntary purposes. Early positioning captures value as markets mature.",
    "our_approach": "We provide end-to-end Article 6 advisory: market analysis, credit due diligence, project development guidance, and policy positioning. We help clients understand where the market is heading and position accordingly.",
    "market_risks": "The window to establish Article 6 positions is narrowing. Host countries are finalizing authorization frameworks. Early bilateral agreements are being signed. Companies that wait will face higher costs and fewer options."
  }'::jsonb,
  '[
    {"slug": "dmrv-integrity-due-diligence", "title": "DMRV Integrity Due Diligence", "type": "capability"},
    {"slug": "corresponding-adjustments", "title": "Corresponding Adjustments", "type": "regulation"},
    {"slug": "article-6", "title": "Article 6 Mechanisms", "type": "regulation"}
  ]'::jsonb,
  true,
  90
FROM public.seo_capabilities WHERE slug = 'article-6-advisory';

-- DMRV Integrity Due Diligence
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'dmrv-integrity-due-diligence',
  'capability'::page_type,
  id,
  'DMRV Integrity Due Diligence | Carbon Credit Verification | Bombay Breed',
  'Independent assessment of digital monitoring, reporting and verification systems. Ensure carbon credit integrity, satisfy investor due diligence, avoid greenwashing risk.',
  'DMRV Integrity Due Diligence for Carbon Markets',
  'Digital MRV systems promise transparency but vary dramatically in quality. Independent due diligence separates robust systems from those that create liability. Investors increasingly require DMRV integrity assessments before committing capital.',
  '[
    {"question": "What makes a DMRV system credible?", "answer": "Credible systems have: transparent methodologies, third-party validation, continuous monitoring rather than periodic sampling, immutable data records, and conservative baseline assumptions. Many systems fail one or more of these tests."},
    {"question": "How do we assess DMRV quality for our carbon credit purchases?", "answer": "We evaluate: sensor technology and calibration, data transmission security, baseline methodology, verification protocols, and registry integration. We provide integrity scores that quantify risk levels across these dimensions."},
    {"question": "What is the liability risk from poor DMRV?", "answer": "Companies claiming emissions reductions based on flawed DMRV face greenwashing allegations, regulatory penalties, and reputational damage. Directors may face personal liability if they approved claims they should have questioned."},
    {"question": "Can existing carbon credits be re-verified?", "answer": "Some credits can be strengthened through enhanced DMRV overlays. Others have fundamental methodology flaws that cannot be remediated. Our assessments identify which credits can be salvaged and which should be written off."},
    {"question": "How is DMRV technology evolving?", "answer": "Satellite monitoring, IoT sensors, and blockchain registries are improving DMRV quality. But technology alone does not guarantee integrity—methodology and governance matter equally. We assess both technology and process."}
  ]'::jsonb,
  '{
    "the_problem": "Carbon markets are plagued by integrity concerns. High-profile investigations have exposed credits with questionable emissions reductions. Buyers face reputational and financial risk from credits that later prove problematic. DMRV quality is the key differentiator.",
    "why_this_fails": "Many buyers rely on registry listings or certifications without understanding underlying DMRV quality. Certifications indicate process compliance, not outcome integrity. The gap between certified and genuinely additional credits is often substantial.",
    "what_changes": "Rigorous DMRV due diligence identifies which credits have genuine integrity and which carry hidden risks. This protects capital, reputation, and climate claims. It also positions buyers to capture value as markets increasingly price integrity.",
    "our_approach": "We conduct independent technical assessments of DMRV systems across carbon credit portfolios. We evaluate methodology, technology, governance, and track record. Clients receive integrity scores and risk mitigation recommendations.",
    "market_risks": "Regulatory scrutiny of carbon claims is intensifying. The SEC, EU, and UK are all developing disclosure requirements that will expose low-quality credits. Companies holding problematic credits face write-down risk and reputational damage."
  }'::jsonb,
  '[
    {"slug": "article-6-advisory", "title": "Article 6 Advisory", "type": "capability"},
    {"slug": "climate-investment-readiness", "title": "Climate Investment Readiness", "type": "capability"},
    {"slug": "article-6", "title": "Article 6 Mechanisms", "type": "regulation"}
  ]'::jsonb,
  true,
  85
FROM public.seo_capabilities WHERE slug = 'dmrv-integrity-due-diligence';

-- Climate Investment Readiness
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'climate-investment-readiness',
  'capability'::page_type,
  id,
  'Climate Investment Readiness | Green Finance Advisory | Bombay Breed',
  'Prepare climate assets and transition projects for institutional capital. Rigorous due diligence, documentation, and stakeholder alignment to unlock green financing.',
  'Climate Investment Readiness for Institutional Capital',
  'Climate projects fail to attract capital not because of weak fundamentals but because of presentation gaps. Investment readiness means aligning project documentation, governance, and stakeholder commitments to institutional requirements before approaching investors.',
  '[
    {"question": "Why do good climate projects fail to raise capital?", "answer": "Most failures are not about project quality but about presentation. Missing documentation, unclear governance, unquantified risks, and misaligned stakeholder expectations create friction that investors avoid rather than solve themselves."},
    {"question": "What do institutional investors require for climate projects?", "answer": "Investors need: bankable feasibility studies, clear regulatory pathway, quantified risk matrices, experienced management teams, defined exit mechanisms, and ESG integration evidence. Most projects are missing several of these elements."},
    {"question": "How long does investment readiness preparation take?", "answer": "Typical timeline is 3-6 months depending on project complexity and current documentation state. Rushing creates gaps that emerge during due diligence and delay or kill deals."},
    {"question": "What is the cost of not being investment-ready?", "answer": "Unprepared projects face: higher cost of capital, longer fundraising timelines, unfavorable terms, or outright rejection. The cost of preparation is typically 1-2% of capital raised—far less than the value lost from poor positioning."},
    {"question": "Do you help with investor introductions?", "answer": "Yes, but only after projects are genuinely investment-ready. Premature introductions damage relationships and make future fundraising harder. We ensure projects meet institutional standards before making introductions."}
  ]'::jsonb,
  '{
    "the_problem": "Climate finance is abundant but climate projects struggle to access it. The gap is not capital availability but investment readiness. Most climate projects—especially in emerging markets—lack the documentation, governance, and risk quantification that institutional investors require.",
    "why_this_fails": "Project developers often approach investors before completing preparation. They assume strong fundamentals will overcome documentation gaps. Investors reject or delay rather than doing preparation work themselves. Each rejection makes subsequent fundraising harder.",
    "what_changes": "Investment-ready projects move through due diligence efficiently. Documentation anticipates investor questions. Governance structures meet institutional standards. Risk matrices are quantified and mitigated. The result is faster closes, better terms, and higher success rates.",
    "our_approach": "We conduct investment readiness assessments that identify gaps between current state and institutional requirements. We then work with project teams to close those gaps: documentation, governance, financial modeling, risk analysis, and stakeholder alignment.",
    "market_risks": "Competition for climate capital is intensifying. Well-prepared projects capture available capital while unprepared projects wait. Early movers establish investor relationships that create advantages for future projects."
  }'::jsonb,
  '[
    {"slug": "industrial-decarbonisation-strategy", "title": "Industrial Decarbonisation Strategy", "type": "capability"},
    {"slug": "dmrv-integrity-due-diligence", "title": "DMRV Integrity Due Diligence", "type": "capability"},
    {"slug": "india", "title": "India Market", "type": "geography"}
  ]'::jsonb,
  true,
  90
FROM public.seo_capabilities WHERE slug = 'climate-investment-readiness';