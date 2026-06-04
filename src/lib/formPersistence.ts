/**
 * Non-blocking Supabase persistence for public-facing forms.
 *
 * Formspree remains the primary delivery channel (email notifications).
 * This helper writes a parallel record into the appropriate Supabase table
 * so that admin dashboards (/admin, /admin/inquiries) become the source of truth.
 *
 * Failures here are swallowed - they never affect the user-facing flow.
 */
import { supabase } from '@/integrations/supabase/client';

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

type Payload = Record<string, any>;

const safe = (v: any): string => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v));

async function logFailure(table: string, error: unknown, payload: Payload) {
  // eslint-disable-next-line no-console
  console.warn(`[formPersistence] ${table} insert failed`, error, payload);
}

export async function persistFormSubmission(payload: Payload): Promise<void> {
  try {
    const formType = safe(payload.form_type);
    const email = safe(payload.email).toLowerCase();
    const name = safe(payload.name);

    // Bookings (consultation + narrative inquiry booking)
    if (formType === 'booking' || formType === 'narrative_inquiry_booking') {
      if (!name || !EMAIL_RE.test(email) || !payload.preferred_date || !payload.preferred_time) return;
      const company = safe(payload.company || payload.organisation);
      const messageParts = [
        safe(payload.message),
        safe(payload.issue_at_hand) && `Issue: ${safe(payload.issue_at_hand)}`,
        safe(payload.designation) && `Designation: ${safe(payload.designation)}`,
        safe(payload.source_report) && `Source: ${safe(payload.source_report)}`,
        safe(payload.subject) && `Subject: ${safe(payload.subject)}`,
      ].filter(Boolean).join(' | ');

      const { error } = await supabase.from('bookings').insert({
        name,
        email,
        phone: safe(payload.phone) || null,
        company: company || null,
        preferred_date: safe(payload.preferred_date),
        preferred_time: safe(payload.preferred_time),
        message: messageParts || null,
      });
      if (error) await logFailure('bookings', error, payload);
      return;
    }

    // Contact inquiries (general contact + quick contact + sponsor inquiry)
    if (formType === 'contact' || formType === 'contact_quick' || formType === 'sponsor_open_project_inquiry') {
      if (!name || !EMAIL_RE.test(email)) return;
      const company = safe(payload.company || payload.organisation);
      const messageParts = [
        safe(payload.message),
        safe(payload.phone) && `Phone: ${safe(payload.phone)}`,
        safe(payload.role) && `Role: ${safe(payload.role)}`,
        safe(payload.project_of_interest) && `Project: ${safe(payload.project_of_interest)}`,
        safe(payload.reference_id) && `Ref: ${safe(payload.reference_id)}`,
      ].filter(Boolean).join(' | ') || `[${formType}] submission`;

      const { error } = await supabase.from('contact_inquiries').insert({
        name,
        email,
        company: company || null,
        message: messageParts,
      });
      if (error) await logFailure('contact_inquiries', error, payload);
      return;
    }

    // Newsletter signups
    if (formType === 'newsletter') {
      if (!EMAIL_RE.test(email)) return;
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email,
        is_active: true,
        unsubscribed_at: null,
        unsubscribe_token: null,
      });
      // Ignore duplicate-email errors silently (subscriber already exists)
      if (error && !/duplicate|unique/i.test(error.message)) {
        await logFailure('newsletter_subscribers', error, payload);
      }
      return;
    }

    // Report downloads (insights forms, shared lead capture, green jobs quiz, narrative gap gate)
    if (formType === 'report_download' || formType === 'green-jobs-quiz') {
      if (!name || !EMAIL_RE.test(email)) return;
      const reportRequested = safe(payload.report_requested || payload.report || payload.personality) || 'unspecified';
      const { error } = await supabase.from('contact_submissions').insert({
        name,
        email,
        company_name: safe(payload.organisation || payload.company || payload.company_name) || null,
        designation: safe(payload.designation || payload.role) || null,
        phone: safe(payload.phone) || null,
        report_requested: reportRequested,
        marketing_consent: payload.marketing_consent === true,
        form_type: formType,
      });
      if (error) await logFailure('contact_submissions', error, payload);
      return;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[formPersistence] unexpected error', err);
  }
}

/**
 * Fire-and-forget wrapper. Use after a successful Formspree submission so we
 * never block the UI on Supabase round-trips or surface DB errors to users.
 */
export function persistFormSubmissionAsync(payload: Payload): void {
  void persistFormSubmission(payload);
}
