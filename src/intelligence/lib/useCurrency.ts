/**
 * Visitor-selected display currency for pricing surfaces.
 *
 * - USD is the default (matches the editorial decision to lead with USD across
 *   the value ladder; the BB ladder is denominated in USD with INR equivalent).
 * - The choice is persisted to localStorage and broadcast across components in
 *   the same tab via a custom event so the toggle on one card flips every
 *   surface (hero, lounge, intersection, sticky pill) at once.
 * - Reads gracefully on SSR / non-browser contexts.
 */

import { useEffect, useState, useCallback } from "react";
import type { Currency } from "./valueLadder";

const STORAGE_KEY = "bb_pricing_currency";
const EVENT_NAME = "bb:pricing-currency-changed";
const DEFAULT: Currency = "USD";

const isCurrency = (v: unknown): v is Currency => v === "USD" || v === "INR";

const readStored = (): Currency => {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isCurrency(raw) ? raw : DEFAULT;
  } catch {
    return DEFAULT;
  }
};

export const useCurrency = (): [Currency, (next: Currency) => void] => {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT);

  // Hydrate from storage after mount (SSR-safe).
  useEffect(() => {
    setCurrencyState(readStored());
  }, []);

  // Subscribe to in-tab updates from siblings, plus cross-tab storage events.
  useEffect(() => {
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent<Currency>;
      if (isCurrency(ce.detail)) setCurrencyState(ce.detail);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && isCurrency(e.newValue)) {
        setCurrencyState(e.newValue);
      }
    };
    window.addEventListener(EVENT_NAME, onCustom as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, onCustom as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be blocked - in-memory state still updates */
    }
    try {
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
    } catch {
      /* CustomEvent unsupported in some environments */
    }
  }, []);

  return [currency, setCurrency];
};
