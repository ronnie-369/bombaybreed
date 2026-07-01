import React from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

import microsoft from '@/assets/client-logos/microsoft.png';
import kpmg from '@/assets/client-logos/kpmg.png';
import ford from '@/assets/client-logos/ford.png';
import volkswagen from '@/assets/client-logos/volkswagen.png';
import heineken from '@/assets/client-logos/heineken.png';
import itc from '@/assets/client-logos/itc.jpg';
import apollo from '@/assets/client-logos/apollo-hospitals.png';

// Explicit width/height prevent layout shifts (CLS) and help the browser
// allocate space before the image loads. Values are 2x the max display size
// (h-10 = 40px, so height=80 is the 2x retina value).
const logos = [
  { src: microsoft, alt: 'Microsoft company logo', width: 160, height: 80 },
  { src: kpmg, alt: 'KPMG company logo', width: 108, height: 80 },
  { src: ford, alt: 'Ford company logo', width: 222, height: 80 },
  { src: volkswagen, alt: 'Volkswagen company logo', width: 126, height: 80 },
  { src: heineken, alt: 'Heineken company logo', width: 142, height: 80 },
  { src: itc, alt: 'ITC company logo', width: 120, height: 80 },
  { src: apollo, alt: 'Apollo Hospitals company logo', width: 178, height: 80 },
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
                width={logo.width}
                height={logo.height}
                className="h-8 md:h-10 object-contain grayscale opacity-30 hover:grayscale-0 hover:opacity-80 transition-all duration-300"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ClientLogoStrip;
