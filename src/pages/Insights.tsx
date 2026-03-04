import React, { useState, useRef, useMemo, useEffect } from 'react';
import { setOGMeta } from '@/utils/og-meta';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import { format } from 'date-fns';

import wefCoverImage from '@/assets/wef-global-risks-2026-cover.jpg';
import greenJobsCoverImage from '@/assets/green-jobs-india-2026-cover.jpg';
import miningTransitionCover from '@/assets/mining-transition-cover.jpg';
import asiaClimateArticle6Cover from '@/assets/asia-climate-article6-cover.jpg';
import indiaClimateInflectionCover from '@/assets/india-climate-inflection-cover.jpg';
import complianceCredibilityCover from '@/assets/compliance-credibility-cover.jpg';
import carbonMarketOutlookCover from '@/assets/carbon-market-outlook-cover.jpg';
import energyTransitionPlaybookCover from '@/assets/energy-transition-playbook-cover.jpg';
import indiaPowerSectorCover from '@/assets/india-power-sector-cover.jpg';

interface Publication {
  title: string;
  description: string;
  type: string;
  publishedDate: string;
  link?: string;
  external?: boolean;
}

const flagshipBriefs = [
  {
    title: "India's Carbon Playbook: PAT Lessons, CCTS Rules & the Article 6 Opportunity",
    takeaway: "The definitive strategic guide for Indian boards navigating carbon compliance and international market opportunities.",
    date: "March 2026",
    link: "/carbon-playbook",
  },
  {
    title: "WEF Global Risks Report 2026: Climate & Geopolitical Volatility",
    takeaway: "How the intersection of climate, geopolitics, and economic fragility reshapes risk for Indian enterprises.",
    date: "January 2026",
    link: "/wef-global-risks-2026",
  },
];

const allBriefs: Publication[] = [
  {
    title: "The One Emitter the Paris Agreement Forgot to Name",
    description: "Every climate treaty ever signed has a missing line — the world's militaries collectively emit more greenhouse gases than all but two nations.",
    type: "Special Investigation",
    publishedDate: "2026-03-01",
    link: "/special-features/war-climate.html",
    external: true,
  },
  {
    title: "India's Renewable Grid at Breaking Point",
    description: "Strategic analysis of the 203 GW grid crisis, thermal-RE gaps, and the ₹3.4 lakh crore infrastructure investment required.",
    type: "Energy Transition",
    publishedDate: "2026-02-09",
    link: "/india-renewable-grid-analysis",
  },
  {
    title: "Working for the Earth — A Dialectic Discourse",
    description: "The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth are among the least protected.",
    type: "Green Jobs",
    publishedDate: "2026-02-06",
    link: "/working-for-the-earth",
  },
  {
    title: "India Power Sector Investment Presentation",
    description: "India's ₹4.5 lakh crore power revolution: generation transition, nuclear targets, and grid-scale storage opportunities.",
    type: "Investment Analysis",
    publishedDate: "2026-01-22",
  },
  {
    title: "Jobs on the Rise 2026: India Green Jobs Outlook",
    description: "Comprehensive analysis of India's green jobs landscape aligned with Net-Zero 2070 goals.",
    type: "Workforce Analysis",
    publishedDate: "2026-01-17",
    link: "/green-jobs-india-2026",
  },
  {
    title: "Mining the Transition: A Climate-Critical Minerals Risk Framework",
    description: "Risk framework for climate-critical minerals investment — lithium, cobalt, nickel, copper, and rare earths.",
    type: "Investor Framework",
    publishedDate: "2025-12-15",
  },
  {
    title: "Asia Climate Emissions and Article 6: Comparative Policy Grade",
    description: "Asia's climate emissions landscape and comparative policy grading under Article 6 of the Paris Agreement.",
    type: "Policy Analysis",
    publishedDate: "2025-12-10",
  },
  {
    title: "India's Climate Inflection Point",
    description: "Critical analysis of India's pivotal moment in climate transition.",
    type: "Strategic Analysis",
    publishedDate: "2025-11-15",
  },
  {
    title: "From Compliance to Credibility: A CXO Guide to CCTS & CBAM",
    description: "Strategic frameworks to transform carbon compliance into competitive advantage.",
    type: "CXO Strategic Guide",
    publishedDate: "2025-10-20",
    link: "/compliance-to-credibility",
  },
  {
    title: "Carbon Market Outlook 2025-2030: An Investor's Deep Dive",
    description: "Complete investor's guide to India's $1.4B carbon market opportunity.",
    type: "Investor's Deep Dive",
    publishedDate: "2025-10-15",
    link: "/carbon-market-outlook",
  },
  {
    title: "Energy Transition Playbook",
    description: "Strategic roadmap for India's energy transition and decarbonisation pathways.",
    type: "Strategic Playbook",
    publishedDate: "2025-08-15",
    link: "/energy-transition-playbook",
  },
];

