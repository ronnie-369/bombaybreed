-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Allow anonymous contact submissions" ON public.contact_submissions;

-- Create a more flexible policy that handles the form data correctly
CREATE POLICY "Allow anonymous contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (
  name IS NOT NULL 
  AND length(trim(name)) > 0 
  AND email IS NOT NULL 
  AND length(trim(email)) > 0 
  AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND report_requested IS NOT NULL 
  AND length(trim(report_requested)) > 0
  -- Make marketing_consent validation more flexible
  AND marketing_consent IS NOT NULL
);