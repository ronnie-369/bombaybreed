-- Fix the broken RLS policy on contact_inquiries table
-- The current policy has "Using Expression: false" which blocks all access
-- Update it to match the pattern used in other tables (service role access)

DROP POLICY IF EXISTS "Authenticated admins can view contact inquiries" ON public.contact_inquiries;

CREATE POLICY "Service role can view contact inquiries" 
ON public.contact_inquiries 
FOR SELECT 
USING (((auth.jwt() ->> 'role'::text) = 'service_role'::text));