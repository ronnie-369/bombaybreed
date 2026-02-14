

# Unified Inquiry Notifications + Weekly Analytics Digest

## What Changes

### A. Instant Email Notifications for Every Inquiry Type

Currently, only the contact form and report downloads trigger emails. Two inquiry types are missing notifications:

| Inquiry Source | Current State | Change |
|---|---|---|
| Contact form | Already sends email | Update subject to "Website Message -- {name}" (keep as-is) |
| Report downloads | Already sends email | Update subject to "Report Download -- {report title}" (keep as-is) |
| Newsletter signups | No email | Add email trigger |
| Green Jobs quiz leads | No email | Add email trigger |
| Quiz personality clicks (no form) | No email | No email needed (too noisy -- tracked in DB only) |

**Implementation:**

1. **Create a single new edge function: `send-inquiry-notification`**
   - Accepts a `type` parameter: `newsletter`, `green-jobs-quiz`
   - Sends a labeled email to theresa.ronnie@bombaybreed.com with:
     - Subject line that qualifies the inquiry type (e.g., "New Newsletter Subscriber -- priya@example.com", "Green Jobs Quiz Lead -- Priya Sharma (Systems Thinker)")
     - Body with all captured fields so Theresa can act directly from her inbox

2. **Update `Newsletter.tsx`** -- after successful Supabase insert, invoke `send-inquiry-notification` with type `newsletter`

3. **Update `GreenJobsGuide.tsx`** -- after successful lead form submission, invoke `send-inquiry-notification` with type `green-jobs-quiz`

### B. Weekly Digest Email (Report Downloads + Site Analytics)

A scheduled edge function that runs every Monday morning and sends a single digest email covering:

1. **Report downloads this week** -- count per report title, total downloads
2. **Inquiry summary** -- count of contact messages, newsletter signups, quiz leads
3. **Quiz engagement** -- personality clicks vs. form completions (conversion rate)

**Implementation:**

1. **Create edge function: `send-weekly-digest`**
   - Queries `contact_submissions`, `contact_inquiries`, `newsletter_subscribers`, `quiz_interactions`, and `report_downloads` for records from the past 7 days
   - Builds an HTML email dashboard with counts and top-line metrics
   - Sends to theresa.ronnie@bombaybreed.com
   - Subject: "Bombay Breed Weekly Dashboard -- {date range}"

2. **Schedule via pg_cron** -- run every Monday at 9:00 AM IST (3:30 AM UTC)

## Files to Create / Modify

| File | Action | Description |
|---|---|---|
| `supabase/functions/send-inquiry-notification/index.ts` | Create | Generic inquiry email sender |
| `supabase/functions/send-weekly-digest/index.ts` | Create | Weekly analytics digest |
| `supabase/config.toml` | Modify | Add verify_jwt = false for both new functions |
| `src/components/Newsletter.tsx` | Modify | Add email notification after subscribe |
| `src/pages/GreenJobsGuide.tsx` | Modify | Add email notification after quiz lead capture |
| Database (pg_cron) | Insert | Schedule weekly digest cron job |

## Technical Details

### send-inquiry-notification Edge Function

Accepts POST body:
```json
{
  "type": "newsletter" | "green-jobs-quiz",
  "email": "user@example.com",
  "name": "Priya Sharma",         // optional for newsletter
  "phone": "+91 98765 43210",     // optional
  "personality": "Systems Thinker" // only for quiz
}
```

Generates subject lines:
- Newsletter: "New Newsletter Subscriber -- priya@example.com"
- Quiz: "Green Jobs Quiz Lead -- Priya Sharma (Systems Thinker)"

Body includes all available fields in a clean HTML table.

### send-weekly-digest Edge Function

Queries the last 7 days of data using the service role key:
- `report_downloads` grouped by `report_name` with counts
- `contact_inquiries` count
- `contact_submissions` where form_type = 'green-jobs-quiz' count
- `newsletter_subscribers` count
- `quiz_interactions` total clicks vs. form_completed = true

Renders an HTML email with sections:
- Report Downloads (table: report name, count)
- New Inquiries (contact messages, quiz leads, newsletter signups)
- Quiz Funnel (personality clicks to form completions, conversion %)
- Date range header

### Cron Schedule (pg_cron)

Monday 9 AM IST = `30 3 * * 1` UTC. Uses `pg_net.http_post` to call the edge function.

### Existing Functions Unchanged

The `send-contact-email` and `submit-lead-and-generate-download` functions already send properly labeled emails for their respective inquiry types. No changes needed there.
