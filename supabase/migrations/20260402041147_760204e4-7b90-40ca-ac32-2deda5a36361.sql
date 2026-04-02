-- 1. CRITICAL: Block non-admin users from inserting into user_roles
-- Drop the existing ALL policy for admins (it covers INSERT too, but doesn't block others)
-- Add explicit restrictive INSERT policy

CREATE POLICY "Only admins can insert user roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Only admins can delete user roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Only admins can update user roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
);

-- 2. Tighten newsletter_subscribers INSERT policy to prevent malicious field values
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter with valid email" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe to newsletter with valid email"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (
  email IS NOT NULL AND
  length(trim(email)) > 0 AND
  email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
  is_active = true AND
  unsubscribed_at IS NULL
);

-- 3. Add admin SELECT policy on contact_submissions so admins can view them
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
);