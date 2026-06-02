import React, { useState } from 'react';
import { Download, FileText, Users, TrendingUp, Briefcase, Target, Globe, Zap, Battery, Car, Leaf, Calculator, LinkedinIcon, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const GreenJobsReport = () => {
  const [showFullReport, setShowFullReport] = useState(false);

  const discoveries = [
    {
      icon: Users,
      title: "Workforce Projections",
      description: "1M+ direct jobs by 2030, spanning solar, wind, EV, storage, and hydrogen.",
      detail: "3.2M total employment impact including supply chains and induced jobs."
    },
    {
      icon: TrendingUp,
      title: "Investment Outlook",
      description: "$250B in capital deployment (2025–2030).",
      detail: "Sector CAGR of 12–14%, with subsectors like green hydrogen (30%) and carbon markets (28%) leading the charge."
    },
    {
      icon: Briefcase,
      title: "Career Pathways",
      description: "From solar installers and wind technicians to climate-tech developers and carbon auditors.",
      detail: "The report spotlights six archetype roles defining India's renewable future."
    },
    {
      icon: Target,
      title: "Training ROI",
      description: "Vocational training in solar or wind pays back within 12–18 months.",
      detail: "Career transitions from 'grey' industries to 'green' roles deliver 15–25% salary jumps."
    },
    {
      icon: Globe,
      title: "Inclusion & Just Transition",
      description: "Women's participation projected to rise from 18% to nearly 30% by 2030.",
      detail: "Coal-dependent states like Jharkhand and Odisha set to pivot towards green employment."
    }
  ];

  const audiences = [
    {
      title: "For Policymakers",
      description: "Plan effective skill-building, inclusion programs, and just transition strategies.",
      icon: Target
    },
    {
      title: "For Investors",
      description: "Identify high-growth subsectors and risk-mitigation strategies in India's $250B renewable economy.",
      icon: TrendingUp
    },
    {
      title: "For Professionals & Students",
      description: "Discover career pathways, salary trajectories, and training programs in India's green workforce.",
      icon: Briefcase
    }
  ];

  const archetypeRoles = [
    {
      title: "Solar Installer",
      description: "Community dignity and entrepreneurial potential.",
      icon: Zap,
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
      title: "Wind Technician",
      description: "Adventure and global mobility.",
      icon: Globe,
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "EV Infrastructure Manager",
      description: "Prestige in India's urban transition.",
      icon: Car,
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Climate-Tech Developer",
      description: "High-paying roles with global impact.",
      icon: Battery,
      gradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      title: "RE Ambassador",
      description: "Community empowerment, especially for women.",
      icon: Users,
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      title: "Carbon Auditor",
      description: "Compliance backbone and market prestige.",
      icon: Calculator,
      gradient: "from-gray-500/20 to-slate-500/20"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-bombay-background/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-bombay-subtle text-bombay px-4 py-2">
            Green Jobs in India: Workforce & Investment Outlook (2025–2030)
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            India's Green Economy: <span className="text-bombay">1 Million Jobs by 2030</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            The future of work is green. Theresa Ronnie's latest report reveals how India's renewable energy revolution will generate over 1 million jobs, attract $250B in capital, and reshape industries from solar to hydrogen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-bombay hover:bg-bombay/90 text-white px-8 py-4 text-lg"
              onClick={() => setShowFullReport(true)}
            >
              <Download className="mr-2 h-5 w-5" />
              Preview Report
            </Button>
            <Dialog open={showFullReport} onOpenChange={setShowFullReport}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-bombay text-bombay hover:bg-bombay/10 px-8 py-4 text-lg"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Full Landing Page Copy
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-4">Green Jobs in India: Workforce & Investment Outlook 2025–2030</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Introduction</h3>
                    <p className="text-foreground/80 leading-relaxed">
                      India is at the tipping point of a green revolution. By 2030, renewable energy will not only power our homes and cities but also fuel a workforce transformation of historic scale - with 1 million direct green jobs and over 3.2 million total employment opportunities across the economy.
                    </p>
                    <p className="text-foreground/80 leading-relaxed mt-4">
                      This in-depth report by Theresa Ronnie maps the workforce and investment pathways shaping India's clean energy future. Whether you're an investor, policymaker, student, or professional, this report offers the insights you need to understand where opportunity is headed.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {discoveries.map((item, index) => (
                      <Card key={index} className="border-bombay-subtle/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <item.icon className="h-5 w-5 text-bombay" />
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-foreground/80 mb-2">{item.description}</p>
                          <p className="text-sm text-foreground/70">{item.detail}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button className="bg-bombay hover:bg-bombay/90 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download the Full Report
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* What You'll Discover Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            What You'll Discover
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discoveries.map((item, index) => (
              <Card key={index} className="border-bombay-subtle/20 hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 rounded-lg bg-bombay-subtle">
                      <item.icon className="h-5 w-5 text-bombay" />
                    </div>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 mb-3">{item.description}</p>
                  <p className="text-sm text-foreground/70">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why This Matters Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why This Matters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audiences.map((audience, index) => (
              <Card key={index} className="border-bombay-subtle/20 text-center hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full bg-bombay-subtle w-fit mb-4">
                    <audience.icon className="h-6 w-6 text-bombay" />
                  </div>
                  <CardTitle className="text-xl">{audience.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{audience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Archetype Roles Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Archetype Roles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archetypeRoles.map((role, index) => (
              <Card key={index} className={`border-bombay-subtle/20 hover:shadow-lg transition-all animate-fade-in bg-gradient-to-br ${role.gradient}`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <role.icon className="h-5 w-5 text-bombay" />
                    {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About the Author Section */}
        <div className="mb-16">
          <Card className="border-bombay-subtle/20 max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">About the Author</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <h4 className="text-xl font-semibold mb-4 text-bombay">Theresa Ronnie</h4>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                Writer, strategist, and climate commentator. Her work translates climate imperatives into economic opportunities, bridging policy, investment, and workforce transformation. She is the curator of The Climate Desk and a partner at Bombay Breed Consulting.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm" className="border-bombay text-bombay hover:bg-bombay/10">
                  <LinkedinIcon className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="border-bombay text-bombay hover:bg-bombay/10">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Substack
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final Download CTA */}
        <Card className="border-bombay bg-gradient-to-r from-bombay-subtle/20 to-bombay-background/30 text-center p-8">
          <CardContent className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              India's renewable future is here. Don't just watch it happen - understand it, shape it, and benefit from it.
            </h3>
            <Button 
              size="lg" 
              className="bg-bombay hover:bg-bombay/90 text-white px-8 py-4 text-lg"
              onClick={() => setShowFullReport(true)}
            >
              <Download className="mr-2 h-5 w-5" />
              Download the Report: Green Jobs in India 2025–2030
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GreenJobsReport;