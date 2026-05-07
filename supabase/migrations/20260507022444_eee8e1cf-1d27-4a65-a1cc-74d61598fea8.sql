-- 1. Lock down body_html column on tcd_reports so anon/authenticated cannot SELECT it directly
REVOKE SELECT (body_html) ON public.tcd_reports FROM anon, authenticated;

-- 2. SECURITY DEFINER RPC that returns body_html only when the user has access
CREATE OR REPLACE FUNCTION public.tcd_get_report_body(_slug text)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _body text;
BEGIN
  IF NOT public.tcd_user_has_report_access(_slug) THEN
    RETURN NULL;
  END IF;

  SELECT body_html INTO _body
  FROM public.tcd_reports
  WHERE slug = _slug AND is_published = true;

  RETURN _body;
END;
$$;

REVOKE ALL ON FUNCTION public.tcd_get_report_body(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.tcd_get_report_body(text) TO authenticated;

-- 3. Tighten auth diagnostics insert policy (replace permissive WITH CHECK (true))
DROP POLICY IF EXISTS "Anyone can log auth diagnostics" ON public.tcd_auth_diagnostics;

CREATE POLICY "Anyone can log auth diagnostics"
ON public.tcd_auth_diagnostics
FOR INSERT
TO anon, authenticated
WITH CHECK (
  event IS NOT NULL
  AND length(trim(event)) > 0
  AND length(event) <= 100
  AND status IS NOT NULL
  AND status IN ('success','failure','info')
  AND (email IS NULL OR length(email) <= 320)
  AND (error_message IS NULL OR length(error_message) <= 2000)
  AND (error_code IS NULL OR length(error_code) <= 100)
  AND (surface IS NULL OR length(surface) <= 100)
  AND (user_agent IS NULL OR length(user_agent) <= 1000)
);