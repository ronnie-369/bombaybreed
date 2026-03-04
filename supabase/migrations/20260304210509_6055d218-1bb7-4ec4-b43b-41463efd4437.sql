-- Drop the permissive SELECT policy that exposes PII
DROP POLICY "Anyone can check slot availability" ON public.bookings;

-- Create admin-only SELECT policy
CREATE POLICY "Admins can view bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL AND
  has_role(auth.uid(), 'admin'::app_role)
);