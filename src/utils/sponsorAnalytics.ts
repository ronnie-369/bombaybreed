/**
 * Lightweight client-side analytics helper for sponsor funnel tracking.
 *
 * Pushes events to GA4 (gtag) and the global dataLayer (GTM).
 * Safe no-ops if neither is present (SSR/dev/blocked).
 */

type SponsorEventName =
  | 'sponsor_callout_click'      // user clicks the "Sponsored research" callout on /insights grid
  | 'sponsor_section_view'       // #sponsor block scrolled into view
  | 'sponsor_cta_click'          // user clicks "Talk to us about sponsorship"
  | 'sponsor_open_project_click' // user opens an inquiry from a "Currently open projects" card
  | 'sponsor_inquiry_submitted'; // user submits the sponsor inquiry dialog

interface SponsorEventParams {
  location: string;              // e.g. 'insights_grid', 'premium_access_lounge'
  link_url?: string;
  link_text?: string;
  project?: string;              // pre-filled project for inquiry events
}

export function trackSponsorEvent(
  event: SponsorEventName,
  params: SponsorEventParams
): void {
  if (typeof window === 'undefined') return;

  try {
    // GA4 / Google Ads via gtag
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', event, {
        event_category: 'sponsor_funnel',
        event_label: params.location,
        ...params,
      });
    }

    // GTM dataLayer fallback
    const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    if (Array.isArray(dataLayer)) {
      dataLayer.push({
        event,
        event_category: 'sponsor_funnel',
        ...params,
      });
    }
  } catch {
    // Silently swallow — analytics must never break UX.
  }
}
