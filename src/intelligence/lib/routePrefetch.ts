/**
 * Warm the JS chunks for the next likely route in the membership flow.
 *
 * The CTAs on the Value Ladder / Membership pages go to Signup -> Checkout.
 * Because those pages are React.lazy() in App.tsx, the chunk is normally only
 * fetched after the click, which adds a visible delay per hop. By kicking off
 * the same dynamic import on idle (or on hover/focus of a CTA), the chunk is
 * already in the browser cache by the time the user clicks - Vite dedupes
 * identical specifiers so this does NOT create a second copy of the module.
 */
type Loader = () => Promise<unknown>;

const loaded = new Set<string>();

const prefetch = (key: string, loader: Loader) => {
  if (loaded.has(key)) return;
  loaded.add(key);
  // Swallow errors - prefetch is best-effort.
  loader().catch(() => loaded.delete(key));
};

const onIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const ric = (window as unknown as {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  }).requestIdleCallback;
  if (ric) ric(cb, { timeout: 1500 });
  else setTimeout(cb, 300);
};

export const prefetchSignup = () =>
  prefetch("signup", () => import("../pages/Signup"));

export const prefetchCheckout = () =>
  prefetch("checkout", () => import("../pages/Checkout"));

export const prefetchWelcome = () =>
  prefetch("welcome", () => import("../pages/Welcome"));

/** Call from Value Ladder / Membership mount to warm the whole funnel. */
export const prefetchMembershipFunnel = () => {
  onIdle(() => {
    prefetchSignup();
    prefetchCheckout();
    prefetchWelcome();
  });
};

/** Hover/focus handler to attach to a CTA - prefetch immediately. */
export const ctaHoverPrefetch = {
  onMouseEnter: () => {
    prefetchSignup();
    prefetchCheckout();
  },
  onFocus: () => {
    prefetchSignup();
    prefetchCheckout();
  },
};
