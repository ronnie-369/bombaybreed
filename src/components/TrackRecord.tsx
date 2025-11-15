import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <section id="track-record" className="py-24 md:py-32 lg:py-40 px-4 md:px-8 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-section font-heading font-bold mb-6">
            Track Record & Credentials
          </h2>
          <p className="text-body-enhanced text-foreground/80 max-w-3xl mx-auto">
            Proven expertise in strategic governance, C-suite advisory, and carbon/ESG oversight
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-16">
          {/* Professional Summary */}
          <div className="space-y-8">
            <h3 className="text-subsection font-heading font-semibold text-primary">
              Professional Background
            </h3>
            
            <div className="space-y-2">
              {experience.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-5 border-b border-border/50 hover:border-border smooth-transition group">
                  <span className="font-medium text-foreground pr-4 group-hover:text-primary smooth-transition">{item.area}</span>
                  <span className="text-primary font-semibold whitespace-nowrap text-lg">{item.years}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-body text-foreground/75 leading-relaxed">
                A steady yet dynamic influence with CEOs and CXOs for over a decade. Led advertising agencies, consulted with KPMG India, worked with senior leadership at Microsoft India, before shifting focus to Climate Action.
              </p>
            </div>
          </div>

          {/* Board-Relevant Experience */}
          <div className="space-y-8">
            <h3 className="text-subsection font-heading font-semibold text-primary">
              Board-Relevant Expertise
            </h3>
            
            <div className="space-y-4">
              {boardRelevantExpertise.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="mt-1 p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 smooth-transition">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                  </div>
                  <span className="text-body text-foreground/80 group-hover:text-foreground smooth-transition">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thought Leadership Preview */}
        <div className="mt-20 p-10 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10 card-hover">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-3">
                Published Thought Leadership
              </h3>
              <p className="text-body text-foreground/75">
                Insights on CCTS, CBAM, carbon governance, and India's climate transition
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="default" size="lg" className="gap-2 smooth-transition">
                <Link to="/resources">
                  View Publications
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="smooth-transition">
                <Link to="/credentials">
                  Full Credentials
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackRecord;
