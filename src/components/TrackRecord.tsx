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
    <section id="track-record" className="py-20 px-4 md:px-8 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Track Record & Credentials
          </h2>
          <p className="text-body text-foreground/70 max-w-3xl mx-auto">
            Proven expertise in strategic governance, C-suite advisory, and carbon/ESG oversight
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Professional Summary */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-semibold text-primary">
              Professional Background
            </h3>
            
            <div className="space-y-4">
              {experience.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-4 border-b border-border/50 hover:border-border transition-colors">
                  <span className="font-medium text-foreground pr-4">{item.area}</span>
                  <span className="text-primary font-semibold whitespace-nowrap">{item.years}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <p className="text-body-sm text-foreground/70 leading-relaxed">
                A steady yet dynamic influence with CEOs and CXOs for over a decade. Led advertising agencies, consulted with KPMG India, worked with senior leadership at Microsoft India, before shifting focus to Climate Action.
              </p>
            </div>
          </div>

          {/* Board-Relevant Experience */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-semibold text-primary">
              Board-Relevant Expertise
            </h3>
            
            <div className="space-y-3">
              {boardRelevantExpertise.map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="mt-1 p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <span className="text-body-sm text-foreground/80 group-hover:text-foreground transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thought Leadership Preview */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-heading font-semibold mb-2">
                Published Thought Leadership
              </h3>
              <p className="text-body-sm text-foreground/70">
                Insights on CCTS, CBAM, carbon governance, and India's climate transition
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="default" size="lg" className="gap-2">
                <Link to="/resources">
                  View Publications
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
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
