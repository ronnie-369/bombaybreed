
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
        console.log('Contact form data saved:', sanitizedData);
        
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
          } else {
            console.log('Email notification sent successfully');
          }
        } catch (emailErr) {
          console.error('Email function invocation error:', emailErr);
          // Don't show error to user - data is still saved
        }
        
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible."
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
    <footer id="contact" className="bg-gradient-to-b from-primary to-accent text-white animate-fade-in">
      <div className="w-full h-1 bg-gradient-to-r from-accent to-primary"></div>
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-sans font-bold mb-4">Contact</h2>
              <p className="mb-6 text-white/80 max-w-md leading-relaxed">
                We need to stay on the right side of Climate Action. Because, the children.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span>+91-9916090806</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span>Malleshwaram, Bangalore</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <a href="mailto:ronnie@bombaybreed.com" className="story-link hover:text-white/80">ronnie@bombaybreed.com</a>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="glass-card bg-white/10 hover:bg-white/20 p-3 rounded-full hover-scale">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
            <div ref={pricingRef} className="relative border-l-4 border-accent bg-white/5 p-6 rounded-r-xl">
              <div className="absolute top-2 right-2 text-white font-medium uppercase tracking-wide shine-text">
                Pricing
              </div>
              <h3 className="text-lg font-sans font-semibold text-white drop-shadow-lg leading-relaxed">
                Talk to me about your Executive Advisory Retainer from as low as <span className={`text-white font-bold glow-pill ${pricingInView ? 'active' : ''}`}>INR 30,000 pm +gst</span>.
              </h3>
            </div>
          </div>
          
          <div className="glass-card bg-white/10 rounded-2xl p-6 md:p-8 h-fit hover-scale">
            <h3 className="text-xl font-sans font-semibold mb-6">Send us a message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-sm mb-1">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="bg-white/10 border-white/30 placeholder:text-white/60 focus:border-white focus:bg-white/20" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>} />
                  <FormField control={form.control} name="email" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-sm mb-1">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" className="bg-white/10 border-white/30 placeholder:text-white/60 focus:border-white focus:bg-white/20" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>} />
                </div>
                <FormField control={form.control} name="company" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-sm mb-1">Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company" className="bg-white/10 border-white/30 placeholder:text-white/60 focus:border-white focus:bg-white/20" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>} />
                <FormField control={form.control} name="message" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-sm mb-1">Message</FormLabel>
                      <FormControl>
                        <Textarea rows={4} className="w-full rounded-md bg-white/10 border border-white/30 placeholder:text-white/60 focus:border-white focus:bg-white/20 p-2" placeholder="Your message" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
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
        
        <div className="border-t border-white/20 mt-12 py-6 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Bombay Breed. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer" className="story-link hover:text-white transition-colors">Blog</a>
            <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="story-link hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
