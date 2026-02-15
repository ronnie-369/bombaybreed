SELECT cron.schedule(
  'weekly-analytics-digest',
  '30 3 * * 1',
  $$
  SELECT net.http_post(
    url := 'https://zjiwmdrtuhsrymsuvpfb.supabase.co/functions/v1/send-weekly-digest',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqaXdtZHJ0dWhzcnltc3V2cGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Mzk3NzYsImV4cCI6MjA3MjMxNTc3Nn0.6D8BOkjFNNbEzKqAgElZvS8Ki8hezTqjpQpBk-og6do"}'::jsonb,
    body := concat('{"time": "', now(), '"}')::jsonb
  ) AS request_id;
  $$
);