-- Fix RLS policies to prevent anonymous access to sensitive data

-- Drop and recreate contact_inquiries policies
DROP POLICY IF EXISTS "Admins can view contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Anyone can submit contact inquiries with valid data" ON public.contact_inquiries;

CREATE POLICY "Authenticated admins can view contact inquiries" 
ON public.contact_inquiries 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  (has_role(auth.uid(), 'admin'::app_role) OR ((auth.jwt() ->> 'role'::text) = 'service_role'::text))
);

CREATE POLICY "Anyone can submit contact inquiries with valid data" 
ON public.contact_inquiries 
FOR INSERT 
WITH CHECK (
  (name IS NOT NULL) AND (length(TRIM(BOTH FROM name)) > 0) AND 
  (email IS NOT NULL) AND (length(TRIM(BOTH FROM email)) > 0) AND 
  (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text) AND 
  (message IS NOT NULL) AND (length(TRIM(BOTH FROM message)) > 0)
);

-- Fix contact_submissions policies
DROP POLICY IF EXISTS "Service role can view submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous contact submissions" ON public.contact_submissions;

CREATE POLICY "Authenticated service role can view submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
);

CREATE POLICY "Allow anonymous contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (
  (name IS NOT NULL) AND (email IS NOT NULL) AND 
  (report_requested IS NOT NULL) AND (marketing_consent IS NOT NULL)
);

-- Fix leads policies
DROP POLICY IF EXISTS "Service role can view leads for verification" ON public.leads;
DROP POLICY IF EXISTS "Anyone can insert leads with required fields" ON public.leads;

CREATE POLICY "Authenticated service role can view leads" 
ON public.leads 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
);

CREATE POLICY "Anyone can insert leads with required fields" 
ON public.leads 
FOR INSERT 
WITH CHECK (
  (email IS NOT NULL) AND (length(TRIM(BOTH FROM email)) > 0) AND 
  (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text) AND 
  (phone IS NOT NULL) AND (length(TRIM(BOTH FROM phone)) > 0) AND 
  (report_requested IS NOT NULL) AND (length(TRIM(BOTH FROM report_requested)) > 0) AND 
  (marketing_consent IS NOT NULL)
);

-- Fix newsletter_subscribers policies
DROP POLICY IF EXISTS "Admins can view newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter with valid email" ON public.newsletter_subscribers;

CREATE POLICY "Authenticated admins can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  (has_role(auth.uid(), 'admin'::app_role) OR ((auth.jwt() ->> 'role'::text) = 'service_role'::text))
);

CREATE POLICY "Anyone can subscribe to newsletter with valid email" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (
  (email IS NOT NULL) AND (length(TRIM(BOTH FROM email)) > 0) AND 
  (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)
);

-- Fix report_downloads policies
DROP POLICY IF EXISTS "Service role can view report downloads" ON public.report_downloads;
DROP POLICY IF EXISTS "Anyone can insert download records with valid data" ON public.report_downloads;
DROP POLICY IF EXISTS "Service role can insert download records" ON public.report_downloads;

CREATE POLICY "Authenticated service role can view report downloads" 
ON public.report_downloads 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
);

CREATE POLICY "Service role can insert download records" 
ON public.report_downloads 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  ((auth.jwt() ->> 'role'::text) = 'service_role'::text) AND 
  (lead_id IS NOT NULL) AND (report_name IS NOT NULL) AND 
  (length(TRIM(BOTH FROM report_name)) > 0)
);

-- Fix user_roles policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;

CREATE POLICY "Authenticated users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  auth.uid() = user_id
);

CREATE POLICY "Authenticated admins can view all user roles" 
ON public.user_roles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Authenticated admins can manage user roles" 
ON public.user_roles 
FOR ALL 
USING (
  auth.uid() IS NOT NULL AND 
  has_role(auth.uid(), 'admin'::app_role)
);