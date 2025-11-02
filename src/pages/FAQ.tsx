import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What does Bombay Breed do?",
      answer: "We help climate, energy and carbon market leaders communicate complex ideas with clarity. We turn science, policy, technology and human behaviour into strategy, content and action. We build internal skills, design ROI-led campaigns and enable AI-driven brand and communications systems."
    },
    {
      question: "Why are we not a PR or CSR agency?",
      answer: "Because PR manages perception. CSR reports activity. We work at the frontier — where carbon markets, compliance, renewable energy, finance and human behaviour meet. We communicate transition, not optics. We solve for trust, investment and adoption — not headlines."
    },
    {
      question: "What is The Climate Desk?",
      answer: "Our publication. Read by journalists, policymakers, founders and investors across the world. It decodes carbon markets, climate policy and energy transition with sharp editorial insight. Not activism. Not feel-good sustainability. Real strategy, real signals.",
      cta: {
        text: "Subscribe",
        link: "#newsletter"
      },
      ctaNote: "to stay ahead of policy shifts, market moves and behavioural trends."
    },
    {
      question: "Who do we work with?",
      answer: "Energy companies, climate-tech founders, carbon market players, policy think tanks, multilateral agencies and businesses building net-zero strategies. If you work in climate, carbon, energy or sustainability — we work with you."
    },
    {
      question: "What does strategic carbon & energy communication involve?",
      answer: "Understanding carbon accounting, compliance, policy, market mechanisms, human motivations and ecological risk. Translating that into investor decks, stakeholder narratives, sales enablement, leadership messaging and public positioning."
    },
    {
      question: "What is your business transformation work?",
      answer: "We build in-house creative and climate communication capability. We train teams to use AI tools, behavioural strategy, carbon literacy and ROI-led marketing. We optimise systems — sales, brand, communication — so your business scales, not just markets."
    },
    {
      question: "What results do you measure?",
      answer: "Impact on revenue, leads, stakeholder trust, investor interest, regulatory confidence, faster execution cycles and internal capability built. Creativity meets numbers."
    },
    {
      question: "How can we start working together?",
      answer: "Book a discovery call. We diagnose your gaps, align on outcomes, build a roadmap and start execution — strategy → content → capability → results. Let's build the future right, not later."
    },
    {
      question: "Do you work globally and in multiple currencies?",
      answer: "Yes. We're based in India but work across Asia, Europe, the Middle East and beyond. We invoice in USD, EUR, AED, AUD, SGD and INR. Climate and energy are global systems — our work is too."
    },
    {
      question: "Who do you usually work with — startups or large institutions?",
      answer: "Both. We work with climate tech founders, carbon market intermediaries, energy companies, policy think tanks and global NGOs. Some are just starting. Some are already shaping regulation. What they have in common — they're serious about impact."
    },
    {
      question: "What makes your communication style different?",
      answer: "We don't do generic awareness campaigns. We translate frontier technologies, compliance rules and market shifts into human language that drives decisions. It's science-led, policy-aware and behaviour-focused — built to influence investors, regulators and communities."
    },
    {
      question: "What is your mission with The Climate Desk?",
      answer: "The Climate Desk has one client: the planet and its people. We write for those building a liveable, prosperous future. If we work together, we're partners — not vendor and client. Our role is to help you grow profitably while protecting people and planet. If that's your north star too — let's begin."
    }
  ];

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

          <article className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-foreground">
              Frequently Asked Questions
            </h1>

            <div className="not-prose mb-12">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80 leading-relaxed">
                      {faq.answer}
                      {faq.cta && (
                        <>
                          {' '}
                          <a 
                            href={faq.cta.link} 
                            className="font-semibold text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                          >
                            {faq.cta.text}
                          </a>
                          {faq.ctaNote && ` ${faq.ctaNote}`}
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-16 p-8 bg-muted rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Have more questions?</h2>
              <p className="text-foreground/80 mb-6">
                We're here to help. Reach out through the contact form below or schedule a discovery call to discuss your specific needs.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default FAQ;
