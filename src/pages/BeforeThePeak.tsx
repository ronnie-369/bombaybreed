import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthorBox from '@/components/insights/AuthorBox';
import NewsletterCapture from '@/components/insights/NewsletterCapture';
import ReportDownloadForm from '@/components/insights/ReportDownloadForm';

const REPORT_TITLE = 'Before the Peak: a super El Nino is forming';

const BeforeThePeak: React.FC = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    headline: 'Before the Peak: a super El Nino is forming',
    description:
      'A super El Nino is forming with 90% certainty per the UN. For richer economies it is a financial event - arriving through food inflation, supply chains and insurance. There is an eight-month window to act before the peak.',
    author: { '@type': 'Person', name: 'Theresa Ronnie' },
    publisher: {
      '@type': 'Organization',
      name: 'Bombay Breed',
      url: 'https://bombaybreed.com',
    },
    url: 'https://bombaybreed.com/insights/before-the-peak',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bombaybreed.com' },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://bombaybreed.com/insights' },
      { '@type': 'ListItem', position: 3, name: 'Before the Peak' },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Before the Peak: a super El Nino is forming | Bombay Breed</title>
        <meta
          name="description"
          content="A super El Nino is forming with 90% certainty. For richer economies it is a financial event - food inflation, supply chains, insurance. An eight-month window to act before the peak."
        />
        <link rel="canonical" href="https://bombaybreed.com/insights/before-the-peak" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://bombaybreed.com/insights/before-the-peak" />
        <meta property="og:title" content="Before the Peak: a super El Nino is forming" />
        <meta
          property="og:description"
          content="A super El Nino is forming with 90% certainty. For richer economies it is a financial event - food inflation, supply chains, insurance. An eight-month window to act."
        />
        <meta property="og:image" content="https://bombaybreed.com/og/og-home.png" />
        <meta property="og:site_name" content="Bombay Breed" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Dark Editorial Hero - matches Insights article styling */}
        <section className="bg-primary text-primary-foreground pt-28 md:pt-36 pb-14 md:pb-20 px-6 md:px-8">
          <div className="container mx-auto max-w-[780px]">
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

            <div className="text-center">
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-6">
                Flagship Report
              </p>

              <h1 className="font-serif text-[34px] md:text-[48px] leading-[1.08] tracking-tight text-primary-foreground mb-4">
                Before the Peak: a super El Nino is forming
              </h1>

              <p className="text-lg text-primary-foreground/70 max-w-[680px] mx-auto mb-4 font-serif italic">
                What it means for richer economies, and the eight-month window to act
              </p>

              <p className="text-[13px] text-primary-foreground/50 mt-4 tracking-wide uppercase">
                By Theresa Ronnie - Bombay Breed Consulting
              </p>
            </div>
          </div>
        </section>

        {/* Summary + primary CTA */}
        <section className="py-14 md:py-16 px-6 md:px-8 border-t border-b border-border">
          <div className="container mx-auto max-w-[680px]">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6">
              Summary
            </p>
            <p className="text-base leading-[1.85] text-foreground font-medium">
              A super El Nino is forming with 90% certainty, according to the United Nations. For
              richer economies it is no longer a distant climate signal - it is a financial event,
              arriving through food inflation, fragile supply chains, and a hardening insurance
              market. There is an eight-month window to act before the peak. This briefing maps the
              transmission channels, the sectors most exposed, and the decisions boards and
              policymakers can take now.
            </p>

            <div className="mt-12">
              <ReportDownloadForm reportTitle={REPORT_TITLE} />
            </div>
          </div>
        </section>

        <AuthorBox />
        <NewsletterCapture />
      </main>
      <Footer />
    </>
  );
};

export default BeforeThePeak;
