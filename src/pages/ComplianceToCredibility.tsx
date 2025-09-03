import React from 'react';
import Header from '@/components/Header';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Target, Users, Globe, BookOpen } from 'lucide-react';

const ComplianceToCredibility = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-br from-slate-800 via-slate-700 to-black text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
            CXO Strategic Guide
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            From Compliance to Credibility
            <br />
            <span className="text-slate-300">CCTS & CBAM Guide</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto">
            How Indian businesses can turn carbon compliance into trust, market access, and leadership.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">85+ Pages</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">CXO Frameworks</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Case Studies</span>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategic Intelligence</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              The twin forces of India's CCTS and Europe's CBAM are rewriting the rules of global trade. 
              Transform compliance from burden to competitive advantage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "Regulatory Shifts Decoded",
                description: "Deep dive into CCTS and CBAM regulations with sector-specific exposure analysis for Indian exporters."
              },
              {
                icon: TrendingUp,
                title: "Compliance-Grade Communication",
                description: "How strategic storytelling differs from traditional sustainability claims in the new regulatory environment."
              },
              {
                icon: Target,
                title: "CXO Action Framework",
                description: "Immediate steps to safeguard exports, investors, and reputation while building credibility."
              },
              {
                icon: Globe,
                title: "Market Access Strategy",
                description: "Turn carbon compliance into trust, market differentiation, and sustainable competitive advantage."
              }
            ].map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <Card key={index} className="border-l-4 border-l-slate-600 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-slate-600" />
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

      {/* Case Studies & Frameworks */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World Applications</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Sector-specific analysis and case studies showing how leading Indian companies are turning compliance into competitive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                sector: "Steel & Manufacturing",
                companies: ["Tata Steel", "JSW Steel"],
                challenges: ["CBAM exposure", "Carbon intensity reporting", "Supply chain transparency"],
                frameworks: "Emission disclosure protocols"
              },
              {
                sector: "Textiles & Chemicals",
                companies: ["Aditya Birla Group", "Reliance Industries"],
                challenges: ["Scope 3 emissions", "Supplier compliance", "Brand reputation"],
                frameworks: "Credible communication strategies"
              },
              {
                sector: "Automotive",
                companies: ["Maruti Suzuki", "Mahindra Group"],
                challenges: ["EU export requirements", "Battery supply chains", "Lifecycle assessments"],
                frameworks: "Stakeholder engagement models"
              },
              {
                sector: "Power & Energy",
                companies: ["NTPC", "Adani Green"],
                challenges: ["CCTS participation", "Carbon credit monetization", "Regulatory alignment"],
                frameworks: "Market positioning tactics"
              }
            ].map((study, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-700">{study.sector}</CardTitle>
                  <CardDescription className="text-sm font-medium">
                    Featured: {study.companies.join(", ")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-foreground/70">Key Challenges</h4>
                    <ul className="space-y-1">
                      {study.challenges.map((challenge, challengeIndex) => (
                        <li key={challengeIndex} className="flex items-center text-sm">
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mr-2"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-foreground/60">
                      <span className="font-medium">Framework:</span> {study.frameworks}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Essential for Leaders */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Essential for Industry Leaders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "CXOs & Senior Leaders",
                value: "Strategic frameworks for turning compliance into competitive advantage across steel, chemicals, textiles, and automotive sectors.",
                icon: "👔"
              },
              {
                title: "Communications Teams",
                value: "Credible storytelling frameworks that balance regulatory disclosure with brand differentiation.",
                icon: "📢"
              },
              {
                title: "Export-Focused Companies", 
                value: "EU market access strategies, CBAM compliance roadmaps, and stakeholder communication protocols.",
                icon: "🌍"
              },
              {
                title: "Sustainability Leaders",
                value: "CCTS participation strategies, carbon credit monetization, and ESG communication excellence.",
                icon: "🌱"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-slate-700">{item.title}</h3>
                  <p className="text-sm text-foreground/80">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Author Attribution */}
      <section className="py-8 px-4 md:px-8 bg-white">
        <div className="container mx-auto text-center">
          <p className="text-sm text-foreground/60">
            <span className="font-medium">Theresa Ronnie</span> - Strategic communications advisory for the emerging Indian carbon market
          </p>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download the Strategic Guide</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Join 400+ CXOs who've downloaded this comprehensive compliance-to-credibility framework.
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle="From Compliance to Credibility: A CXO Guide to CCTS & CBAM"
            reportDescription="Strategic frameworks to transform carbon compliance into competitive advantage and market leadership"
          />
        </div>
      </section>
    </div>
  );
};

export default ComplianceToCredibility;