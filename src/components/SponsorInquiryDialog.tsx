import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { trackSponsorEvent } from '@/utils/sponsorAnalytics';

const inquirySchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  email: z.string().trim().email({ message: 'Please enter a valid email' }).max(255),
  organisation: z.string().trim().max(150).optional(),
  role: z.string().trim().max(100).optional(),
  project: z.string().trim().min(1).max(300),
  message: z.string().trim().max(1500).optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: 'Please confirm to continue.',
  }),
});

type InquiryValues = z.infer<typeof inquirySchema>;

interface SponsorInquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: string;
}

const generateReferenceId = (): string => {
  // Short, human-friendly ref: BB-YYYYMMDD-XXXX (uppercase alphanumeric)
  const d = new Date();
  const yyyymmdd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(
    d.getDate(),
  ).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BB-${yyyymmdd}-${rand}`;
};

const SponsorInquiryDialog = ({ open, onOpenChange, project }: SponsorInquiryDialogProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Track which element opened the dialog so we can return focus to it on
  // close - critical for keyboard users navigating the project cards.
  const triggerRef = useRef<HTMLElement | null>(null);

  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      organisation: '',
      role: '',
      project,
      message: '',
      consent: false,
    },
  });

  useEffect(() => {
    if (open) {
      if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
        triggerRef.current = document.activeElement;
      }
      form.setValue('project', project);
    }
  }, [open, project, form]);

  // Reset transient state after close + restore focus to the trigger card.
  useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => {
        setReferenceId(null);
        setCopied(false);
        form.reset();
        const el = triggerRef.current;
        if (el && typeof el.focus === 'function' && document.contains(el)) {
          try { el.focus({ preventScroll: true }); } catch { el.focus(); }
        }
        triggerRef.current = null;
      }, 200);
      return () => window.clearTimeout(t);
    }
  }, [open, form]);

  // Block dismissal while a submission is in flight.
  const handleOpenChange = (next: boolean) => {
    if (submitting && !next) return;
    onOpenChange(next);
  };

  const handleCopyReference = async () => {
    if (!referenceId) return;
    try {
      await navigator.clipboard.writeText(referenceId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Could not copy',
        description: 'Please copy the reference manually.',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: InquiryValues) => {
    setSubmitting(true);
    const ref = generateReferenceId();
    try {
      const response = await fetch('https://formspree.io/f/myknnoea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference_id: ref,
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          organisation: data.organisation?.trim() || '',
          role: data.role?.trim() || '',
          project_of_interest: data.project.trim(),
          message: data.message?.trim() || '',
          consent: data.consent,
          consent_text: 'User agreed to be contacted about this inquiry and to our privacy practices.',
          form_type: 'sponsor_open_project_inquiry',
          _subject: `Sponsor inquiry [${ref}]: ${data.project.trim()}`,
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      trackSponsorEvent('sponsor_inquiry_submitted', {
        location: 'premium_access_lounge_open_projects',
        project: data.project.trim(),
      });

      // Show the in-dialog success screen with the reference ID; do NOT close.
      setReferenceId(ref);
    } catch (error) {
      console.error('Sponsor inquiry submission error:', error);
      toast({
        title: 'Could not send your inquiry',
        description: 'Please try again, or email theresa.ronnie@bombaybreed.com.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-lg relative"
        onInteractOutside={(e) => { if (submitting) e.preventDefault(); }}
        onEscapeKeyDown={(e) => { if (submitting) e.preventDefault(); }}
        aria-busy={submitting}
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-tight">
            {referenceId ? 'Inquiry received' : 'Register interest'}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {referenceId
              ? 'Thank you. We will reply within two business days.'
              : 'Tell us a little about you and we will come back with a shape and a number.'}
          </DialogDescription>
        </DialogHeader>

        {referenceId ? (
          <div className="space-y-5 py-2">
            <div className="rounded-md border border-border/70 bg-muted/30 p-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-2">
                Reference ID
              </p>
              <div className="flex items-center justify-between gap-3">
                <code className="font-mono text-base text-foreground tracking-wider select-all">
                  {referenceId}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyReference}
                  aria-label="Copy reference ID"
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Quote this reference if you need to follow up at{' '}
                <a
                  href="mailto:theresa.ronnie@bombaybreed.com"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  theresa.ronnie@bombaybreed.com
                </a>
                .
              </p>
            </div>

            <DialogFooter>
              <Button type="button" onClick={() => handleOpenChange(false)}>
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <fieldset disabled={submitting} aria-busy={submitting} className="space-y-4 contents">
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                    Interested in
                  </FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-muted/40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="name" />
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
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      Work email
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="email" autoComplete="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="organisation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      Organisation
                    </FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="organization" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      Role
                    </FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="organization-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                    What would you like to explore?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Scope, timing, or any specific question."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="rounded-md border border-border/70 p-3">
                  <div className="flex items-start gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                        aria-required="true"
                        className="mt-0.5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-snug">
                      <FormLabel className="text-xs font-normal text-foreground cursor-pointer">
                        I agree to be contacted about this inquiry and acknowledge the{' '}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-foreground/80"
                        >
                          privacy policy
                        </a>
                        . Required.
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting || !form.watch('consent')}>
                {submitting ? 'Sending...' : 'Send inquiry'}
              </Button>
            </DialogFooter>
            </fieldset>
          </form>
        </Form>
        )}

        {submitting && (
          <div
            className="absolute inset-0 z-10 flex flex-col gap-3 rounded-lg bg-background/85 backdrop-blur-sm p-6 pt-20"
            role="status"
            aria-live="polite"
            aria-label="Sending your inquiry"
          >
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-9 w-full" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
            <Skeleton className="h-20 w-full" />
            <p className="text-xs text-muted-foreground text-center mt-2">
              Sending your inquiry...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SponsorInquiryDialog;
