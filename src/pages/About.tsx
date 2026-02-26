import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, LinkedinIcon, Check, Quote } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Import client logos
import itcLogo from '@/assets/client-logos/itc.jpg';
import fordLogo from '@/assets/client-logos/ford.png';
import cetfiLogo from '@/assets/client-logos/cetfi.jpg';
import machaniLogo from '@/assets/client-logos/machani.png';
import petronasLogo from '@/assets/client-logos/petronas.png';
import microsoftLogo from '@/assets/client-logos/microsoft.png';
import kpmgLogo from '@/assets/client-logos/kpmg.png';
import quessLogo from '@/assets/client-logos/quess.png';
import ubLogo from '@/assets/client-logos/united-breweries.png';
import proclimeLogo from '@/assets/client-logos/proclime.jpg';
import volkswagenLogo from '@/assets/client-logos/volkswagen.png';
import publicisLogo from '@/assets/client-logos/publicis.png';
import swatchLogo from '@/assets/client-logos/swatch.png';
import gh2IndiaLogo from '@/assets/client-logos/gh2-india.png';
import apolloLogo from '@/assets/client-logos/apollo-hospitals.png';

const clientLogos: Record<string, string> = {
  "ITC Foods": itcLogo,
  "Ford Motor Co": fordLogo,
  "CETFI": cetfiLogo,
  "Machani Group": machaniLogo,
  "PETRONAS": petronasLogo,
  "Microsoft India": microsoftLogo,
  "KPMG India": kpmgLogo,
  "Quess Corp": quessLogo,
  "United Breweries": ubLogo,
  "ProClime": proclimeLogo,
  "Volkswagen Malaysia": volkswagenLogo,
  "Publicis India": publicisLogo,
  "Swatch": swatchLogo,
  "GH2 India": gh2IndiaLogo,
  "Apollo Hospitals": apolloLogo,
};

const clients = [
  "KPMG India", "Microsoft India", "PETRONAS", "Ford Motor Co",
  "Volkswagen Malaysia", "ITC Foods", "United Breweries", "Publicis India",
  "Quess Corp", "Machani Group", "ProClime", "Apollo Hospitals",
  "CETFI", "Swatch", "GH2 India", "Erik Solheim"
];

const testimonials = [
  {
    quote: "Landing strategy, delivering creative excellence, and driving business growth—it's a rare combination. Theresa brings all three with a sharp mind and an energy that makes even the toughest boardroom conversations productive. She has always championed sustainability for market advantage.",
    author: "CEO",
    company: "ITC Foods"
  },
  {
    quote: "Theresa is a powerhouse of talent and discipline. She brings razor focus to our industry and steers teams towards accountability and high integrity. She is systems thinking and strategic in her approach to building brand Proclime. She is a star.",
    author: "CEO",
    company: "ProClime"
  },
  {
    quote: "Ronnie is one of the finest professionals that I have had the privilege of knowing and working with. A razor sharp mind, an insatiable appetite for learning, deep knowledge of diverse fields including business, strategy, marketing, communication, technology and consumers, incredible client focus, strong leadership and unparalleled hard work make her not only a sheer joy to work with and for, but also an asset to whichever team she belongs.",
    author: "CMO",
    company: "United Breweries"
  }
];

