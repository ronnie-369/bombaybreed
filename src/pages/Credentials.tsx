import React from 'react';
import Header from '@/components/Header';
import { Check, LinkedinIcon, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

// Client logo mapping
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
};

const Credentials = () => {
  const expertise = [
    "Proven Expertise", 
    "Strategic Insighting", 
    "Data-Led Approach", 
    "Risk Management", 
    "Stakeholder Engagement", 
    "Innovation in Communication", 
    "Tracking Compliance & Standards", 
    "Cross-Functional Collaboration", 
    "Long-term Vision"
  ];
  
  const experience = [
    {
      area: "Integrated Strategic Communications & Brand Stewardship",
      years: "18 years"
    },
    {
      area: "C-Suite Management & Strategic Business Leadership",
      years: "11 years"
    },
    {
      area: "Carbon Markets & Energy Transition",
      years: ">10,000 hours"
    }
  ];

  // Only clients with logos
  const clients = [
    "KPMG India",
    "Microsoft India",
    "PETRONAS",
    "Ford Motor Co",
    "Volkswagen Malaysia",
    "ITC Foods",
    "United Breweries",
    "Publicis India",
    "Quess Corp",
    "Machani Group",
    "ProClime",
    "CETFI",
    "Swatch",
    "GH2 India",
    "Erik Solheim"
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
      quote: "Ronnie is one of the finest professionals that I have had the privilege of knowing and working with. A razor sharp mind, an insatiable appetite for learning, deep knowledge of diverse fields including business, strategy, marketing, communication, technology and consumers, incredible client focus, strong leadership and unparalleled hard work make her not only a sheer joy to work with and for, but also an asset to whichever team she belongs. Ronnie has experience across diverse industries, both in India and overseas, and an indomitable will to keep bettering herself. The ability to move seamlessly from the big picture to the minutest detail enables her to acquit herself honourably across both strategy and operations.",
      author: "CMO",
      company: "United Breweries"
    }
  ];

  const portraitUrl = "https://zjiwmdrtuhsrymsuvpfb.supabase.co/storage/v1/object/public/brand%20assets/2194e7e6-56ca-4efd-9f86-44eac8db0353.JPG";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CredentialsContent 
        clients={clients} 
        testimonials={testimonials} 
        portraitUrl={portraitUrl}
        experience={experience}
        expertise={expertise}
      />
    </div>
  );
};

// Client Logos Section Component
const ClientLogosSection = ({ clients }: { clients: string[] }) => {
  return (
    <div className="pt-12 border-t border-border/30">
      <div className="text-center mb-10">
        <h3 className="text-lg font-medium text-primary mb-2">
          Trusted By
        </h3>
        <p className="text-sm text-muted-foreground">
          Advisory work with leading organizations
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {clients.map((client, index) => {
          const logoUrl = clientLogos[client];
          
          return (
            <div 
              key={index}
              className="group px-4 py-5 rounded-lg bg-muted/10 border border-border/30 flex flex-col items-center justify-center hover:bg-muted/30 hover:border-border/50 transition-all duration-300 min-h-[80px]"
            >
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={`${client} logo`}
                  className={`max-w-[120px] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0 ${client === 'ProClime' ? 'max-h-16' : 'max-h-10'}`}
                />
              ) : client === 'Erik Solheim' ? (
                <span className="text-lg font-serif font-semibold text-foreground/70 group-hover:text-foreground/90 transition-colors tracking-wide">
                  Erik Solheim
                </span>
              ) : (
                <span className="text-sm text-foreground/70 font-medium text-center group-hover:text-foreground/90 transition-colors">
                  {client}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main content component
const CredentialsContent = ({ 
  clients, 
  testimonials, 
  portraitUrl,
  experience,
  expertise
}: { 
  clients: string[]; 
  testimonials: { quote: string; author: string; company: string }[];
  portraitUrl: string;
  experience: { area: string; years: string }[];
  expertise: string[];
}) => {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 md:px-8 bg-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <p className="text-sm font-medium text-primary-foreground/70 tracking-wide uppercase mb-4">
            Background
          </p>
          <h1 className="text-display font-heading tracking-tight mb-6 text-primary-foreground">
            Professional Credentials
          </h1>
          <p className="text-lede text-primary-foreground/80">
            Board-level strategic advisor with proven track record in C-suite advisory, carbon governance, and ESG oversight
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Editorial Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-20">
            {/* Left Column - Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-4">
                <h2 className="text-section font-heading tracking-tight">
                  A Strong History of C-suite Advisory
                </h2>
                
                <p className="text-lede text-muted-foreground">
                  Strategic leadership across sustainability, communications, and business transformation
                </p>
              </div>

              <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
                <p>
                  Theresa has been a steady yet dynamic influence with CEOs and CXOs (CFOs, COOs, CSOs, CMOs) for over a decade. She has led advertising agencies, consulted with KPMG India, worked with the senior leadership at Microsoft India, before shifting her focus to Climate Action.
                </p>
                
                <p>
                  Possessing an easy-going yet highly professional demeanour, Theresa brings bottom-line impact and effectiveness metrics to board-level oversight. She is a student of climate sciences, mythology, behaviour studies, socio-economics, business movements, cultural trends and an active investor in the stock market.
                </p>
                
                <p>
                  Theresa believes that businesses can build for sustainability and convert it to their competitive advantage through strategic governance, credible communications, and board-level oversight on carbon/ESG compliance.
                </p>
              </div>
              
              {/* Personal Motto */}
              <div className="mt-2 pt-6 border-t border-primary/10">
                <p className="text-base md:text-lg italic text-primary/80 font-serif">
                  "It will take all of us, to do this for all of us"
                </p>
              </div>
              
              <div className="pt-2">
                <Button asChild variant="outline">
                  <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <LinkedinIcon className="h-4 w-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column - Portrait */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Main Portrait Container */}
                <div className="relative bg-muted rounded-lg overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <img 
                      src={portraitUrl}
                      alt="Theresa Ronnie - Independent Director & Board Advisor"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                
                {/* Quote */}
                <div className="absolute -bottom-4 -left-4 bg-primary p-5 rounded-lg shadow-lg max-w-xs">
                  <p className="text-sm text-primary-foreground italic leading-relaxed font-medium">
                    "The most trustworthy person on the Subcontinent"
                  </p>
                  <p className="text-xs text-primary-foreground/70 mt-2 font-medium">— Erik Solheim</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience & Expertise Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Experience Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-primary">
                Experience
              </h3>
              <div className="space-y-0">
                {experience.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-border/50">
                    <span className="text-sm text-foreground pr-4">{item.area}</span>
                    <span className="text-sm text-primary font-medium whitespace-nowrap">{item.years}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-primary">
                Core Competencies
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="pt-12 border-t border-border/30 mb-20">
            <div className="text-center mb-12">
              <h3 className="text-lg font-medium text-primary mb-2">
                What Leaders Say
              </h3>
              <p className="text-sm text-muted-foreground">
                Perspectives from C-suite executives
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="relative p-6 rounded-lg bg-muted/10 border border-border/30 hover:border-border/50 transition-colors"
                >
                  <Quote className="h-6 w-6 text-primary/20 mb-4" />
                  <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-auto">
                    <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client List Section */}
          <ClientLogosSection clients={clients} />

        </div>
      </section>
    </div>
  );
};

export default Credentials;