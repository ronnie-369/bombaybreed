-- Security hardening: Clean up redundant RLS policies and secure storage

-- Drop redundant RLS policies on report_downloads table
DROP POLICY IF EXISTS "insert_report_downloads" ON public.report_downloads;

-- Drop redundant RLS policy on contact_submissions table
DROP POLICY IF EXISTS "insert_contact_submissions" ON public.contact_submissions;

-- Make Reports bucket private for better security
UPDATE storage.buckets 
SET public = false 
WHERE id = 'Reports';

-- Remove overly permissive storage policies that allow anonymous access to Reports bucket
DROP POLICY IF EXISTS "Allow Edge Functions to read Reports bucket files" ON storage.objects;
DROP POLICY IF EXISTS "Allow Edge Functions to create signed URLs for Reports" ON storage.objects;

-- Create more restrictive storage policy that only allows service role access
CREATE POLICY "Service role can access Reports bucket" 
ON storage.objects 
FOR ALL 
USING (
  bucket_id = 'Reports' 
  AND ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
) 
WITH CHECK (
  bucket_id = 'Reports' 
  AND ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
);