const Insights = () => {
  const [selectedReport, setSelectedReport] = useState(allBriefs[0]);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Bombay Breed — Intelligence Briefs";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Original research and strategic analysis on carbon markets, ESG governance, and sustainability communications in India.");
    }
    const cleanup = setOGMeta({
      title: 'Bombay Breed — Intelligence Briefs',
      description: 'Climate Policy · Carbon Markets · ESG Research for Indian boards.',
      image: 'https://bombaybreed.com/og/og-insights.png',
      url: 'https://bombaybreed.com/insights',
    });
    return cleanup;
  }, []);

  const formatDate = (dateString: string) => format(new Date(dateString), 'MMMM yyyy');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="pt-16 pb-20 md:pt-20 md:pb-28 px-6 md:px-8">
          <div className="container mx-auto max-w-[680px]">
            <ScrollReveal direction="up">
              <SectionLabel number="00" label="Research" />
              <h1 className="text-display font-serif tracking-tight mt-6 mb-6">
                Intelligence Briefs
              </h1>
              <p className="text-lede text-muted-foreground">
                Original research and strategic analysis on carbon markets, ESG governance, 
                and sustainability communications in India.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Flagship Briefs */}
        <section className="pb-16 md:pb-24 px-6 md:px-8">
          <div className="container mx-auto max-w-[680px]">
            <ScrollReveal direction="up">
              <SectionLabel number="01" label="Flagship Research" />
              <div className="mt-6 space-y-6">
                {flagshipBriefs.map((brief, index) => (
                  <Link key={index} to={brief.link} className="block group">
                    <div className="py-6 border-b border-border/50 group-hover:border-primary/50 transition-colors">
                      <p className="text-xs text-muted-foreground mb-2">{brief.date}</p>
                      <h3 className="text-xl md:text-2xl font-serif text-foreground group-hover:text-primary transition-colors mb-2">
                        {brief.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{brief.takeaway}</p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary">
                        Read the Brief <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* All Briefs — Text-only list */}
        <section className="py-16 md:py-24 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-[680px]">
            <ScrollReveal direction="up">
              <SectionLabel number="02" label="All Briefs" />
              <div className="mt-6 space-y-0">
                {allBriefs.map((brief, index) => {
                  const inner = (
                    <div className="flex items-start justify-between py-5 border-b border-border/30 group-hover:border-primary/30 transition-colors">
                      <div className="min-w-0 pr-6">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {brief.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{brief.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0 mt-1">
                        {formatDate(brief.publishedDate)}
                      </span>
                    </div>
                  );

                  if (brief.external) {
                    return (
                      <a key={index} href={brief.link} className="block group">
                        {inner}
                      </a>
                    );
                  }
                  if (brief.link) {
                    return (
                      <Link key={index} to={brief.link} className="block group">
                        {inner}
                      </Link>
                    );
                  }
                  return (
                    <div 
                      key={index} 
                      className="block group cursor-pointer" 
                      onClick={() => {
                        setSelectedReport(brief);
                        formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {inner}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 md:py-24 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-[680px] text-center">
            <ScrollReveal direction="up">
              <h2 className="text-section font-serif tracking-tight mb-3">
                Subscribe to Intelligence Briefs
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Original research on carbon markets and ESG governance. Published monthly.
              </p>
              <Button asChild>
                <a href="https://theclimatedesk.substack.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  Subscribe on Substack <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </ScrollReveal>
          </div>
        </section>

        {/* Download CTA */}
        <section ref={formSectionRef} className="py-20 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-[680px]">
            <div className="text-center mb-12">
              <SectionLabel number="03" label="Download" className="text-center block" />
              <h2 className="text-section font-serif tracking-tight mt-6 mb-4">{selectedReport.title}</h2>
              <p className="text-body text-muted-foreground">{selectedReport.description}</p>
            </div>
            <LeadCaptureForm reportTitle={selectedReport.title} reportDescription={selectedReport.description} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
