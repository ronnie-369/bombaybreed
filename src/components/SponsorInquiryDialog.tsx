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
import { formatPhoneInput, normalizePhone } from '@/lib/phoneFormat';

const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be 100 characters or fewer' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email' })
    .max(255, { message: 'Email must be 255 characters or fewer' }),
  organisation: z
    .string()
    .trim()
    .max(150, { message: 'Organisation must be 150 characters or fewer' })
    .optional(),
  role: z
    .string()
    .trim()
    .max(100, { message: 'Role must be 100 characters or fewer' })
    .optional(),
  phone: z
    .string()
    .trim()
    .max(30, { message: 'Phone must be 30 characters or fewer' })
    .refine((v) => !v || /^[+\d][\d\s().-]{6,}$/.test(v), {
      message: 'Please enter a valid phone number',
    })
    .optional(),
  project: z.string().trim().min(1).max(300),
  message: z
    .string()
    .trim()
    .max(1500, { message: 'Please keep your message under 1500 characters' })
    .optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: 'Please confirm to continue.',
  }),
});

type InquiryValues = z.infer<typeof inquirySchema>;

export interface SponsorProjectDetails {
  title: string;
  angle: string;
  scope: string;
  output: string;
  effort: string;
}

export interface SponsorBandDetails {
  engagement: string;
  price: string;
  scope: string;
}

interface SponsorInquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: string;
  projectDetails?: SponsorProjectDetails;
  bandDetails?: SponsorBandDetails;
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

const SponsorInquiryDialog = ({ open, onOpenChange, project, projectDetails, bandDetails }: SponsorInquiryDialogProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Track which element opened the dialog so we can return focus to it on
  // close - critical for keyboard users navigating the project cards.
  const triggerRef = useRef<HTMLElement | null>(null);

  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      organisation: '',
      role: '',
      phone: '',
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
        setSubmitError(null);
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
    setSubmitError(null);
    const ref = generateReferenceId();

    // Map Formspree's `field` values back onto our react-hook-form field names
    // so a server-side validation problem highlights the right input.
    const fieldMap: Record<string, keyof InquiryValues> = {
      name: 'name',
      email: 'email',
      organisation: 'organisation',
      role: 'role',
      phone: 'phone',
      project_of_interest: 'project',
      message: 'message',
      consent: 'consent',
    };

    try {
      const response = await fetch('https://formspree.io/f/myknnoea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          reference_id: ref,
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          organisation: data.organisation?.trim() || '',
          role: data.role?.trim() || '',
          phone: normalizePhone(data.phone || ''),
          project_of_interest: data.project.trim(),
          message: data.message?.trim() || '',
          consent: data.consent,
          consent_text: 'User agreed to be contacted about this inquiry and to our privacy practices.',
          form_type: 'sponsor_open_project_inquiry',
          ...(bandDetails && {
            engagement_band: bandDetails.engagement,
            indicative_price: bandDetails.price,
            engagement_scope: bandDetails.scope,
          }),
          _subject: `Sponsor inquiry [${ref}]: ${data.project.trim()}`,
        }),
      });

      if (!response.ok) {
        // Try to surface Formspree's structured field errors if present.
        let body: { errors?: Array<{ field?: string; message?: string; code?: string }> } = {};
        try { body = await response.json(); } catch { /* non-JSON response */ }

        const errors = body?.errors ?? [];
        let hadFieldError = false;
        for (const err of errors) {
          const target = err.field ? fieldMap[err.field] : undefined;
          if (target) {
            form.setError(target, { type: 'server', message: err.message || 'Invalid value.' });
            hadFieldError = true;
          }
        }

        if (hadFieldError) {
          setSubmitError('Please review the highlighted fields and try again.');
        } else if (response.status === 429) {
          setSubmitError('Too many submissions. Please wait a moment and try again.');
        } else if (response.status >= 500) {
          setSubmitError('Our form service is temporarily unavailable. Please try again in a minute.');
        } else {
          setSubmitError(
            errors[0]?.message ||
              'We could not send your inquiry. Please try again, or email theresa.ronnie@bombaybreed.com.',
          );
        }
        return;
      }

      trackSponsorEvent('sponsor_inquiry_submitted', {
        location: 'premium_access_lounge_open_projects',
        project: data.project.trim(),
      });

      // Show the in-dialog success screen with the reference ID; do NOT close.
      setReferenceId(ref);
    } catch (error) {
      console.error('Sponsor inquiry submission error:', error);
      const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
      setSubmitError(
        isOffline
          ? 'You appear to be offline. Please reconnect and try again.'
          : 'Network error. Please check your connection and try again, or email theresa.ronnie@bombaybreed.com.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto !top-[5vh] !translate-y-0"
        onOpenAutoFocus={(e) => { e.preventDefault(); }}
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`space-y-4 ${submitting ? 'pointer-events-none select-none opacity-60' : ''}`}
              aria-busy={submitting}
            >
            <fieldset disabled={submitting} className="space-y-4 m-0 p-0 border-0">
            {submitError && (
              <div
                role="alert"
                aria-live="assertive"
                className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {submitError}
              </div>
            )}
            {projectDetails && (
              <div className="rounded-md border border-border/70 bg-muted/30 p-4 space-y-3">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1">
                    Project
                  </p>
                  <p className="font-serif text-base text-foreground leading-snug">
                    {projectDetails.title}
                  </p>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="grid grid-cols-[68px_1fr] gap-3">
                    <dt className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground pt-0.5">Angle</dt>
                    <dd className="text-foreground/85 leading-relaxed">{projectDetails.angle}</dd>
                  </div>
                  <div className="grid grid-cols-[68px_1fr] gap-3">
                    <dt className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground pt-0.5">Scope</dt>
                    <dd className="text-foreground/85 leading-relaxed">{projectDetails.scope}</dd>
                  </div>
                  <div className="grid grid-cols-[68px_1fr] gap-3">
                    <dt className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground pt-0.5">Output</dt>
                    <dd className="text-foreground/85 leading-relaxed">{projectDetails.output}</dd>
                  </div>
                  <div className="grid grid-cols-[68px_1fr] gap-3">
                    <dt className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground pt-0.5">Effort</dt>
                    <dd className="font-mono text-xs text-foreground/85 pt-1">{projectDetails.effort}</dd>
                  </div>
                </dl>
              </div>
            )}
            {bandDetails && !projectDetails && (
              <div className="rounded-md border border-border/70 bg-muted/30 p-4 space-y-3">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1">
                    Engagement
                  </p>
                  <p className="font-serif text-base text-foreground leading-snug">
                    {bandDetails.engagement}
                  </p>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="grid grid-cols-[88px_1fr] gap-3">
                    <dt className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground pt-0.5">Indicative</dt>
                    <dd className="text-foreground/85 leading-relaxed">{bandDetails.price}</dd>
                  </div>
                  <div className="grid grid-cols-[88px_1fr] gap-3">
                    <dt className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground pt-0.5">Scope</dt>
                    <dd className="text-foreground/85 leading-relaxed">{bandDetails.scope}</dd>
                  </div>
                </dl>
              </div>
            )}
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem className={projectDetails || bandDetails ? 'sr-only' : ''}>
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                    Mobile <span className="normal-case tracking-normal text-muted-foreground/70">(optional, include country code)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formatPhoneInput(field.value || '')}
                      onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
