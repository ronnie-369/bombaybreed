/**
 * Cache-busting reload for stale dynamic import chunks.
 *
 * When the dev server (or a fresh deploy) rebuilds, the user's currently-loaded
 * index.html still references the old chunk hashes. Lazy-loaded routes then
 * fail with "Failed to fetch dynamically imported module" and the screen goes
 * blank. This handler catches that specific class of error and does ONE hard
 * reload with a cache-buster, then refuses to reload again in the same session
 * so a genuinely broken build cannot trap the user in a refresh loop.
 */

const RELOAD_FLAG = 'lov:chunk-reloaded';

const isChunkLoadError = (msg: string): boolean => {
  if (!msg) return false;
  return (
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('Importing a module script failed') ||
    msg.includes('error loading dynamically imported module') ||
    /Loading chunk \S+ failed/i.test(msg) ||
    /Loading CSS chunk \S+ failed/i.test(msg)
  );
};

const notifyUser = (): void => {
  try {
    window.dispatchEvent(new CustomEvent('lov:chunk-error'));
  } catch { /* noop */ }
};

const triggerReload = (): void => {
  // Show the banner so the user can recover with a single click. We no longer
  // auto-reload silently - that masked legitimate failures and caused surprise
  // page jumps. The banner's Reload button performs the cache-busted reload.
  notifyUser();
};

export const installChunkReload = (): void => {
  if (typeof window === 'undefined') return;

  // Clear the guard flag on a successful, organic navigation so future stale
  // chunks can be recovered too.
  window.addEventListener('load', () => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('_r')) {
        url.searchParams.delete('_r');
        window.history.replaceState({}, '', url.toString());
      }
      // Wait one tick so we don't clear before the app has actually mounted.
      window.setTimeout(() => {
        try { sessionStorage.removeItem(RELOAD_FLAG); } catch { /* noop */ }
      }, 2000);
    } catch { /* noop */ }
  });

  window.addEventListener('error', (event) => {
    const msg = event?.message || (event?.error as Error | undefined)?.message || '';
    if (isChunkLoadError(msg)) triggerReload();
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason;
    const msg = typeof reason === 'string' ? reason : reason?.message || '';
    if (isChunkLoadError(msg)) triggerReload();
  });
};
