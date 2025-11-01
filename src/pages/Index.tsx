import React from 'react';
import CardNav from '@/components/CardNav';

const Index = () => {
  const navItems = [
    {
      label: "Climate",
      bgColor: "#10b981",
      textColor: "#fff",
      links: [
        { label: "Communications", to: "/climate-communications", ariaLabel: "Climate Communications" },
        { label: "Case Studies", to: "/climate-communications#case-studies", ariaLabel: "Climate Case Studies" }
      ]
    },
    {
      label: "Business",
      bgColor: "#8b5cf6",
      textColor: "#fff",
      links: [
        { label: "Strategy", to: "/business-strategy", ariaLabel: "Business Strategy" },
        { label: "Services", to: "/business-strategy#services", ariaLabel: "Business Services" }
      ]
    },
    {
      label: "Resources",
      bgColor: "#f59e0b",
      textColor: "#fff",
      links: [
        { label: "Blog", to: "/climate-communications#blog", ariaLabel: "Blog" },
        { label: "About", to: "/climate-communications#about", ariaLabel: "About Us" }
      ]
    },
    {
      label: "Connect",
      bgColor: "#ef4444",
      textColor: "#fff",
      links: [
        { label: "Contact", to: "/climate-communications#contact", ariaLabel: "Contact Us" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/saahilmehta/", ariaLabel: "LinkedIn Profile" }
      ]
    }
  ];

  return (
    <div 
      className="min-h-screen bg-black relative"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        backgroundPosition: 'center'
      }}
    >
      <CardNav
        logo="/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png"
        logoAlt="BOMBAY BREED"
        items={navItems}
        ctaText="Get Started"
        ctaLink="/climate-communications#about"
      />
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 via-purple-500 to-purple-600 bg-clip-text text-transparent leading-tight">
          Transforming Strategy into Results
        </h1>
        <p className="text-xl md:text-2xl text-white/80 text-center max-w-3xl">
          Embedded Oversight and KPI-Driven ROI
        </p>
      </div>
    </div>
  );
};

export default Index;
