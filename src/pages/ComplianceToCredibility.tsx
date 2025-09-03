import React from 'react';
import Header from '@/components/Header';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';

const ComplianceToCredibility = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            <span className="text-gradient">From Compliance to Credibility:</span>
            <br />
            <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
              A CXO Guide to CCTS & CBAM
            </span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            How Indian businesses can turn carbon compliance into trust, market access, and leadership.
          </p>
        </div>
      </section>

      {/* Why This Guide Matters */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-center mb-12">Why this guide matters</h2>
          <div className="prose prose-lg max-w-none text-foreground/80">
            <p className="text-lg leading-relaxed mb-6">
              The twin forces of India's Carbon Credit Trading Scheme (CCTS) and Europe's Carbon Border 
              Adjustment Mechanism (CBAM) are rewriting the rules of global trade. For CXOs, the question 
              is no longer if compliance matters — but how you communicate it.
            </p>
            <p className="text-lg leading-relaxed">
              This guide equips leaders with frameworks, strategies, and actionable steps to transform 
              carbon compliance into credibility and competitive advantage.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-center mb-12">What you'll learn inside</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-4 text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">•</span>
                <span>The regulatory shifts redefining Indian exports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">•</span>
                <span>Sector-specific exposure and case studies (Tata Steel, Aditya Birla Textiles, Maruti Suzuki)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">•</span>
                <span>How compliance-grade communication differs from yesterday's sustainability claims</span>
              </li>
            </ul>
            <ul className="space-y-4 text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">•</span>
                <span>Why strategic storytelling is now infrastructure, not just PR</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">•</span>
                <span>The immediate CXO action checklist to safeguard exports, investors, and reputation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">•</span>
                <span>How AI + creativity can balance disclosure with differentiation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-center mb-12">Who should read this guide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-700 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <p className="text-foreground/80">
                CXOs and senior leaders in steel, aluminium, cement, fertilizers, textiles, chemicals, and auto
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-700 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <p className="text-foreground/80">
                Communications & sustainability leaders navigating CBAM/CCTS
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-700 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <p className="text-foreground/80">
                Export-focused companies seeking EU market access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-center mb-12">About the Author</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Theresa Ronnie</h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Theresa Ronnie is the founder of Bombay Breed Consulting, a strategic communications firm 
                helping Indian businesses navigate the carbon economy. With over 20 years in brand strategy 
                and storytelling, she now focuses on transforming compliance data into credible, 
                market-leading narratives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-background">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Download the Guide</h2>
            <p className="text-lg text-foreground/80">
              Turn compliance from burden to advantage.
            </p>
          </div>
          <LeadCaptureForm 
            reportTitle="From Compliance to Credibility: A CXO Guide to CCTS & CBAM"
            reportDescription="Get actionable frameworks to transform carbon compliance into competitive advantage"
          />
        </div>
      </section>
    </div>
  );
};

export default ComplianceToCredibility;