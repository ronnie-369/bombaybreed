-- Track every Razorpay order creation attempt (success or failure) for audit/debugging.
CREATE TABLE public.tcd_order_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  plan_id text,
  billing_cycle text,
  amount_inr numeric,
  currency text DEFAULT 'INR',
  order_id text,
  status text NOT NULL DEFAULT 'pending', -- pending | created | failed
  error_message text,
  request_metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_tcd_order_attempts_created_at ON public.tcd_order_attempts (created_at DESC);
CREATE INDEX idx_tcd_order_attempts_order_id ON public.tcd_order_attempts (order_id);
CREATE INDEX idx_tcd_order_attempts_user_id ON public.tcd_order_attempts (user_id);

ALTER TABLE public.tcd_order_attempts ENABLE ROW LEVEL SECURITY;

-- Only admins can read order attempts (contains plan + amount data, useful for debugging)
CREATE POLICY "Admins can view order attempts"
ON public.tcd_order_attempts
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage order attempts"
ON public.tcd_order_attempts
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Edge functions write via service role, which bypasses RLS, so no INSERT policy needed for clients.