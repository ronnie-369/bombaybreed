import React from 'react';
import CardNav from '@/components/CardNav';

const Index = () => {
  const navItems = [
    {
      label: "Carbon Markets & Energy Transition",
      bgColor: "rgba(16, 185, 129, 0.15)",
      textColor: "#10b981",
      links: [
        { label: "Communications", to: "/climate-communications", ariaLabel: "Climate Communications" },
        { label: "Case Studies", to: "/climate-communications#case-studies", ariaLabel: "Climate Case Studies" }
      ]
    },
    {
      label: "Leadership Advisory",
      bgColor: "rgba(139, 92, 246, 0.15)",
      textColor: "#8b5cf6",
      links: [
        { label: "Strategy", to: "/business-strategy", ariaLabel: "Business Strategy" },
        { label: "Services", to: "/business-strategy#services", ariaLabel: "Business Services" }
      ]
    },
    {
      label: "Read more",
      bgColor: "rgba(245, 158, 11, 0.15)",
      textColor: "#f59e0b",
      links: [
        { label: "Blog", to: "/climate-communications#blog", ariaLabel: "Blog" },
        { label: "About", to: "/climate-communications#about", ariaLabel: "About Us" }
      ]
    },
    {
      label: "Connect",
      bgColor: "rgba(59, 130, 246, 0.15)",
      textColor: "#3b82f6",
      links: [
        { label: "Contact", to: "/climate-communications#contact", ariaLabel: "Contact Us" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/saahilmehta/", ariaLabel: "LinkedIn Profile" }
      ]
    }
  ];

  return (
    <div 
      className="min-h-screen bg-white relative"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.15) 1px, transparent 0)',
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
        <p className="text-lg md:text-xl text-gray-600 text-center mb-4">
          Welcome to Bombay Breed Consulting
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 via-purple-500 to-purple-600 bg-clip-text text-transparent leading-snug">
          Transforming Strategy into Results
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 text-center max-w-3xl">
          good for planet, good for business
        </p>
      </div>
    </div>
  );
};

export default Index;
