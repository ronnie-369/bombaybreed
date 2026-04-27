import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";

const Onboarding = () => (
  <IntelligenceLayout>
    <Helmet>
      <title>Welcome — TCD Intelligence</title>
    </Helmet>

    <section className="max-w-2xl mx-auto px-6 pt-24 pb-24 text-center">
      <SectionLabel>You are in</SectionLabel>
      <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[44px] leading-[1.1] text-bb-near-black">
        Welcome to TCD Intelligence.
      </h1>
      <p className="mt-6 text-[16px] leading-[1.7] text-bb-gray">
        Your order has been recorded. While the payment confirms, you can preview the published
        Foundational layer from your dashboard. Higher tier reports unlock automatically once your
        subscription is marked active.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/intelligence/dashboard"
          className="inline-flex items-center h-12 px-8 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition"
        >
          Go to dashboard
        </Link>
        <Link
          to="/intelligence/account"
          className="inline-flex items-center h-12 px-8 rounded-[10px] bg-bb-off-white border border-bb-slate text-bb-slate text-[14px] font-medium hover:bg-bb-slate/5 transition"
        >
          View account
        </Link>
      </div>
    </section>
  </IntelligenceLayout>
);

export default Onboarding;
