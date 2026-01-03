import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, FileText, Video } from 'lucide-react';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';

const Resources = () => {
  const publications = [
    {
      title: "From Compliance to Credibility: A CXO Guide to CCTS & CBAM",
      description: "Strategic frameworks to transform carbon compliance into competitive advantage and market leadership",
      type: "CXO Strategic Guide",
      topics: ["CCTS Compliance", "CBAM Regulations", "Strategic Communications", "Market Access"]
    },
    {
      title: "Carbon Market Outlook 2025-2030: An Investor's Deep Dive",
      description: "Complete investor's guide to India's $1.4B carbon market opportunity with financial models and risk analysis",
      type: "Investor's Deep Dive",
      topics: ["Market Sizing", "Investment Sectors", "Risk Analysis", "Growth Projections"]
    },
    {
      title: "Green Jobs in India: Workforce and Investment Outlook 2025-2030",
      description: "Complete workforce & investment outlook for India's green economy transformation",
      type: "Workforce Outlook",
      topics: ["Job Archetypes", "Salary Benchmarks", "Skills Gap", "Regional Hubs"]
    },
    {
      title: "Energy Transition Playbook",
      description: "Strategic roadmap for India's energy transition and decarbonization pathways",
      type: "Strategic Playbook",
      topics: ["Renewable Energy", "Grid Integration", "Policy Framework", "Technology Adoption"]
    },
    {
      title: "India's Climate Inflection Point",
      description: "Critical analysis of India's pivotal moment in climate transition and the strategic decisions shaping the nation's sustainable future",
      type: "Strategic Analysis",
      topics: ["Climate Transition", "Policy Inflection", "Strategic Decisions", "Future Outlook"]
    }
  ];

  const [selectedReport, setSelectedReport] = useState(publications[0]);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleDownloadClick = (pub: typeof publications[0]) => {
    setSelectedReport(pub);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 md:px-8 bg-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <p className="text-sm font-medium text-primary-foreground/70 tracking-wide uppercase mb-4">
            Research & Insights
          </p>
          <h1 className="text-display font-heading tracking-tight mb-6 text-primary-foreground">
            Resources & Thought Leadership
          </h1>
          <p className="text-lede text-primary-foreground/80">
            Published insights on carbon markets, ESG governance, and India's climate transition
          </p>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-20 px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
              Publications
            </p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              Featured Publications
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Comprehensive research and analysis on carbon markets, ESG compliance, and sustainability transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((pub, index) => (
              <Card 
                key={index} 
                className={`transition-colors hover:border-border ${
                  selectedReport.title === pub.title ? 'border-primary' : 'border-border/50'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium text-accent uppercase tracking-wide">{pub.type}</span>
                  </div>
                  <CardTitle className="text-lg font-medium">
                    {pub.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {pub.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {pub.topics.map((topic, topicIndex) => (
                        <span 
                          key={topicIndex}
                          className="px-2.5 py-1 bg-muted text-muted-foreground rounded text-xs hover-pill cursor-default"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <Button 
                      onClick={() => handleDownloadClick(pub)}
                      variant="outline" 
                      size="sm"
                      className="w-full gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 px-6 md:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
              More Resources
            </p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              Additional Insights
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Explore more research and analysis on carbon governance and sustainability strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50 hover:border-border transition-colors">
              <CardHeader>
                <CardTitle className="text-base font-medium">The Climate Desk</CardTitle>
                <CardDescription className="text-sm">
                  Regular insights and analysis on carbon markets and climate policy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm" className="w-full gap-2">
                  <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer">
                    Visit Blog
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-border transition-colors">
              <CardHeader>
                <CardTitle className="text-base font-medium">LinkedIn Profile</CardTitle>
                <CardDescription className="text-sm">
                  Connect for professional updates and industry insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm" className="w-full gap-2">
                  <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer">
                    Connect
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-border transition-colors">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Video className="h-4 w-4 text-accent" />
                  Video Assets
                </CardTitle>
                <CardDescription className="text-sm">
                  Watch presentations, webinars, and educational content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm" className="w-full gap-2">
                  <a href="https://www.youtube.com/@theresaronnie" target="_blank" rel="noopener noreferrer">
                    Watch Videos
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section ref={formSectionRef} className="py-20 px-6 md:px-8 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
              Download
            </p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              {selectedReport.title}
            </h2>
            <p className="text-body text-muted-foreground">
              {selectedReport.description}
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle={selectedReport.title}
            reportDescription={selectedReport.description}
          />
        </div>
      </section>
    </div>
  );
};

export default Resources;
