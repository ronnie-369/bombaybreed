import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16 px-4 reduced-text-size">
      <div className="container mx-auto max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-card rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Terms and Conditions
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using Bombay Breed Consulting's website and services, you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Use of Services</h2>
              <p className="text-muted-foreground mb-4">
                Our services are provided for business and professional purposes. You agree to use our services in compliance with all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Intellectual Property and Proprietary Rights</h2>
              <p className="text-muted-foreground mb-4">
                All content, reports, and materials provided by Bombay Breed Consulting are protected by intellectual property rights. Unauthorized reproduction or distribution is prohibited.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Brand Ownership:</strong> Bombay Breed Consulting is the registered brand of Theresa Ronnie, who holds sole and exclusive rights to the use of the name "Bombay Breed Consulting" and all its associated assets, logos, and materials.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Proprietary Properties:</strong> The Climate Desk, including its byline, strapline, and proposition "Climate Control (is inevitable)", are proprietary intellectual properties of Bombay Breed Consulting. Any use, reproduction, or reference to these properties requires explicit written permission from Theresa Ronnie or authorized representatives of Bombay Breed Consulting.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Consulting Services</h2>
              <p className="text-muted-foreground mb-4">
                Our advisory and consulting services are provided based on our expertise and analysis. While we strive for accuracy, results may vary based on implementation and external factors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Confidentiality</h2>
              <p className="text-muted-foreground mb-4">
                We maintain strict confidentiality regarding client information and projects. Specific confidentiality terms are outlined in individual service agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                Bombay Breed Consulting shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Modifications</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions regarding these terms, please contact us through our website or via the contact information provided on our platform.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
