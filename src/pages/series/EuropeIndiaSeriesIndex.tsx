import React from 'react';
import { Link } from 'react-router-dom';
import PageHead from '@/components/PageHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionLabel from '@/components/ui/SectionLabel';
import { ArrowRight } from 'lucide-react';

/**
 * Europe-India Climate Series index.
 *
 * Five-piece brief on why European infrastructure and bodies are failing at
 * temperatures the Gulf and South Asia absorb routinely, and what that means
 * for Indian boards, insurers and investors.
 *
 * Article 01 is published. Articles 02 to 05 are drafted per
 * Series_Outline_What_Europe_Got_Wrong.md and will publish on a two-week
 * cadence through mid-September 2026.
 */

type PieceStatus = 'live' | 'scheduled' | 'draft';

interface Piece {
  number: string;
  title: string;
  dek: string;
  status: PieceStatus;
  publishedDate?: string;
  scheduledDate?: string;
  readTimeMinutes?: number;
  href?: string;
}

const pieces: Piece[] = [
  {
    number: '01',
    title: 'Why Europe melts at 41°C when the Gulf works at 50°C',
    dek: 'The five vectors: buildings, cooling, bodies, rail, insurance. None of it is about the thermometer.',
    status: 'live',
    publishedDate: '2026-06-30',
    readTimeMinutes: 6,
    href: '/series/europe-india/why-europe-melts',
  },
  {
    number: '02',
    title: 'The Concrete Trap',
    dek: 'India is rebuilding Bombay in the wrong material. Tier-1 cities are replacing cross-ventilated vernacular stock with sealed cement-and-glass towers.',
    status: 'scheduled',
    scheduledDate: '2026-07-15',
    readTimeMinutes: 7,
  },
  {
    number: '03',
    title: 'The Cooling Bargain',
    dek: 'India is on the Gulf’s path. The Gulf’s path has a fossil-fuel price India cannot afford.',
    status: 'scheduled',
    scheduledDate: '2026-07-29',
    readTimeMinutes: 8,
  },
  {
    number: '04',
    title: 'The Acclimatisation Tax',
    dek: 'Indian bodies are losing the heat they used to know. The same demographic arc as Europe from a lower base.',
    status: 'scheduled',
    scheduledDate: '2026-08-12',
    readTimeMinutes: 7,
  },
  {
    number: '05',
    title: 'The Rail Reset',
    dek: 'Europe’s tracks are buckling. India’s are not, because Indian Railways specifies 35 to 40°C neutral, not European 18 to 30°C.',
    status: 'scheduled',
    scheduledDate: '2026-08-26',
    readTimeMinutes: 6,
  },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const EuropeIndiaSeriesIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHead
        title="Climate Series: What Europe Got Wrong That India Must Not Repeat | Bombay Breed"
        description="A five-piece Bombay Breed climate brief on why Europe is failing at temperatures the Gulf handles routinely, and what Indian boards, insurers and investors should not import."
        path="/series/europe-india"
        ogType="website"
        ogImage="og-europe-melts"
      />
      <Header />

      <main className="flex-1 pt-24 md:pt-28 pb-16 md:pb-24">
        {/* Series intro */}
        <section className="px-6 md:px-8">
          <div className="container mx-auto max-w-[820px]">
            <SectionLabel label="Climate Series  ·  Bombay Breed" />
            <h1 className="mt-6 font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-foreground [text-wrap:balance]">
              What Europe got wrong that India must not repeat.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed [text-wrap:balance]">
              A five-piece investor and policy brief on why European infrastructure and bodies are failing at
              temperatures the Gulf and South Asia absorb routinely. Sourced from World Weather Attribution,
              Allianz Trade, Munich Re, Nature Communications, the IEA and the WHO. Published fortnightly
              through mid-September 2026.
            </p>
            <div className="mt-6 h-px w-24 bg-accent" aria-hidden="true" />
          </div>
        </section>

        {/* Piece list */}
        <section className="mt-14 md:mt-20 px-6 md:px-8">
          <div className="container mx-auto max-w-[820px] space-y-10 md:space-y-14">
            {pieces.map((p) => {
              const isLive = p.status === 'live' && p.href;
              const Wrapper: React.ElementType = isLive ? Link : 'div';
              const wrapperProps = isLive ? { to: p.href } : {};

              return (
                <Wrapper
                  key={p.number}
                  {...wrapperProps}
                  className={`group block border-t border-border pt-8 md:pt-10 ${
                    isLive ? 'hover:opacity-90 transition-opacity' : ''
                  }`}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                    <div className="font-mono text-sm font-medium tracking-wider text-accent mt-1">
                      {p.number}
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight text-foreground [text-wrap:balance]">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed [text-wrap:balance]">
                        {p.dek}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs tracking-wider uppercase text-muted-foreground">
                        {p.status === 'live' && p.publishedDate && (
                          <>
                            <span className="text-accent">Published</span>
                            <span>{formatDate(p.publishedDate)}</span>
                          </>
                        )}
                        {p.status === 'scheduled' && p.scheduledDate && (
                          <>
                            <span>Publishes</span>
                            <span>{formatDate(p.scheduledDate)}</span>
                          </>
                        )}
                        {p.readTimeMinutes && (
                          <>
                            <span className="text-border">/</span>
                            <span>{p.readTimeMinutes} minute read</span>
                          </>
                        )}
                      </div>
                      {isLive && (
                        <div className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-medium text-primary group-hover:gap-3 transition-all">
                          Read the brief
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-20 md:mt-28 px-6 md:px-8">
          <div className="container mx-auto max-w-[720px] border-t border-border pt-12 md:pt-16 text-center">
            <SectionLabel label="Stay close" />
            <h2 className="mt-5 font-serif text-3xl md:text-4xl tracking-tight leading-tight text-foreground">
              Read each piece as it publishes.
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed [text-wrap:balance]">
              Subscribe to The Climate Desk on Substack. Free. Every article in this series lands in your inbox
              on the morning it goes live.
            </p>
            <a
              href="https://www.theclimatedesk.earth"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Subscribe on Substack
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EuropeIndiaSeriesIndex;
