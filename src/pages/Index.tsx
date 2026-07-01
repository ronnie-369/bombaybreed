import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
        {/* Launch announcement: Article 01 of the Europe-India Climate Series */}
        <Link
          to="/series/europe-india/why-europe-melts"
          className="block border-b border-border bg-secondary/40 hover:bg-secondary/70 transition-colors"
          aria-label="Read Article 01 of the Europe-India Climate Series"
        >
          <div className="container mx-auto max-w-[1200px] px-6 md:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex flex-col md:flex-row md:items-baseline gap-x-4 gap-y-1">
              <span className="font-sans uppercase tracking-[0.36em] text-[11px] font-semibold text-accent">
                Just published  /  Climate Series  /  Article 01 of 05
              </span>
              <span className="font-serif text-base md:text-lg text-foreground leading-snug">
                Why Europe melts at 41°C when the Gulf works at 50°C.
              </span>
            </div>
            <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary whitespace-nowrap">
              Read the brief
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </Link>

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
