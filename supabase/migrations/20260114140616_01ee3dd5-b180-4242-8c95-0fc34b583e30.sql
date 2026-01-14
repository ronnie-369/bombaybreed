-- Create enums for SEO system
CREATE TYPE geo_type AS ENUM ('state', 'city', 'country', 'region');
CREATE TYPE page_type AS ENUM ('capability', 'industry', 'geography', 'regulation', 'problem', 'combined');
CREATE TYPE intent_level AS ENUM ('high', 'medium', 'low');
CREATE TYPE urgency_level AS ENUM ('high', 'medium', 'low');

-- Table: seo_geographies
CREATE TABLE public.seo_geographies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  geo_type geo_type NOT NULL DEFAULT 'country',
  dominant_industries TEXT[] DEFAULT '{}',
  regulatory_context TEXT,
  energy_profile TEXT,
  capital_presence TEXT,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table: seo_industries
CREATE TABLE public.seo_industries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  emission_profile TEXT,
  energy_intensity intent_level DEFAULT 'medium',
  regulation_exposure TEXT[] DEFAULT '{}',
  typical_roles TEXT[] DEFAULT '{}',
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table: seo_capabilities
CREATE TABLE public.seo_capabilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  buyer_intent intent_level DEFAULT 'medium',
  contract_value intent_level DEFAULT 'medium',
  decision_maker TEXT,
  conversion_cta TEXT,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table: seo_regulations
CREATE TABLE public.seo_regulations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  jurisdiction TEXT,
  risk_type TEXT,
  urgency urgency_level DEFAULT 'medium',
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table: seo_pages (main content table)
CREATE TABLE public.seo_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  page_type page_type NOT NULL,
  capability_id UUID REFERENCES public.seo_capabilities(id) ON DELETE SET NULL,
  industry_id UUID REFERENCES public.seo_industries(id) ON DELETE SET NULL,
  geography_id UUID REFERENCES public.seo_geographies(id) ON DELETE SET NULL,
  regulation_id UUID REFERENCES public.seo_regulations(id) ON DELETE SET NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT,
  h1_headline TEXT NOT NULL,
  direct_answer_block TEXT,
  faq_items JSONB DEFAULT '[]'::jsonb,
  content_sections JSONB DEFAULT '{}'::jsonb,
  schema_data JSONB DEFAULT '{}'::jsonb,
  internal_links JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  priority INTEGER DEFAULT 50 CHECK (priority >= 1 AND priority <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_seo_pages_slug ON public.seo_pages(slug);
CREATE INDEX idx_seo_pages_page_type ON public.seo_pages(page_type);
CREATE INDEX idx_seo_pages_published ON public.seo_pages(is_published) WHERE is_published = true;
CREATE INDEX idx_seo_geographies_slug ON public.seo_geographies(slug);
CREATE INDEX idx_seo_industries_slug ON public.seo_industries(slug);
CREATE INDEX idx_seo_capabilities_slug ON public.seo_capabilities(slug);
CREATE INDEX idx_seo_regulations_slug ON public.seo_regulations(slug);

-- Enable RLS on all tables
ALTER TABLE public.seo_geographies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;

-- Public read access for published/active content
CREATE POLICY "Anyone can view active geographies"
ON public.seo_geographies FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can view active industries"
ON public.seo_industries FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can view active capabilities"
ON public.seo_capabilities FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can view active regulations"
ON public.seo_regulations FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can view published pages"
ON public.seo_pages FOR SELECT
USING (is_published = true);

-- Admin full access policies
CREATE POLICY "Admins can manage geographies"
ON public.seo_geographies FOR ALL
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage industries"
ON public.seo_industries FOR ALL
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage capabilities"
ON public.seo_capabilities FOR ALL
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage regulations"
ON public.seo_regulations FOR ALL
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage pages"
ON public.seo_pages FOR ALL
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_seo_geographies_updated_at
BEFORE UPDATE ON public.seo_geographies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_industries_updated_at
BEFORE UPDATE ON public.seo_industries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_capabilities_updated_at
BEFORE UPDATE ON public.seo_capabilities
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_regulations_updated_at
BEFORE UPDATE ON public.seo_regulations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_pages_updated_at
BEFORE UPDATE ON public.seo_pages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();