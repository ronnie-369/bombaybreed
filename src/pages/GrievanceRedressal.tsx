import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GrievanceRedressal = () => {
  return (
    <>
      <Helmet>
        <title>Grievance Redressal - Bombay Breed Consulting</title>
        <meta
          name="description"
          content="How to raise a complaint about a payment, subscription or content issue with Bombay Breed Consulting. Contact, timelines and Razorpay escalation."
        />
        <link rel="canonical" href="https://bombaybreed.com/grievance-redressal" />
      </Helmet>
      <Header />
      <main className="bg-bb-paper text-bb-near-black">
        <section className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
          <div className="text-[11px] uppercase tracking-[0.24em] text-bb-gray">Legal</div>
          <h1 className="mt-5 font-serif font-normal tracking-[-0.02em] text-[40px] md:text-[52px] leading-[1.05]">
            Grievance Redressal
          </h1>
          <p className="mt-4 text-[13px] text-bb-gray">Last updated: 24 May 2026</p>

          <div className="mt-12 space-y-10 text-[15px] leading-[1.75] text-bb-near-black/90">
            <section>
              <p>
                We take complaints seriously. This page describes the
                escalation path for any payment, subscription or content issue,
                in accordance with the RBI Master Directions on Payment
                Aggregators and the Consumer Protection (E-Commerce) Rules,
                2020.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">Level 1 - Primary contact</h2>
              <div className="border border-bb-border bg-white p-5 rounded-[10px]">
                <p className="font-medium">Theresa Ronnie</p>
                <p>Founder, Bombay Breed Consulting</p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:theresa.ronnie@bombaybreed.com"
                    className="underline decoration-bb-border underline-offset-4"
                  >
                    theresa.ronnie@bombaybreed.com
                  </a>
                </p>
                <p className="mt-1">Location: Mumbai, Maharashtra, India</p>
              </div>
              <p className="mt-4">
                Please use the subject line &quot;Grievance - [order or
                subscription reference]&quot; and include the date, payment
                method, amount and a short description of the issue.
              </p>
              <p className="mt-4">
                <strong>Acknowledgement:</strong> within 2 business days.<br />
                <strong>Resolution target:</strong> 7 to 10 business days for
                payment and subscription issues; up to 15 business days for
                content or editorial issues that require research.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">Level 2 - Escalation</h2>
              <p>
                If you are not satisfied with the Level 1 resolution, reply to
                the same email thread with the subject prefix &quot;ESCALATION
                -&quot;. Escalated complaints are reviewed within 5 additional
                business days.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">Level 3 - Payment aggregator dispute</h2>
              <p>
                All online payments are processed by Razorpay Software Private
                Limited. If a payment-related grievance remains unresolved
                after Levels 1 and 2, you may raise it directly with Razorpay
                using the channels published at{" "}
                <a
                  href="https://razorpay.com/support/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-bb-border underline-offset-4"
                >
                  razorpay.com/support
                </a>
                . Razorpay&apos;s nodal officer details are published on the
                same site as required by the RBI.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">Level 4 - RBI Ombudsman</h2>
              <p>
                For unresolved payment disputes you may approach the RBI
                Ombudsman under the Reserve Bank - Integrated Ombudsman Scheme,
                2021, at{" "}
                <a
                  href="https://cms.rbi.org.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-bb-border underline-offset-4"
                >
                  cms.rbi.org.in
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">Related policies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Link to="/terms" className="underline decoration-bb-border underline-offset-4">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="underline decoration-bb-border underline-offset-4">
                    Refund and Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="underline decoration-bb-border underline-offset-4">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GrievanceRedressal;
