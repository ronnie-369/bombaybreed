-- Create RLS policies for the Reports storage bucket to allow Edge Functions to access files

-- Policy to allow reading objects in the Reports bucket
-- This allows the Edge Function (using anon role) to generate signed URLs
CREATE POLICY "Allow Edge Functions to read Reports bucket files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'Reports');

-- Policy to allow Edge Functions to create signed URLs for Reports bucket files
-- This is needed for the createSignedUrl() method to work
CREATE POLICY "Allow Edge Functions to create signed URLs for Reports"
ON storage.objects
FOR SELECT
USING (bucket_id = 'Reports' AND auth.role() = 'anon');