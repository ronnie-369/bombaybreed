import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Leaf, TrendingUp } from 'lucide-react';
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
  {
    id: 'creative-effectiveness-sprint',
    sector: 'Creative Capability & Brand Strategy',
    sectorIcon: TrendingUp,
    title: 'The Creative Effectiveness Sprint — From Campaign Execution to Business-Moving Strategy',
    challenge: 'A leading flexible workspace brand\'s in-house marketing team was delivering campaigns on time — but the work was execution-focused, not strategy-led. Briefs lacked business linkage, ideas stayed safe, and stakeholder presentations weren\'t landing. The CMO needed a measurable creative transformation without hiring externally or disrupting live operations.',
    approach: 'Designed and delivered a 5-week sprint programme: a creative audit to baseline capability across 8 pillars, a 2-day intensive workshop covering brief decoding, bold ideation, copy-design craft, and stakeholder simulation — followed by a 4-week action cycle with live feedback on real campaigns and a leadership showcase to present transformation proof.',
    whyThisClient: 'This client operates one of India\'s largest flexible workspace networks — a sector with significant energy, water and waste footprints across hundreds of managed buildings. With an active sustainability mandate requiring vendor alignment on climate ethics, carbon footprint reduction, renewable energy use and responsible procurement, their marketing team needed to credibly communicate ESG commitments without greenwashing. A creative capability uplift wasn\'t just a brand exercise — it was essential to translating real operational sustainability into trustworthy, regulation-aware communications that serve occupiers, investors and policy stakeholders.',
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
    challenge: 'GH2 India — a not-for-profit industry association and think tank advancing India\'s green hydrogen ecosystem — needed its first-ever annual report. The organisation had delivered 14 high-impact webinars, 5 formal policy submissions, global representation at summits in Rotterdam, Brussels, and Copenhagen, and launched a flagship Green Ports and Shipping Network. But none of this was consolidated into a single, investable, policy-ready narrative. The report had to serve members, policymakers, international partners, and prospective funders — all with different information needs.',
    approach: 'Led the end-to-end design, editorial, and delivery of the 30-page annual report. Structured the narrative arc from executive summary through policy engagement, knowledge dialogues, global convenings, and the GPSN launch — ensuring each section served both documentary and strategic purposes. Designed the visual language to reflect institutional credibility while remaining accessible. Managed delivery timelines, stakeholder review cycles across chair and CEO offices, and prepared the report for digital distribution and event use at the January 2026 launch.',
    whyThisClient: 'GH2 India sits at the intersection of India\'s National Green Hydrogen Mission and global decarbonisation. As an industry body convening developers, policymakers, technology providers, and international partners, their communications must balance technical rigour with policy accessibility. Shaping their inaugural annual report was an opportunity to define how India\'s green hydrogen story is told — to the sector, to government, and to the world.',
    outcomes: [
      'First-ever annual report for India\'s leading green hydrogen industry association',
      '30-page report consolidating policy advocacy, 14 webinars, global summit participation, and the GPSN launch',
      'Designed for multi-stakeholder use: members, ministries, international partners, and investors',
      'Report timed for the GPSN launch event in New Delhi, January 2026',
    ],
    keywords: ['Green Hydrogen', 'Annual Report', 'Policy Communications', 'Industrial Advocacy'],
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

                  {/* Why This Client (if available) */}
                  {study.whyThisClient && (
                    <div className="mb-8 border-l-2 border-primary/30 pl-6">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Why This Client
                      </h3>
                      <p className="text-foreground/80 leading-relaxed text-sm">
                        {study.whyThisClient}
                      </p>
                    </div>
                  )}

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
