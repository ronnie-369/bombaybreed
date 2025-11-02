import React from 'react';
import Header from '@/components/Header';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, Cog, Building2, Lightbulb, Calendar } from 'lucide-react';

const EnergyTransitionPlaybook = () => {
  const discoveries = [
    {
      icon: Zap,
      title: "₹75 Lakh Crore Investment Opportunity",
      description: "India's energy transition presents massive investment opportunities across renewable energy infrastructure, grid modernization, and clean technology deployment."
    },
    {
      icon: Target,
      title: "500 GW Renewable Target by 2030",
      description: "Strategic pathways to achieve India's ambitious renewable energy capacity targets with detailed implementation frameworks."
    },
    {
      icon: Cog,
      title: "Grid Integration Solutions",
      description: "Comprehensive strategies for integrating large-scale renewable energy into India's existing power grid infrastructure."
    },
    {
      icon: Building2,
      title: "Industrial Decarbonization Roadmap",
      description: "Sector-specific strategies for hard-to-abate industries including steel, cement, aluminum, and chemicals."
    }
  ];

  const strategicFrameworks = [
    {
      category: "Policy & Regulation",
      frameworks: ["Renewable Energy Certificates", "Green Hydrogen Mission", "PLI for Solar Manufacturing", "Carbon Border Adjustments"],
      timeline: "2025-2027",
      impact: "Regulatory Foundation"
    },
    {
      category: "Technology Deployment", 
      frameworks: ["Smart Grid Infrastructure", "Energy Storage Systems", "Green Hydrogen Production", "Carbon Capture & Storage"],
      timeline: "2025-2030",
      impact: "Infrastructure Scale-up"
    },
    {
      category: "Financial Mechanisms",
      frameworks: ["Green Bonds", "Blended Finance", "Risk Mitigation Instruments", "Carbon Markets"],
      timeline: "2024-2026",
      impact: "Capital Mobilization"
    },
    {
      category: "Industrial Transformation",
      frameworks: ["Sectoral Roadmaps", "Technology Partnerships", "Skills Development", "Supply Chain Localization"],
      timeline: "2025-2035",
      impact: "Economic Transition"
    }
  ];

  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-br from-orange-700 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
            Strategic Implementation Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            The Energy Transition
            <br />
            <span className="text-orange-200">Playbook for India</span>
          </h1>
          <p className="text-lede mb-8 text-orange-100 max-w-3xl mx-auto">
            Comprehensive strategic frameworks and implementation pathways for India's clean energy transformation and industrial decarbonization.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">September 2025</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Strategic Frameworks</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Implementation Roadmaps</span>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Discover</h2>
            <p className="text-body text-foreground/80 max-w-3xl mx-auto">
              Strategic insights and actionable frameworks for navigating India's energy transition with confidence and clarity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {discoveries.map((discovery, index) => {
              const IconComponent = discovery.icon;
              return (
                <Card key={index} className="border-l-4 border-l-orange-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-xl">{discovery.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 text-card">{discovery.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why This Matters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                audience: "Energy Leaders",
                value: "Strategic roadmaps for renewable energy deployment, grid integration, and technology adoption.",
                icon: "⚡"
              },
              {
                audience: "Investors",
                value: "Market opportunities, risk assessment, and investment frameworks across the energy value chain.",
                icon: "💰"
              },
              {
                audience: "Policymakers",
                value: "Evidence-based policy recommendations and regulatory framework optimization strategies.",
                icon: "🏛️"
              },
              {
                audience: "Industry",
                value: "Sectoral decarbonization pathways and industrial transformation strategies.",
                icon: "🏭"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-body font-semibold mb-3 text-bombay">{item.audience}</h3>
                  <p className="text-card text-foreground/80">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Frameworks */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategic Frameworks</h2>
            <p className="text-body text-foreground/80 max-w-3xl mx-auto">
              Comprehensive implementation frameworks covering policy, technology, finance, and industrial transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strategicFrameworks.map((framework, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-bombay">{framework.category}</CardTitle>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {framework.timeline}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg font-semibold">
                    {framework.impact}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {framework.frameworks.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-card">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
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
            <span className="font-medium">The Climate Desk</span> - Strategic communications advisory for the emerging Indian carbon market
          </p>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Copy Now</h2>
            <p className="text-body text-foreground/80 max-w-2xl mx-auto">
              Join energy leaders and policymakers who are using this playbook to drive India's clean energy transformation.
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle="The Energy Transition Playbook for India"
            reportDescription="Strategic frameworks and implementation pathways for India's clean energy transformation"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EnergyTransitionPlaybook;