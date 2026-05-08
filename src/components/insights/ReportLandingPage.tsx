import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KeyStatsBar from './KeyStatsBar';
import ReportDownloadForm from './ReportDownloadForm';
import AuthorBox from './AuthorBox';
import RelatedIntelligence from './RelatedIntelligence';
import SeriesNavigation from './SeriesNavigation';
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
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://bombaybreed.com/insights/${data.slug}`} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:image" content="https://bombaybreed.com/og/og-home.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Bombay Breed" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content="https://bombaybreed.com/og/og-home.png" />
        <meta property="article:published_time" content={data.publishedDate} />
        <meta property="article:author" content="Theresa Ronnie" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <main className="min-h-screen bg-background">
        {/* Dark Editorial Hero */}
        <section className="bg-primary text-primary-foreground pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-8">
          <div className="container mx-auto max-w-[900px]">
            {/* Back navigation */}
            <nav className="flex items-center gap-6 mb-10">
              <Link
                to="/"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-[12px] font-semibold uppercase tracking-[0.15em] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Home
              </Link>
              <Link
                to="/insights"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-[12px] font-semibold uppercase tracking-[0.15em]"
              >
                Insights
              </Link>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-10 md:gap-14 items-start">
              {/* Cover Image */}
              {data.coverImage && (
                <div className="flex justify-center md:justify-start">
                  <div className="w-[280px] md:w-full max-w-[400px]">
                    <img
                      src={data.coverImage}
                      alt={`${data.title}: Report Cover`}
                      className="w-full aspect-[5/7] object-cover rounded-lg border border-primary-foreground/10"
                      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </div>
              )}

              {/* Text */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-5">
                  Flagship Report
                </p>
                <h1 className="font-serif text-[32px] md:text-[44px] leading-[1.08] tracking-tight text-primary-foreground mb-3">
                  {data.title}
                </h1>
                {data.subtitle && (
                  <p className="text-lg text-primary-foreground/70 mb-5 font-serif italic">{data.subtitle}</p>
                )}
                <p className="text-[13px] text-primary-foreground/50 mb-10 tracking-wide uppercase">
                  {data.metaLine}
                </p>

                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center h-12 px-8 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Download Report →
                </button>
                <button
                  onClick={scrollToSummary}
                  className="block mt-4 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  Read the executive summary ↓
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Findings */}
        {data.stats && <KeyStatsBar stats={data.stats} source={data.statsSource} />}

        {/* Executive Summary */}
        <section id="executive-summary" className="py-14 px-6 md:px-8 border-t border-b border-border">
          <div className="container mx-auto max-w-[680px]">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6">
              Executive Summary
            </p>
            <p className="text-base leading-[1.85] text-foreground">{data.executiveSummary}</p>
          </div>
        </section>

        {/* Table of Contents */}
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
                      <span className="text-accent text-sm font-mono w-6 flex-shrink-0 mt-0.5">
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

        {/* Download Gate */}
        <section id="download-gate" className="py-20 px-6 md:px-8">
          <ReportDownloadForm reportTitle={data.title} />
        </section>

        {/* Author */}
        <AuthorBox />

        {/* Related Intelligence */}
        <RelatedIntelligence items={relatedItems} />

        {/* Series Navigation */}
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