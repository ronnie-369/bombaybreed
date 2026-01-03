import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ui/ScrollReveal';

const TrackRecord = () => {
  const experience = [
    {
      area: "Integrated Strategic Communications & Brand Stewardship",
      years: "18 years"
    },
    {
      area: "C-Suite Management & Strategic Business Leadership",
      years: "11 years"
    },
    {
      area: "Climate Marketing & Carbon Market Specialization",
      years: "2 years"
    }
  ];

  const boardRelevantExpertise = [
    "Strategic advisor to CEOs/CXOs (Microsoft, KPMG, leading ad agencies)",
    "Independent governance perspective with external lens",
    "Regulatory readiness (carbon markets, ESG disclosure frameworks)",
    "Risk management & stakeholder engagement",
    "Data-led approach to strategic decision-making",
    "Cross-functional collaboration at board and executive levels"
  ];

  return (
    <section id="track-record" className="py-20 md:py-28 px-6 md:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
              Experience
            </p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              Track Record & Credentials
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Proven expertise in strategic governance, C-suite advisory, and carbon/ESG oversight
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Professional Summary */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-primary">
                Professional Background
              </h3>
              
              <div className="space-y-0">
                {experience.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-border/50">
                    <span className="text-sm text-foreground pr-4">{item.area}</span>
                    <span className="text-sm text-primary font-medium whitespace-nowrap">{item.years}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                A steady yet dynamic influence with CEOs and CXOs for over a decade. Led advertising agencies, consulted with KPMG India, worked with senior leadership at Microsoft India, before shifting focus to Climate Action.
              </p>
            </div>
          </ScrollReveal>

          {/* Board-Relevant Experience */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-primary">
                Board-Relevant Expertise
              </h3>
              
              <div className="space-y-3">
                {boardRelevantExpertise.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Thought Leadership Preview */}
        <ScrollReveal direction="scale">
          <div className="p-8 bg-card rounded-lg border border-border/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-medium mb-2">
                  Published Thought Leadership
                </h3>
                <p className="text-sm text-muted-foreground">
                  Insights on CCTS, CBAM, carbon governance, and India's climate transition
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="default" className="gap-2">
                  <Link to="/resources">
                    View Publications
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/credentials">
                    Full Credentials
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrackRecord;
