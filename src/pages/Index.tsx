import React, { useEffect } from 'react';
import { setOGMeta } from '@/utils/og-meta';
import Header from '@/components/Header';
import ExecutiveHero from '@/components/ExecutiveHero';
import ClientLogoStrip from '@/components/ClientLogoStrip';
import ProofStat from '@/components/ProofStat';
import ServicePillars from '@/components/ServicePillars';
import FeaturedInsight from '@/components/FeaturedInsight';
import SpecialFeatureHighlight from '@/components/SpecialFeatureHighlight';
import DirectContact from '@/components/DirectContact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StickyCtaBar from '@/components/StickyCtaBar';

const Index = () => {
  useEffect(() => {
    document.title = "Bombay Breed: Strategic Carbon Advisory for Indian Boards";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "I ensure climate transition strategy is credible, compliant, and investable in India. Strategic advisor to CEOs & boards including Microsoft, KPMG India, Ford & Volkswagen.");
    }
    const cleanup = setOGMeta({
      title: 'Bombay Breed: Strategic Carbon Advisory for Indian Boards',
      description: 'I ensure climate transition strategy is credible, compliant, and investable in India.',
      image: 'https://bombaybreed.com/og/og-home.png',
      url: 'https://bombaybreed.com/',
    });
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <ExecutiveHero />
      <ClientLogoStrip />
      <ProofStat />
      <ServicePillars />
      <FeaturedInsight />
      <SpecialFeatureHighlight />

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
      <Footer />
      <StickyCtaBar />
    </div>
  );
};

export default Index;
