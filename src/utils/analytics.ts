// Analytics utility for GA4 and custom event tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Initialize GA4
export const initGA4 = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  // Also log to console in development
  if (import.meta.env.DEV) {
    console.log('📊 Analytics Event:', eventName, parameters);
  }
};

// Conversion tracking helpers
export const trackConversion = {
  leadSubmission: (formType: string, leadData?: Record<string, any>) => {
    trackEvent('generate_lead', {
      form_type: formType,
      value: 100, // Assign monetary value to lead
      currency: 'USD',
      ...leadData,
    });
  },

  reportDownload: (reportTitle: string) => {
    trackEvent('file_download', {
      file_name: reportTitle,
      content_type: 'report',
      value: 50,
      currency: 'USD',
    });
  },

  emailSignup: (source: string) => {
    trackEvent('sign_up', {
      method: 'email',
      source: source,
      value: 25,
      currency: 'USD',
    });
  },

  ctaClick: (ctaText: string, ctaLocation: string) => {
    trackEvent('cta_click', {
      cta_text: ctaText,
      cta_location: ctaLocation,
    });
  },

  videoPlay: (videoTitle: string, videoId: string) => {
    trackEvent('video_start', {
      video_title: videoTitle,
      video_id: videoId,
    });
  },

  calculatorUsed: (calculatorType: string, result?: Record<string, any>) => {
    trackEvent('calculator_completion', {
      calculator_type: calculatorType,
      ...result,
    });
  },

  quizCompleted: (quizType: string, score?: number) => {
    trackEvent('quiz_completion', {
      quiz_type: quizType,
      score: score,
    });
  },

  phoneClick: () => {
    trackEvent('contact_action', {
      method: 'phone',
    });
  },

  emailClick: () => {
    trackEvent('contact_action', {
      method: 'email',
    });
  },
};

// Track scroll depth
export const trackScrollDepth = () => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const milestones = [25, 50, 75, 90];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          trackEvent('scroll_depth', {
            percent: milestone,
            page_path: window.location.pathname,
          });
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

// Track time on page
export const trackTimeOnPage = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();

  const handleUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
    trackEvent('time_on_page', {
      duration_seconds: timeSpent,
      page_path: window.location.pathname,
    });
  };

  window.addEventListener('beforeunload', handleUnload);
  return () => window.removeEventListener('beforeunload', handleUnload);
};
