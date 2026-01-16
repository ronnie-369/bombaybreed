-- Create regulation landing pages that match the seo_regulations slugs
-- These will link to existing detailed compliance pages

-- First get regulation IDs
WITH reg_ids AS (
  SELECT id, slug, name, description, jurisdiction, urgency FROM seo_regulations WHERE is_active = true
)

INSERT INTO seo_pages (
  slug,
  page_type,
  regulation_id,
  meta_title,
  meta_description,
  h1_headline,
  direct_answer_block,
  content_sections,
  faq_items,
  internal_links,
  is_published,
  priority
)
SELECT 
  r.slug,
  'regulation'::page_type,
  r.id,
  r.name || ' Advisory | Bombay Breed',
  'Expert advisory services for ' || r.name || ' compliance and strategy. Navigate regulatory requirements with confidence.',
  r.name || ' Advisory Services',
  CASE 
    WHEN r.slug = 'article-6' THEN 'Article 6 of the Paris Agreement provides the framework for international carbon market cooperation. Bombay Breed helps governments and project developers navigate ITMOs, corresponding adjustments, and bilateral agreements for compliant carbon trading.'
    WHEN r.slug = 'cbam' THEN 'The EU Carbon Border Adjustment Mechanism imposes carbon costs on imports. We help Indian exporters assess CBAM exposure, calculate embedded emissions, and develop compliance strategies to maintain market access.'
    WHEN r.slug = 'corresponding-adjustments' THEN 'Corresponding adjustments prevent double-counting of emission reductions under Article 6.2. We provide technical advisory on authorization requirements, adjustment mechanisms, and bilateral agreement structuring.'
    WHEN r.slug = 'pat-scheme' THEN 'India''s Perform Achieve Trade (PAT) scheme targets industrial energy efficiency. We help designated consumers assess compliance obligations, optimize energy performance, and monetize energy savings certificates (ESCerts).'
    WHEN r.slug = 'ccts' THEN 'India''s Carbon Credit Trading Scheme creates a domestic carbon market framework. We help industries prepare for compliance obligations, registry requirements, and trading mechanisms as the scheme develops.'
    ELSE 'Comprehensive regulatory advisory for ' || r.name || ' compliance and strategy.'
  END,
  jsonb_build_object(
    'intro', r.description,
    'main', 'Our team provides end-to-end advisory services covering regulatory interpretation, compliance planning, technical implementation, and ongoing monitoring. We work with boards, CXOs, and sustainability teams to ensure your organization stays ahead of regulatory requirements.'
  ),
  jsonb_build_array(
    jsonb_build_object(
      'question', 'What is ' || r.name || '?',
      'answer', r.description
    ),
    jsonb_build_object(
      'question', 'How can Bombay Breed help with ' || r.name || ' compliance?',
      'answer', 'We provide strategic advisory covering regulatory interpretation, compliance roadmaps, technical implementation, and ongoing support. Our approach combines deep regulatory expertise with practical industry experience.'
    )
  ),
  jsonb_build_array(
    jsonb_build_object(
      'title', r.name || ' Compliance',
      'slug', CASE 
        WHEN r.slug = 'article-6' THEN 'article-6-compliance'
        WHEN r.slug = 'cbam' THEN 'cbam-compliance-consulting'
        WHEN r.slug = 'corresponding-adjustments' THEN 'corresponding-adjustments-consulting'
        WHEN r.slug = 'pat-scheme' THEN 'pat-scheme-consulting'
        WHEN r.slug = 'ccts' THEN 'ccts-compliance-india'
        ELSE r.slug || '-compliance'
      END,
      'description', 'Detailed compliance guidance for ' || r.name
    )
  ),
  true,
  70
FROM reg_ids r
ON CONFLICT (slug) DO NOTHING;