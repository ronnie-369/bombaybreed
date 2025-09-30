import React from 'react';
import Header from '@/components/Header';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, TrendingUp, Lightbulb } from 'lucide-react';

const GrowthRooms = () => {
  const learnings = [
    {
      icon: Users,
      title: "Collaborative Ecosystems",
      description: "How to build and leverage strategic partnerships for accelerated growth"
    },
    {
      icon: Target,
      title: "Strategic Alignment",
      description: "Framework for aligning business goals with ecosystem opportunities"
    },
    {
      icon: TrendingUp,
      title: "Growth Acceleration",
      description: "Proven methodologies to scale faster through collaborative networks"
    },
    {
      icon: Lightbulb,
      title: "Innovation Through Collaboration",
      description: "Unlock new possibilities through shared knowledge and resources"
    }
  ];

  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-br from-primary via-primary/90 to-accent text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
            Growth Assessment Framework
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Growth Rooms
            <br />
            <span className="text-primary-foreground/80">Accelerate Through Collaboration</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Discover how collaborative business ecosystems drive exponential growth through strategic partnerships and shared knowledge.
          </p>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Insights into building and leveraging collaborative growth ecosystems for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learnings.map((learning, index) => {
              const IconComponent = learning.icon;
              return (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{learning.title}</h3>
                        <p className="text-foreground/80">{learning.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Who This Is For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                audience: "Business Leaders",
                value: "Strategic insights for scaling through collaborative ecosystems",
                icon: "👔"
              },
              {
                audience: "Entrepreneurs",
                value: "Framework for accelerating startup growth through partnerships",
                icon: "🚀"
              },
              {
                audience: "Growth Strategists",
                value: "Methodologies for building and managing business ecosystems",
                icon: "📊"
              },
              {
                audience: "Innovation Teams",
                value: "Collaborative approaches to unlock new market opportunities",
                icon: "💡"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">{item.audience}</h3>
                  <p className="text-sm text-foreground/80">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download Growth Rooms Report</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Get instant access to the complete Growth Rooms framework and assessment guide.
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle="Growth Rooms: Collaborative Business Ecosystem Framework"
            reportDescription="Complete framework for accelerating business growth through collaborative ecosystems"
          />
        </div>
      </section>
    </div>
  );
};

export default GrowthRooms;
