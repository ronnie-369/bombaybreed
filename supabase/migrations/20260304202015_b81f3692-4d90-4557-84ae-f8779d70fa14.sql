
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert bookings with valid data"
ON public.bookings FOR INSERT
WITH CHECK (
  name IS NOT NULL AND length(trim(name)) > 0
  AND email IS NOT NULL AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND preferred_date IS NOT NULL
  AND preferred_time IS NOT NULL
);

CREATE POLICY "Anyone can check slot availability"
ON public.bookings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage bookings"
ON public.bookings FOR ALL
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));
