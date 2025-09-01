-- Grant INSERT permission to anon role for public lead capture forms
-- This fixes the 401 "unauthorized" error when submitting the form
GRANT INSERT ON public.leads TO anon;