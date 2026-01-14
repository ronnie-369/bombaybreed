import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadcrumbNav from './BreadcrumbNav';
import DirectAnswerBlock from './DirectAnswerBlock';
import ContentSection from './ContentSection';
import FAQSection from './FAQSection';
import RelatedPages from './RelatedPages';
import { WhoHiresUs, UrgencyTriggers, FailureConsequences, DiagnosticCTA } from './ConversionModules';
import { 
  generateServiceSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema,
  injectSchema,
  removeSchema
} from '@/utils/schema-generators';
import { AlertTriangle, Target, TrendingUp, Lightbulb, MapPin } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ContentSections {
  the_problem?: string;
  why_this_fails?: string;
  what_changes?: string;
  our_approach?: string;
  market_risks?: string;
}

interface RelatedPage {
  slug: string;
  title: string;
  type: 'capability' | 'industry' | 'geography' | 'regulation' | 'problem';
}

interface ServicePageTemplateProps {
  slug: string;
  meta_title: string;
  meta_description?: string;
  h1_headline: string;
  direct_answer_block?: string;
  capability?: { name: string; slug: string };
  industry?: { name: string; slug: string };
  geography?: { name: string; slug: string };
  regulation?: { name: string; slug: string };
  faq_items?: FAQItem[];
  content_sections?: ContentSections;
  internal_links?: RelatedPage[];
  typical_roles?: string[];
  urgency_triggers?: string[];
  conversion_cta?: string;
}

const ServicePageTemplate = ({
  slug,
  meta_title,
  meta_description,
  h1_headline,
  direct_answer_block,
  capability,
  industry,
  geography,
  regulation,
  faq_items = [],
  content_sections = {},
  internal_links = [],
  typical_roles,
  urgency_triggers,
  conversion_cta
}: ServicePageTemplateProps) => {
  
  // Build breadcrumb items
  const breadcrumbItems = [];
  if (capability) {
    breadcrumbItems.push({ label: capability.name, href: `/${capability.slug}` });
  }
  if (industry) {
    breadcrumbItems.push({ label: industry.name, href: `/${industry.slug}` });
  }
  if (geography) {
    breadcrumbItems.push({ label: geography.name });
  }
  if (regulation) {
    breadcrumbItems.push({ label: regulation.name });
  }
  // Current page (no href)
  if (breadcrumbItems.length > 0) {
    breadcrumbItems[breadcrumbItems.length - 1].href = undefined;
  }

  // Inject schemas
  useEffect(() => {
    // Update document title and meta
    document.title = meta_title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && meta_description) {
      metaDesc.setAttribute('content', meta_description);
    }

    // Inject Service schema
    const serviceSchema = generateServiceSchema({
      slug,
      meta_title,
      meta_description,
      h1_headline,
      capability,
      industry,
      geography,
      regulation,
      faq_items
    });
    injectSchema(serviceSchema, 'schema-service');

    // Inject FAQ schema if FAQs exist
    if (faq_items && faq_items.length > 0) {
      const faqSchema = generateFAQSchema(faq_items);
      if (faqSchema) {
        injectSchema(faqSchema, 'schema-faq');
      }
    }

    // Inject Breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema(`/${slug}`, meta_title);
    injectSchema(breadcrumbSchema, 'schema-breadcrumb');

    return () => {
      removeSchema('schema-service');
      removeSchema('schema-faq');
      removeSchema('schema-breadcrumb');
    };
  }, [slug, meta_title, meta_description, h1_headline, capability, industry, geography, regulation, faq_items]);

  // Build subtitle from context
  const subtitleParts = [];
  if (industry) subtitleParts.push(industry.name);
  if (geography) subtitleParts.push(geography.name);
  if (regulation) subtitleParts.push(regulation.name);
  const subtitle = subtitleParts.join(' • ');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl">
            <BreadcrumbNav items={breadcrumbItems} />
            
            {subtitle && (
              <div className="flex items-center gap-2 text-sm text-primary mb-4">
                <MapPin className="h-4 w-4" />
                <span className="uppercase tracking-wider font-medium">{subtitle}</span>
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {h1_headline}
            </h1>
            
            {meta_description && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
                {meta_description}
              </p>
            )}
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          {/* Direct Answer Block (AEO) */}
          {direct_answer_block && (
            <DirectAnswerBlock content={direct_answer_block} />
          )}

          {/* Content Sections */}
          {content_sections.the_problem && (
            <ContentSection 
              title="The Problem" 
              content={content_sections.the_problem}
              icon={AlertTriangle}
            />
          )}

          {content_sections.why_this_fails && (
            <ContentSection 
              title="Why This Fails Today" 
              content={content_sections.why_this_fails}
              icon={Target}
              variant="warning"
            />
          )}

          {content_sections.what_changes && (
            <ContentSection 
              title="What Changes When Done Right" 
              content={content_sections.what_changes}
              icon={TrendingUp}
              variant="highlight"
            />
          )}

          {content_sections.our_approach && (
            <ContentSection 
              title="How Bombay Breed Approaches It" 
              content={content_sections.our_approach}
              icon={Lightbulb}
            />
          )}

          {content_sections.market_risks && (
            <ContentSection 
              title="Market-Specific Risks" 
              content={content_sections.market_risks}
              icon={MapPin}
            />
          )}

          {/* Conversion Modules */}
          <WhoHiresUs roles={typical_roles} industry={industry?.name} />
          <UrgencyTriggers triggers={urgency_triggers} />
          <FailureConsequences />

          {/* FAQ Section */}
          {faq_items && faq_items.length > 0 && (
            <FAQSection items={faq_items} />
          )}

          {/* Related Pages */}
          {internal_links && internal_links.length > 0 && (
            <RelatedPages pages={internal_links} />
          )}

          {/* Diagnostic CTA */}
          <DiagnosticCTA 
            ctaText={conversion_cta || 'Request a Diagnostic Review'}
            capability={capability?.name}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePageTemplate;
