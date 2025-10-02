interface ConsentPreference {
  accepted: boolean;
  timestamp: string;
}

const CONSENT_KEY = 'cookieConsent';

export const hasUserConsented = (): boolean => {
  const consent = localStorage.getItem(CONSENT_KEY);
  return consent !== null;
};

export const setConsentPreference = (accepted: boolean): void => {
  const preference: ConsentPreference = {
    accepted,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(preference));
};

export const getConsentPreference = (): ConsentPreference | null => {
  const consent = localStorage.getItem(CONSENT_KEY);
  if (!consent) return null;
  return JSON.parse(consent);
};
