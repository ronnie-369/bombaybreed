
import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useInView } from '@/hooks/use-in-view';
import { trackConversion } from '@/utils/analytics';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  company: z.string().optional(),
  message: z.string().min(5, {
    message: 'Message must be at least 5 characters'
  })
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const { ref: pricingRef, isInView: pricingInView } = useInView();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Sanitize input data
      const sanitizedData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        company: data.company?.trim() || '',
        message: data.message.trim()
      };

      // Import Supabase client
      const { supabase } = await import("@/integrations/supabase/client");
      
      // Save to contact inquiries table
      const { error } = await supabase
        .from('contact_inquiries')
        .insert({
          name: sanitizedData.name,
          email: sanitizedData.email,
          company: sanitizedData.company,
          message: sanitizedData.message,
        });

      if (error) {
        console.error('Contact form submission error:', error);
        toast({
          title: "Message failed to send",
          description: "Please try again later.",
          variant: "destructive",
        });
      } else {
        // Send email notification in background (doesn't block user experience)
        try {
          const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
            body: {
              ...sanitizedData,
              submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            }
          });
          
          if (emailError) {
            console.error('Email notification error:', emailError);
            // Don't show error to user - data is still saved
          }
        } catch (emailErr) {
          console.error('Email function invocation error:', emailErr);
          // Don't show error to user - data is still saved
        }
        
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible."
        });
        
        // Track contact form submission
        trackConversion.leadSubmission('contact_form', {
          has_company: !!sanitizedData.company,
        });
        
        form.reset();
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Message failed to send",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer id="contact" className="bg-[rgba(59,130,246,0.15)] text-foreground animate-fade-in">
      <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
      <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 text-foreground">Start the Conversation</h2>
              <p className="text-lg md:text-xl font-medium text-foreground mb-3 leading-relaxed">
                Ready to transform complexity into competitive advantage?
              </p>
              <p className="text-base md:text-lg text-foreground/80 max-w-md leading-relaxed">
                Let's discuss how strategic sustainability communications can strengthen your executive positioning and stakeholder confidence.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-foreground">
                <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <span>+91-9916090806</span>
              </div>
              <div className="flex items-center text-foreground">
                <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <span>Malleshwaram, Bangalore</span>
              </div>
              <div className="flex items-center text-foreground">
                <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <a href="mailto:ronnie@bombaybreed.com" className="story-link hover:text-blue-600">ronnie@bombaybreed.com</a>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="glass-card bg-blue-500/10 hover:bg-blue-500/20 p-3 rounded-full hover-scale">
                <Linkedin className="h-5 w-5 text-blue-600" />
              </a>
            </div>
            
            <div ref={pricingRef} className="glass-card border-l-4 border-blue-600 bg-gradient-to-r from-blue-500/10 to-blue-500/5 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  Pricing
                </span>
                <span className="text-xs text-foreground/60">Flexible engagements</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Executive Advisory Retainer
              </h3>
              <p className="text-sm text-foreground/70 mb-3">
                Strategic guidance tailored to your C-suite priorities
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-foreground/60">Starting from</span>
                <span className={`text-2xl font-bold text-foreground glow-pill ${pricingInView ? 'active' : ''}`}>
                  ₹30,000
                </span>
                <span className="text-sm text-foreground/60">per month + GST</span>
              </div>
              <p className="text-xs text-foreground/60 mt-3">
                Includes monthly strategic consultations, stakeholder communication frameworks, and ongoing advisory support
              </p>
            </div>
          </div>
          
          <div className="glass-card bg-blue-500/10 rounded-2xl p-6 md:p-8 h-fit hover-scale">
            <div className="mb-6">
              <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">Get Expert Guidance</h3>
              <p className="text-sm text-foreground/70">
                Share your sustainability communications challenge—we'll respond within 24 hours
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({
                  field
                 }) => <FormItem>
                        <FormLabel className="text-note mb-1 text-foreground">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="bg-white/50 border-blue-300 placeholder:text-muted-foreground focus:border-blue-600 focus:bg-white" {...field} />
                        </FormControl>
                        <FormMessage className="text-note text-red-600" />
                      </FormItem>} />
                  <FormField control={form.control} name="email" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-note mb-1 text-foreground">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" className="bg-white/50 border-blue-300 placeholder:text-muted-foreground focus:border-blue-600 focus:bg-white" {...field} />
                        </FormControl>
                        <FormMessage className="text-note text-red-600" />
                      </FormItem>} />
                </div>
                <FormField control={form.control} name="company" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-note mb-1 text-foreground">Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company" className="bg-white/50 border-blue-300 placeholder:text-muted-foreground focus:border-blue-600 focus:bg-white" {...field} />
                      </FormControl>
                      <FormMessage className="text-note text-red-600" />
                    </FormItem>} />
                <FormField control={form.control} name="message" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-note mb-1 text-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea rows={4} className="w-full rounded-md bg-white/50 border border-blue-300 placeholder:text-muted-foreground focus:border-blue-600 focus:bg-white p-2" placeholder="Your message" {...field} />
                      </FormControl>
                      <FormMessage className="text-note text-red-600" />
                    </FormItem>} />
                <Button 
                  type="submit" 
                  variant="gradient" 
                  className="w-full font-semibold"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        <div className="border-t border-blue-300/40 mt-12 py-6 flex flex-col md:flex-row justify-between items-center text-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} Bombay Breed. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer" className="story-link hover:text-blue-600 transition-colors">Blog</a>
            <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="story-link hover:text-blue-600 transition-colors">LinkedIn</a>
            <a href="/privacy-policy" className="story-link hover:text-blue-600 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
