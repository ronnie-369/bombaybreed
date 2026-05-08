-- Revoke from anon and PUBLIC; only authenticated may call (functions self-gate beyond that)
REVOKE EXECUTE ON FUNCTION public.tcd_get_report_body(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.tcd_user_has_report_access(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.tcd_log_report_view(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.tcd_current_tier_rank() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.tcd_get_report_body(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.tcd_user_has_report_access(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.tcd_log_report_view(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.tcd_current_tier_rank() TO authenticated;

-- Harden view logging: require admin OR active paid subscription access to the report
CREATE OR REPLACE FUNCTION public.tcd_log_report_view(_report_slug text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _subscriber UUID;
  _report UUID;
  _view UUID;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF NOT public.tcd_user_has_report_access(_report_slug) THEN
    RAISE EXCEPTION 'Access denied: active subscription required';
  END IF;

  SELECT id INTO _subscriber FROM public.tcd_subscribers WHERE user_id = auth.uid();
  SELECT id INTO _report FROM public.tcd_reports WHERE slug = _report_slug AND is_published = true;

  IF _report IS NULL THEN
    RAISE EXCEPTION 'Report not found or not published: %', _report_slug;
  END IF;

  INSERT INTO public.tcd_report_views (subscriber_id, report_id)
  VALUES (_subscriber, _report)
  RETURNING id INTO _view;

  RETURN _view;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.tcd_log_report_view(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.tcd_log_report_view(text) TO authenticated;