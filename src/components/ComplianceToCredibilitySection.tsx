import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComplianceToCredibilitySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-background animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="section-title gradient-accent">
            Featured CXO Guide
          </h2>
          <p className="section-description">
            Strategic frameworks to transform carbon compliance into competitive advantage.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="glass-card group hover-scale border-0 animate-fade-in">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-sans font-semibold">
                From Compliance to Credibility
              </CardTitle>
              <CardDescription className="text-sm text-foreground/60">
                A CXO Guide to CCTS & CBAM
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {[
                  "Regulatory shifts redefining Indian exports",
                  "Sector-specific exposure & case studies", 
                  "Compliance-grade communication frameworks",
                  "CXO action checklist for market leadership"
                ].map((bullet, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span className="text-foreground/80">{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={() => navigate('/compliance-to-credibility')}
                  variant="outline" 
                  className="flex-1"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => navigate('/compliance-to-credibility')}
                  variant="gradient" 
                  className="flex-1"
                >
                  Download Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComplianceToCredibilitySection;