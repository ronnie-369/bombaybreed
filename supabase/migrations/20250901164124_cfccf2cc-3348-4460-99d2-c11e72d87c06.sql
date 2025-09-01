-- Fix the RLS policy for leads table to include marketing_consent validation
-- This fixes the "new row violates row-level security policy" error

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can insert leads with required fields" ON public.leads;

-- Create updated policy that includes marketing_consent validation
CREATE POLICY "Anyone can insert leads with required fields" 
ON public.leads 
FOR INSERT 
WITH CHECK (
  -- Email validation
  email IS NOT NULL 
  AND length(trim(email)) > 0 
  AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  -- Phone validation
  AND phone IS NOT NULL 
  AND length(trim(phone)) > 0
  -- Report requested validation  
  AND report_requested IS NOT NULL 
  AND length(trim(report_requested)) > 0
  -- Marketing consent validation (this was missing!)
  AND marketing_consent IS NOT NULL
);