-- Fix the foreign key constraint in report_downloads to reference contact_submissions instead of leads
-- First drop the existing constraint
ALTER TABLE public.report_downloads DROP CONSTRAINT IF EXISTS report_downloads_lead_id_fkey;

-- Add new foreign key constraint to reference contact_submissions
ALTER TABLE public.report_downloads 
ADD CONSTRAINT report_downloads_submission_id_fkey 
FOREIGN KEY (lead_id) REFERENCES public.contact_submissions(id) ON DELETE CASCADE;

-- Update the column comment for clarity
COMMENT ON COLUMN public.report_downloads.lead_id IS 'References contact_submissions.id';