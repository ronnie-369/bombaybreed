import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import BookingDialog from './BookingDialog';
import { LinkedinIcon, Mail, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  company: z.string().trim().max(100, { message: "Company name must be less than 100 characters" }).optional(),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(1000, { message: "Message must be less than 1000 characters" })
});

type FormValues = z.infer<typeof formSchema>;

const DirectContact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const sanitizedData = {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        company: values.company?.trim() || null,
        message: values.message.trim()
      };

      const { supabase } = await import("@/integrations/supabase/client");
      
      const { error } = await supabase
        .from('contact_inquiries')
        .insert(sanitizedData);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "I'll respond to your inquiry shortly.",
      });

      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
              Get in Touch
            </p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              Let's Discuss Your Governance Needs
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Schedule a consultation or send a message to explore how I can support your board
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column - Contact Info */}
          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-md">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a href="mailto:theresa.ronnie@bombaybreed.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      theresa.ronnie@bombaybreed.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-md">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Bangalore, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <div className="p-6 bg-secondary/50 rounded-lg">
                  <h3 className="text-sm font-medium mb-4">
                    Schedule Directly
                  </h3>
                  <BookingDialog 
                    triggerText="Book Consultation"
                  />
                </div>
              </div>

              <div>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <LinkedinIcon className="h-4 w-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Contact Form */}
          <ScrollReveal direction="left" className="lg:col-span-3">
            <div className="p-8 bg-card rounded-lg border border-border/50">
              <h3 className="text-lg font-medium mb-6">Send a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@company.com" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company name" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your governance needs..." 
                            className="min-h-[120px] bg-background"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border/50 text-center space-y-4">
          <p className="text-sm italic text-primary/70 font-serif">
            "It will take all of us, to do this for all of us"
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bombay Breed Consulting. All rights reserved. | <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DirectContact;
