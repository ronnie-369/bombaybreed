import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background reduced-text-size">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 py-24">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-foreground/80 leading-relaxed">
              Welcome to Bombay Breed ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Fill out our contact forms</li>
              <li>Request to download reports and resources</li>
              <li>Subscribe to our newsletter or communications</li>
              <li>Interact with our website</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              The personal information we collect may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name and designation</li>
              <li>Message content</li>
              <li>Any other information you choose to provide</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>To provide you with requested reports, resources, and content</li>
              <li>To respond to your inquiries and communicate with you</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To improve our website and services</li>
              <li>To analyze usage patterns and trends</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Legal Basis for Processing</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We process your personal information based on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Consent:</strong> When you provide explicit consent for marketing communications</li>
              <li><strong>Contract:</strong> To fulfill our obligations when providing services to you</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and conduct business operations</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Storage and Security</h2>
            <p className="text-foreground/80 leading-relaxed">
              We use Supabase, a secure cloud database service, to store your information. We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
            <p className="text-foreground/80 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Privacy Rights</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal information</li>
              <li><strong>Restriction:</strong> Request restriction of processing your data</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Object:</strong> Object to our processing of your personal information</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time (without affecting prior processing)</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Marketing Communications</h2>
            <p className="text-foreground/80 leading-relaxed">
              With your consent, we may send you marketing communications about sustainability insights, reports, and updates. You can unsubscribe from these communications at any time by clicking the "unsubscribe" link in our emails or by contacting us directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Third-Party Services</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We use the following third-party services to operate our website and provide our services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Supabase:</strong> For database and authentication services</li>
              <li><strong>Email Service Providers:</strong> For sending communications and notifications</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              These third parties have their own privacy policies and we encourage you to review them. We are not responsible for the privacy practices of these third-party services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Cookies and Tracking Technologies</h2>
            <p className="text-foreground/80 leading-relaxed">
              We may use cookies and similar tracking technologies to track activity on our website and collect certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. International Data Transfers</h2>
            <p className="text-foreground/80 leading-relaxed">
              Your information may be transferred to and processed in countries other than India. We ensure that appropriate safeguards are in place to protect your personal information in accordance with this Privacy Policy and applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Children's Privacy</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Changes to This Privacy Policy</h2>
            <p className="text-foreground/80 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Contact Us</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-foreground font-medium">Bombay Breed</p>
              <p className="text-foreground/80">Email: <a href="mailto:ronnie@bombaybreed.com" className="text-primary hover:underline">ronnie@bombaybreed.com</a></p>
              <p className="text-foreground/80">Phone: +91-9916090806</p>
              <p className="text-foreground/80">Address: Malleshwaram, Bangalore, India</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">15. Governing Law</h2>
            <p className="text-foreground/80 leading-relaxed">
              This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the courts of Bangalore, India.
            </p>
          </section>
        </article>
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;