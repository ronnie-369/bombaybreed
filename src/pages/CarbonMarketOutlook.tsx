import React from 'react';
import Header from '@/components/Header';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, BarChart3, Target, Building, Zap } from 'lucide-react';

const CarbonMarketOutlook = () => {
  const marketInsights = [
    {
      icon: DollarSign,
      title: "$1.4B Carbon Trading Market",
      description: "India's carbon credit market projected to reach $1.4 billion by 2030 with strong regulatory support and corporate demand."
    },
    {
      icon: TrendingUp,
      title: "$250B Renewable Deployment",
      description: "Massive renewable energy investments creating unprecedented carbon offset opportunities across wind, solar, and storage."
    },
    {
      icon: Target,
      title: "65% Compliance vs Voluntary Split",
      description: "Regulatory compliance driving 65% of market activity, with voluntary corporate commitments gaining momentum."
    },
    {
      icon: BarChart3,
      title: "42% Annual Growth Rate",
      description: "Sustained growth driven by Net Zero commitments, carbon taxes, and international climate finance flows."
    }
  ];

  const investmentSectors = [
    {
      sector: "Renewable Energy Credits",
      marketSize: "$580M by 2030",
      cagr: "48%",
      keyDrivers: ["Grid parity achievement", "Storage cost decline", "Corporate PPAs"],
      riskLevel: "Low-Medium"
    },
    {
      sector: "Industrial Efficiency",
      marketSize: "$420M by 2030", 
      cagr: "35%",
      keyDrivers: ["PAT scheme expansion", "Energy efficiency mandates", "Technology adoption"],
      riskLevel: "Medium"
    },
    {
      sector: "Forest & Agriculture",
      marketSize: "$280M by 2030",
      cagr: "52%", 
      keyDrivers: ["Afforestation programs", "Sustainable agriculture", "Biodiversity credits"],
      riskLevel: "Medium-High"
    },
    {
      sector: "Transportation",
      marketSize: "$120M by 2030",
      cagr: "67%",
      keyDrivers: ["EV adoption", "Public transport", "Green hydrogen"],
      riskLevel: "High"
    }
  ];

  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
            Investor's Deep Dive 2025–2030
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            India Carbon Market Outlook
            <br />
            <span className="text-cyan-200">$1.4B Opportunity</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Comprehensive analysis of India's carbon markets, investment flows, and regulatory landscape for institutional investors.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">85+ Pages</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Financial Models</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Risk Analysis</span>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Market Intelligence</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Data-driven insights into India's carbon market evolution, pricing dynamics, and institutional investment opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <Card key={index} className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
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

      {/* Investment Sectors */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment Sectors Analysis</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Sector-wise breakdown with market sizing, growth projections, and risk-return profiles for strategic investment decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {investmentSectors.map((sector, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-blue-700">{sector.sector}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        sector.riskLevel === 'Low-Medium' ? 'bg-green-100 text-green-700' :
                        sector.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        sector.riskLevel === 'Medium-High' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {sector.riskLevel} Risk
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <CardDescription className="text-lg font-semibold text-foreground">
                      {sector.marketSize}
                    </CardDescription>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      {sector.cagr} CAGR
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-foreground/70">Key Growth Drivers</h4>
                    <ul className="space-y-1">
                      {sector.keyDrivers.map((driver, driverIndex) => (
                        <li key={driverIndex} className="flex items-center text-sm">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {driver}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters for Investors */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Investors Choose This Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Financial Institutions",
                value: "Portfolio carbon risk assessment, green bond structuring insights, and regulatory compliance frameworks.",
                icon: "🏦"
              },
              {
                title: "Corporate Investors", 
                value: "Carbon offset procurement strategies, supply chain decarbonization costs, and ESG reporting metrics.",
                icon: "🏢"
              },
              {
                title: "Fund Managers",
                value: "Sector allocation models, carbon beta analysis, and climate transition investment themes.",
                icon: "📊"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">{item.title}</h3>
                  <p className="text-sm text-foreground/80">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  TR
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Theresa Ronnie</h3>
                  <p className="text-blue-700 font-semibold mb-4">Carbon Markets & Climate Finance Expert</p>
                  <p className="text-foreground/80 leading-relaxed">
                    Former investment banker turned sustainability strategist, Theresa has structured over $2B in 
                    green finance transactions. She advises institutional investors on carbon market strategies and 
                    has been instrumental in developing India's voluntary carbon market frameworks. Her analysis 
                    combines deep financial expertise with on-ground market intelligence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Access the Full Analysis</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Join 800+ institutional investors accessing our comprehensive carbon market intelligence.
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle="India Carbon Market Outlook 2025-2030: An Investor's Deep Dive"
            reportDescription="Complete investor's guide to India's $1.4B carbon market opportunity with financial models and risk analysis (2025-2030)"
          />
        </div>
      </section>
    </div>
  );
};

export default CarbonMarketOutlook;