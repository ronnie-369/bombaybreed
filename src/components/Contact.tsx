
import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Contact = () => {
  return (
    <footer id="contact" className="bg-bombay text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-16 px-4 md:px-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="mb-8 text-white/80 max-w-md">
              Have questions about the Bombay breed? Looking to adopt? We'd love to hear from you.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-bombay-accent" />
                <span>123 Cat Avenue, Feline City, FC 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-bombay-accent" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-bombay-accent" />
                <a href="mailto:info@bombaybreed.com" className="hover:underline">info@bombaybreed.com</a>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-1">Name</label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    className="bg-white/5 border-white/20 placeholder:text-white/50 focus:border-bombay-accent" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-1">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-white/5 border-white/20 placeholder:text-white/50 focus:border-bombay-accent" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm mb-1">Subject</label>
                <Input 
                  id="subject" 
                  placeholder="Subject" 
                  className="bg-white/5 border-white/20 placeholder:text-white/50 focus:border-bombay-accent" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full rounded-md bg-white/5 border border-white/20 placeholder:text-white/50 focus:border-bombay-accent p-2"
                  placeholder="Your message"
                ></textarea>
              </div>
              <Button className="bg-white text-bombay hover:bg-bombay-accent hover:text-white transition-colors w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 py-6 px-4 md:px-8 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Bombay Breed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