const About = () => {
  useEffect(() => {
    document.title = "About Bombay Breed | Theresa Ronnie - Carbon Communications Advisory";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Founded by Theresa Ronnie, Bombay Breed is India's only strategic carbon communications advisory. 18+ years of C-suite experience in sustainability, ESG, and climate strategy.");
    }
  }, []);

  const portraitUrl = "https://zjiwmdrtuhsrymsuvpfb.supabase.co/storage/v1/object/public/brand%20assets/2194e7e6-56ca-4efd-9f86-44eac8db0353.JPG";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-20 px-6 md:px-8 bg-primary">
          <div className="container mx-auto text-center max-w-3xl">
            <p className="text-sm font-medium text-primary-foreground/70 tracking-wide uppercase mb-4">
              About Us
            </p>
            <h1 className="text-display font-heading tracking-tight mb-6 text-primary-foreground">
              India's Only Strategic Carbon Communications Advisory
            </h1>
            <p className="text-lede text-primary-foreground/80">
              Bridging the gap between climate expertise and C-suite communication
            </p>
          </div>
        </section>

        {/* Why Carbon Communications Matters */}
        <section className="py-20 px-6 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-section font-heading tracking-tight mb-6">
                    Why Carbon Communications Matters
                  </h2>
                  <div className="space-y-4 text-foreground/80">
                    <p>
                      Climate action is no longer just about science and policy—it's about narrative. 
                      The companies that will thrive in the energy transition are those that can 
                      articulate their climate strategy credibly, engage stakeholders authentically, 
                      and turn sustainability into competitive advantage.
                    </p>
                    <p>
                      Yet most climate consultancies speak in technical jargon. Most communications 
                      agencies lack carbon market expertise. Indian enterprises need advisors who 
                      understand both worlds—and can translate between them at the board level.
                    </p>
                    <p className="font-medium text-foreground">
                      That's where Bombay Breed comes in.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link to="/services">
                      <Button>
                        Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-lg p-8">
                  <h3 className="text-lg font-medium text-primary mb-4">The Gap We Fill</h3>
                  <ul className="space-y-3">
                    {[
                      "Climate consultants who can't communicate to boards",
                      "PR agencies who don't understand carbon markets",
                      "Generic ESG advice without India context",
                      "Compliance-focused reporting missing strategic value",
                      "Sustainability initiatives that don't connect to P&L"
                    ].map((gap, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 px-6 md:px-8 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                {/* Portrait */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="relative">
                    <div className="relative bg-muted rounded-lg overflow-hidden">
                      <div className="aspect-[4/5] relative">
                        <img 
                          src={portraitUrl}
                          alt="Theresa Ronnie - Founder, Bombay Breed"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-primary p-5 rounded-lg shadow-lg max-w-xs">
                      <Quote className="h-6 w-6 text-primary-foreground/30 mb-2" />
                      <p className="text-sm text-primary-foreground italic leading-relaxed font-medium">
                        "The most trustworthy person on the Subcontinent"
                      </p>
                      <p className="text-xs text-primary-foreground/70 mt-2 font-medium">— Erik Solheim</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <h2 className="text-section font-heading tracking-tight mb-4">
                    Meet Theresa Ronnie
                  </h2>
                  <p className="text-lg text-primary font-medium mb-6">
                    Founder & Principal Advisor
                  </p>
                  
                  <div className="space-y-4 text-foreground/80">
                    <p>
                      Theresa has been a steady yet dynamic influence with CEOs and CXOs for over a decade. 
                      She has led advertising agencies, consulted with KPMG India, worked with the senior 
                      leadership at Microsoft India, before shifting her focus to Climate Action.
                    </p>
                    <p>
                      Possessing an easy-going yet highly professional demeanour, Theresa brings bottom-line 
                      impact and effectiveness metrics to board-level oversight. She is a student of climate 
                      sciences, mythology, behaviour studies, socio-economics, business movements, cultural 
                      trends and an active investor in the stock market.
                    </p>
                    <p>
                      Theresa believes that businesses can build for sustainability and convert it to their 
                      competitive advantage through strategic governance, credible communications, and 
                      board-level oversight on carbon/ESG compliance.
                    </p>
                  </div>

                  {/* Experience Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8 py-6 border-t border-b border-border/50">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">18+</p>
                      <p className="text-xs text-muted-foreground">Years Strategic Communications</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">11+</p>
                      <p className="text-xs text-muted-foreground">Years C-Suite Advisory</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">10K+</p>
                      <p className="text-xs text-muted-foreground">Hours Carbon Markets</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button asChild variant="outline">
                      <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="h-4 w-4 mr-2" />
                        Connect on LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20 px-6 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-section font-heading tracking-tight mb-4">
                  Our Approach
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We don't just advise on climate—we translate complex carbon market dynamics 
                  into strategic narratives that move boards, investors, and stakeholders.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Board-Ready Communication",
                    description: "Translate technical climate data into strategic narratives that resonate with C-suite decision makers and board members."
                  },
                  {
                    title: "India-First Context",
                    description: "Deep expertise in India's regulatory landscape—CCTS, PAT, BRSR—and how they intersect with global frameworks like CBAM and Article 6."
                  },
                  {
                    title: "Commercial Credibility",
                    description: "Turn sustainability investments into competitive advantages with measurable business outcomes, not just compliance checkboxes."
                  }
                ].map((approach, index) => (
                  <div key={index} className="bg-card border border-border/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-foreground mb-3">{approach.title}</h3>
                    <p className="text-sm text-muted-foreground">{approach.description}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Client Logos */}
        <section className="py-20 px-6 md:px-8 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                <div className="relative text-center mb-10">
                  <h2 className="text-section font-heading tracking-tight mb-2">Trusted By</h2>
                  <p className="text-sm text-muted-foreground">Advisory work with leading organizations</p>
                </div>
                <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {clients.map((client, index) => {
                    const logoUrl = clientLogos[client];
                    return (
                      <div 
                        key={index}
                        className="group px-4 py-5 rounded-lg bg-muted/10 border border-border/30 flex flex-col items-center justify-center min-h-[80px] hover:bg-muted/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out cursor-default"
                      >
                        {logoUrl ? (
                          <img 
                            src={logoUrl} 
                            alt={`${client} logo`}
                            className={`max-w-[120px] object-contain opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300 ease-out ${client === 'ProClime' ? 'max-h-16' : 'max-h-10'}`}
                          />
                        ) : client === 'Erik Solheim' ? (
                          <span className="text-lg font-serif font-semibold text-foreground/60 group-hover:text-primary group-hover:scale-105 transition-all duration-300 tracking-wide">
                            Erik Solheim
                          </span>
                        ) : (
                          <span className="text-sm text-foreground/60 font-medium text-center group-hover:text-foreground/90 group-hover:scale-105 transition-all duration-300">
                            {client}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-section font-heading tracking-tight mb-2">What Leaders Say</h2>
                <p className="text-sm text-muted-foreground">Perspectives from C-suite executives</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Left column */}
                <div className="space-y-8">
                  {testimonials.filter(t => t.company !== 'United Breweries').map((testimonial, index) => (
                    <div key={index} className="group relative p-8 rounded-xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-l-4 border-l-primary border border-border/20 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out">
                      <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10 group-hover:text-primary/20 transition-all duration-300" />
                      <span className="text-4xl font-serif text-primary/30 leading-none block mb-2">"</span>
                      <p className="text-base text-foreground/90 leading-relaxed mb-8 pr-8">{testimonial.quote}</p>
                      <div className="pt-6 border-t border-border/30 flex items-center gap-4">
                        {clientLogos[testimonial.company] && (
                          <img src={clientLogos[testimonial.company]} alt={`${testimonial.company} logo`} className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">{testimonial.author}</span>
                          <span className="text-xs text-muted-foreground">{testimonial.company}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Right column */}
                <div className="flex">
                  {testimonials.filter(t => t.company === 'United Breweries').map((testimonial, index) => (
                    <div key={index} className="group relative p-8 rounded-xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-l-4 border-l-primary border border-border/20 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col h-full">
                      <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10 group-hover:text-primary/20 transition-all duration-300" />
                      <span className="text-4xl font-serif text-primary/30 leading-none block mb-2">"</span>
                      <p className="text-base text-foreground/90 leading-relaxed mb-8 pr-8 flex-1">{testimonial.quote}</p>
                      <div className="pt-6 border-t border-border/30 flex items-center gap-4 mt-auto">
                        {clientLogos[testimonial.company] && (
                          <img src={clientLogos[testimonial.company]} alt={`${testimonial.company} logo`} className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">{testimonial.author}</span>
                          <span className="text-xs text-muted-foreground">{testimonial.company}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 md:px-8 bg-primary">
          <div className="container mx-auto max-w-3xl text-center">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-3xl font-heading text-primary-foreground mb-4">
                Ready to Transform Your Climate Narrative?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Let's discuss how strategic carbon communications can accelerate your transition journey.
              </p>
              <Link to="/#contact">
                <Button variant="secondary" size="lg">
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
