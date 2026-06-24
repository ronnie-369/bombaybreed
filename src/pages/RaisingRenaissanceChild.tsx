import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthorBox from '@/components/insights/AuthorBox';
import RenaissanceChildDownloadForm from '@/components/insights/RenaissanceChildDownloadForm';
import coverAsset from '@/assets/raising-the-renaissance-child-cover.jpg.asset.json';

const TITLE = 'Raising the Renaissance Child';
const SUBTITLE = 'A reading curriculum of twenty-four books for the 21st century Indian family.';

const RaisingRenaissanceChild: React.FC = () => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    headline: TITLE,
    description: SUBTITLE,
    author: { '@type': 'Person', name: 'Theresa Ronnie' },
    publisher: { '@type': 'Organization', name: 'Bombay Breed Consulting', url: 'https://bombaybreed.com' },
    datePublished: '2026-06-01',
    url: 'https://bombaybreed.com/insights/raising-the-renaissance-child',
  };

  const scrollToForm = () => {
    document.getElementById('download-gate')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Raising the Renaissance Child - A White Paper | Bombay Breed</title>
        <meta name="description" content="A reading curriculum of twenty-four books for the 21st century Indian family. A white paper from Bombay Breed Consulting, shared as part of a study for NIAS, Bangalore." />
        <link rel="canonical" href="https://bombaybreed.com/insights/raising-the-renaissance-child" />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Raising the Renaissance Child - A White Paper" />
        <meta property="og:description" content="A reading curriculum of twenty-four books for the 21st century Indian family." />
        <meta property="og:image" content={coverAsset.url} />
        <meta property="og:site_name" content="Bombay Breed" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero with cover snapshot */}
        <section className="bg-primary text-primary-foreground pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-8">
          <div className="container mx-auto max-w-[980px]">
            <nav className="flex items-center gap-6 mb-10">
              <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-[12px] font-semibold uppercase tracking-[0.15em] flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                Home
              </Link>
              <Link to="/insights" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-[12px] font-semibold uppercase tracking-[0.15em]">
                Insights
              </Link>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-10 md:gap-14 items-start">
              <div className="flex justify-center md:justify-start">
                <div className="w-[260px] md:w-full max-w-[380px]">
                  <img
                    src={coverAsset.url}
                    alt="Raising the Renaissance Child - white paper cover"
                    className="w-full aspect-[5/7] object-cover rounded-lg border border-primary-foreground/10"
                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-5">
                  White Paper - Limited Circulation
                </p>
                <h1 className="font-serif text-[32px] md:text-[44px] leading-[1.08] tracking-tight text-primary-foreground mb-3">
                  {TITLE}
                </h1>
                <p className="text-lg text-primary-foreground/70 mb-6 font-serif italic">
                  {SUBTITLE}
                </p>
                <p className="text-[14px] leading-[1.7] text-primary-foreground/80 mb-8 max-w-[52ch]">
                  The Renaissance, 1400 to 1600. Two centuries in which creation and innovation came
                  from breadth - a single human mind was expected to span every art and science. This
                  paper proposes the same spirit for the child, through a curated reading curriculum
                  of twenty-four books for the 21st century Indian family.
                </p>
                <p className="text-[12px] text-primary-foreground/50 mb-8 tracking-wide uppercase">
                  Shared as part of a study for NIAS, Bangalore
                </p>

                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center h-12 px-8 bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-wider rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Download the white paper →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Study context */}
        <section className="py-14 px-6 md:px-8 border-t border-b border-border">
          <div className="container mx-auto max-w-[680px]">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6">
              About this study
            </p>
            <p className="text-base leading-[1.85] text-foreground">
              This paper is being circulated as part of a study undertaken for the{' '}
              <span className="font-semibold">National Institute of Advanced Studies (NIAS), Bangalore</span>.
              The information you share - your child&rsquo;s age, your location, and your profession -
              helps us understand the families this curriculum reaches and informs the research. It
              is kept confidential and used only for the purposes of the study.
            </p>
          </div>
        </section>

        {/* Download gate */}
        <section id="download-gate" className="py-20 px-6 md:px-8">
          <RenaissanceChildDownloadForm />
        </section>

        <AuthorBox />
      </main>
      <Footer />
    </>
  );
};

export default RaisingRenaissanceChild;
