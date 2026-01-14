-- Insert industry-specific capability pages
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, industry_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'energy-optimisation-cement-industry',
  'combined'::page_type,
  c.id,
  i.id,
  'Energy Optimisation for Cement Industry | Bombay Breed',
  'Reduce cement plant energy costs by 10-15% through kiln efficiency, waste heat recovery, and process optimization. Expert advisory for clinker production and grinding operations.',
  'Energy Optimisation for Cement Manufacturing',
  'Cement plants typically achieve 10-15% energy cost reduction through kiln optimization, waste heat recovery systems, and grinding efficiency improvements. With energy representing 30-40% of production costs, the ROI on optimization is substantial and rapid.',
  '[
    {"question": "What are the biggest energy saving opportunities in cement plants?", "answer": "Kiln thermal efficiency improvements typically deliver 5-8% savings. Waste heat recovery for power generation adds 3-5%. Grinding optimization and VFD installations contribute another 2-4%. Combined, well-executed programs achieve 10-15% total reduction."},
    {"question": "How does waste heat recovery work in cement plants?", "answer": "Waste heat recovery systems capture thermal energy from kiln exhaust and clinker cooler, converting it to electricity. A typical 5000 TPD plant can generate 8-12 MW, reducing grid dependence by 25-35% and providing insulation against tariff increases."},
    {"question": "What is the payback on cement plant energy investments?", "answer": "Quick wins like VFD installations and compressed air optimization pay back in 6-12 months. Waste heat recovery systems typically show 3-4 year returns. Kiln modifications vary by scope but generally achieve 2-3 year payback."},
    {"question": "How does energy efficiency affect our CBAM liability?", "answer": "Cement faces the highest CBAM exposure of any sector. Every 1% reduction in emissions intensity directly reduces CBAM costs on EU exports. For a plant exporting 500,000 tonnes annually, a 10% intensity reduction could save €2-3M annually at current carbon prices."},
    {"question": "Can you work with our existing energy management systems?", "answer": "Yes. We integrate with existing DCS, energy monitoring, and ERP systems. Our approach enhances rather than replaces your infrastructure, focusing on analytics, optimization algorithms, and decision-support rather than hardware replacement."}
  ]'::jsonb,
  '{
    "the_problem": "Cement manufacturing is among the most energy-intensive industries, with thermal and electrical energy representing 30-40% of production costs. Most plants operate 10-20% below optimal efficiency due to legacy equipment, suboptimal fuel mix, and fragmented monitoring systems.",
    "why_this_fails": "Internal optimization efforts often focus on individual equipment without system-level thinking. Kiln teams optimize for clinker quality while grinding teams optimize for throughput—without coordinating on total energy consumption. The result is local optima that miss significant savings.",
    "what_changes": "Integrated energy optimization treats the cement plant as a system. Kiln efficiency, waste heat recovery, grinding optimization, and renewable integration are coordinated to maximize total value. Carbon cost implications are included in every investment decision.",
    "our_approach": "We begin with a comprehensive energy diagnostic benchmarking your plant against sector best practices. We identify quick wins, capital projects, and strategic positioning opportunities. Every recommendation includes financial modeling specific to cement economics.",
    "market_risks": "Indian cement exporters face imminent CBAM exposure. Domestic carbon pricing is emerging. PAT scheme compliance costs are rising. Plants that delay optimization face compounding cost disadvantages versus early movers."
  }'::jsonb,
  '[
    {"slug": "energy-optimisation-consulting", "title": "Energy Optimisation Consulting", "type": "capability"},
    {"slug": "industrial-decarbonisation-strategy", "title": "Industrial Decarbonisation Strategy", "type": "capability"},
    {"slug": "steel", "title": "Steel Industry Solutions", "type": "industry"}
  ]'::jsonb,
  true,
  85
FROM public.seo_capabilities c, public.seo_industries i 
WHERE c.slug = 'energy-optimisation-consulting' AND i.slug = 'cement';

