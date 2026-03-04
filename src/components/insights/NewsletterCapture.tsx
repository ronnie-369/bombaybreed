import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const NewsletterCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email });
      if (error && error.code !== '23505') throw error;
      setIsSuccess(true);
      toast({ title: 'Subscribed', description: 'You\'ll hear from us when it matters.' });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 md:px-8 bg-foreground">
      <div className="container mx-auto max-w-[560px] text-center">
        <h2 className="font-serif text-[28px] text-background mb-3">
          Stay ahead of India's carbon transition.
        </h2>
        <p className="text-[15px] text-background/70 mb-8">
          Intelligence briefs, regulatory alerts, and flagship research - delivered when it matters.
        </p>

        {isSuccess ? (
          <p className="text-background/80 text-sm">✓ You're subscribed. Watch your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-accent/40 focus-visible:border-accent/50"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-[13px] font-semibold uppercase tracking-wider px-6"
            >
              {isLoading ? '...' : 'Subscribe →'}
            </Button>
          </form>
        )}

        <p className="text-[12px] text-background/40 mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};

export default NewsletterCapture;
