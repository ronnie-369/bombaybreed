import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from './ui/button';

const FAQSection = () => {
  // Show only first 6 FAQs on homepage
  const featuredFaqs = [
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
      answer: "Our publication. Read by journalists, policymakers, founders and investors across the world. It decodes carbon markets, climate policy and energy transition with sharp editorial insight. Not activism. Not feel-good sustainability. Real strategy, real signals."
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
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick answers to common questions about working with Bombay Breed
          </p>
        </div>

        <div className="mb-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {featuredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-sm md:text-base font-heading hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-foreground/80 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/faq" className="inline-flex items-center gap-2">
              View All FAQs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