-- Steel decarbonisation page
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, industry_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'decarbonisation-steel-industry',
  'combined'::page_type,
  c.id,
  i.id,
  'Steel Industry Decarbonisation Strategy | Bombay Breed',
  'Strategic transition planning for steel manufacturers. Navigate the shift from blast furnace to green steel through hydrogen readiness, scrap optimization, and EAF conversion pathways.',
  'Decarbonisation Strategy for Steel Manufacturing',
  'Steel decarbonisation requires a phased approach: immediate efficiency gains from existing assets, medium-term scrap ratio optimization and EAF expansion, and long-term positioning for hydrogen-based steelmaking. Companies without credible transition plans face capital market exclusion.',
  '[
    {"question": "How do we decarbonise blast furnace operations?", "answer": "Near-term options include pulverized coal injection optimization, natural gas injection, and scrap ratio increases. Medium-term solutions involve hydrogen blending trials. Long-term transition requires either conversion to DRI-EAF or carbon capture. Each pathway has different economics."},
    {"question": "What is the timeline for green steel becoming competitive?", "answer": "Green steel currently carries a 20-40% premium. By 2030, narrowing carbon price differentials and technology maturation should reduce this to 10-15%. By 2035, green steel may achieve cost parity in markets with strong carbon pricing."},
    {"question": "How should we think about hydrogen readiness?", "answer": "Hydrogen readiness means: understanding your sites hydrogen supply options, engineering assessments for DRI conversion, pilot program participation, and offtake agreements for green steel. The goal is optionality, not immediate conversion."},
    {"question": "What happens to our blast furnace assets?", "answer": "Blast furnaces face stranded asset risk if transition is delayed. The strategic response involves: maximizing value from existing assets while carbon costs allow, phased EAF capacity additions, and managed retirement of BF capacity as green alternatives scale."},
    {"question": "How do investors evaluate steel company transition plans?", "answer": "Investors assess: emissions trajectory versus sector pathways, capital allocation to transition versus BAU, technology partnership quality, and management credibility. Generic commitments fail due diligence; specific, costed roadmaps succeed."}
  ]'::jsonb,
  '{
    "the_problem": "Steel is the second-largest industrial emitter globally. Blast furnace steelmaking produces 1.8-2.2 tonnes of CO2 per tonne of steel. As carbon prices rise and green procurement standards tighten, high-emission steel faces market exclusion and stranded asset risk.",
    "why_this_fails": "Most steel company transition plans are developed for sustainability reports, not operational execution. They announce 2050 targets without mapping technology pathways or capital requirements. When investors probe, the plans collapse under scrutiny.",
    "what_changes": "Credible steel transition plans show exactly how emissions will decline: efficiency gains from existing assets, scrap optimization trajectories, EAF capacity additions, hydrogen readiness investments, and potential CCUS applications. Each step is costed and timed.",
    "our_approach": "We combine deep steel sector expertise with capital markets understanding. We work with operations and finance teams to develop plans that are technically grounded and investor-ready. Plans include technology roadmaps, capital timelines, and competitive positioning strategies.",
    "market_risks": "CBAM hits steel exporters hard. Automotive and construction customers increasingly require low-carbon steel. Green steel premiums create first-mover advantages. Companies without credible plans face higher cost of capital and customer defection."
  }'::jsonb,
  '[
    {"slug": "industrial-decarbonisation-strategy", "title": "Industrial Decarbonisation Strategy", "type": "capability"},
    {"slug": "energy-optimisation-consulting", "title": "Energy Optimisation Consulting", "type": "capability"},
    {"slug": "cement", "title": "Cement Industry Solutions", "type": "industry"}
  ]'::jsonb,
  true,
  85
FROM public.seo_capabilities c, public.seo_industries i 
WHERE c.slug = 'industrial-decarbonisation-strategy' AND i.slug = 'steel';

