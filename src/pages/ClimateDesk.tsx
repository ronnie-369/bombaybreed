import React from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import StakeholderEcosystemWheel from '@/components/StakeholderEcosystemWheel';
import Endorsements from '@/components/Endorsements';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import ClimateDeskCarousel from '@/components/ClimateDeskCarousel';
import CollapsibleSections from '@/components/CollapsibleSections';
import FloatingInquiryForm from '@/components/FloatingInquiryForm';
import climateDeskHero from '@/assets/climate-desk-hero.png';

const ClimateDesk = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 lg:py-28 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                Welcome to the Climate Desk
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                A strong history of C-suite advisory, Bombay Breed Consulting is the quiet leadership brand leaders depend on. <span className="font-semibold text-gray-800 shine-text">Leadership in carbon markets and energy transition: out of India, for the world</span>
              </p>
            </div>
            
            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src={climateDeskHero} 
                alt="Climate Desk strategic communications and carbon markets expertise" 
                className="rounded-lg shadow-lg object-cover w-full max-w-md lg:max-w-lg animate-fade-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pull sections from existing climate communications page */}
      <ClimateDeskCarousel />
      <CollapsibleSections />
      <About />
      <StakeholderEcosystemWheel />
      <Endorsements />
      <Newsletter />
      <Contact />
      <FloatingInquiryForm />
    </div>
  );
};

export default ClimateDesk;
