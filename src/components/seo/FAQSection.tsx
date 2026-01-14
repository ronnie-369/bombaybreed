import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

const FAQSection = ({ items, title = 'What Decision-Makers Ask Us' }: FAQSectionProps) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-border/50">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-foreground hover:text-primary">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
