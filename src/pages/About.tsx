import React from 'react';
import PageHead from '@/components/PageHead';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, LinkedinIcon } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import theresaPortrait from '@/assets/theresa-portrait.jpg';

// Import client logos - max 7
import microsoftLogo from '@/assets/client-logos/microsoft.png';
import kpmgLogo from '@/assets/client-logos/kpmg.png';
import fordLogo from '@/assets/client-logos/ford.png';
import volkswagenLogo from '@/assets/client-logos/volkswagen.png';
import itcLogo from '@/assets/client-logos/itc.jpg';
import apolloLogo from '@/assets/client-logos/apollo-hospitals.png';
import petronasLogo from '@/assets/client-logos/petronas.png';

const clientLogos = [
  { src: microsoftLogo, alt: 'Microsoft India' },
  { src: kpmgLogo, alt: 'KPMG India' },
  { src: fordLogo, alt: 'Ford Motor Co' },
  { src: volkswagenLogo, alt: 'Volkswagen Malaysia' },
  { src: itcLogo, alt: 'ITC Foods' },
  { src: apolloLogo, alt: 'Apollo Hospitals' },
  { src: petronasLogo, alt: 'PETRONAS' },
];

const testimonials = [
  {
    quote: "Landing strategy, delivering creative excellence, and driving business growth - it's a rare combination. Theresa brings all three with a sharp mind and an energy that makes even the toughest boardroom conversations productive.",
    author: "CEO",
    company: "ITC Foods"
  },
  {
    quote: "Theresa is a powerhouse of talent and discipline. She brings razor focus to our industry and steers teams towards accountability and high integrity. She is systems thinking and strategic in her approach.",
    author: "CEO",
    company: "ProClime"
  },
  {
    quote: "A razor sharp mind, an insatiable appetite for learning, deep knowledge of diverse fields including business, strategy, marketing, communication, technology and consumers - an asset to whichever team she belongs.",
    author: "CMO",
    company: "United Breweries"
  }
];

const milestones = [
  { year: "2012", event: "First Fortune 500 client advisory" },
  { year: "2020", event: "Founded Bombay Breed" },
  { year: "2023", event: "Carbon Markets Advisory" },
  { year: "2025", event: "The Climate Desk" },
];

