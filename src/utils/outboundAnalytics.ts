/**
 * Generic outbound-link analytics helper.
 *
 * Pushes a single 'outbound_click' event to GA4 (gtag) and the GTM
 * dataLayer. Used to measure which external partners/orgs visitors
 * are most interested in (e.g. quote attribution links and the
 * readership grid on /insights).
 *
 * Safe no-op if neither gtag nor dataLayer is available (SSR, dev,
 * blocked by an ad blocker, etc.).
 */

export interface OutboundClickParams {
  /** Where the click happened, e.g. 'lounge_quotes', 'lounge_readership'. */
  location: string;
  /** Display name of the org being clicked, e.g. 'Negative Emissions Platform'. */
  org_name: string;
  /** Destination URL. */
  link_url: string;
  /** Optional bloc / category, e.g. 'Multilateral', 'Global Corporates'. */
  group?: string;
}

export function trackOutboundClick(params: OutboundClickParams): void {
  if (typeof window === 'undefined') return;

  // Derive hostname for easier slicing in GA4 reports.
  let link_domain = '';
  try {
    link_domain = new URL(params.link_url).hostname.replace(/^www\./, '');
  } catch {
    // ignore - keep link_domain empty
  }

  const payload = {
    event_category: 'outbound',
    event_label: params.org_name,
    link_domain,
    ...params,
  };

  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'outbound_click', payload);
    }

    const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    if (Array.isArray(dataLayer)) {
      dataLayer.push({ event: 'outbound_click', ...payload });
    }
  } catch {
    // Analytics must never break UX.
  }
}
