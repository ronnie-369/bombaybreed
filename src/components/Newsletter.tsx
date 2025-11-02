import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { climateDesk } from '@/config/stats';

const Newsletter = ({ id }: { id?: string } = {}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      // Sanitize and validate email
      const sanitizedEmail = email.trim().toLowerCase();
      
      // Basic email validation
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(sanitizedEmail)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Import Supabase client
      const { supabase } = await import("@/integrations/supabase/client");
      
      // Save to newsletter subscribers table
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: sanitizedEmail,
        });

      if (error) {
        console.error('Newsletter subscription error:', error);
        
        // Handle duplicate email error
        if (error.code === '23505') {
          toast({
            title: "Already subscribed!",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          toast({
            title: "Subscription failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Subscription successful!",
          description: "You'll receive updates from The Climate Desk.",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={id || "newsletter"} className="py-20 px-4 md:px-8 bg-gradient-to-r from-primary to-accent animate-fade-in">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full w-fit mx-auto mb-4">
              <Mail className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Subscribe to The Climate Desk
            </h2>
            <p className="text-white/90 text-lg">
              Get Theresa Ronnie's latest insights on jobs, carbon markets, and India's climate transition delivered to your inbox.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/50 border-white/30 text-foreground placeholder:text-foreground/70 focus:border-primary focus:bg-white/80"
                required
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                variant="gradient"
                className="font-medium px-8"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
          
          <p className="text-white/70 text-sm mt-4">
            Join {climateDesk.subscriberCountFormatted}+ sustainability professionals. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;