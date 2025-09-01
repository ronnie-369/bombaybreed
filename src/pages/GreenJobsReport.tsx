import React from 'react';
import Header from '@/components/Header';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, MapPin, GraduationCap, DollarSign, Calendar } from 'lucide-react';

const GreenJobsReport = () => {
  const discoveries = [
    {
      icon: Users,
      title: "1 Million Green Jobs by 2030",
      description: "India is projected to create over 1 million new green jobs across renewable energy, sustainable manufacturing, and climate adaptation sectors."
    },
    {
      icon: DollarSign,
      title: "₹2.5-4.2 Lakh Average Salary",
      description: "Green jobs offer competitive compensation with significant growth potential across skill levels and geographies."
    },
    {
      icon: TrendingUp,
      title: "35% Skills Gap Challenge",
      description: "Critical shortage in specialized skills requires immediate action in education and training infrastructure."
    },
    {
      icon: MapPin,
      title: "Regional Hub Development",
      description: "Gujarat, Maharashtra, and Tamil Nadu emerging as green job powerhouses with supporting policy frameworks."
    }
  ];

  const archetypeRoles = [
    {
      category: "Technical Specialists",
      roles: ["Solar Installation Engineer", "Wind Farm Technician", "Battery Storage Analyst", "Carbon Footprint Consultant"],
      salaryRange: "₹3.5-6.2L",
      growth: "45% CAGR"
    },
    {
      category: "Project Management",
      roles: ["Renewable Energy Project Manager", "Sustainability Program Lead", "ESG Compliance Officer"],
      salaryRange: "₹8-15L", 
      growth: "38% CAGR"
    },
    {
      category: "Research & Development",
      roles: ["Clean Technology Researcher", "Environmental Data Scientist", "Green Finance Analyst"],
      salaryRange: "₹6-12L",
      growth: "42% CAGR"
    },
    {
      category: "Operations & Manufacturing",
      roles: ["Green Manufacturing Supervisor", "Waste Management Coordinator", "Circular Economy Specialist"],
      salaryRange: "₹4-8L",
      growth: "33% CAGR"
    }
  ];

  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
            Workforce Outlook 2025–2030
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Green Jobs in India
            <br />
            <span className="text-emerald-200">1 Million by 2030</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto">
            The definitive analysis of India's green workforce transformation, investment patterns, and skills ecosystem development.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">130+ Pages</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">50+ Data Points</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Industry Interviews</span>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Discover</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Deep insights into India's green workforce transformation backed by comprehensive research and industry analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {discoveries.map((discovery, index) => {
              const IconComponent = discovery.icon;
              return (
                <Card key={index} className="border-l-4 border-l-teal-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-teal-600" />
                      </div>
                      <CardTitle className="text-xl">{discovery.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{discovery.description}</p>
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
                audience: "Policymakers",
                value: "Evidence-based insights for workforce development policies and skill building programs.",
                icon: "🏛️"
              },
              {
                audience: "Investors",
                value: "Market sizing, growth projections, and sector-wise investment opportunities in human capital.",
                icon: "💼"
              },
              {
                audience: "Professionals",
                value: "Career pathway mapping, salary benchmarks, and skill development recommendations.",
                icon: "🎯"
              },
              {
                audience: "Educators",
                value: "Curriculum alignment insights and training program effectiveness metrics.",
                icon: "📚"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-bombay">{item.audience}</h3>
                  <p className="text-sm text-foreground/80">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Archetype Roles */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Green Job Archetypes</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Detailed breakdown of emerging roles, compensation ranges, and growth trajectories across India's green economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {archetypeRoles.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-bombay">{category.category}</CardTitle>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      {category.growth}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg font-semibold">
                    {category.salaryRange}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.roles.map((role, roleIndex) => (
                      <li key={roleIndex} className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        {role}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Lead Capture */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Copy Now</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Join 1,200+ professionals who've downloaded this comprehensive workforce analysis.
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle="Green Jobs in India: Workforce and Investment Outlook 2025-2030"
            reportDescription="Complete workforce & investment outlook for India's green economy transformation (2025-2030)"
          />
        </div>
      </section>
    </div>
  );
};

export default GreenJobsReport;