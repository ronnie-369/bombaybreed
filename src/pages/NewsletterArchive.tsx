import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, BookOpen, TrendingUp, Globe, Landmark } from 'lucide-react';

const newsletterEditions = [
  {
    title: 'India\'s Carbon Market Takes Shape: What CCTS Means for Industry',
    date: 'February 2026',
    topic: 'Carbon Markets',
    icon: TrendingUp,
    summary: 'A deep analysis of India\'s Carbon Credit Trading Scheme implementation timeline, obligated sectors, and strategic implications for energy-intensive industries.',
    url: 'https://theclimatedesk.substack.com/',
    keywords: ['CCTS', 'Carbon Markets', 'India Climate Policy'],
  },
  {
    title: 'CBAM Phase 2: The Real Cost for Indian Steel and Aluminium',
    date: 'January 2026',
    topic: 'Trade & Regulation',
    icon: Globe,
    summary: 'Quantifying CBAM certificate costs for Indian exporters as the EU moves from transitional reporting to full financial implementation.',
    url: 'https://theclimatedesk.substack.com/',
    keywords: ['CBAM', 'Steel Industry', 'EU Trade Policy'],
  },
  {
    title: 'BRSR Core 2026: The Assurance Challenge for Indian Listed Companies',
    date: 'January 2026',
    topic: 'ESG Disclosure',
    icon: BookOpen,
    summary: 'What the expansion of mandatory reasonable assurance under BRSR Core means for data systems, verification processes, and strategic ESG positioning.',
    url: 'https://theclimatedesk.substack.com/',
    keywords: ['BRSR', 'ESG Reporting', 'SEBI'],
  },
  {
    title: 'Green Jobs India 2026: The Climate Workforce Map',
    date: 'December 2025',
    topic: 'Climate Economy',
    icon: TrendingUp,
    summary: 'Mapping the emerging climate workforce across renewable energy, carbon markets, ESG advisory, and green finance - and what it means for talent strategy.',
    url: 'https://theclimatedesk.substack.com/',
    keywords: ['Green Jobs', 'Climate Economy', 'Workforce'],
  },
  {
    title: 'India-EU Climate Diplomacy: Trade Policy Meets Carbon Policy',
    date: 'November 2025',
    topic: 'Policy Analysis',
    icon: Landmark,
    summary: 'How India-EU trade negotiations are being reshaped by climate policy - from CBAM to the EU Taxonomy to Digital Product Passports.',
    url: 'https://theclimatedesk.substack.com/',
    keywords: ['India-EU Trade', 'Climate Diplomacy', 'CBAM'],
  },
  {
    title: 'The Greenwashing Tightrope: Why Indian Companies Are Getting It Wrong',
    date: 'November 2025',
    topic: 'Communications',
    icon: BookOpen,
    summary: 'An analysis of recent greenwashing controversies in India and a framework for defensible sustainability communications.',
    url: 'https://theclimatedesk.substack.com/',
    keywords: ['Greenwashing', 'Sustainability Communications', 'ESG'],
  },
];

const NewsletterArchive = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "The Climate Desk",
    "description": "Weekly climate intelligence for India\'s corporate leaders - covering carbon markets, ESG regulation, energy transition, and sustainability communications.",
    "url": "https://bombaybreed.com/newsletter",
    "author": {
      "@type": "Person",
      "name": "Theresa Ronnie",
      "jobTitle": "Founder & Strategic Advisor",
      "worksFor": {
        "@type": "Organization",
        "name": "Bombay Breed Consulting"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bombay Breed Consulting",
      "url": "https://bombaybreed.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>The Climate Desk Newsletter | Climate Intelligence India</title>
        <meta name="description" content="Subscribe to The Climate Desk - weekly climate intelligence covering India's carbon markets, CBAM, BRSR, energy transition, and sustainability strategy for corporate leaders." />
        <link rel="canonical" href="https://bombaybreed.com/newsletter" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              The Climate Desk
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Climate Intelligence,<br />Delivered Weekly
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Data-driven analysis of India's carbon markets, climate regulation, and energy transition - curated for corporate leaders, investors, and sustainability professionals by Theresa Ronnie.
            </p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>📬 2,500+ subscribers</span>
              <span>·</span>
              <span>🌍 Weekly editions</span>
              <span>·</span>
              <span>🇮🇳 India-focused</span>
            </div>
          </div>
        </section>

        {/* Recent Editions */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              Recent Editions
            </h2>
            <div className="space-y-6">
              {newsletterEditions.map((edition, index) => (
                <a
                  key={index}
                  href={edition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <edition.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">{edition.topic}</Badge>
                        <span className="text-xs text-muted-foreground">{edition.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 flex items-center gap-2">
                        {edition.title}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {edition.summary}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {edition.keywords.map((kw) => (
                          <span key={kw} className="text-xs text-primary/70 bg-primary/5 px-2 py-0.5 rounded">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://theclimatedesk.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                View all editions on Substack <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Topics Covered */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              Topics We Cover
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { topic: 'Carbon Markets & CCTS', link: '/carbon-credit-trading-india' },
                { topic: 'CBAM & EU Trade Policy', link: '/cbam-india-exporters-guide' },
                { topic: 'BRSR & ESG Disclosure', link: '/brsr-reporting-consultants-india' },
                { topic: 'Energy Transition', link: '/energy-transition-advisory-india' },
                { topic: 'Climate Risk & TCFD', link: '/climate-risk-advisory-india' },
                { topic: 'Sustainability Communications', link: '/sustainability-communications-strategy' },
                { topic: 'Green Finance', link: '/green-finance-advisory-india' },
                { topic: 'Greenwashing Risk', link: '/greenwashing-risk-india' },
                { topic: 'Climate Policy Analysis', link: '/climate-policy-analysis-india' },
              ].map(({ topic, link }) => (
                <a
                  key={topic}
                  href={link}
                  className="bg-background border border-border rounded-lg p-4 hover:border-primary/30 transition-colors text-sm font-medium text-foreground hover:text-primary"
                >
                  {topic} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe CTA */}
        <Newsletter />
      </main>

      <Footer />
    </>
  );
};

export default NewsletterArchive;
