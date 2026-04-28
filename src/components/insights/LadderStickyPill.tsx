import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { TIERS, type LadderTier } from "@/intelligence/lib/valueLadder";
import { trackOutboundClick } from "@/utils/outboundAnalytics";

/**
 * Persistent decision moment on /insights and insight detail pages.
 * Bottom-right pill that expands into the 5 tiers; dismissible per-session
 * via localStorage. Compounds with the LadderHero for visitors who scroll
 * past it.
 */

const STORAGE_KEY = "bb_ladder_pill_dismissed";

const trackEvent = (event: string, payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    if (typeof w.gtag === "function") w.gtag("event", event, payload);
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...payload });
  } catch {
    /* never break UX */
  }
};

const trackTierClick = (tier: LadderTier) => {
  trackEvent("ladder_cta_click", {
    tier_id: tier.id,
    tier_name: tier.name,
    ladder: tier.ladder,
    surface: "sticky_pill",
  });
};

const LadderStickyPill = () => {
  const [dismissed, setDismissed] = useState(true); // start true so SSR shows nothing
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const dismiss = () => {
    setDismissed(true);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode etc */
    }
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-[calc(100vw-2rem)] print:hidden">
      {open ? (
        <div className="bg-background border border-border rounded-xl shadow-lg w-[320px] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Choose how you read us
              </div>
              <div className="text-[13px] font-medium text-foreground mt-0.5">
                Five ways in
              </div>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ul className="divide-y divide-border/60">
            {TIERS.map((tier) => {
              const inner = (
                <div className="flex items-baseline justify-between gap-3 px-4 py-2.5 hover:bg-muted/40 transition-colors">
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-foreground truncate">
                      {tier.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      {tier.priceLabel}
                    </div>
                  </div>
                  <span className="text-[11px] text-primary whitespace-nowrap">
                    {tier.cta.label.replace("Inquire about sponsorship", "Inquire")} →
                  </span>
                </div>
              );

              if (tier.cta.kind === "internal") {
                return (
                  <li key={tier.id}>
                    <Link
                      to={tier.cta.href}
                      onClick={() => {
                        trackTierClick(tier);
                        setOpen(false);
                      }}
                    >
                      {inner}
                    </Link>
                  </li>
                );
              }
              if (tier.cta.kind === "outbound") {
                return (
                  <li key={tier.id}>
                    <a
                      href={tier.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackTierClick(tier);
                        trackOutboundClick({
                          location: "ladder_sticky_pill",
                          org_name: tier.name,
                          link_url: tier.cta.kind === "outbound" ? tier.cta.href : "",
                        });
                      }}
                    >
                      {inner}
                    </a>
                  </li>
                );
              }
              // sponsor: collapse the pill and route to the canonical page sponsor section
              return (
                <li key={tier.id}>
                  <Link
                    to="/intelligence/value-ladder#sponsor"
                    onClick={() => {
                      trackTierClick(tier);
                      setOpen(false);
                    }}
                  >
                    {inner}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-4 py-3 border-t border-border/60 bg-muted/30">
            <Link
              to="/intelligence/value-ladder"
              onClick={() =>
                trackEvent("ladder_view", { surface: "sticky_pill_compare_all" })
              }
              className="text-[12px] font-medium text-primary hover:text-primary/80"
            >
              Compare all five →
            </Link>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            trackEvent("ladder_view", { surface: "sticky_pill_open" });
          }}
          className="bg-foreground text-background rounded-full shadow-lg px-4 py-2.5 text-[12px] font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span>Free · $5 · ₹10k+ · Sponsor</span>
          <span className="text-[11px] opacity-80">Choose ▴</span>
        </button>
      )}
    </div>
  );
};

export default LadderStickyPill;
