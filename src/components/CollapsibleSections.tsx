import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WhyClimateDesk from '@/components/WhyClimateDesk';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import ComplianceToCredibilitySection from '@/components/ComplianceToCredibilitySection';
import CaseStudies from '@/components/CaseStudies';

const CollapsibleSections = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="why-climate-desk" className="border rounded-lg px-6 bg-card">
          <AccordionTrigger className="text-base md:text-lg font-heading hover:no-underline">
            What Makes the Climate Desk Different
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <WhyClimateDesk />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="services" className="border rounded-lg px-6 bg-card">
          <AccordionTrigger className="text-base md:text-lg font-heading hover:no-underline">
            Our Services
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <Services />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="expertise" className="border rounded-lg px-6 bg-card">
          <AccordionTrigger className="text-base md:text-lg font-heading hover:no-underline">
            This is Where Sustainability Communications Adds Significant Value
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <Expertise />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="success-stories" className="border rounded-lg px-6 bg-card">
          <AccordionTrigger className="text-base md:text-lg font-heading hover:no-underline">
            Success Stories
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <CaseStudies />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cxo-guide" className="border rounded-lg px-6 bg-card">
          <AccordionTrigger className="text-base md:text-lg font-heading hover:no-underline">
            Download The CXO Guide
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <ComplianceToCredibilitySection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CollapsibleSections;
