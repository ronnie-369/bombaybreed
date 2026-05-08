interface ConsentPreference {
  accepted: boolean;
  timestamp: string;
}

import { getSafeStorage } from '@/lib/safeStorage';

const CONSENT_KEY = 'cookieConsent';
const localStore = () => getSafeStorage('localStorage');

export const hasUserConsented = (): boolean => {
  const consent = localStore().getItem(CONSENT_KEY);
  return consent !== null;
};

export const setConsentPreference = (accepted: boolean): void => {
  const preference: ConsentPreference = {
    accepted,
    timestamp: new Date().toISOString(),
  };
  localStore().setItem(CONSENT_KEY, JSON.stringify(preference));
};

export const getConsentPreference = (): ConsentPreference | null => {
  const consent = localStore().getItem(CONSENT_KEY);
  if (!consent) return null;
  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
};

export const updateGoogleConsent = (accepted: boolean): void => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', {
      'analytics_storage': accepted ? 'granted' : 'denied',
      'ad_storage': accepted ? 'granted' : 'denied',
      'ad_user_data': accepted ? 'granted' : 'denied',
      'ad_personalization': accepted ? 'granted' : 'denied'
    });
  }
};
