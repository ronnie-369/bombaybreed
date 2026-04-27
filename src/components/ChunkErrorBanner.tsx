import { useEffect, useState } from 'react';

/**
 * Listens for the global 'lov:chunk-error' event dispatched by chunkReload.ts
 * and shows a non-blocking banner inviting the user to reload. One click does
 * a cache-busted hard reload to recover from stale dynamic-import chunks.
 */
const ChunkErrorBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onError = () => setVisible(true);
    window.addEventListener('lov:chunk-error', onError);
    return () => window.removeEventListener('lov:chunk-error', onError);
  }, []);

  if (!visible) return null;

  const handleReload = () => {
    try {
      sessionStorage.removeItem('lov:chunk-reloaded');
    } catch { /* noop */ }
    const url = new URL(window.location.href);
    url.searchParams.set('_r', Date.now().toString(36));
    window.location.replace(url.toString());
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-x-0 top-0 z-[9999] flex items-center justify-center px-4 py-3"
      style={{ backgroundColor: '#0A0A0B', color: '#FDFCFB' }}
    >
      <div className="flex w-full max-w-3xl items-center justify-between gap-4 text-sm">
        <p className="font-light tracking-wide">
          A new version of this page is available. Reload to continue.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReload}
            className="border border-[#FDFCFB] px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[#FDFCFB] hover:text-[#0A0A0B]"
          >
            Reload
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
            className="px-2 py-1 text-xs opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChunkErrorBanner;
