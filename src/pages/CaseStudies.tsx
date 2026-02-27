import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingDialog from '@/components/BookingDialog';

const caseStudies = [
  {
    id: 'proclime-biodiversity-campaign',
    sector: 'Climate Awareness & Advocacy',
    sectorIcon: Leaf,
    title: 'Sounds of ProClime — India\'s National Anthem Recreated Using Sounds of Nature',
    challenge: 'Climate action remains confined to policy papers and boardrooms. With 1.55 lakh species calling India home, how do you make biodiversity conservation personal and emotionally resonant for 1.4 billion people on Independence Day?',
    approach: 'Conceived a creative campaign reimagining India\'s National Anthem using only sounds from nature — birdsong, insects, water, wind — to represent the 1.55 lakh species that share India\'s independence. Partnered with music producer Premik Jolly to compose the piece, built a teaser-to-launch rollout strategy, and secured multi-channel press coverage across national publications.',
    outcomes: [
      '300,000+ YouTube engagements',
      'Featured in The New Indian Express, Indiatimes, MediaBrief, and Passionate in Marketing',
      'Campaign felicitated at IIT Roorkee',
      'Showcased to the Minister of Environment; featured track played to A.R. Rahman',
    ],
    keywords: ['Biodiversity', 'Climate Awareness', 'Creative Campaigning'],
    relatedPages: [],
  },
];

const CaseStudies = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Case Studies | Bombay Breed Consulting",
    "description": "Strategic carbon communications and climate advisory case studies from Bombay Breed Consulting.",
    "url": "https://bombaybreed.com/case-studies",
    "publisher": {
      "@type": "Organization",
      "name": "Bombay Breed Consulting",
      "url": "https://bombaybreed.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Case Studies | Carbon & Climate Advisory | Bombay Breed</title>
        <meta name="description" content="See how Bombay Breed helps Indian enterprises navigate carbon markets, CBAM compliance, sustainability communications, and climate strategy with real engagement outcomes." />
        <link rel="canonical" href="https://bombaybreed.com/case-studies" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Client Engagements
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Strategic Impact,<br />Measurable Outcomes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How we help Indian enterprises navigate carbon markets, climate regulation, and sustainability communications with precision advisory that drives board-level results.
            </p>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl space-y-16">
            {caseStudies.map((study, index) => (
              <article 
                key={study.id} 
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div className="p-8 md:p-12">
                  {/* Sector Badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <study.sectorIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">
                      {study.sector}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
                    {study.title}
                  </h2>

                  {/* Challenge / Approach / Outcomes */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        The Challenge
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Our Approach
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {study.approach}
                      </p>
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="bg-primary/5 rounded-xl p-6 mb-6">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                      Key Outcomes
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {study.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Keywords + Related Links */}
                  <div className="flex flex-wrap items-center gap-2">
                    {study.keywords.map((kw) => (
                      <Badge key={kw} variant="secondary" className="text-xs">
                        {kw}
                      </Badge>
                    ))}
                    {study.relatedPages.map((page) => (
                      <Link
                        key={page}
                        to={page}
                        className="text-xs text-primary hover:underline"
                      >
                        Learn more →
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Ready to Build Your Climate Strategy?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Every engagement starts with understanding your specific challenges. Let's discuss how strategic carbon communications can drive measurable results for your organisation.
            </p>
            <BookingDialog
              trigger={
                <Button size="lg" variant="default" className="gap-2">
                  Schedule a Conversation <ArrowRight className="w-4 h-4" />
                </Button>
              }
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CaseStudies;
