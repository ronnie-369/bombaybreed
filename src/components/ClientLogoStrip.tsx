import React from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

import microsoft from '@/assets/client-logos/microsoft.png';
import kpmg from '@/assets/client-logos/kpmg.png';
import ford from '@/assets/client-logos/ford.png';
import volkswagen from '@/assets/client-logos/volkswagen.png';
import heineken from '@/assets/client-logos/heineken.png';
import itc from '@/assets/client-logos/itc.jpg';
import apollo from '@/assets/client-logos/apollo-hospitals.png';

const logos = [
  { src: microsoft, alt: 'Microsoft' },
  { src: kpmg, alt: 'KPMG' },
  { src: ford, alt: 'Ford' },
  { src: volkswagen, alt: 'Volkswagen' },
  { src: heineken, alt: 'Heineken' },
  { src: itc, alt: 'ITC' },
  { src: apollo, alt: 'Apollo Hospitals' },
];

const ClientLogoStrip = () => {
  return (
    <section className="py-12 md:py-16 px-6 md:px-8 bg-background border-y border-border/50">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal direction="up">
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {logos.map((logo) => (
              <img
                key={logo.alt}
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
  );
};

export default ClientLogoStrip;
