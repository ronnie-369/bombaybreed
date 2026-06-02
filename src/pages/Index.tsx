import React from 'react';
import PageHead from '@/components/PageHead';
import Header from '@/components/Header';
import ExecutiveHero from '@/components/ExecutiveHero';
import ClientLogoStrip from '@/components/ClientLogoStrip';
import ProofStat from '@/components/ProofStat';
import TrackRecord from '@/components/TrackRecord';
import ServicePillars from '@/components/ServicePillars';
import FeaturedInsight from '@/components/FeaturedInsight';
import SpecialFeatureHighlight from '@/components/SpecialFeatureHighlight';
import DirectContact from '@/components/DirectContact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StickyCtaBar from '@/components/StickyCtaBar';

const Index = () => {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHead
        title="Bombay Breed: Carbon & Energy Transition Communications"
        description="Carbon and energy transition communications as your strategic advantage. Board-level advisory helping Indian enterprises navigate climate complexity with credibility."
        path="/"
        ogImage="og-home"
      />
      <Header />
      <main className="flex-1">
        <ExecutiveHero />
        <ClientLogoStrip />
        <ProofStat />
        <TrackRecord />
        <ServicePillars />
        <SpecialFeatureHighlight />
        <FeaturedInsight />

        {/* Testimonial */}
        <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-[640px] text-center">
            <ScrollReveal direction="up">
              <blockquote className="font-serif text-xl md:text-2xl italic text-foreground leading-relaxed mb-8">
                "Theresa brings a rare combination of deep carbon market expertise and the ability to translate complexity into board-ready strategy. She changed how we think about climate risk."
              </blockquote>
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground font-semibold">Senior Partner</strong>
                <br />
                Leading Management Consultancy, India
              </div>
            </ScrollReveal>
          </div>
        </section>

        <DirectContact />
      </main>
      <Footer />
      <StickyCtaBar />

    </div>
  );
};

export default Index;
