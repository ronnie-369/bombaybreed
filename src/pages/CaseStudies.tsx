import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, TrendingUp, Shield, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingDialog from '@/components/BookingDialog';

const caseStudies = [
  {
    id: 'manufacturing-cbam',
    sector: 'Steel & Manufacturing',
    sectorIcon: Building2,
    title: 'CBAM Readiness Strategy for a Leading Indian Steel Exporter',
    challenge: 'A top-10 Indian steel producer with €200M+ annual EU exports faced uncertainty about CBAM compliance costs, reporting requirements, and strategic implications for their European market position.',
    approach: 'We conducted a comprehensive CBAM exposure assessment, designed their emissions reporting architecture, developed a phased decarbonisation roadmap aligned with CBAM cost reduction, and crafted investor-facing communications positioning CBAM preparedness as a competitive advantage.',
    outcomes: [
      'Quantified CBAM cost exposure across 12 product lines',
      'Designed CBAM-ready emissions reporting system 18 months ahead of compliance deadline',
      'Board-approved decarbonisation roadmap with clear ROI timeline',
      'Investor presentation positioning company as sector leader on CBAM readiness',
    ],
    keywords: ['CBAM', 'Steel Industry', 'Decarbonisation'],
    relatedPages: ['/cbam-india-exporters-guide', '/decarbonisation-consulting-india'],
  },
  {
    id: 'fmcg-sustainability-narrative',
    sector: 'FMCG & Consumer Brands',
    sectorIcon: Leaf,
    title: 'Sustainability Narrative Transformation for a National FMCG Brand',
    challenge: 'A major Indian FMCG company had invested significantly in sustainability initiatives but struggled to communicate impact credibly — facing both greenwashing concerns and investor frustration at the lack of clear ESG narrative.',
    approach: 'We developed a comprehensive sustainability communications strategy: auditing existing claims for defensibility, creating audience-specific narratives (investors, consumers, regulators), designing the annual sustainability report, and training leadership on credible sustainability messaging.',
    outcomes: [
      'ESG rating improved by two notches within 12 months',
      'Sustainability report cited in 3 analyst reports',
      'Zero greenwashing complaints despite 4x increase in sustainability communications',
      'CEO positioned as credible voice on sustainability in industry forums',
    ],
    keywords: ['Sustainability Communications', 'ESG Narrative', 'Brand Strategy'],
    relatedPages: ['/sustainability-storytelling-brands-india', '/greenwashing-risk-india'],
  },
  {
    id: 'energy-transition-advisory',
    sector: 'Power & Energy',
    sectorIcon: TrendingUp,
    title: 'Energy Transition Communications for a Thermal Power Company',
    challenge: 'A thermal power utility navigating the transition to renewable energy needed to communicate its transition plan to investors, regulators, and employees without undermining confidence in its current operations.',
    approach: 'We developed a phased transition narrative that acknowledged the company\'s coal legacy while positioning its renewable investments as strategic evolution. This included investor presentations, regulatory submissions, employee townhall materials, and media positioning.',
    outcomes: [
      'Successful green bond issuance supported by credible transition narrative',
      'Regulatory engagement positioned company as constructive transition partner',
      'Employee retention improved during transition period',
      'Media coverage shifted from "coal company" to "transition leader"',
    ],
    keywords: ['Energy Transition', 'Climate Communications', 'Green Finance'],
    relatedPages: ['/energy-transition-advisory-india', '/green-finance-advisory-india'],
  },
  {
    id: 'carbon-market-positioning',
    sector: 'Diversified Conglomerate',
    sectorIcon: Shield,
    title: 'Carbon Market Strategy for a Diversified Industrial Group',
    challenge: 'A diversified Indian conglomerate with operations across cement, chemicals, and manufacturing needed a unified carbon market strategy as CCTS implementation approached — including internal carbon pricing, credit portfolio management, and stakeholder communications.',
    approach: 'We developed a group-level carbon market strategy covering CCTS compliance scenarios, voluntary market participation, internal carbon pricing implementation, and communications framework for carbon market disclosures across all business units.',
    outcomes: [
      'Internal carbon price adopted across 5 business units',
      'Carbon credit portfolio strategy generating ₹12Cr+ annual value',
      'Board-approved CCTS readiness plan 24 months ahead of compliance',
      'Unified carbon narrative for annual report and investor communications',
    ],
    keywords: ['Carbon Markets', 'CCTS', 'Internal Carbon Pricing'],
    relatedPages: ['/carbon-credit-trading-india', '/ccts-compliance-india'],
  },
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
