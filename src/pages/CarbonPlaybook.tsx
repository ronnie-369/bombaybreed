import React from 'react';
import Header from '@/components/Header';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Globe, Scale, BookOpen, Shield, Lightbulb } from 'lucide-react';

const CarbonPlaybook = () => {
  const policyInsights = [
    {
      icon: BookOpen,
      title: "PAT Scheme Evolution",
      description: "Comprehensive analysis of India's Perform, Achieve & Trade mechanism - lessons learned and future expansion plans."
    },
    {
      icon: Shield,
      title: "CCTS Rules Decoded",
      description: "Plain English explanation of Carbon Credit Trading Scheme regulations, compliance requirements, and implementation timeline."
    },
    {
      icon: Globe,
      title: "Article 6 Opportunity",
      description: "India's strategic positioning in international carbon markets and bilateral cooperation mechanisms under Paris Agreement."
    },
    {
      icon: Scale,
      title: "Regulatory Roadmap",
      description: "Policy timeline, institutional frameworks, and regulatory convergence across central and state governments."
    }
  ];

  const policyFrameworks = [
    {
      framework: "PAT Mechanism Analysis",
      coverage: "Energy-intensive industries",
      status: "Operational since 2012",
      keyLessons: ["Baseline methodology", "Banking & borrowing", "Price discovery mechanisms"],
      futureScope: "Expansion to new sectors"
    },
    {
      framework: "CCTS Implementation",
      coverage: "All sectors (voluntary)",
      status: "Draft rules published 2023",
      keyLessons: ["Registry system", "Verification protocols", "Market infrastructure"],
      futureScope: "Mandatory compliance phases"
    },
    {
      framework: "Article 6 Readiness",
      coverage: "International cooperation",
      status: "Framework under development", 
      keyLessons: ["Corresponding adjustments", "Sustainable development", "Governance structures"],
      futureScope: "Bilateral agreements"
    },
    {
      framework: "State-level Initiatives",
      coverage: "Subnational programs",
      status: "Various stages",
      keyLessons: ["Policy coordination", "Implementation challenges", "Capacity building"],
      futureScope: "Harmonization efforts"
    }
  ];

  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
            Policy Analysis & Implementation Guide
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            India's Carbon Playbook
            <br />
            <span className="text-indigo-200">CCTS & Article 6</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            Strategic policy guide covering PAT lessons, CCTS implementation roadmap, and India's Article 6 opportunity framework.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">95+ Pages</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Policy Timeline</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Implementation Guide</span>
          </div>
        </div>
      </section>

      {/* Policy Insights */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Policy Intelligence</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Deep analysis of India's carbon policy evolution, regulatory frameworks, and international cooperation mechanisms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policyInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <Card key={index} className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl">{insight.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{insight.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policy Frameworks */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Regulatory Framework Analysis</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Comprehensive breakdown of India's carbon policy architecture, implementation status, and future development roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {policyFrameworks.map((framework, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-purple-700">{framework.framework}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        framework.status.includes('Operational') ? 'bg-green-100 text-green-700' :
                        framework.status.includes('published') ? 'bg-blue-100 text-blue-700' :
                        framework.status.includes('development') ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {framework.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm font-medium">
                    Coverage: {framework.coverage}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-foreground/70">Key Policy Lessons</h4>
                    <ul className="space-y-1">
                      {framework.keyLessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center text-sm">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-foreground/60">
                      <span className="font-medium">Future Direction:</span> {framework.futureScope}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters for Policy Stakeholders */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Essential for Policy Stakeholders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Policymakers",
                value: "Evidence-based policy design insights, implementation best practices, and regulatory harmonization frameworks.",
                icon: "🏛️"
              },
              {
                title: "Regulators",
                value: "Technical specifications, monitoring protocols, and international standards alignment for robust market infrastructure.",
                icon: "⚖️"
              },
              {
                title: "Think Tanks",
                value: "Policy analysis methodologies, comparative studies, and research frameworks for carbon market evaluation.",
                icon: "🧠"
              },
              {
                title: "Legal Advisors",
                value: "Regulatory interpretation guides, compliance frameworks, and international law implications for carbon trading.",
                icon: "📋"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">{item.title}</h3>
                  <p className="text-sm text-foreground/80">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CCTS Explained Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">CCTS in Plain English</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Breaking down complex carbon market regulations into actionable insights for policy implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "What is CCTS?",
                content: "India's Carbon Credit Trading Scheme - a market mechanism allowing companies to trade carbon credits generated from emission reduction projects."
              },
              {
                title: "How does it work?",
                content: "Projects generate credits through verified emission reductions, which can be sold to companies needing to offset their carbon footprint."
              },
              {
                title: "Why does it matter?",
                content: "Creates economic incentives for emission reductions while providing flexibility for companies to meet climate commitments cost-effectively."
              }
            ].map((item, index) => (
              <Card key={index} className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 text-sm">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Lead Capture */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download the Policy Guide</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Join 600+ policy professionals accessing India's most comprehensive carbon policy analysis.
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle="India's Carbon Playbook"
            reportDescription="Complete policy guide covering PAT lessons, CCTS implementation roadmap, and Article 6 opportunity framework (2025-2030)"
          />
        </div>
      </section>
    </div>
  );
};

export default CarbonPlaybook;