import React, { useEffect, useState } from 'react';
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

const SponsorInquiryDialog = ({ open, onOpenChange, project }: SponsorInquiryDialogProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

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
      form.setValue('project', project);
    }
  }, [open, project, form]);

  const onSubmit = async (data: InquiryValues) => {
    setSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/myknnoea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          organisation: data.organisation?.trim() || '',
          role: data.role?.trim() || '',
          project_of_interest: data.project.trim(),
          message: data.message?.trim() || '',
          consent: data.consent,
          consent_text: 'User agreed to be contacted about this inquiry and to our privacy practices.',
          form_type: 'sponsor_open_project_inquiry',
          _subject: `Sponsor inquiry: ${data.project.trim()}`,
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      trackSponsorEvent('sponsor_inquiry_submitted', {
        location: 'premium_access_lounge_open_projects',
        project: data.project.trim(),
      });

      toast({
        title: 'Inquiry sent',
        description: 'We will reply within two business days.',
      });

      form.reset();
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-tight">
            Register interest
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Tell us a little about you and we will come back with a shape and a number.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send inquiry'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SponsorInquiryDialog;
