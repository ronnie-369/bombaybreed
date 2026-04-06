
-- Fix 1: Restrict user_roles ALL policy from {public} to {authenticated} only
DROP POLICY IF EXISTS "Authenticated admins can manage user roles" ON public.user_roles;

CREATE POLICY "Authenticated admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING ((auth.uid() IS NOT NULL) AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK ((auth.uid() IS NOT NULL) AND has_role(auth.uid(), 'admin'::app_role));

-- Also fix the ALL view policy to authenticated only
DROP POLICY IF EXISTS "Authenticated admins can view all user roles" ON public.user_roles;

CREATE POLICY "Authenticated admins can view all user roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING ((auth.uid() IS NOT NULL) AND has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Tighten newsletter INSERT policy to prevent token injection
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter with valid email" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe to newsletter with valid email"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (
  email IS NOT NULL AND
  length(TRIM(BOTH FROM email)) > 0 AND
  email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
  is_active = true AND
  unsubscribed_at IS NULL AND
  unsubscribe_token IS NULL
);
