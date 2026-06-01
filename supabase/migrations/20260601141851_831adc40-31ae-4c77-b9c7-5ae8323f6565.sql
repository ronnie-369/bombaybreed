-- Revoke direct SELECT on the body_html column from anon and authenticated.
-- Premium report bodies must only be accessible via tcd_get_report_body() which
-- enforces tcd_user_has_report_access() (admin or active paid tier).
REVOKE SELECT (body_html) ON public.tcd_reports FROM anon;
REVOKE SELECT (body_html) ON public.tcd_reports FROM authenticated;

-- Re-grant SELECT on every other column so the public report metadata query
-- (title, summary, category, etc.) keeps working for both roles.
GRANT SELECT (
  id, slug, title, summary, category, cover_image_url,
  required_tier_rank, reading_minutes, is_published,
  published_at, created_at, updated_at
) ON public.tcd_reports TO anon, authenticated;