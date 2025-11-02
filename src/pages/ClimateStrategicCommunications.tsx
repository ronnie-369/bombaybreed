import React from 'react';
import Header from '@/components/Header';
import ClimateHero from '@/components/ClimateHero';
import DifferentiationBanner from '@/components/DifferentiationBanner';
import WhyDifferent from '@/components/WhyDifferent';
import ReportsCarousel from '@/components/ReportsCarousel';
import ComplianceToCredibilitySection from '@/components/ComplianceToCredibilitySection';
import Services from '@/components/Services';
import CTABanner from '@/components/CTABanner';
import Expertise from '@/components/Expertise';
import CaseStudies from '@/components/CaseStudies';
import TrustSignals from '@/components/TrustSignals';
import Value from '@/components/Value';
import About from '@/components/About';
import StakeholderEcosystemWheel from '@/components/StakeholderEcosystemWheel';
import Endorsements from '@/components/Endorsements';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import StickyCTA from '@/components/StickyCTA';
import VideoSection from '@/components/VideoSection';
import VideoTestimonials from '@/components/VideoTestimonials';
import Footer from '@/components/Footer';

const ClimateStrategicCommunications = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      <ClimateHero />
      <DifferentiationBanner />
      <WhyDifferent />
      <ReportsCarousel />
      <ComplianceToCredibilitySection />
      <Services id="services" />
      <CTABanner variant="services" />
      <Expertise />
      <CTABanner variant="expertise" />
      <CaseStudies />
      <TrustSignals />
      <CTABanner variant="case-studies" />
      
      <VideoSection
        videoId="dQw4w9WgXcQ"
        provider="youtube"
        title="How We Help Climate Leaders Cut Through the Noise"
        subtitle="Our Approach"
        description="Watch how we transform complex climate commitments into clear, credible narratives that resonate with your stakeholders."
        benefits={[
          'Evidence-based messaging that stands up to scrutiny',
          'Strategic positioning that differentiates from competitors',
          'Clear communication frameworks for all audiences'
        ]}
        ctaText="Start Your Transformation"
        ctaLink="#contact"
        layout="left"
      />
      
      <Value />
      <About />
      <StakeholderEcosystemWheel />
      <VideoTestimonials />
      <Endorsements />
      <Newsletter id="newsletter" />
      <Contact />
      <Footer />
      <StickyCTA variant="download" />
    </div>
  );
};

export default ClimateStrategicCommunications;
