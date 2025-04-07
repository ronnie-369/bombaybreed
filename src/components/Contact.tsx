
import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().optional(),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data submitted:', data);
    
    // Here you would typically send the data to a server or API
    // For now, we'll just log it and show a success message
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    
    form.reset();
  };

  return <footer id="contact" className="bg-bombay text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-16 px-4 md:px-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contact</h2>
            <p className="mb-8 text-white/80 max-w-md">
              We need to stay on the right side of Climate Action. Because, the children.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-bombay-accent" />
                <span>+91-9916090806</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-bombay-accent" />
                <span>Cooke Town, Bangalore</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-bombay-accent" />
                <a href="mailto:ronnie@bombaybreed.com" className="hover:underline">ronnie@bombaybreed.com</a>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://linkedin.com/in/theresa-ronnie" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Basic Consulting Retainer for the CMO</h3>
              <p className="text-white/80 mb-4">
                Call to find out more about our consulting services tailored for CMOs.
              </p>
              
            </div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm mb-1">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="bg-white/5 border-white/20 placeholder:text-white/50 focus:border-bombay-accent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm mb-1">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Your email"
                            className="bg-white/5 border-white/20 placeholder:text-white/50 focus:border-bombay-accent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-1">Company</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company"
                          className="bg-white/5 border-white/20 placeholder:text-white/50 focus:border-bombay-accent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm mb-1">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          className="w-full rounded-md bg-white/5 border border-white/20 placeholder:text-white/50 focus:border-bombay-accent p-2"
                          placeholder="Your message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="bg-white text-bombay hover:bg-bombay-accent hover:text-white transition-colors w-full">
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        <div className="border-t border-white/20 py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Bombay Breed. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Blog</a>
            <a href="https://linkedin.com/in/theresa-ronnie" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Latest Campaign</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Contact;
