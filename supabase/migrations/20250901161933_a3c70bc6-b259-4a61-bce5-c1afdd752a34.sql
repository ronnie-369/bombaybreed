-- Fix RLS policies to allow Edge Function access for download functionality

-- Drop the overly restrictive policies that are causing 401 errors
DROP POLICY IF EXISTS "Authenticated users can view their own leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view their own downloads" ON public.report_downloads;

-- Create new policies that allow service role (Edge Functions) access
-- while maintaining security for public users

-- Allow service role to SELECT from leads (needed by Edge Function to verify leads)
CREATE POLICY "Service role can view leads for verification" 
ON public.leads 
FOR SELECT 
USING (
  -- Allow service role access (Edge Functions need this)
  auth.jwt() ->> 'role' = 'service_role'
);

-- Allow service role to SELECT from report_downloads (for tracking purposes)
CREATE POLICY "Service role can view report downloads" 
ON public.report_downloads 
FOR SELECT 
USING (
  -- Allow service role access (Edge Functions need this)
  auth.jwt() ->> 'role' = 'service_role'
);

-- Allow service role to INSERT into report_downloads (Edge Function tracks downloads)
CREATE POLICY "Service role can insert download records" 
ON public.report_downloads 
FOR INSERT 
WITH CHECK (
  -- Allow service role access for Edge Functions
  auth.jwt() ->> 'role' = 'service_role'
  AND lead_id IS NOT NULL 
  AND report_name IS NOT NULL 
  AND length(trim(report_name)) > 0
);

-- Keep the existing public INSERT policy for leads (users can create leads)
-- This policy already exists and works fine