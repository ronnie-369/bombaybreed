-- First create a BRSR regulation entry
INSERT INTO seo_regulations (name, slug, description, jurisdiction, risk_type, urgency, is_active)
VALUES (
  'BRSR Reporting',
  'brsr',
  'Business Responsibility and Sustainability Reporting framework mandated by SEBI for listed Indian companies',
  'India',
  'Regulatory Compliance',
  'high',
  true
);

-- Now create the SEO page for brsr-compliance
INSERT INTO seo_pages (
  slug,
  page_type,
  meta_title,
  meta_description,
  h1_headline,
  direct_answer_block,
  content_sections,
  faq_items,
  internal_links,
  is_published,
  priority,
  regulation_id
)
VALUES (
  'brsr-compliance',
  'regulation',
  'BRSR Compliance Consulting India | Core & Leadership Framework Advisory',
  'Expert BRSR compliance consulting for Indian listed companies. Navigate SEBI''s Business Responsibility and Sustainability Reporting requirements with strategic advisory on Core, Leadership, and Lite frameworks.',
  'BRSR Compliance Consulting for Indian Companies',
  'BRSR (Business Responsibility and Sustainability Reporting) is SEBI''s mandatory ESG disclosure framework for the top 1,000 listed Indian companies. Our consulting practice helps organizations navigate Core framework requirements, transition to Leadership reporting, and build robust sustainability data systems that satisfy regulatory scrutiny while creating strategic value.',
  '{
    "the_problem": "Indian listed companies face mounting pressure to comply with SEBI''s BRSR requirements, yet many struggle with fragmented data collection, unclear materiality assessments, and the challenge of transitioning from Core to Leadership frameworks. Poor BRSR submissions risk regulatory penalties, investor skepticism, and exclusion from ESG-focused capital flows.",
    "why_this_fails": "Most companies treat BRSR as a checkbox compliance exercise rather than a strategic opportunity. They rely on spreadsheet-based data collection, lack cross-functional coordination, and produce reports that satisfy minimum requirements but fail to demonstrate genuine sustainability integration or attract ESG-conscious investors.",
    "what_changes": "Effective BRSR compliance requires treating sustainability reporting as a core business function. This means establishing automated data pipelines, embedding sustainability KPIs into operational processes, and building narratives that connect ESG performance to financial value creation.",
    "our_approach": "We partner with CFOs, sustainability heads, and company secretaries to design BRSR compliance systems that scale. Our approach covers gap assessments against Core and Leadership frameworks, materiality mapping aligned with your sector, data infrastructure design, and narrative development that positions your company for ESG leadership. We also prepare organizations for upcoming BRSR Core assurance requirements.",
    "market_risks": "From FY 2023-24, BRSR Core is mandatory for top 1,000 listed companies. SEBI is progressively expanding reasonable assurance requirements, with full Leadership framework adoption expected to become the benchmark for institutional investors. Companies lagging in BRSR maturity risk capital access constraints and reputational damage."
  }',
  '[
    {"question": "What is the difference between BRSR Core and BRSR Leadership?", "answer": "BRSR Core covers 9 essential ESG indicators across environmental, social, and governance dimensions—mandatory for top 1,000 listed companies. BRSR Leadership is a voluntary, comprehensive framework with additional KPIs on value chain responsibility, lifecycle assessments, and climate transition plans. Companies targeting ESG leadership or international investor engagement should aim for Leadership framework adoption."},
    {"question": "When is BRSR assurance required?", "answer": "SEBI mandates reasonable assurance on BRSR Core indicators in a phased manner: top 150 companies from FY 2023-24, top 250 from FY 2024-25, and expanding to top 500 and 1,000 in subsequent years. Assurance must be provided by qualified assurance providers following recognized standards."},
    {"question": "How does BRSR relate to GRI and TCFD?", "answer": "BRSR incorporates elements from GRI Standards and aligns with TCFD recommendations for climate-related disclosures. Companies already reporting under GRI can leverage existing data systems, while BRSR''s climate disclosures provide a foundation for TCFD compliance and eventual ISSB alignment."},
    {"question": "What are the penalties for BRSR non-compliance?", "answer": "Non-compliance with BRSR requirements can result in SEBI enforcement actions, including monetary penalties, trading restrictions, and reputational damage. More critically, inadequate ESG disclosures increasingly trigger negative investor sentiment and potential exclusion from ESG-focused indices and funds."},
    {"question": "How long does BRSR implementation take?", "answer": "For companies starting from scratch, a robust BRSR implementation typically takes 4-6 months for Core framework compliance, including gap assessment, data system setup, stakeholder training, and report preparation. Transitioning to Leadership framework may require an additional 3-4 months of capability building."}
  ]',
  '[
    {"slug": "sustainability-reporting-india", "title": "Sustainability Reporting India", "type": "capability"},
    {"slug": "esg-communications-consultant", "title": "ESG Communications", "type": "capability"},
    {"slug": "greenwashing-risk-advisory", "title": "Greenwashing Risk Advisory", "type": "capability"}
  ]',
  true,
  85,
  (SELECT id FROM seo_regulations WHERE slug = 'brsr')
);