import React from 'react';
import CardNav from '@/components/CardNav';
import ProfileCard from '@/components/ui/profile-card';
import Footer from '@/components/Footer';

const Index = () => {
  const navItems = [
    {
      label: "Carbon Markets & Energy Transition",
      bgColor: "rgba(16, 185, 129, 0.15)",
      textColor: "#10b981",
      links: [
        { label: "Communications", to: "/climate-desk#cxo-companion", ariaLabel: "Climate Communications for CXOs" },
        { label: "Case Studies", to: "/climate-desk#proclime", ariaLabel: "ProClime Case Study" }
      ]
    },
    {
      label: "Leadership Advisory",
      bgColor: "rgba(139, 92, 246, 0.15)",
      textColor: "#8b5cf6",
      links: [
        { label: "Execution Strategy", to: "/business-strategy", ariaLabel: "Business Strategy" },
        { label: "Services", to: "/business-strategy#services", ariaLabel: "Business Services" }
      ]
    },
    {
      label: "Why Us",
      bgColor: "rgba(245, 158, 11, 0.15)",
      textColor: "#f59e0b",
      links: [
        { label: "About", to: "/climate-communications#about", ariaLabel: "About Us" },
        { label: "FAQs", to: "/faq", ariaLabel: "FAQs" }
      ]
    },
    {
      label: "Connect",
      bgColor: "rgba(59, 130, 246, 0.15)",
      textColor: "#3b82f6",
      links: [
        { label: "Contact", to: "/climate-communications#contact", ariaLabel: "Contact Us" },
        { label: "Blog", to: "/climate-communications#blog", ariaLabel: "Blog" },
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
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 pb-16 pt-20">
        <p className="text-lg md:text-xl text-center mb-3 mt-16 text-black animate-fade-in font-semibold">
          Welcome to Bombay Breed Consulting
        </p>
        <p className="text-base md:text-lg text-gray-500 text-center mb-4 tracking-wide">
          We specialise in
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 leading-normal pb-2 shine-text">
          Transforming Strategy into Results
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 text-center max-w-3xl mb-8 tracking-tight">
          good for planet, good for business
        </p>

        {/* Profile Cards Section */}
        <div className="container max-w-5xl mx-auto px-4 scale-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileCard
              avatarUrl="/lovable-uploads/carbon-energy-avatar.jpg"
              name="Carbon & Energy"
              title="Strategic Climate Communications"
              handle="good for planet"
              status="Science, policy, communications."
              contactText="Learn More"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.location.href = '/climate-desk'}
              userInfoBgColor="rgba(16, 185, 129, 0.2)"
            />
            <ProfileCard
              avatarUrl="/lovable-uploads/business-transformation-new.jpg"
              name="Business Transformation"
              title="Increase ROI"
              handle="good for business"
              status="Trusted by Industry Leaders"
              contactText="Learn More"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.location.href = '/business-strategy'}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
