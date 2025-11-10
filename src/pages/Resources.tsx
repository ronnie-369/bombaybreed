import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, FileText } from 'lucide-react';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';

const Resources = () => {
  const publications = [
    {
      title: "From Compliance to Credibility: A CXO Guide to CCTS & CBAM",
      description: "Strategic frameworks to transform carbon compliance into competitive advantage and market leadership",
      type: "CXO Strategic Guide",
      color: "from-slate-800 to-slate-600",
      topics: ["CCTS Compliance", "CBAM Regulations", "Strategic Communications", "Market Access"]
    },
    {
      title: "Carbon Market Outlook 2025-2030: An Investor's Deep Dive",
      description: "Complete investor's guide to India's $1.4B carbon market opportunity with financial models and risk analysis",
      type: "Investor's Deep Dive",
      color: "from-blue-700 to-cyan-600",
      topics: ["Market Sizing", "Investment Sectors", "Risk Analysis", "Growth Projections"]
    },
    {
      title: "Green Jobs in India: Workforce and Investment Outlook 2025-2030",
      description: "Complete workforce & investment outlook for India's green economy transformation",
      type: "Workforce Outlook",
      color: "from-teal-700 to-emerald-600",
      topics: ["Job Archetypes", "Salary Benchmarks", "Skills Gap", "Regional Hubs"]
    },
    {
      title: "Energy Transition Playbook",
      description: "Strategic roadmap for India's energy transition and decarbonization pathways",
      type: "Strategic Playbook",
      color: "from-orange-700 to-amber-600",
      topics: ["Renewable Energy", "Grid Integration", "Policy Framework", "Technology Adoption"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-br from-primary via-accent to-primary/80 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            Resources & Thought Leadership
          </h1>
          <p className="text-lede mb-8 text-white/90">
            Published insights on carbon markets, ESG governance, and India's climate transition
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">Board Advisory Insights</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Market Intelligence</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Strategic Frameworks</span>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Featured Publications
            </h2>
            <p className="text-body text-foreground/70 max-w-3xl mx-auto">
              Comprehensive research and analysis on carbon markets, ESG compliance, and India's sustainability transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((pub, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${pub.color}`}></div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-primary">{pub.type}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {pub.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {pub.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {pub.topics.map((topic, topicIndex) => (
                        <span 
                          key={topicIndex}
                          className="px-3 py-1 bg-secondary/50 text-foreground/70 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-white transition-colors">
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Additional Insights
            </h2>
            <p className="text-body text-foreground/70 max-w-3xl mx-auto">
              Explore more research and analysis on carbon governance and sustainability strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">The Climate Desk</CardTitle>
                <CardDescription>
                  Regular insights and analysis on carbon markets and climate policy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer">
                    Visit Blog
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Growth Rooms Report</CardTitle>
                <CardDescription>
                  Analysis of India's climate finance and investment landscape
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full gap-2">
                  <a 
                    href="https://zjiwmdrtuhsrymsuvpfb.supabase.co/storage/v1/object/sign/Reports/growth%20rooms%20.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83ZjY0YjIzNy1hM2RlLTQ3NjctOGZiMC0yYjY1MjE4YjRkODkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJSZXBvcnRzL2dyb3d0aCByb29tcyAucGRmIiwiaWF0IjoxNzU5MjQ5NDYwLCJleHAiOjIwNzQ2MDk0NjB9.w4Gyi6D21wCMXhNQbNOJgaoPIaRR1WQ3Z7wUl-xK_IY"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">LinkedIn Profile</CardTitle>
                <CardDescription>
                  Connect for professional updates and industry insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90 text-white gap-2">
                  <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer">
                    Connect
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Access Full Reports
            </h2>
            <p className="text-body text-foreground/70">
              Provide your details to receive comprehensive research and analysis
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle="Complete Resource Library Access"
            reportDescription="Gain access to all published reports, frameworks, and insights on carbon markets and ESG governance"
          />
        </div>
      </section>
    </div>
  );
};

export default Resources;
