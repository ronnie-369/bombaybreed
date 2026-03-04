import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContentTypeBadge from './ContentTypeBadge';
import KeyStatsBar from './KeyStatsBar';
import ReportDownloadForm from './ReportDownloadForm';
import AuthorBox from './AuthorBox';
import RelatedIntelligence from './RelatedIntelligence';
import SeriesNavigation from './SeriesNavigation';
import BreadcrumbNav from '@/components/seo/BreadcrumbNav';
import type { InsightData } from '@/data/insights';
import { getRelatedInsights } from '@/data/insights';

interface ReportLandingPageProps {
  data: InsightData;
}

const ReportLandingPage: React.FC<ReportLandingPageProps> = ({ data }) => {
  const relatedItems = getRelatedInsights(data.siblings);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
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

  const scrollToForm = () => {
    document.getElementById('download-gate')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSummary = () => {
    document.getElementById('executive-summary')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={`https://bombaybreed.com/insights/${data.slug}`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="container mx-auto max-w-[900px] px-6 pt-28 md:pt-32">
          <BreadcrumbNav items={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/insights' },
            { label: data.title },
          ]} />
        </div>

        {/* Section 1: Report Hero */}
        <section className="py-12 md:py-20 px-6 md:px-8">
          <div className="container mx-auto max-w-[900px]">
            <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-10 md:gap-14 items-start">
              {/* Cover Image */}
              {data.coverImage && (
                <div className="flex justify-center md:justify-start">
                  <div className="w-[280px] md:w-full max-w-[400px]">
                    <img
                      src={data.coverImage}
                      alt={`${data.title}: Report Cover`}
                      className="w-full aspect-[5/7] object-cover rounded-lg border border-border"
                      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
                    />
                  </div>
                </div>
              )}

              {/* Text */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-4">
                  Flagship Report
                </p>
                <h1 className="font-serif text-[32px] md:text-[42px] leading-[1.1] tracking-tight text-foreground mb-3">
                  {data.title}
                </h1>
                {data.subtitle && (
                  <p className="text-lg text-muted-foreground mb-4">{data.subtitle}</p>
                )}
                <p className="text-[13px] text-muted-foreground/70 mb-8">{data.metaLine}</p>

                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center h-12 px-8 bg-foreground text-background text-[13px] font-semibold uppercase tracking-wider rounded-lg hover:bg-foreground/90 transition-colors"
                >
                  Download Report →
                </button>
                <button
                  onClick={scrollToSummary}
                  className="block mt-3 text-sm text-primary hover:underline"
                >
                  Read the executive summary ↓
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Key Findings */}
        {data.stats && <KeyStatsBar stats={data.stats} source={data.statsSource} />}

        {/* Section 3: Executive Summary */}
        <section id="executive-summary" className="py-10 px-6 md:px-8 border-t border-b border-border">
          <div className="container mx-auto max-w-[680px]">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6">
              Executive Summary
            </p>
            <p className="text-base leading-[1.8] text-foreground">{data.executiveSummary}</p>
          </div>
        </section>

        {/* Section 4: Table of Contents */}
        {data.tableOfContents && (
          <section className="py-16 px-6 md:px-8">
            <div className="container mx-auto max-w-[680px]">
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-8">
                What's Inside
              </p>
              <div className="space-y-0">
                {data.tableOfContents.map((item, i) => (
                  <div key={i} className="py-5 border-b border-border">
                    <div className="flex items-start gap-4">
                      <span className="text-muted-foreground text-sm font-mono w-6 flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-semibold text-base text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Download Gate */}
        <section id="download-gate" className="py-20 px-6 md:px-8">
          <ReportDownloadForm reportTitle={data.title} />
        </section>

        {/* Section 6: Author */}
        <AuthorBox />

        {/* Section 7: Related Intelligence */}
        <RelatedIntelligence items={relatedItems} />

        {/* Section 8: Series Navigation */}
        {data.series && (
          <SeriesNavigation
            seriesName={data.series.name}
            items={data.series.items}
            currentSlug={data.slug}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default ReportLandingPage;
