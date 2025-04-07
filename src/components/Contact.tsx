import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const Contact = () => {
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
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-1">Name</label>
                  <Input id="name" placeholder="Your name" className="bg-white/5 border-white/20 placeholder:text-white/50 focus:border-bombay-accent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-1">Email</label>
                  <Input id="email" type="email" placeholder="Your email" className="bg-white/5 border-white/20 placeholder:text-white/50 focus:border-bombay-accent" />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm mb-1">Company</label>
                <Input id="company" placeholder="Your company" className="bg-white/5 border-white/20 placeholder:text-white/50 focus:border-bombay-accent" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-1">Message</label>
                <textarea id="message" rows={4} className="w-full rounded-md bg-white/5 border border-white/20 placeholder:text-white/50 focus:border-bombay-accent p-2" placeholder="Your message"></textarea>
              </div>
              <Button className="bg-white text-bombay hover:bg-bombay-accent hover:text-white transition-colors w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Bombay Breed. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://blog.bombaybreed.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Blog</a>
            <a href="https://linkedin.com/in/theresa-ronnie" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Latest Campaign</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Contact;