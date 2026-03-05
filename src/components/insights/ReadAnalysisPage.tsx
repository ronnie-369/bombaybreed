import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContentTypeBadge from './ContentTypeBadge';
import TopicTag from './TopicTag';
import KeyStatsBar from './KeyStatsBar';
import AuthorBox from './AuthorBox';
import RelatedIntelligence from './RelatedIntelligence';
import NewsletterCapture from './NewsletterCapture';
import MidArticleCta from './MidArticleCta';
import UrgencyBanner from './UrgencyBanner';
import ActionChecklist from './ActionChecklist';
import BreadcrumbNav from '@/components/seo/BreadcrumbNav';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { InsightData } from '@/data/insights';
import { getRelatedInsights } from '@/data/insights';
import theresaPortrait from '@/assets/theresa-portrait.jpg';

interface ReadAnalysisPageProps {
  data: InsightData;
}

const ReadAnalysisPage: React.FC<ReadAnalysisPageProps> = ({ data }) => {
  const relatedItems = getRelatedInsights(data.siblings);
  const isAlert = data.contentType === 'Regulatory Alert';
  const isPerspective = data.contentType === 'Perspective';
  const showStats = !isPerspective && data.stats;
  const showFaq = !isAlert && !isPerspective && data.faq?.length;
  const showMidCta = !isAlert;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.metaDescription,
    author: { '@type': 'Person', name: 'Theresa Ronnie' },
    publisher: {
      '@type': 'Organization',
      name: 'Bombay Breed',
      url: 'https://bombaybreed.com',
    },
    datePublished: data.publishedDate,
    url: `https://bombaybreed.com/insights/${data.slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bombaybreed.com' },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://bombaybreed.com/insights' },
      { '@type': 'ListItem', position: 3, name: data.title },
    ],
  };

  const faqSchema = showFaq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq!.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={`https://bombaybreed.com/insights/${data.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://bombaybreed.com/insights/${data.slug}`} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:image" content="https://bombaybreed.com/og/og-insights.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Bombay Breed" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content="https://bombaybreed.com/og/og-insights.png" />
        <meta property="article:published_time" content={data.publishedDate} />
        <meta property="article:author" content="Theresa Ronnie" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <Header />

      {/* Urgency banner for Regulatory Alerts */}
      {isAlert && (
        <UrgencyBanner publishedDate={data.publishedDate} complianceDeadline={data.complianceDeadline} />
      )}

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="container mx-auto max-w-[900px] px-6 pt-28 md:pt-32">
          <BreadcrumbNav items={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/insights' },
            { label: data.title },
          ]} />
        </div>

        {/* Section 1: Article Hero */}
        <section className="pt-8 pb-12 md:pt-12 md:pb-20 px-6 md:px-8">
          <div className="container mx-auto max-w-[780px] text-center">
            <ContentTypeBadge type={data.contentType} />

            <h1 className="font-serif text-[34px] md:text-[48px] leading-[1.1] tracking-tight text-foreground mt-6 mb-4">
              {data.title}
            </h1>

            {data.subtitle && (
              <p className="text-lg text-muted-foreground max-w-[680px] mx-auto mb-4">{data.subtitle}</p>
            )}

            {/* Perspective: larger author attribution */}
            {isPerspective ? (
              <div className="flex items-center justify-center gap-3 mt-6">
                <img src={theresaPortrait} alt="Theresa Ronnie" className="w-10 h-10 rounded-full grayscale saturate-[0.85]" />
                <span className="text-[15px] font-medium text-foreground">By Theresa Ronnie</span>
              </div>
            ) : (
              <p className="text-[13px] text-muted-foreground/70 mt-4">{data.metaLine}</p>
            )}

            <div className="mt-4">
              <TopicTag topic={data.topic} />
            </div>
          </div>
        </section>

        {/* Section 2: Key Stats */}
        {showStats && <KeyStatsBar stats={data.stats!} source={data.statsSource} />}

        {/* Section 3: Executive Summary */}
        <section className="py-10 px-6 md:px-8 border-t border-b border-border">
          <div className="container mx-auto max-w-[680px]">
            <p className="text-base leading-[1.8] text-foreground font-medium">
              {data.executiveSummary}
            </p>
          </div>
        </section>

        {/* Section 4: Body Content (placeholder for now) */}
        {data.bodyContent && (
          <section className="py-16 px-6 md:px-8">
            <div className="container mx-auto max-w-[680px] insight-prose" dangerouslySetInnerHTML={{ __html: data.bodyContent }} />
          </section>
        )}

        {/* Mid-article CTA */}
        {showMidCta && data.midArticleCta && (
          <MidArticleCta
            type={data.midArticleCta.type}
            topic={data.midArticleCta.topic || data.topic}
            flagshipSlug={data.midArticleCta.flagshipSlug}
            flagshipTitle={data.midArticleCta.flagshipTitle}
          />
        )}

        {/* Action Checklist (Regulatory Alerts) */}
        {isAlert && data.actionItems && <ActionChecklist items={data.actionItems} />}

        {/* Section 6: FAQ */}
        {showFaq && (
          <section className="py-16 px-6 md:px-8">
            <div className="container mx-auto max-w-[680px]">
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6">
                Frequently Asked Questions
              </p>
              <Accordion type="single" collapsible>
                {data.faq!.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left font-semibold text-base text-foreground">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Section 7: Author */}
        <AuthorBox />

        {/* Section 8: Related Intelligence */}
        <RelatedIntelligence items={relatedItems} />

        {/* Section 9: Newsletter CTA */}
        <NewsletterCapture />
      </main>
      <Footer />
    </>
  );
};

export default ReadAnalysisPage;
