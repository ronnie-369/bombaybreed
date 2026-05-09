import React from 'react';
import PageHead from '@/components/PageHead';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import BookingDialog from '@/components/LazyBookingDialog';

const servicePillars = [
  {
    number: "01",
    label: "Carbon Strategy",
    headline: "Your BRSR filing is due and your board isn't prepared.",
    scope: [
      "Carbon transition roadmapping",
      "BRSR/CCTS compliance frameworks",
      "Decarbonisation pathway design",
      "Carbon credit monetisation strategy",
    ],
    outcome: "A top-10 cement manufacturer achieved 11% energy cost reduction within 14 months of engagement.",
    audience: "Publicly listed companies navigating SEBI's BRSR framework.",
    engage: "8-16 week project, or quarterly retainer",
    deepDive: "/carbon-communications-strategy-india",
  },
  {
    number: "02",
    label: "Board Governance",
    headline: "Your ESG committee meets quarterly but changes nothing.",
    scope: [
      "Board-level ESG oversight design",
      "Climate risk integration into strategy",
      "Stakeholder engagement frameworks",
      "Independent director advisory",
    ],
    outcome: "Board engagement on climate risk increased from reactive to proactive within two quarters.",
    audience: "Boards and CXOs seeking strategic oversight on sustainability.",
    engage: "Non-executive board advisory seat, annual",
    deepDive: "/esg-communications-consultant",
  },
  {
    number: "03",
    label: "ESG Communications",
    headline: "Your sustainability report reads like a compliance document.",
    scope: [
      "Sustainability narrative strategy",
      "Investor communications on ESG",
      "Greenwashing risk assessment",
      "Climate thought leadership positioning",
    ],
    outcome: "Transformed compliance-first ESG reporting into investor-grade strategic narrative for a Fortune 500 client.",
    audience: "Companies that need their climate story to resonate with investors and regulators.",
    engage: "Scoped project or ongoing retainer counsel",
    deepDive: "/sustainability-reporting-india",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHead
        title="Bombay Breed: Advisory Services"
        description="Three pillars of board-level advisory: Carbon Strategy, Board Governance, ESG Communications. Engage by project, retainer, or board seat."
        path="/services"
        ogImage="og-services"
      />
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="pt-16 pb-20 md:pt-20 md:pb-28 px-6 md:px-8">
          <div className="container mx-auto max-w-[680px]">
            <ScrollReveal direction="up">
              <SectionLabel number="00" label="Advisory Services" />
              <h1 className="text-display font-serif tracking-tight mt-6 mb-6">
                Three pillars. One conversation.
              </h1>
              <p className="text-lede text-muted-foreground">
                Board-level advisory across Carbon Strategy, Governance, and ESG Communications -
                delivered as scoped projects, ongoing retainers, or non-executive board seats.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Three Service Pillars */}
        {servicePillars.map((pillar) => (
          <section key={pillar.number} id={pillar.label.toLowerCase().split(' ')[0]} className="py-16 md:py-24 px-6 md:px-8 border-t border-border/50 scroll-mt-24">
            <div className="container mx-auto max-w-[680px]">
              <ScrollReveal direction="up">
                <SectionLabel number={pillar.number} label={pillar.label} />
                <h2 className="text-section font-serif tracking-tight mt-6 mb-6">
                  {pillar.headline}
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-3">Scope</h3>
                    <ul className="space-y-2">
                      {pillar.scope.map((item, i) => (
                        <li key={i} className="text-foreground/80 flex items-start gap-2">
                          <span className="text-accent mt-1">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2">Outcome</h3>
                    <p className="text-foreground/80 italic">"{pillar.outcome}"</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2">Who this is for</h3>
                      <p className="text-foreground/80">{pillar.audience}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2">How to engage</h3>
                      <p className="text-foreground/80">{pillar.engage}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                    <BookingDialog
                      subject={`Focused Conversation: ${pillar.label}`}
                      trigger={
                        <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80 p-0 h-auto">
                          Book a Focused Conversation <ArrowRight className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <Link
                      to={pillar.deepDive}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Deep dive <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-3xl text-center">
            <ScrollReveal direction="up">
              <h2 className="text-section font-serif tracking-tight mb-6">
                Ready to build a credible carbon strategy for your board?
              </h2>
              <BookingDialog triggerText="Schedule a Consultation" />
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
