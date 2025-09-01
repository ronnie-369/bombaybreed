-- Fix critical PII exposure by updating overly permissive RLS policies

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can view their own lead data" ON public.leads;
DROP POLICY IF EXISTS "Anyone can view download records" ON public.report_downloads;

-- Create more restrictive policies that require authentication
-- Note: These will require users to be authenticated to view data

-- Policy for leads: Only authenticated users can view their own leads (when auth is implemented)
-- For now, we make it restrictive - no public access to PII
CREATE POLICY "Authenticated users can view their own leads" 
ON public.leads 
FOR SELECT 
USING (false); -- Temporarily block all access until proper auth is implemented

-- Policy for report downloads: Only authenticated users can view their own downloads
CREATE POLICY "Authenticated users can view their own downloads" 
ON public.report_downloads 
FOR SELECT 
USING (false); -- Temporarily block all access until proper auth is implemented

-- Keep insert policies as they are needed for lead capture
-- But we should add some basic validation

-- Update leads insert policy to ensure required fields
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads with required fields" 
ON public.leads 
FOR INSERT 
WITH CHECK (
  email IS NOT NULL 
  AND length(trim(email)) > 0 
  AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND phone IS NOT NULL 
  AND length(trim(phone)) > 0
  AND report_requested IS NOT NULL 
  AND length(trim(report_requested)) > 0
);

-- Update report downloads insert policy  
DROP POLICY IF EXISTS "Anyone can insert download records" ON public.report_downloads;
CREATE POLICY "Anyone can insert download records with valid data" 
ON public.report_downloads 
FOR INSERT 
WITH CHECK (
  lead_id IS NOT NULL 
  AND report_name IS NOT NULL 
  AND length(trim(report_name)) > 0
);