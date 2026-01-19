import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, TrendingUp, Newspaper, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Topic clusters for internal linking
const topicClusters = [
  {
    title: "Carbon Markets",
    description: "Understanding India's carbon trading landscape",
    topics: ["CCTS", "Carbon Credits", "VCM", "Article 6"],
    serviceLink: "/carbon-market-advisory-india",
    serviceName: "Carbon Market Advisory"
  },
  {
    title: "Sustainability Reporting",
    description: "Navigating disclosure requirements",
    topics: ["BRSR", "GRI", "TCFD", "Integrated Reporting"],
    serviceLink: "/sustainability-reporting-india",
    serviceName: "Sustainability Reporting"
  },
  {
    title: "Industrial Decarbonisation",
    description: "Net zero pathways for heavy industry",
    topics: ["Steel", "Cement", "Oil & Gas", "Power"],
    serviceLink: "/industrial-decarbonisation-strategy",
    serviceName: "Industrial Decarbonisation"
  },
  {
    title: "Climate Policy",
    description: "Regulatory landscape and compliance",
    topics: ["CBAM", "PAT Scheme", "NDCs", "Climate Finance"],
    serviceLink: "/climate-strategy-india-enterprises",
    serviceName: "Climate Strategy"
  }
];

// Featured insights (would typically come from a CMS or database)
const featuredInsights = [
  {
    title: "How India's Carbon Market Is Reshaping Industrial Strategy",
    description: "The CCTS framework creates both compliance imperatives and commercial opportunities for heavy-emitting industries. Here's what boards need to know.",
    category: "Carbon Markets",
    readTime: "8 min read",
    link: "/resources"
  },
  {
    title: "CBAM Is Coming: What Indian Exporters Must Do Now",
    description: "EU's Carbon Border Adjustment Mechanism will impact steel, cement, and aluminum exports. Preparation should start today, not in 2026.",
    category: "Policy & Regulation",
    readTime: "6 min read",
    link: "/cbam"
  },
  {
    title: "Beyond Compliance: Turning BRSR Into Competitive Advantage",
    description: "India's mandatory sustainability reporting isn't just a checkbox exercise—it's an opportunity to differentiate in investor communications.",
    category: "Sustainability Reporting",
    readTime: "5 min read",
    link: "/sustainability-reporting-india"
  }
];

const Insights = () => {
  useEffect(() => {
    document.title = "Climate Insights & Analysis | Bombay Breed";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Expert analysis on India's carbon markets, sustainability reporting, and climate policy. Strategic insights for C-suite executives navigating the energy transition.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-20 px-6 md:px-8 bg-primary">
          <div className="container mx-auto text-center max-w-3xl">
            <p className="text-sm font-medium text-primary-foreground/70 tracking-wide uppercase mb-4">
              Insights & Analysis
            </p>
            <h1 className="text-display font-heading tracking-tight mb-6 text-primary-foreground">
              Climate Intelligence for Decision Makers
            </h1>
            <p className="text-lede text-primary-foreground/80">
              Strategic analysis on carbon markets, ESG governance, and India's energy transition—translated for the boardroom.
            </p>
          </div>
        </section>

        {/* Featured Insights */}
        <section className="py-20 px-6 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    Featured Analysis
                  </h2>
                  <p className="text-muted-foreground">Strategic insights from The Climate Desk</p>
                </div>
                <Link to="/resources">
                  <Button variant="outline" size="sm">
                    View All Reports <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {featuredInsights.map((insight, index) => (
                  <Link key={index} to={insight.link}>
                    <Card className="h-full group cursor-pointer hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {insight.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{insight.readTime}</span>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {insight.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {insight.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Topic Clusters */}
        <section className="py-20 px-6 md:px-8 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  Explore by Topic
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Deep-dive into specific areas of climate strategy with our curated topic clusters
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {topicClusters.map((cluster, index) => (
                  <Card key={index} className="bg-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{cluster.title}</CardTitle>
                      <CardDescription>{cluster.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cluster.topics.map((topic, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">Related service:</span>
                        <Link 
                          to={cluster.serviceLink}
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          {cluster.serviceName} <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* The Climate Desk Section */}
        <section className="py-20 px-6 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="bg-primary rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Newspaper className="w-6 h-6 text-primary-foreground" />
                      <span className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wide">
                        Newsletter
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary-foreground mb-4">
                      The Climate Desk
                    </h2>
                    <p className="text-primary-foreground/80 mb-6">
                      Weekly intelligence on India's energy transition, carbon markets, and climate policy. 
                      Written for decision-makers who need signal, not noise.
                    </p>
                    <Button variant="secondary" asChild>
                      <a 
                        href="https://thecliamtedesk.substack.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        Subscribe on Substack <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary-foreground">What subscribers get:</h3>
                    <ul className="space-y-3">
                      {[
                        "Weekly carbon market analysis",
                        "Policy change breakdowns",
                        "Industry transition updates",
                        "Investment signal tracking",
                        "Exclusive deep-dives"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-primary-foreground/80">
                          <FileText className="w-4 h-4 shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 md:px-8 bg-secondary/20">
          <div className="container mx-auto max-w-3xl text-center">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-3xl font-heading text-foreground mb-4">
                Need Custom Intelligence?
              </h2>
              <p className="text-muted-foreground mb-8">
                We provide bespoke research and strategic analysis for enterprises navigating complex climate decisions.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/#contact">
                  <Button size="lg">
                    Request a Briefing <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button variant="outline" size="lg">
                    Browse Reports
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
