-- Grant admin role to ronnie@bombaybreed.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('a4f6bc8b-21b8-46af-b49e-e2640a1b846f'::uuid, 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;