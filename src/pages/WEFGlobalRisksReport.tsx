import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Globe, TrendingDown, Shield, Zap, Scale, Building2, Leaf } from 'lucide-react';

const WEFGlobalRisksReport = () => {
  const keyFindings = [
    {
      icon: AlertTriangle,
      title: "Polycrisis Acceleration",
      description: "The 2026 report reveals how interconnected global risks—climate, geopolitical, economic—are amplifying each other at unprecedented speed, creating systemic vulnerability."
    },
    {
      icon: Globe,
      title: "Climate Risk Repricing",
      description: "Physical climate risks and transition risks are converging faster than models predicted. Asset repricing is accelerating across energy, real estate, and infrastructure sectors."
    },
    {
      icon: TrendingDown,
      title: "Supply Chain Fragmentation",
      description: "Geopolitical realignment is driving supply chain restructuring. Critical mineral dependencies and manufacturing concentration create new vulnerability hotspots."
    },
    {
      icon: Shield,
      title: "Regulatory Divergence",
      description: "Climate policy fragmentation between major economies creates compliance complexity and carbon leakage risks for multinational corporates."
    }
  ];

  const riskDomains = [
    {
      category: "Environmental Risks",
      icon: Leaf,
      risks: ["Extreme weather intensification", "Biodiversity collapse acceleration", "Water stress & food security", "Critical ecosystem tipping points"],
      timeframe: "Immediate to 2030",
      color: "emerald"
    },
    {
      category: "Geopolitical Risks",
      icon: Globe,
      risks: ["Trade bloc fragmentation", "Resource nationalism surge", "Technology decoupling", "Climate migration pressures"],
      timeframe: "2025-2030",
      color: "blue"
    },
    {
      category: "Economic Risks",
      icon: TrendingDown,
      risks: ["Stranded asset crystallization", "Carbon pricing volatility", "Green transition financing gaps", "Inflation & stagflation cycles"],
      timeframe: "2025-2028",
      color: "amber"
    },
    {
      category: "Societal Risks",
      icon: Building2,
      risks: ["Just transition failures", "Skills gap widening", "Social license erosion", "Inequality amplification"],
      timeframe: "Ongoing",
      color: "purple"
    }
  ];

  const strategicImplications = [
    {
      audience: "Board Directors",
      value: "Governance frameworks for systemic risk oversight, scenario stress-testing protocols, and fiduciary duty evolution in the polycrisis era.",
      icon: "🏛️"
    },
    {
      audience: "Chief Risk Officers",
      value: "Integrated risk modeling approaches, tail risk quantification, and enterprise resilience frameworks for interconnected threats.",
      icon: "⚠️"
    },
    {
      audience: "Sustainability Leads",
      value: "Double materiality assessment methodologies, stakeholder pressure mapping, and climate disclosure strategy under regulatory fragmentation.",
      icon: "🌍"
    },
    {
      audience: "Strategy Teams",
      value: "Scenario planning frameworks, strategic optionality building, and competitive positioning for accelerated transition pathways.",
      icon: "🎯"
    }
  ];

  const davosInsights = [
    {
      stat: "87%",
      label: "of CEOs expect significant business model disruption from climate risks by 2030"
    },
    {
      stat: "3.2°C",
      label: "current trajectory vs. 1.5°C Paris target—the gap is widening, not closing"
    },
    {
      stat: "$4.7T",
      label: "annual investment gap for net-zero transition in emerging markets"
    },
    {
      stat: "62%",
      label: "of global GDP now covered by net-zero commitments, but implementation lags"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-3 mb-6">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              WEF Analysis
            </Badge>
            <Badge className="bg-blue-500/30 text-blue-100 border-blue-400/30 px-4 py-2">
              Davos 2026
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            WEF Global Risks Report 2026
            <br />
            <span className="text-blue-300">Strategic Analysis for Climate Leaders</span>
          </h1>
          <p className="text-lede mb-8 text-slate-200 max-w-3xl mx-auto">
            Bombay Breed's executive interpretation of the World Economic Forum's flagship risk report—connecting global systemic risks to corporate strategy and climate action priorities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">January 2026</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Davos Insights</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Executive Briefing</span>
          </div>
        </div>
      </section>

      {/* Davos Stats Bar */}
      <section className="py-12 px-4 md:px-8 bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {davosInsights.map((insight, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {insight.stat}
                </div>
                <p className="text-sm text-slate-300">{insight.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Findings</h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              Our analysis distills the WEF report's critical insights for climate-focused decision makers in emerging markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {keyFindings.map((finding, index) => {
              const IconComponent = finding.icon;
              return (
                <Card key={index} className="border-l-4 border-l-blue-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{finding.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{finding.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Risk Domains */}
      <section className="py-20 px-4 md:px-8 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">2026 Risk Landscape</h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              Interconnected risk domains requiring integrated strategic response from corporate leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {riskDomains.map((domain, index) => {
              const IconComponent = domain.icon;
              const colorClasses = {
                emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200",
                blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 border-blue-200",
                amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 border-amber-200",
                purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 border-purple-200"
              };
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${colorClasses[domain.color as keyof typeof colorClasses]}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-xl">{domain.category}</CardTitle>
                      </div>
                      <Badge variant="secondary">
                        {domain.timeframe}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {domain.risks.map((risk, riskIndex) => (
                        <li key={riskIndex} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Implications */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Strategic Implications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strategicImplications.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-3">{item.audience}</h3>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* India & Emerging Markets Focus */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Emerging Markets Focus</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                India's Position in the 2026 Risk Matrix
              </h2>
              <p className="text-muted-foreground mb-6">
                The WEF report highlights India's unique position: simultaneously exposed to climate physical risks while positioned to capture significant transition opportunities. Our analysis examines:
              </p>
              <ul className="space-y-3">
                {[
                  "CBAM and carbon border adjustment exposure for Indian exporters",
                  "Critical mineral supply chain dependencies and strategic positioning",
                  "Climate finance flows and green bond market development",
                  "Just transition imperatives for coal-dependent regions",
                  "Manufacturing competitiveness under carbon pricing scenarios"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Zap className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-lg border">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                India Risk-Opportunity Balance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Climate Physical Risk Exposure</span>
                    <span className="text-amber-600 font-medium">High</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[75%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Transition Opportunity</span>
                    <span className="text-emerald-600 font-medium">Very High</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Policy Readiness</span>
                    <span className="text-blue-600 font-medium">Moderate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[55%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Capital Availability</span>
                    <span className="text-purple-600 font-medium">Growing</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[60%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Attribution */}
      <section className="py-8 px-4 md:px-8 bg-background">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Bombay Breed Analysis</span> — Strategic interpretation of WEF Global Risks Report 2026 for climate-focused decision makers
          </p>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download the Executive Briefing</h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Get our complete analysis of the WEF Global Risks Report 2026 with actionable insights for climate strategy.
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle="WEF Global Risks Report 2026: Climate & Geopolitical Volatility"
            reportDescription="Bombay Breed executive analysis of the World Economic Forum's Global Risks Report 2026 for corporate climate strategists"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WEFGlobalRisksReport;