-- Energy optimisation for steel
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, industry_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'energy-optimisation-steel-industry',
  'combined'::page_type,
  c.id,
  i.id,
  'Energy Optimisation for Steel Industry | Bombay Breed',
  'Reduce steel plant energy costs by 12-18% through blast furnace optimization, coke rate reduction, and EAF efficiency improvements. Expert advisory for integrated and secondary steel producers.',
  'Energy Optimisation for Steel Manufacturing',
  'Steel plants achieve 12-18% energy cost reduction through blast furnace optimization, coke rate reduction, and waste heat recovery. For EAF operations, transformer efficiency and scrap preheating deliver 8-12% savings. Energy represents 20-30% of steel production costs.',
  '[
    {"question": "What are the main energy saving opportunities in integrated steel plants?", "answer": "Blast furnace coke rate reduction (5-8% of energy costs), sinter plant optimization (2-3%), coke oven gas utilization (3-5%), and power plant efficiency (2-4%). Combined programs typically achieve 12-18% total energy reduction."},
    {"question": "How do we reduce coke consumption in blast furnaces?", "answer": "Coke reduction strategies include: pulverized coal injection optimization, natural gas injection, burden distribution improvements, and hot blast temperature increases. Each 10 kg/THM reduction in coke rate saves approximately $3-4 per tonne of hot metal."},
    {"question": "What energy savings are possible in EAF steelmaking?", "answer": "EAF energy optimization focuses on: transformer and electrode efficiency, scrap preheating systems, foamy slag practices, and power quality management. Well-executed programs reduce electrical consumption by 30-50 kWh/tonne."},
    {"question": "How does energy efficiency affect steel competitiveness?", "answer": "Energy represents 20-30% of steel production costs. A 15% energy reduction translates to 3-5% improvement in total production costs. In commodity steel markets, this margin advantage is often the difference between profit and loss."},
    {"question": "Can energy optimization reduce our carbon emissions?", "answer": "Yes. Energy efficiency is the fastest, lowest-cost decarbonisation lever. A 15% energy reduction typically delivers 10-12% emissions reduction. This buys time for more capital-intensive solutions like hydrogen and CCUS."}
  ]'::jsonb,
  '{
    "the_problem": "Steel production is highly energy-intensive, with energy representing 20-30% of production costs. Most steel plants operate 15-25% below optimal efficiency due to aging equipment, suboptimal operating practices, and limited real-time optimization capabilities.",
    "why_this_fails": "Steel plants optimize individual units—blast furnaces, coke ovens, rolling mills—without system-level coordination. Energy management is often reactive rather than predictive. The result is significant waste that compounds across the production chain.",
    "what_changes": "Integrated energy optimization coordinates across the entire steel production chain. Blast furnace parameters, coke oven operations, gas networks, and power generation are optimized together. Real-time monitoring enables predictive rather than reactive management.",
    "our_approach": "We conduct comprehensive energy audits benchmarking your operations against global best practices. We identify quick wins, medium-term capital projects, and strategic efficiency investments. Every recommendation is financially modeled for steel economics.",
    "market_risks": "Rising energy costs and carbon pricing pressure steel margins. PAT scheme compliance costs are increasing. Export-focused producers face CBAM exposure. Efficiency leaders gain cost advantages that become harder for laggards to close."
  }'::jsonb,
  '[
    {"slug": "energy-optimisation-consulting", "title": "Energy Optimisation Consulting", "type": "capability"},
    {"slug": "decarbonisation-steel-industry", "title": "Steel Decarbonisation Strategy", "type": "capability"},
    {"slug": "cement", "title": "Cement Industry Solutions", "type": "industry"}
  ]'::jsonb,
  true,
  80
FROM public.seo_capabilities c, public.seo_industries i 
WHERE c.slug = 'energy-optimisation-consulting' AND i.slug = 'steel';

