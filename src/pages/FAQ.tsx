import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>

      <FAQSection />

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="p-8 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Have more questions?</h2>
          <p className="text-foreground/80 mb-6">
            We're here to help. Reach out through the contact form below or schedule a discovery call to discuss your specific needs.
          </p>
        </div>
      </div>

      <Contact />
      <Footer />
    </div>
  );
};

export default FAQ;
