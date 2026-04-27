/**
 * Lightweight, in-app A/B testing.
 *
 * - Each visitor gets a random `visitor_id` stored in localStorage (no PII).
 * - Each experiment gets a sticky variant assignment in localStorage so a
 *   given visitor always sees the same copy.
 * - Events are written to the `ab_experiments` Supabase table (public INSERT,
 *   admin-only SELECT). Failures are silent so analytics can never break UX.
 *
 * Funnel for the subscribe-CTA test:
 *   1. Visitor lands on /insights -> `assignment` event for each tier card
 *      they see (one per tier per session).
 *   2. Visitor clicks a tier CTA -> `click` event + the variant is persisted
 *      to localStorage under `ab.last_click.{experiment}` so we can attribute
 *      the conversion later, even though it lands on a different route.
 *   3. Visitor completes the Signup form on /intelligence/signup -> we look
 *      up the most recent `last_click` for each experiment (within an
 *      attribution window) and write a `conversion` event for it.
 */
import { supabase } from '@/integrations/supabase/client';

export type Variant = 'A' | 'B';
export type EventType = 'assignment' | 'click' | 'conversion';

export type SubscribeCtaExperiment =
  | 'subscribe_cta_industry_reader'
  | 'subscribe_cta_analyst_lens';

export const SUBSCRIBE_CTA_EXPERIMENTS: SubscribeCtaExperiment[] = [
  'subscribe_cta_industry_reader',
  'subscribe_cta_analyst_lens',
];

// Conversion attribution window: a click within the last 7 days counts.
const ATTRIBUTION_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const VISITOR_KEY = 'ab.visitor_id';
const variantKey = (exp: string) => `ab.${exp}.variant`;
const lastClickKey = (exp: string) => `ab.${exp}.last_click`;
const sessionAssignmentFlag = (exp: string) => `ab.${exp}.assigned_in_session`;

const isBrowser = () => typeof window !== 'undefined';

const safeRandomId = (): string => {
  try {
    if (isBrowser() && 'crypto' in window && 'randomUUID' in window.crypto) {
      return window.crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  // Fallback (extremely unlikely to be hit in modern browsers).
  return `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const safeRead = (key: string): string | null => {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeWrite = (key: string, value: string): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode / quota - ignore */
  }
};

const safeSessionRead = (key: string): string | null => {
  if (!isBrowser()) return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSessionWrite = (key: string, value: string): void => {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};

export const getVisitorId = (): string => {
  let id = safeRead(VISITOR_KEY);
  if (!id) {
    id = safeRandomId();
    safeWrite(VISITOR_KEY, id);
  }
  return id;
};

const detectDevice = (): string => {
  if (!isBrowser()) return 'unknown';
  const w = window.innerWidth;
  if (w < 640) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Returns a sticky 50/50 variant for the given experiment. Once assigned,
 * the same visitor will always see the same variant (until they clear
 * localStorage).
 */
export const getVariant = (experiment: string): Variant => {
  const existing = safeRead(variantKey(experiment));
  if (existing === 'A' || existing === 'B') return existing;
  const assigned: Variant = Math.random() < 0.5 ? 'A' : 'B';
  safeWrite(variantKey(experiment), assigned);
  return assigned;
};

interface LogEventOptions {
  experiment: string;
  variant: Variant;
  eventType: EventType;
  metadata?: Record<string, unknown>;
}

/**
 * Fire-and-forget event log. Never throws, never blocks UI.
 */
export const logEvent = async ({
  experiment,
  variant,
  eventType,
  metadata,
}: LogEventOptions): Promise<void> => {
  if (!isBrowser()) return;
  try {
    await supabase.from('ab_experiments').insert({
      experiment,
      variant,
      event_type: eventType,
      visitor_id: getVisitorId(),
      page_path: window.location.pathname,
      device_type: detectDevice(),
      metadata: metadata ?? {},
    });
  } catch {
    /* analytics must never break the page */
  }
};

/**
 * Log an `assignment` event the first time a visitor sees an experiment in
 * a given browser session. Prevents flooding the table on repeat scrolls.
 */
export const logAssignmentOnce = (experiment: string, variant: Variant): void => {
  if (!isBrowser()) return;
  if (safeSessionRead(sessionAssignmentFlag(experiment))) return;
  safeSessionWrite(sessionAssignmentFlag(experiment), '1');
  void logEvent({ experiment, variant, eventType: 'assignment' });
};

/**
 * Log a `click` event AND persist it so the conversion can be attributed
 * later, even after the user navigates to other routes.
 */
export const logClick = (
  experiment: string,
  variant: Variant,
  metadata?: Record<string, unknown>,
): void => {
  safeWrite(
    lastClickKey(experiment),
    JSON.stringify({ variant, at: Date.now() }),
  );
  void logEvent({ experiment, variant, eventType: 'click', metadata });
};

/**
 * Look up the most recent click across all subscribe-CTA experiments and,
 * if any falls inside the attribution window, log a `conversion` event for
 * that experiment + variant. Used on Signup-form success.
 */
export const logSubscribeConversion = (
  metadata?: Record<string, unknown>,
): void => {
  if (!isBrowser()) return;
  const now = Date.now();

  for (const experiment of SUBSCRIBE_CTA_EXPERIMENTS) {
    const raw = safeRead(lastClickKey(experiment));
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as { variant?: Variant; at?: number };
      if (
        (parsed.variant === 'A' || parsed.variant === 'B') &&
        typeof parsed.at === 'number' &&
        now - parsed.at <= ATTRIBUTION_WINDOW_MS
      ) {
        void logEvent({
          experiment,
          variant: parsed.variant,
          eventType: 'conversion',
          metadata,
        });
      }
    } catch {
      /* malformed entry - ignore */
    }
  }
};
