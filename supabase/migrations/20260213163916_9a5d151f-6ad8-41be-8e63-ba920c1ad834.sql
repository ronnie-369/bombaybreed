
-- Track quiz interactions (personality clicks) even without form completion
CREATE TABLE public.quiz_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  personality_selected TEXT NOT NULL,
  form_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_interactions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (anonymous quiz clicks)
CREATE POLICY "Anyone can log quiz interactions"
  ON public.quiz_interactions
  FOR INSERT
  WITH CHECK (personality_selected IS NOT NULL);

-- Only admins/service role can read
CREATE POLICY "Admins can view quiz interactions"
  ON public.quiz_interactions
  FOR SELECT
  USING (
    (auth.uid() IS NOT NULL) AND (
      has_role(auth.uid(), 'admin'::app_role) OR
      ((auth.jwt() ->> 'role'::text) = 'service_role'::text)
    )
  );
