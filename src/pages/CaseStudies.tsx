import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Database, FileText, Leaf, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingDialog from '@/components/BookingDialog';

const caseStudies = [
  {
    id: 'proclime-biodiversity-campaign',
    sector: 'Climate Awareness & Advocacy',
    sectorIcon: Leaf,
    title: 'Sounds of ProClime — India\'s National Anthem Recreated Using Sounds of Nature',
    subtitle: 'A creative campaign that made biodiversity conservation emotionally resonant for 1.4 billion people.',
    challenge: [
      'Climate action confined to policy papers and boardrooms',
      '1.55 lakh species with no public-facing narrative',
      'Independence Day as a cultural moment — untapped for conservation',
      'Need for emotional resonance, not data overload',
    ],
    approach: [
      'Reimagined India\'s National Anthem using only sounds from nature — birdsong, insects, water, wind',
      'Partnered with music producer Premik Jolly to compose the piece',
      'Built a teaser-to-launch rollout strategy across channels',
      'Secured multi-channel press coverage across national publications',
    ],
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Lush green forest canopy representing Indian biodiversity',
    outcomes: [
      '300,000+ YouTube engagements',
      'Featured in The New Indian Express, Indiatimes, MediaBrief, and Passionate in Marketing',
      'Campaign felicitated at IIT Roorkee',
      'Showcased to the Minister of Environment; featured track played to A.R. Rahman',
    ],
    keywords: ['Biodiversity', 'Climate Awareness', 'Creative Campaigning'],
    relatedPages: [],
  },
  {
    id: 'creative-effectiveness-sprint',
    sector: 'Creative Capability & Brand Strategy',
    sectorIcon: TrendingUp,
    title: 'The Creative Effectiveness Sprint — From Campaign Execution to Business-Moving Strategy',
    subtitle: 'Transforming an in-house marketing team\'s creative capability without disrupting live operations.',
    challenge: [
      'In-house team delivering campaigns on time — but execution-focused, not strategy-led',
      'Briefs lacked business linkage; ideas stayed safe',
      'Stakeholder presentations weren\'t landing',
      'CMO needed measurable transformation without external hires',
    ],
    approach: [
      'Creative audit to baseline capability across 8 pillars',
      '2-day intensive workshop: brief decoding, bold ideation, copy-design craft, stakeholder simulation',
      '4-week action cycle with live feedback on real campaigns',
      'Leadership showcase to present transformation proof',
    ],
    whyThisClient: 'This client operates one of India\'s largest flexible workspace networks — a sector with significant energy, water and waste footprints. With an active sustainability mandate requiring vendor alignment on climate ethics, carbon reduction, and responsible procurement, their marketing team needed to credibly communicate ESG commitments without greenwashing.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Team workshop and strategy session in progress',
    outcomes: [
      '2 live campaigns uplifted and 3 briefs sharpened during the workshop itself',
      'Measurable improvement across 8 creative capability pillars (scored before and after)',
      'Team shifted from asset delivery to outcome-driven campaign ownership',
      'Reduced dependence on external agencies for strategic creative direction',
    ],
    keywords: ['Creative Strategy', 'Capability Building', 'Brand Transformation', 'Sustainability Communications'],
    relatedPages: [],
  },
  {
    id: 'gh2-india-annual-report',
    sector: 'Green Hydrogen & Industrial Policy',
    sectorIcon: FileText,
    title: 'GH2 India Annual Report 2025 — Designing the Definitive Record of India\'s Green Hydrogen Movement',
    subtitle: 'Shaping the inaugural annual report for India\'s leading green hydrogen industry association.',
    challenge: [
      'First-ever annual report for a nascent but high-impact industry body',
      '14 webinars, 5 policy submissions, global summits — none consolidated into a single narrative',
      'Multiple audiences: members, policymakers, international partners, funders',
      'Report needed to be both documentary and strategically investable',
    ],
    approach: [
      'Led end-to-end design, editorial, and delivery of the 30-page report',
      'Structured narrative arc: executive summary → policy engagement → global convenings → GPSN launch',
      'Designed visual language balancing institutional credibility with accessibility',
      'Managed stakeholder review cycles across chair and CEO offices',
    ],
    whyThisClient: 'GH2 India sits at the intersection of India\'s National Green Hydrogen Mission and global decarbonisation. As an industry body convening developers, policymakers, and technology providers, their communications must balance technical rigour with policy accessibility.',
    image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Green hydrogen production and clean energy technology',
    outcomes: [
      'First-ever annual report for India\'s leading green hydrogen industry association',
      '30-page report consolidating policy advocacy, 14 webinars, global summit participation, and the GPSN launch',
      'Designed for multi-stakeholder use: members, ministries, international partners, and investors',
      'Report timed for the GPSN launch event in New Delhi, January 2026',
    ],
    keywords: ['Green Hydrogen', 'Annual Report', 'Policy Communications', 'Industrial Advocacy'],
    relatedPages: [],
  },
  {
    id: 'feedstock-intelligence-content-strategy',
    sector: 'ESG Technology & Content Strategy',
    sectorIcon: Database,
    title: 'The Feedstock Intelligence Content Ecosystem — Building Category Authority for an AI-Driven ESG Platform',
    subtitle: 'Defining an uncontested category position through a 15-article content architecture.',
    challenge: [
      'Powerful AI platform bridging operational data and strategic ESG decisions',
      'Market positioning didn\'t reflect true competitive advantage',
      'Existing articles showed depth but lacked SEO architecture or ecosystem integration',
      'Needed to claim an unoccupied category and convert authority into pipeline',
    ],
    approach: [
      '5-pillar, 15-article content ecosystem with 75+ derivative pieces',
      'Architecture built around proprietary "feedstock intelligence" thesis',
      'Audited and repositioned 2 existing articles into the ecosystem',
      'Each article mapped to specific buyer personas: implementers, CFOs, compliance officers',
    ],
    whyThisClient: 'This client operates at the intersection of AI, industrial data, and ESG compliance — serving chemical manufacturers, agri-processors, and heavy industry navigating BRSR, CSRD, and CBAM simultaneously. Building their content ecosystem was about defining a category no competitor had claimed.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Data analytics dashboard representing ESG technology',
    outcomes: [
      '5-pillar content architecture: feedstock intelligence, supply chain compliance, carbon intelligence, ESG assurance, strategic sustainability',
      '15 long-form SEO-optimised articles with 75+ derivative content pieces',
      '2 existing articles audited, repositioned, and integrated into the ecosystem',
      'Category-defining thesis: "feedstock intelligence" as an uncontested market position',
    ],
    keywords: ['ESG Technology', 'Content Strategy', 'Feedstock Intelligence', 'SEO Architecture'],
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
        <section className="pt-32 pb-20 md:pb-24 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Client Engagements
            </Badge>
            <h1 className="text-display font-display font-bold text-foreground mb-6 tracking-tight">
              Strategic Impact,<br />Measurable Outcomes
            </h1>
            <p className="text-body-enhanced text-muted-foreground max-w-2xl mx-auto">
              How we help Indian enterprises navigate carbon markets, climate regulation, and sustainability communications with precision advisory that drives board-level results.
            </p>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl space-y-24 md:space-y-32">
            {caseStudies.map((study, index) => {
              const isReversed = index % 2 === 1;

              return (
                <article key={study.id} className="scroll-mt-24" id={study.id}>
                  {/* Sector + Title Header */}
                  <div className="mb-8 md:mb-12">
                    <div className="flex items-center gap-2 mb-4">
                      <study.sectorIcon className="w-5 h-5 text-primary" />
                      <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">
                        {study.sector}
                      </span>
                    </div>
                    <h2 className="text-section font-display font-bold text-foreground tracking-tight mb-3">
                      {study.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                      {study.subtitle}
                    </p>
                  </div>

                  {/* Image + Challenge/Approach Grid */}
                  <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14 ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div className={`relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-auto ${isReversed ? 'lg:col-start-2' : ''}`}>
                      <img
                        src={study.image}
                        alt={study.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                    </div>

                    {/* Challenge + Approach */}
                    <div className={`flex flex-col gap-8 ${isReversed ? 'lg:col-start-1' : ''}`}>
                      {/* Challenge */}
                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                          <span className="w-8 h-px bg-muted-foreground/40" />
                          The Challenge
                        </h3>
                        <ul className="space-y-3">
                          {study.challenge.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-foreground/80 leading-relaxed">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Approach */}
                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                          <span className="w-8 h-px bg-muted-foreground/40" />
                          Our Approach
                        </h3>
                        <ul className="space-y-3">
                          {study.approach.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-foreground/80 leading-relaxed">
                              <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Why This Client */}
                  {study.whyThisClient && (
                    <div className="mb-10 md:mb-14 bg-muted/30 rounded-xl p-6 md:p-8 border-l-4 border-primary/30">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-3">
                        Why This Client
                      </h3>
                      <p className="text-foreground/80 leading-relaxed max-w-4xl">
                        {study.whyThisClient}
                      </p>
                    </div>
                  )}

                  {/* Outcomes */}
                  <div className="mb-8">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                      <span className="w-8 h-px bg-primary/40" />
                      Key Outcomes
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {study.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start gap-3 bg-primary/5 rounded-lg p-4">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground/80 leading-relaxed">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keywords */}
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

                  {/* Divider between case studies */}
                  {index < caseStudies.length - 1 && (
                    <div className="mt-16 md:mt-20 flex items-center gap-4">
                      <span className="flex-1 h-px bg-border" />
                      <span className="w-2 h-2 rounded-full bg-primary/30" />
                      <span className="flex-1 h-px bg-border" />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 px-4 bg-muted/30">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-section font-display font-bold text-foreground mb-4 tracking-tight">
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
