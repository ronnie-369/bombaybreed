import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Bombay Breed Consulting</title>
        <meta
          name="description"
          content="Terms governing use of bombaybreed.com, The Climate Desk and TCD Intelligence subscriptions, including subscriber rights, content licensing, auto-renewal and governing law."
        />
        <link rel="canonical" href="https://bombaybreed.com/terms" />
      </Helmet>
      <Header />
      <main className="bg-bb-paper text-bb-near-black">
        <section className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
          <div className="text-[11px] uppercase tracking-[0.24em] text-bb-gray">Legal</div>
          <h1 className="mt-5 font-serif font-normal tracking-[-0.02em] text-[40px] md:text-[52px] leading-[1.05]">
            Terms of Service
          </h1>
          <p className="mt-4 text-[13px] text-bb-gray">Last updated: 24 May 2026</p>

          <div className="prose-bb mt-12 space-y-8 text-[15px] leading-[1.75] text-bb-near-black/90">
            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">1. Who we are</h2>
              <p>
                bombaybreed.com (the &quot;Site&quot;), TCD Intelligence and The Climate
                Desk are operated by Bombay Breed Consulting, a proprietorship
                of Theresa Ronnie, registered in India. References to
                &quot;we&quot;, &quot;us&quot;, or &quot;Bombay Breed&quot; mean
                Bombay Breed Consulting. References to &quot;you&quot; mean the
                user, subscriber or sponsor accessing the Site or services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">2. What you are paying for</h2>
              <p>
                Paid memberships (Enthusiasts, Market Makers, Investor Intel)
                grant a personal, non-transferable licence to access editorial
                research, reports, podcasts and member-only commentary at the
                tier you subscribe to, for the duration of an active billing
                period. You do not acquire ownership of, or any right to
                redistribute, our content.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">3. Editorial independence and no-investment-advice disclaimer</h2>
              <p>
                All research, intelligence briefs, calls and commissioned
                reports are editorial and analytical in nature. Nothing on the
                Site or delivered as part of any membership is investment,
                legal, tax or accounting advice. The Investor Intel tier
                includes consultation calls and diligence-support
                conversations - these are advisory-adjacent but explicitly do
                not constitute regulated financial advice. Decisions you make
                on the basis of our content are your own.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">4. Auto-renewal and consent</h2>
              <p>
                Paid memberships renew automatically each billing period via
                Razorpay-managed e-mandates (cards, UPI AutoPay, or e-NACH). By
                subscribing you authorise Razorpay to debit your selected
                payment instrument for each successive period at the price
                shown at checkout. RBI rules require Razorpay to send you a
                pre-debit notification at least 24 hours before each
                auto-debit; that notification includes a link to pause or
                cancel.
              </p>
              <p>
                You may cancel at any time from your{" "}
                <Link to="/intelligence/account" className="underline decoration-bb-border underline-offset-4">
                  Account page
                </Link>{" "}
                or by emailing{" "}
                <a href="mailto:theresa.ronnie@bombaybreed.com" className="underline decoration-bb-border underline-offset-4">
                  theresa.ronnie@bombaybreed.com
                </a>
                . Cancellation takes effect at the end of the current paid
                period; you retain access until then.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">5. Refunds and chargebacks</h2>
              <p>
                Refund eligibility is governed by our{" "}
                <Link to="/refund-policy" className="underline decoration-bb-border underline-offset-4">
                  Refund and Cancellation Policy
                </Link>
                . By completing checkout you confirm that you have read and
                accepted that policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">6. Intellectual property and acceptable use</h2>
              <p>
                All content is owned by Bombay Breed Consulting or its
                contributors. You may quote up to 200 words with clear
                attribution and a link back. You may not republish, syndicate,
                resell, scrape, train machine-learning models on, or feed into
                any third-party AI system, any of our paid content without
                prior written permission. Account sharing across organisations
                is not permitted; team licences are available on request.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">7. Sponsorships</h2>
              <p>
                Sponsorship engagements (research underwriting, custom
                commissioned reports, regional or sectoral analyses) are
                governed by a separate engagement letter executed between
                Bombay Breed and the sponsor. Editorial independence is
                non-negotiable: sponsors do not approve findings or
                conclusions. Payment terms are milestone-based unless agreed
                otherwise; commencement payments are non-refundable once
                research has begun and cover costs incurred to date.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">8. Payment processing</h2>
              <p>
                All online payments are processed by Razorpay Software Private
                Limited, a PCI DSS Level 1 compliant payment aggregator
                authorised by the Reserve Bank of India. We do not see, store
                or have any access to your card or UPI credentials. International
                card payments are subject to Razorpay&apos;s cross-border
                (PA-CB) settlement and your bank&apos;s currency-conversion
                rates.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">9. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, Bombay Breed&apos;s
                aggregate liability arising out of or related to your use of
                the Site or any membership is limited to the fees you have
                paid us in the twelve months immediately preceding the event
                giving rise to the claim. We are not liable for indirect,
                incidental, special, consequential or exemplary damages.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">10. Governing law and disputes</h2>
              <p>
                These Terms are governed by the laws of India. The courts of
                Mumbai, Maharashtra have exclusive jurisdiction. Before
                commencing any proceedings, the parties will attempt in good
                faith to resolve the dispute through the grievance redressal
                process described in our{" "}
                <Link to="/grievance-redressal" className="underline decoration-bb-border underline-offset-4">
                  Grievance Redressal
                </Link>{" "}
                page.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">11. Changes to these terms</h2>
              <p>
                We may update these Terms from time to time. Material changes
                will be announced to active subscribers by email at least
                fourteen days before they take effect.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">12. Contact</h2>
              <p>
                Bombay Breed Consulting<br />
                Mumbai, Maharashtra, India<br />
                Email:{" "}
                <a href="mailto:theresa.ronnie@bombaybreed.com" className="underline decoration-bb-border underline-offset-4">
                  theresa.ronnie@bombaybreed.com
                </a>
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfService;
