import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import BookingDialog from './LazyBookingDialog';
import { Mail } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { formatPhoneInput, normalizePhone } from '@/lib/phoneFormat';

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const DirectContact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phone: '' }
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/myknnoea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim().toLowerCase(),
          phone: normalizePhone(values.phone || ''),
          message: 'Consultation request from contact section',
          form_type: 'contact_quick',
        }),
      });
      if (!response.ok) throw new Error('Failed');

      toast({
        title: "Request sent!",
        description: "I'll be in touch shortly to schedule a conversation.",
      });
      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Failed to send",
        description: "Please try again or email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-8 bg-background border-t border-border/50">
      <div className="container mx-auto max-w-[680px] text-center">
        <ScrollReveal direction="up">
          <SectionLabel number="06" label="Get in Touch" className="text-center block" />
          <h2 className="text-section font-serif tracking-tight mt-6 mb-4">
            For a focused conversation about your carbon strategy, schedule 30 minutes with Theresa.
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={1}>
          <div className="mt-8 mb-10">
            <BookingDialog triggerText="Schedule a Consultation" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={2}>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Prefer email?</p>
            <a 
              href="mailto:theresa.ronnie@bombaybreed.com" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Mail className="h-4 w-4" />
              theresa.ronnie@bombaybreed.com
            </a>
          </div>
        </ScrollReveal>

        {/* Minimal fallback form */}
        <ScrollReveal direction="up" delay={3}>
          <div className="mt-12 pt-10 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">Or leave your details and I'll reach out</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone (optional) - +91 98765 43210" {...field} value={formatPhoneInput(field.value || '')} onChange={(e) => field.onChange(formatPhoneInput(e.target.value))} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
              </form>
            </Form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DirectContact;
