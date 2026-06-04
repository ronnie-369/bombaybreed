
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
import BookingDialog from './LazyBookingDialog';
import { formatPhoneInput, normalizePhone } from '@/lib/phoneFormat';
import { persistFormSubmissionAsync } from '@/lib/formPersistence';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  company: z.string().optional(),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
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
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        company: data.company?.trim() || '',
        phone: normalizePhone(data.phone || ''),
        message: data.message.trim(),
        form_type: 'contact',
        _subject: `General enquiry - ${data.name.trim()}${data.company?.trim() ? ` (${data.company.trim()})` : ''}`,
        _replyto: data.email.trim().toLowerCase(),
      };
      const response = await fetch('https://formspree.io/f/myknnoea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed');
      persistFormSubmissionAsync(payload);

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible."
      });
      form.reset();
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
              <h2 className="text-3xl font-heading font-bold mb-4">Contact</h2>
              <p className="mb-6 text-white/80 max-w-md leading-relaxed text-body">
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
                <a href="mailto:theresa.ronnie@bombaybreed.com" className="story-link hover:text-white/80">theresa.ronnie@bombaybreed.com</a>
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
              <h3 className="text-body font-heading font-semibold text-white drop-shadow-lg leading-relaxed mt-4">
                Talk to me about your Executive Advisory Retainer from as low as <span className={`text-white font-bold glow-pill ${pricingInView ? 'active' : ''}`}>INR 30,000 pm +gst</span>.
              </h3>
            </div>
          </div>
          
          <div className="glass-card bg-white/10 rounded-2xl p-6 md:p-8 h-fit hover-scale">
            <div className="text-center mb-6">
              <p className="text-note text-white/80 mb-4">Prefer to book directly?</p>
              <BookingDialog triggerText="Book a Meeting" />
            </div>
            
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20"></span>
              </div>
              <div className="relative flex justify-center text-note">
                <span className="bg-white/10 px-4 text-white/60">Or send us a message below</span>
              </div>
            </div>

            <h3 className="text-xl font-heading font-semibold mb-6">Send us a message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({
                  field
                 }) => <FormItem>
                        <FormLabel className="text-note mb-1">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="bg-white/10 border-white/30 placeholder:text-white/60 focus:border-white focus:bg-white/20" {...field} />
                        </FormControl>
                        <FormMessage className="text-note text-red-300" />
                      </FormItem>} />
                  <FormField control={form.control} name="email" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-note mb-1">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" className="bg-white/10 border-white/30 placeholder:text-white/60 focus:border-white focus:bg-white/20" {...field} />
                        </FormControl>
                        <FormMessage className="text-note text-red-300" />
                      </FormItem>} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="company" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-note mb-1">Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company" className="bg-white/10 border-white/30 placeholder:text-white/60 focus:border-white focus:bg-white/20" {...field} />
                        </FormControl>
                        <FormMessage className="text-note text-red-300" />
                      </FormItem>} />
                  <FormField control={form.control} name="phone" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-note mb-1">Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" className="bg-white/10 border-white/30 placeholder:text-white/60 focus:border-white focus:bg-white/20" {...field} value={formatPhoneInput(field.value || '')} onChange={(e) => field.onChange(formatPhoneInput(e.target.value))} />
                        </FormControl>
                        <FormMessage className="text-note text-red-300" />
                      </FormItem>} />
                </div>
                <FormField control={form.control} name="message" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-note mb-1">Message</FormLabel>
                      <FormControl>
                        <Textarea rows={4} className="w-full rounded-md bg-white/10 border border-white/30 placeholder:text-white/60 focus:border-white focus:bg-white/20 p-2" placeholder="Your message" {...field} />
                      </FormControl>
                      <FormMessage className="text-note text-red-300" />
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
            <a href="/privacy-policy" className="story-link hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
