-- Add form_type column to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD COLUMN form_type TEXT NOT NULL DEFAULT 'download_report_form';

-- Add index for better query performance on form_type
CREATE INDEX idx_contact_submissions_form_type ON public.contact_submissions(form_type);

-- Add comment to document the column
COMMENT ON COLUMN public.contact_submissions.form_type IS 'Tracks which form the submission came from (e.g., download_report_form, event_rsvp_form, etc.)';