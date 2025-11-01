import React from 'react';
import Header from '@/components/Header';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import CaseStudies from '@/components/CaseStudies';
import Value from '@/components/Value';
import About from '@/components/About';
import StakeholderEcosystemWheel from '@/components/StakeholderEcosystemWheel';
import Endorsements from '@/components/Endorsements';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import ClimateDeskCarousel from '@/components/ClimateDeskCarousel';
import WhyClimateDesk from '@/components/WhyClimateDesk';
import ComplianceToCredibilitySection from '@/components/ComplianceToCredibilitySection';

const ClimateDesk = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome to the Climate Desk
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
            A strong history of C-suite advisory, Bombay Breed Consulting is the quiet leadership brand leaders depend on. We are India's only strategic carbon communications advisory and consulting firm.
          </p>
        </div>
      </section>

      {/* Pull sections from existing climate communications page */}
      <ClimateDeskCarousel />
      <WhyClimateDesk />
      <ComplianceToCredibilitySection />
      <Services />
      <Expertise />
      <CaseStudies />
      <Value />
      <About />
      <StakeholderEcosystemWheel />
      <Endorsements />
      <Newsletter />
      <Contact />
    </div>
  );
};

export default ClimateDesk;