-- Data centre energy efficiency
INSERT INTO public.seo_pages (
  slug, page_type, capability_id, industry_id, meta_title, meta_description, h1_headline, 
  direct_answer_block, faq_items, content_sections, internal_links, is_published, priority
)
SELECT 
  'energy-efficiency-data-centres',
  'combined'::page_type,
  c.id,
  i.id,
  'Data Centre Energy Efficiency | 24/7 Carbon-Free Energy | Bombay Breed',
  'Achieve RE100 compliance and reduce PUE through strategic energy optimization. Expert advisory for hyperscale and colocation data centres pursuing carbon-free operations.',
  'Energy Efficiency for Data Centres',
  'Data centres can reduce PUE from 1.6-1.8 to 1.2-1.4 through cooling optimization, airflow management, and UPS efficiency improvements. Combined with 24/7 carbon-free energy strategies, operators can achieve genuine sustainability while reducing costs.',
  '[
    {"question": "What PUE improvements are realistically achievable?", "answer": "Most legacy data centres operate at PUE 1.5-1.8. Retrofits typically achieve PUE 1.3-1.4 through cooling optimization and airflow management. New builds can target PUE 1.1-1.2 with advanced designs. Each 0.1 PUE reduction represents 5-7% energy savings."},
    {"question": "What is 24/7 carbon-free energy and why does it matter?", "answer": "24/7 CFE means matching every hour of consumption with carbon-free generation—not just annual averaging. Tech customers increasingly require this standard. It requires sophisticated procurement strategies combining PPAs, storage, and grid optimization."},
    {"question": "How do we balance efficiency with reliability requirements?", "answer": "Modern efficiency measures enhance rather than compromise reliability. Hot/cold aisle containment, variable speed cooling, and modular UPS systems all improve both efficiency and redundancy. The trade-off narrative is outdated."},
    {"question": "What cooling technologies should we consider?", "answer": "Options include: free cooling where climate permits, liquid cooling for high-density racks, evaporative cooling in suitable climates, and waste heat recovery for campus heating. The optimal mix depends on location, load profile, and growth plans."},
    {"question": "How do hyperscaler sustainability requirements affect us?", "answer": "Major cloud and content customers increasingly require suppliers to demonstrate RE100 progress and Scope 3 reduction plans. Colocation operators without credible sustainability roadmaps face customer attrition to competitors who can meet these requirements."}
  ]'::jsonb,
  '{
    "the_problem": "Data centre energy consumption is growing exponentially with AI workloads. PUE improvements are stalling in legacy facilities. Customers demand 24/7 carbon-free energy, not just renewable energy credits. Operators face pressure from both costs and sustainability commitments.",
    "why_this_fails": "Many data centre sustainability efforts focus on renewable energy procurement without addressing underlying efficiency. RECs provide accounting benefits but not genuine carbon reduction. Customers increasingly see through greenwashing to demand real solutions.",
    "what_changes": "Integrated approaches combine efficiency optimization with strategic renewable procurement. PUE improvements reduce total energy required. 24/7 CFE strategies match consumption with genuine carbon-free generation. The result is both cost reduction and credible sustainability.",
    "our_approach": "We assess data centre energy systems holistically: cooling, power distribution, IT load efficiency, and renewable procurement. We develop roadmaps that sequence investments for maximum impact and help operators meet customer sustainability requirements.",
    "market_risks": "Hyperscaler and enterprise customers are tightening supplier sustainability requirements. Operators who cannot demonstrate RE100 progress and Scope 3 reduction plans face contract losses. Early movers capture market share from laggards."
  }'::jsonb,
  '[
    {"slug": "energy-optimisation-consulting", "title": "Energy Optimisation Consulting", "type": "capability"},
    {"slug": "climate-investment-readiness", "title": "Climate Investment Readiness", "type": "capability"},
    {"slug": "singapore", "title": "Singapore Market", "type": "geography"}
  ]'::jsonb,
  true,
  80
FROM public.seo_capabilities c, public.seo_industries i 
WHERE c.slug = 'energy-optimisation-consulting' AND i.slug = 'data-centres';