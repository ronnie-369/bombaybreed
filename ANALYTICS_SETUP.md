# Analytics Setup Guide

This project includes comprehensive analytics tracking with Google Analytics 4 (GA4) integration.

## Quick Setup

### 1. Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (if you haven't already)
3. Navigate to Admin → Data Streams
4. Select your web data stream
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Update the Measurement ID

Open `src/main.tsx` and replace the placeholder:

```typescript
// Replace this line:
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// With your actual Measurement ID:
const GA4_MEASUREMENT_ID = 'G-ABC1234567';
```

### 3. Deploy

The analytics will automatically start tracking once deployed to production. Analytics tracking is disabled in development mode to avoid polluting your data.

## What's Being Tracked

### Automatic Tracking
- **Page Views**: Tracked on every route change
- **Scroll Depth**: 25%, 50%, 75%, 90% milestones
- **Time on Page**: Duration users spend on each page

### Conversion Events
- **Lead Submissions**: Contact forms, inquiry forms, report downloads
- **Email Signups**: Newsletter subscriptions
- **Report Downloads**: Each report download with title tracking
- **CTA Clicks**: All call-to-action button clicks with location tracking
- **Video Engagement**: Video play events with title and ID
- **Calculator Usage**: ROI calculator completions with results
- **Quiz Completions**: Assessment quiz results with scores
- **Contact Actions**: Phone clicks, email clicks

### Custom Parameters
Each event includes relevant context:
- Form type (contact, inquiry, download, etc.)
- Report titles for downloads
- Calculator results and ROI estimates
- Quiz scores and assessment levels
- CTA locations and text
- User engagement metrics

## Testing Analytics

### In Development
During development, analytics events are logged to the browser console with the 📊 emoji prefix. Check your console to see what events are being tracked.

### In Production
1. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) Chrome extension
2. Enable the debugger
3. Navigate through your site and check the console for GA events
4. View real-time data in GA4 dashboard (Reports → Realtime)

## GA4 Dashboard Recommendations

### Important Reports to Create

1. **Lead Conversion Funnel**
   - Landing → Scroll 50% → CTA Click → Form Submission

2. **Content Engagement**
   - Video plays by title
   - Report downloads by title
   - Tool usage (calculator, quiz)

3. **Lead Quality**
   - Form type breakdown
   - Company presence in leads
   - Quiz scores distribution

### Custom Conversions to Set Up

In GA4 Admin → Events → Create Event:
1. Mark `generate_lead` as a conversion
2. Mark `file_download` as a conversion
3. Mark `sign_up` as a conversion
4. Mark `quiz_completion` as a conversion
5. Mark `calculator_completion` as a conversion

## Troubleshooting

### Events Not Showing Up

1. **Check Console**: Open browser console and look for 📊 log entries
2. **Verify Measurement ID**: Ensure you replaced the placeholder with your actual ID
3. **Check Network Tab**: Look for requests to `www.google-analytics.com`
4. **Wait for Processing**: Real-time reports show data within seconds, but standard reports can take 24-48 hours

### Invalid Measurement ID

If you see errors about invalid measurement ID:
1. Double-check the format is `G-XXXXXXXXXX`
2. Ensure there are no extra spaces or quotes
3. Verify the property is set up for web (not app)

## Privacy Compliance

### Cookie Consent
The analytics initialization respects cookie consent. Ensure your cookie banner properly manages consent before initializing GA4.

### Data Retention
Configure data retention settings in GA4:
- Admin → Data Settings → Data Retention
- Recommended: 14 months for lead generation sites

### GDPR Compliance
- Analytics only tracks in production
- No personally identifiable information (PII) is sent to GA4
- IP anonymization is enabled by default in GA4
- Users can opt-out via cookie preferences

## Advanced Configuration

### Custom Events

To track additional events, use the tracking utilities:

```typescript
import { trackEvent, trackConversion } from '@/utils/analytics';

// Generic event
trackEvent('custom_event', {
  category: 'user_action',
  label: 'button_click',
  value: 1
});

// Pre-configured conversion
trackConversion.leadSubmission('custom_form', {
  source: 'landing_page'
});
```

### Event Parameters

All events accept custom parameters:

```typescript
trackEvent('video_start', {
  video_title: 'Product Demo',
  video_duration: 120,
  video_provider: 'youtube'
});
```

## Support

For issues with analytics setup:
1. Check the [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
2. Review console logs during development
3. Test with GA4 Debugger extension
4. Verify your measurement ID is correct

## Optional: Enhanced Measurement

In GA4, enable Enhanced Measurement for automatic tracking of:
- Scrolls (supplements our custom scroll tracking)
- Outbound clicks
- Site search
- Video engagement (if using supported players)
- File downloads (supplements our custom tracking)

Navigate to: Admin → Data Streams → [Your Stream] → Enhanced measurement
