import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Refund and Cancellation Policy - Bombay Breed Consulting</title>
        <meta
          name="description"
          content="Refund eligibility, cancellation timelines and chargeback policy for TCD Intelligence subscriptions and sponsor engagements at bombaybreed.com."
        />
        <link rel="canonical" href="https://bombaybreed.com/refund-policy" />
      </Helmet>
      <Header />
      <main className="bg-bb-paper text-bb-near-black">
        <section className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
          <div className="text-[11px] uppercase tracking-[0.24em] text-bb-gray">Legal</div>
          <h1 className="mt-5 font-serif font-normal tracking-[-0.02em] text-[40px] md:text-[52px] leading-[1.05]">
            Refund and Cancellation Policy
          </h1>
          <p className="mt-4 text-[13px] text-bb-gray">Last updated: 24 May 2026</p>

          <div className="mt-12 space-y-8 text-[15px] leading-[1.75] text-bb-near-black/90">
            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">Subscriptions (Enthusiasts, Market Makers, Investor Intel)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All subscriptions are billed monthly in advance. The amount
                  charged covers access for the upcoming billing period.
                </li>
                <li>
                  You may cancel at any time from your{" "}
                  <Link to="/intelligence/account" className="underline decoration-bb-border underline-offset-4">
                    Account page
                  </Link>
                  . Cancellation stops the next renewal; you retain access for
                  the rest of the period you have already paid for.
                </li>
                <li>
                  We do not pro-rate refunds for the current billing period
                  once it has started. Pro-rata refunds for annual plans (if
                  introduced in future) will be at our reasonable discretion.
                </li>
                <li>
                  If you are charged in error - for example a duplicate
                  payment, a failed cancellation, or a charge after your
                  documented cancellation date - we will refund the full
                  amount to your original payment method within 5 to 7
                  business days.
                </li>
                <li>
                  If you believe content materially misrepresented what was
                  promised at checkout, write to us within 7 days of the
                  charge with specifics. We review good-faith complaints and
                  may issue a discretionary refund.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">Sponsor engagements</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Sponsor engagements are governed by an engagement letter
                  signed before research begins. The letter sets out scope,
                  milestones, payment schedule and cancellation terms.
                </li>
                <li>
                  Commencement payments are non-refundable once research is
                  underway, because they cover real research costs incurred to
                  date (fieldwork, contributor honoraria, expert interviews,
                  data licences).
                </li>
                <li>
                  Subsequent milestone payments are refundable, pro-rata,
                  against work not yet performed if you choose to terminate
                  early.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">How to request a refund</h2>
              <p>
                Email{" "}
                <a href="mailto:theresa.ronnie@bombaybreed.com" className="underline decoration-bb-border underline-offset-4">
                  theresa.ronnie@bombaybreed.com
                </a>{" "}
                with the subject line &quot;Refund request - [order reference]&quot;.
                Include the order or payment ID from your Razorpay receipt and
                a one-line reason. We acknowledge within 2 business days and
                resolve within 7 to 10 business days. Approved refunds settle
                in 5 to 7 business days to the original payment method.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">Chargebacks</h2>
              <p>
                Please contact us before filing a chargeback with your bank.
                Chargebacks are expensive for both parties and almost always
                resolvable directly. If a chargeback is filed without first
                attempting to resolve the issue with us, and is found to be
                without merit, we reserve the right to terminate the
                membership and decline future service.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[22px] tracking-tight mb-3">Escalation</h2>
              <p>
                If you are not satisfied with the resolution, see our{" "}
                <Link to="/grievance-redressal" className="underline decoration-bb-border underline-offset-4">
                  Grievance Redressal
                </Link>{" "}
                page for the escalation matrix and the Razorpay dispute
                resolution channel.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RefundPolicy;
