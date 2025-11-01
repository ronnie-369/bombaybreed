import React from 'react';
import CardNav from '@/components/CardNav';
import BentoGrid from '@/components/BentoGrid';

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
        ctaLink="/climate-communications#contact"
      />
      <BentoGrid />
    </div>
  );
};

export default Index;
