import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate subscription process
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "You'll receive updates from The Climate Desk.",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-bombay to-bombay-light">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Mail className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Subscribe to The Climate Desk
            </h2>
            <p className="text-white/90 text-lg">
              Get Theresa Ronnie's latest insights on jobs, carbon markets, and India's climate transition delivered to your inbox.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white"
              required
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-white text-bombay hover:bg-white/90 font-medium px-8"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="text-white/70 text-sm mt-4">
            Join 2,500+ sustainability professionals. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;