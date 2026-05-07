CREATE TABLE IF NOT EXISTS public.tcd_auth_diagnostics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event text NOT NULL,
  email text,
  status text NOT NULL CHECK (status IN ('success','failure')),
  error_code text,
  error_message text,
  surface text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tcd_auth_diagnostics_created_at_idx
  ON public.tcd_auth_diagnostics (created_at DESC);
CREATE INDEX IF NOT EXISTS tcd_auth_diagnostics_email_idx
  ON public.tcd_auth_diagnostics (lower(email));

ALTER TABLE public.tcd_auth_diagnostics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can log auth diagnostics" ON public.tcd_auth_diagnostics;
CREATE POLICY "Anyone can log auth diagnostics"
  ON public.tcd_auth_diagnostics
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read auth diagnostics" ON public.tcd_auth_diagnostics;
CREATE POLICY "Admins can read auth diagnostics"
  ON public.tcd_auth_diagnostics
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));