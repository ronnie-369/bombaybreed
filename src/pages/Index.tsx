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
        <img 
          src="/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png"
          alt="BOMBAY BREED"
          className="w-48 h-48 md:w-64 md:h-64 object-contain mb-8 opacity-90 hover:opacity-100 transition-opacity"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
          BOMBAY BREED
        </h1>
      </div>
    </div>
  );
};

export default Index;