const About = () => {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHead
        title="Bombay Breed: About Theresa Ronnie"
        description="Founded by Theresa Ronnie, Bombay Breed is India's only strategic carbon communications advisory. 18+ years of C-suite experience in sustainability, ESG, and climate strategy."
        path="/about"
        ogType="profile"
        ogImage="og-about"
      />
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Narrative Hero */}
        <section className="pt-16 pb-20 md:pt-20 md:pb-28 px-6 md:px-8">
          <div className="container mx-auto max-w-[680px]">
            <ScrollReveal direction="up">
              <SectionLabel number="01" label="About" />
              <h1 className="text-display font-serif tracking-tight mt-6 mb-8">
                Why This Advisory Exists
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={1}>
              <div className="space-y-5 text-foreground/80 text-body-enhanced">
                <p>
                  I saw a gap no one was filling. Climate consultancies speak in technical jargon. 
                  Communications agencies lack carbon market expertise. Indian enterprises need advisors 
                  who understand both worlds - and can translate between them at the board level.
                </p>
                <p>
                  Sustainability communications is not a compliance checkbox. It's a strategic function. 
                  The companies that will thrive in the energy transition are those that can articulate their 
                  climate strategy credibly, engage stakeholders authentically, and turn sustainability into 
                  competitive advantage.
                </p>
                <p>
                  That's what I built Bombay Breed to do - bridge the gap between climate expertise 
                  and C-suite communication, specifically for Indian enterprises navigating carbon markets, 
                  ESG governance, and the energy transition.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Portrait - editorial treatment */}
        <section className="px-6 md:px-8 pb-20 md:pb-28">
          <div className="container mx-auto max-w-[480px]">
            <ScrollReveal direction="up">
              <div className="relative bg-muted rounded-lg overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <img 
                    src={theresaPortrait}
                    alt="Theresa Ronnie, Strategic Carbon Communications Advisor"
                    className="w-full h-full object-cover object-top saturate-[0.85]"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Bio Section */}
        <section className="pb-20 md:pb-28 px-6 md:px-8">
          <div className="container mx-auto max-w-[680px]">
            <ScrollReveal direction="up">
              <SectionLabel number="02" label="Theresa Ronnie" />
              <h2 className="text-section font-serif tracking-tight mt-6 mb-4">
                Founder & Principal Advisor
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Theresa has been a steady yet dynamic influence with CEOs and CXOs for over a decade. 
                  She has led advertising agencies, consulted with KPMG India, worked with the senior 
                  leadership at Microsoft India, before shifting her focus to Climate Action.
                </p>
                <p>
                  Possessing an easy-going yet highly professional demeanour, Theresa brings bottom-line 
                  impact and effectiveness metrics to board-level oversight. She is a student of climate 
                  sciences, mythology, socio-cultural behavioural economics, and an active investor in the stock market.
                </p>
              </div>
            </ScrollReveal>

            {/* Experience Stats */}
            <ScrollReveal direction="up" delay={1}>
              <div className="grid grid-cols-3 gap-4 mt-10 py-8 border-t border-b border-border/50">
                <div className="text-center">
                  <p className="text-3xl font-serif font-bold text-primary">18+</p>
                  <p className="text-xs text-muted-foreground mt-1">Years Strategic Communications</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-serif font-bold text-primary">11+</p>
                  <p className="text-xs text-muted-foreground mt-1">Years C-Suite Advisory</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-serif font-bold text-primary">10K+</p>
                  <p className="text-xs text-muted-foreground mt-1">Hours Carbon Markets</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={2}>
              <div className="flex gap-4 mt-8">
                <Button asChild variant="outline">
                  <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="h-4 w-4 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Milestone Timeline */}
        <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal direction="up">
              <SectionLabel number="03" label="Journey" className="text-center block" />
              <div className="mt-10">
                {/* Desktop: horizontal */}
                <div className="hidden md:flex items-start justify-between relative">
                  <div className="absolute top-3 left-0 right-0 h-px bg-border" />
                  {milestones.map((m, i) => (
                    <div key={i} className="relative flex flex-col items-center text-center max-w-[140px]">
                      <div className="w-2 h-2 rounded-full bg-accent mb-4 relative z-10" />
                      <p className="text-sm font-semibold text-foreground">{m.year}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.event}</p>
                    </div>
                  ))}
                </div>
                {/* Mobile: vertical */}
                <div className="md:hidden space-y-6 border-l border-border pl-6 ml-2">
                  {milestones.map((m, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-accent" />
                      <p className="text-sm font-semibold text-foreground">{m.year}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Client Logos - max 7, no header */}
        <section className="py-16 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal direction="up">
              <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
                {clientLogos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 md:h-10 object-contain grayscale opacity-30 hover:grayscale-0 hover:opacity-80 transition-all duration-300"
                    loading="lazy"
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-[680px]">
            <ScrollReveal direction="up">
              <SectionLabel number="04" label="What Leaders Say" className="text-center block" />
            </ScrollReveal>
            <div className="mt-10 space-y-16">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={index} direction="up" delay={Math.min(index, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
                  <blockquote className="text-center">
                    <p className="font-serif text-xl md:text-2xl italic text-foreground/80 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <footer className="mt-4 text-sm text-muted-foreground">
                      - {testimonial.author}, {testimonial.company}
                    </footer>
                  </blockquote>
                </ScrollReveal>
              ))}
              {/* Erik Solheim */}
              <ScrollReveal direction="up" delay={3}>
                <blockquote className="text-center">
                  <p className="font-serif text-xl md:text-2xl italic text-foreground/80 leading-relaxed">
                    "The most trustworthy person on the Subcontinent"
                  </p>
                  <footer className="mt-4 text-sm text-muted-foreground">
                    - Erik Solheim
                  </footer>
                </blockquote>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-3xl text-center">
            <ScrollReveal direction="up">
              <h2 className="text-section font-serif tracking-tight mb-4">
                Ready to build a credible carbon strategy for your board?
              </h2>
              <Link to="/#contact">
                <Button size="lg" className="mt-4">
                  Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
