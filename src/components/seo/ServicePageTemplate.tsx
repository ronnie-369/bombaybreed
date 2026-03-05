import { useEffect, useMemo } from 'react';
import PageHead from '@/components/PageHead';
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
import { Link } from 'react-router-dom';
import SectionLabel from '@/components/ui/SectionLabel';
import BookingDialog from '@/components/BookingDialog';
import ScrollReveal from '@/components/ui/ScrollReveal';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';

interface FAQItem {
  question: string;
  answer: string;
}

interface ContentSectionItem {
  key: string;
  title: string;
  content: string;
  variant?: 'default' | 'highlight' | 'warning';
}

interface ContentSections {
  the_problem?: string;
  why_this_fails?: string;
  what_changes?: string;
  our_approach?: string;
  market_risks?: string;
  introduction?: string;
  main_content?: string;
  [key: string]: string | undefined;
}

interface RelatedPage {
  slug?: string;
  url?: string;
  title?: string;
  type?: string;
}

interface StatItem {
  value: string;
  label: string;
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
  content_section_overrides?: ContentSectionItem[];
  internal_links?: RelatedPage[];
  typical_roles?: string[];
  urgency_triggers?: string[];
  conversion_cta?: string;
  og_image?: string;
  stats?: StatItem[];
}

const AuthorBox = () => (
  <div className="py-10 border-t border-border/50 mt-16">
    <div className="flex items-start gap-4">
      <div>
        <p className="font-semibold text-foreground">Theresa Ronnie</p>
        <p className="text-sm text-muted-foreground">Strategic Carbon Advisory</p>
        <p className="text-sm text-muted-foreground mt-1">
          Advisor to Microsoft, KPMG, Ford, Volkswagen
        </p>
        <Link to="/about" className="text-sm text-primary hover:text-primary/80 transition-colors mt-2 inline-block">
          About Theresa →
        </Link>
      </div>
    </div>
  </div>
);

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
  content_section_overrides,
  internal_links = [],
  typical_roles,
  urgency_triggers,
  conversion_cta,
  og_image,
  stats,
}: ServicePageTemplateProps) => {
  
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
  if (breadcrumbItems.length > 0) {
    breadcrumbItems[breadcrumbItems.length - 1].href = undefined;
  }

  // Build ordered content sections for TOC
  const defaultSectionOrder: ContentSectionItem[] = [
    { key: 'the_problem', title: 'The Problem', content: '', variant: 'default' },
    { key: 'why_this_fails', title: 'Why This Fails Today', content: '', variant: 'warning' },
    { key: 'what_changes', title: 'What Changes When Done Right', content: '', variant: 'highlight' },
    { key: 'our_approach', title: 'How Bombay Breed Approaches It', content: '', variant: 'default' },
    { key: 'market_risks', title: 'Market-Specific Risks', content: '', variant: 'default' },
    { key: 'introduction', title: 'Introduction', content: '', variant: 'default' },
    { key: 'main_content', title: 'Overview', content: '', variant: 'default' },
  ];

  const activeSections = useMemo(() => {
    if (content_section_overrides) return content_section_overrides.filter(s => s.content);
    return defaultSectionOrder
      .filter(s => content_sections?.[s.key])
      .map(s => ({ ...s, content: content_sections![s.key]! }));
  }, [content_sections, content_section_overrides]);

  useEffect(() => {
    const serviceSchema = generateServiceSchema({
      slug, meta_title, meta_description, h1_headline,
      capability, industry, geography, regulation, faq_items
    });
    injectSchema(serviceSchema, 'schema-service');

    if (faq_items && faq_items.length > 0) {
      const faqSchema = generateFAQSchema(faq_items);
      if (faqSchema) injectSchema(faqSchema, 'schema-faq');
    }

    const breadcrumbSchema = generateBreadcrumbSchema(`/${slug}`, meta_title);
    injectSchema(breadcrumbSchema, 'schema-breadcrumb');

    return () => {
      removeSchema('schema-service');
      removeSchema('schema-faq');
      removeSchema('schema-breadcrumb');
    };
  }, [slug, meta_title, meta_description, h1_headline, capability, industry, geography, regulation, faq_items]);

  const subtitleParts = [];
  if (industry) subtitleParts.push(industry.name);
  if (geography) subtitleParts.push(geography.name);
  if (regulation) subtitleParts.push(regulation.name);
  const subtitle = subtitleParts.join(' · ');

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title={meta_title}
        description={meta_description || h1_headline}
        path={`/${slug}`}
        ogType="article"
        ogImage={og_image || 'og-home'}
      />
      <Header />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-20 px-6 md:px-8">
          <div className="container mx-auto max-w-[680px]">
            <BreadcrumbNav items={breadcrumbItems} />
            
            {subtitle && (
              <div className="mt-4 mb-4">
                <SectionLabel number="" label={subtitle} />
              </div>
            )}
            
            <h1 className="text-display font-serif tracking-tight text-foreground mb-6">
              {h1_headline}
            </h1>
            
            {meta_description && (
              <p className="text-lede text-muted-foreground">
                {meta_description}
              </p>
            )}

            <p className="text-xs text-muted-foreground mt-6">
              By Theresa Ronnie · Bombay Breed
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        {stats && stats.length > 0 && (
          <section className="px-6 md:px-8 pb-12">
            <div className="container mx-auto max-w-[680px]">
              <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-border/50">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-serif text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-8 max-w-[680px]">
          {direct_answer_block && (
            <DirectAnswerBlock content={direct_answer_block} />
          )}

          {/* Table of Contents */}
          {activeSections.length > 2 && (
            <nav className="py-6 mb-6 border-b border-border/30">
              <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">Contents</p>
              <ul className="space-y-1.5">
                {activeSections.map((section) => {
                  const sectionId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                  return (
                    <li key={section.key}>
                      <a href={`#${sectionId}`} className="text-sm text-primary hover:text-primary/80 transition-colors">
                        {section.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {/* Content sections */}
          {activeSections.map((section) => (
            <ContentSection 
              key={section.key}
              title={section.title}
              content={section.content}
              variant={section.variant as 'default' | 'highlight' | 'warning'}
            />
          ))}

          {/* Mid-page download CTA */}
          <div className="py-10 my-8 bg-secondary/30 rounded-xl px-6 text-center">
            <h3 className="font-serif text-lg mb-2">Download the full brief (PDF)</h3>
            <p className="text-sm text-muted-foreground mb-4">Get the complete analysis with data tables and frameworks.</p>
            <LeadCaptureForm 
              reportTitle={h1_headline} 
              reportDescription={meta_description || ''} 
            />
          </div>

          {/* Conversion Modules */}
          <WhoHiresUs roles={typical_roles} industry={industry?.name} />
          <UrgencyTriggers triggers={urgency_triggers} />
          <FailureConsequences />

          {/* FAQ Section */}
          {faq_items && faq_items.length > 0 && (
            <FAQSection items={faq_items} />
          )}

          {/* Related Intelligence */}
          {internal_links && internal_links.length > 0 && (
            <RelatedPages pages={internal_links} />
          )}

          {/* Author Box */}
          <AuthorBox />

          {/* Final CTA */}
          <div className="py-16 text-center border-t border-border/50">
            <ScrollReveal direction="up">
              <h2 className="text-section font-serif tracking-tight mb-4">
                Ready to build a credible carbon strategy for your board?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                <BookingDialog triggerText="Schedule a Consultation" />
                <Link to="/insights" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Subscribe to Intelligence Briefs →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePageTemplate;
