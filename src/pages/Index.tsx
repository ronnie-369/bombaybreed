import React from 'react';
import CardNav from '@/components/CardNav';
import ProfileCard from '@/components/ui/profile-card';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import VideoTestimonials from '@/components/VideoTestimonials';
import AssessmentQuiz from '@/components/tools/AssessmentQuiz';

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
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 pb-8 pt-16 md:pt-20 lg:pt-24">
        <p className="text-base md:text-lg lg:text-xl text-center mb-3 text-black animate-fade-in font-semibold">
          Welcome to Bombay Breed Consulting
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 leading-tight pb-1 shine-text px-2">
          We enable climate, carbon & energy-transition leaders to <span className="text-gradient">communicate, transform and scale</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-3xl mb-3 tracking-wide px-4">
          Serving carbon market intermediaries, energy corporates, and global NGOs
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 text-center max-w-3xl mb-6 md:mb-8 tracking-tight font-medium px-4">
          good for planet, good for business
        </p>

        {/* Profile Cards Section */}
        <div className="container max-w-6xl mx-auto px-4 scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 mt-4 md:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ProfileCard
              avatarUrl="/lovable-uploads/carbon-energy-avatar.jpg"
              name="Carbon & Energy"
              title="Strategic Climate Communications"
              handle="good for planet"
              status="Science. Policy. Communications."
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
              title="Strategy into Results"
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
      
      <VideoTestimonials />
      
      <AssessmentQuiz />
      
      <Footer />
      <StickyCTA variant="contact" />
    </div>
  );
};

export default Index;
