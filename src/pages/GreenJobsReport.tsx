import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, MapPin, GraduationCap, Building2, Briefcase, Globe, Zap, Target, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const GreenJobsReport = () => {
  const keyFindings = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      stat: "1.1M",
      label: "Solar Jobs by 2030",
      description: "Projected solar workforce aligned with India's 500 GW renewable energy target"
    },
    {
      icon: <Target className="h-6 w-6" />,
      stat: "72%",
      label: "Job-Hunting Intent",
      description: "Professionals planning to seek new roles, signaling a dynamic workforce"
    },
    {
      icon: <Users className="h-6 w-6" />,
      stat: "84%",
      label: "Preparation Gap",
      description: "Candidates feeling unprepared, highlighting critical upskilling needs"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      stat: "500 GW",
      label: "RE Capacity Target",
      description: "India's renewable energy target by 2030 driving massive job creation"
    }
  ];

  const sectors = [
    { name: "Solar Energy", growth: "High", roles: "Project Engineers, Installation Technicians, O&M Specialists" },
    { name: "Wind Energy", growth: "High", roles: "Turbine Engineers, Site Managers, Grid Integration Experts" },
    { name: "Battery Storage", growth: "Very High", roles: "Battery Engineers, Energy Storage Analysts, System Integrators" },
    { name: "Green Hydrogen", growth: "Emerging", roles: "Electrolyzer Engineers, Hydrogen Safety Officers, Process Engineers" },
    { name: "ESG & Sustainability", growth: "High", roles: "ESG Analysts, Sustainability Managers, BRSR Consultants" },
    { name: "Carbon Markets", growth: "High", roles: "Carbon Traders, MRV Specialists, Verification Auditors" }
  ];

  const policyBodies = [
    { abbr: "ILO", name: "International Labour Organization", focus: "Global green jobs standards" },
    { abbr: "MNRE", name: "Ministry of New & Renewable Energy", focus: "RE deployment & workforce" },
    { abbr: "NITI Aayog", name: "National Institution for Transforming India", focus: "Strategic policy planning" },
    { abbr: "SEBI", name: "Securities & Exchange Board of India", focus: "ESG disclosure mandates" },
    { abbr: "BRSR", name: "Business Responsibility & Sustainability Reporting", focus: "Corporate sustainability" },
    { abbr: "MoEFCC", name: "Ministry of Environment, Forest & Climate Change", focus: "Climate policy framework" },
    { abbr: "BEE", name: "Bureau of Energy Efficiency", focus: "Energy efficiency standards" },
    { abbr: "CEEW", name: "Council on Energy, Environment & Water", focus: "Research & insights" },
    { abbr: "IRENA", name: "International Renewable Energy Agency", focus: "Global RE transitions" }
  ];

  const stateOutlook = [
    { state: "Gujarat", specialization: "Solar, Wind, Green Hydrogen", jobPotential: "Very High" },
    { state: "Maharashtra", specialization: "Industrial Decarbonization, ESG", jobPotential: "Very High" },
    { state: "Tamil Nadu", specialization: "Wind, EV Manufacturing", jobPotential: "High" },
    { state: "Rajasthan", specialization: "Solar, Utility-Scale RE", jobPotential: "High" },
    { state: "Karnataka", specialization: "Solar, Tech & ESG Services", jobPotential: "High" }
  ];

  const policyTags = ["ILO", "MNRE", "NITI Aayog", "SEBI", "BRSR", "MoEFCC", "BEE", "CEEW", "IRENA"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 md:px-8 bg-gradient-to-br from-primary via-primary to-accent/30">
        <div className="container mx-auto max-w-5xl">
          <Link to="/resources" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-0">
              Workforce Analysis
            </Badge>
            <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-0">
              January 2026
            </Badge>
          </div>
          
          <h1 className="text-display font-heading tracking-tight mb-6 text-primary-foreground">
            Jobs on the Rise 2026: India Green Jobs Outlook
          </h1>
          
          <p className="text-lede text-primary-foreground/80 max-w-3xl mb-8">
            Comprehensive analysis of India's green jobs landscape aligned with Net-Zero 2070 goals 
            and 500 GW renewable energy targets. AI-driven market transformation meets sustainability alignment.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {policyTags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-primary-foreground/30 text-primary-foreground/90">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button size="lg" variant="secondary" className="gap-2">
            <Download className="h-5 w-5" />
            Download Full Report
          </Button>
        </div>
      </section>

      {/* Key Findings */}
      <section className="py-20 px-6 md:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">Key Findings</p>
            <h2 className="text-section font-heading tracking-tight">Labor Market Transformation</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFindings.map((finding, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                    {finding.icon}
                  </div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">{finding.stat}</div>
                  <div className="font-medium text-foreground mb-2">{finding.label}</div>
                  <p className="text-sm text-muted-foreground">{finding.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Analysis */}
      <section className="py-20 px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">Sector Analysis</p>
              <h2 className="text-section font-heading tracking-tight mb-6">High-Growth Green Sectors</h2>
              <p className="text-muted-foreground mb-8">
                The labor market is undergoing rapid shifts driven by AI adoption and sustainability mandates, 
                creating unprecedented demand for specialized technical and leadership roles across key green sectors.
              </p>
              
              <div className="space-y-4">
                {sectors.map((sector, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-foreground">{sector.name}</h3>
                        <Badge variant={sector.growth === "Very High" ? "default" : sector.growth === "High" ? "secondary" : "outline"}>
                          {sector.growth}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{sector.roles}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">Policy Alignment</p>
              <h2 className="text-section font-heading tracking-tight mb-6">Key Policy Bodies & Frameworks</h2>
              <p className="text-muted-foreground mb-8">
                Understanding the regulatory and institutional landscape is critical for workforce planning 
                and skills development aligned with India's climate commitments.
              </p>
              
              <div className="grid gap-3">
                {policyBodies.map((body, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex-shrink-0 w-20 font-mono text-sm font-medium text-primary">{body.abbr}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{body.name}</div>
                      <div className="text-xs text-muted-foreground">{body.focus}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State-wise Outlook */}
      <section className="py-20 px-6 md:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">Geographic Distribution</p>
            <h2 className="text-section font-heading tracking-tight">State-wise Green Jobs Outlook</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Job creation potential varies by state based on renewable energy resources, industrial base, and policy support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateOutlook.map((state, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{state.state}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-muted-foreground">Job Potential:</span>
                    <Badge variant={state.jobPotential === "Very High" ? "default" : "secondary"}>
                      {state.jobPotential}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Focus Areas: </span>
                    {state.specialization}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Implications */}
      <section className="py-20 px-6 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">Strategic Implications</p>
            <h2 className="text-section font-heading tracking-tight">What This Means for Stakeholders</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">For Employers</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Invest in internal upskilling programs for green technology competencies</p>
                <p>• Partner with technical institutions for talent pipeline development</p>
                <p>• Develop competitive compensation aligned with market benchmarks</p>
                <p>• Create clear career pathways in sustainability roles</p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">For Job Seekers</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Prioritize certifications in solar PV, wind, and ESG frameworks</p>
                <p>• Develop cross-functional skills bridging technical and strategic domains</p>
                <p>• Target high-growth states with strong RE infrastructure</p>
                <p>• Build expertise in regulatory compliance (BRSR, CBAM, CCTS)</p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">For Policymakers</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Scale up skill development programs aligned with RE targets</p>
                <p>• Create incentives for green job creation in manufacturing</p>
                <p>• Establish quality standards for green skills certification</p>
                <p>• Support just transition for workers in fossil fuel sectors</p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">For Investors</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Factor workforce availability into renewable energy project assessments</p>
                <p>• Support companies with strong talent development strategies</p>
                <p>• Track skills gap metrics as ESG investment criteria</p>
                <p>• Invest in skilling infrastructure and ed-tech platforms</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-20 px-6 md:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-section font-heading tracking-tight mb-4">Get Your Copy Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access detailed salary benchmarks, skills gap analysis, and state-wise workforce projections.
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle="Jobs on the Rise 2026: India Green Jobs Outlook"
            reportDescription="Comprehensive analysis of India's green jobs landscape aligned with Net-Zero 2070 goals and 500 GW renewable energy targets."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GreenJobsReport;
