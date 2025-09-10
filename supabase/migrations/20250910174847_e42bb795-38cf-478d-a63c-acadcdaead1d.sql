-- Make the Reports storage bucket private for security
-- Since we use signed URLs, the bucket doesn't need to be public
UPDATE storage.buckets 
SET public = false 
WHERE name = 'Reports';