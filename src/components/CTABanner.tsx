import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface CTABannerProps {
  variant?: 'services' | 'case-studies' | 'expertise';
}

const CTABanner = ({ variant = 'services' }: CTABannerProps) => {
  const content = {
    services: {
      title: "Ready to Elevate Your Sustainability Communications?",
      description: "Transform regulatory complexity into strategic competitive advantage with expert advisory support.",
      primaryCTA: "Schedule a Consultation",
      primaryLink: "#contact",
      secondaryCTA: "Download Guide",
      secondaryLink: "/compliance-to-credibility"
    },
    'case-studies': {
      title: "See Your Challenge in These Success Stories?",
      description: "Let's discuss how our proven frameworks can deliver similar results for your organization.",
      primaryCTA: "Discuss Your Project",
      primaryLink: "#contact",
      secondaryCTA: "View More Cases",
      secondaryLink: "#cases"
    },
    expertise: {
      title: "Navigate Complexity with Expert Guidance",
      description: "Strategic advisory services designed for CXOs managing multi-stakeholder sustainability communications.",
      primaryCTA: "Get Started",
      primaryLink: "#contact",
      secondaryCTA: "Learn More",
      secondaryLink: "#services"
    }
  };

  const selected = content[variant];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center border-2 border-primary/20">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 gradient-accent">
            {selected.title}
          </h2>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {selected.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              variant="gradient" 
              size="lg"
              className="font-semibold group"
            >
              <a 
                href={selected.primaryLink}
                onClick={(e) => handleScroll(e, selected.primaryLink)}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                {selected.primaryCTA}
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="font-medium"
            >
              <a 
                href={selected.secondaryLink}
                onClick={(e) => handleScroll(e, selected.secondaryLink)}
              >
                {selected.secondaryCTA}
              </a>
            </Button>
          </div>
          <p className="text-xs text-foreground/60 mt-6">
            Trusted by Fortune 500 enterprises and climate-focused organizations
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
