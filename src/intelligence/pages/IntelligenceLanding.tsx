import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import IntelligenceLayout from "../components/IntelligenceLayout";
import SectionLabel from "../components/SectionLabel";

const IntelligenceLanding = () => (
  <IntelligenceLayout>
    <Helmet>
      <title>TCD Intelligence — Bombay Breed</title>
      <meta
        name="description"
        content="Subscription intelligence on India climate policy, capital formation, and corporate disclosure. Published by Bombay Breed."
      />
    </Helmet>

    <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-20">
      <div className="max-w-3xl">
        <SectionLabel>Bombay Breed Intelligence</SectionLabel>
        <h1 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[60px] md:text-[72px] leading-[0.95] text-bb-near-black">
          TCD Intelligence
        </h1>
        <p className="mt-8 text-[16px] leading-[1.7] text-bb-gray max-w-xl">
          A subscription intelligence service from Bombay Breed. I publish working research on
          India's climate policy, capital formation, and corporate disclosure for board directors,
          institutional investors, and policy operators who need a single, defensible read of the
          terrain.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/intelligence/membership"
            className="inline-flex items-center h-12 px-8 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition"
          >
            See membership tiers
          </Link>
          <Link
            to="/intelligence/signup"
            className="inline-flex items-center h-12 px-8 rounded-[10px] bg-bb-off-white border border-bb-slate text-bb-slate text-[14px] font-medium hover:bg-bb-slate/5 transition"
          >
            Create an account
          </Link>
        </div>
      </div>
    </section>

    <hr className="border-t border-bb-border max-w-[1200px] mx-auto" />

    <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
      <SectionLabel>What you get</SectionLabel>
      <h2 className="mt-6 font-serif font-normal tracking-[-0.025em] text-[32px] md:text-[36px] leading-[1.1] text-bb-near-black max-w-2xl">
        A working library, not a content firehose.
      </h2>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {[
          {
            label: "Flagship reports",
            title: "Long-form research, on the day of release.",
            body: "Investor synthesis, policy analysis, and sector deep dives. Sourced, dated, and structured for decision use.",
          },
          {
            label: "Intelligence briefs",
            title: "The week, read for you.",
            body: "Concise notes on regulatory shifts, capital announcements, and emerging risk surfaces. Filed against named sources.",
          },
          {
            label: "Analyst access",
            title: "A direct line, on the higher tiers.",
            body: "Submit questions, request bespoke notes, or book a quarterly briefing with Theresa Ronnie.",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-bb-border p-8 flex flex-col"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.36em] text-bb-copper">
              {card.label}
            </div>
            <h3 className="mt-4 font-serif text-[20px] tracking-tight text-bb-near-black leading-snug">
              {card.title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.65] text-bb-gray">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  </IntelligenceLayout>
);

export default IntelligenceLanding;
