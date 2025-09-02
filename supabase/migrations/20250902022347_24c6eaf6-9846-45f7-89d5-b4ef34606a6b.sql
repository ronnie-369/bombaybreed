-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Allow anonymous contact submissions" ON public.contact_submissions;

-- Create a simple policy that only checks for NOT NULL values
CREATE POLICY "Allow anonymous contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (
  name IS NOT NULL 
  AND email IS NOT NULL 
  AND report_requested IS NOT NULL 
  AND marketing_consent IS NOT NULL
);