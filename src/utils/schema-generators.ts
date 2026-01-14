// Schema.org structured data generators for SEO pages

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePageData {
  slug: string;
  meta_title: string;
  meta_description?: string;
  h1_headline: string;
  capability?: {
    name: string;
    slug: string;
  };
  industry?: {
    name: string;
    slug: string;
  };
  geography?: {
    name: string;
    slug: string;
  };
  regulation?: {
    name: string;
    slug: string;
  };
  faq_items?: FAQItem[];
}

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bombay Breed",
  "description": "Strategic climate advisory and communications for heavy-emitting industries and climate capital",
  "url": "https://bombaybreed.lovable.app",
  "areaServed": ["India", "UAE", "Singapore", "Malaysia", "Indonesia", "Qatar"],
  "knowsAbout": [
    "Energy optimisation",
    "Article 6",
    "DMRV",
    "Industrial decarbonisation",
    "Climate investment readiness",
    "Carbon markets"
  ],
  "founder": {
    "@type": "Person",
    "name": "Theresa Ronnie"
  }
});

export const generateServiceSchema = (page: ServicePageData) => {
  const areaServed = page.geography?.name || "India";
  const audience = page.industry 
    ? ["CEO", "COO", "CSO", "CFO"]
    : ["C-Suite Executives", "Sustainability Leaders"];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": page.capability?.name || page.h1_headline,
    "provider": {
      "@type": "Organization",
      "name": "Bombay Breed"
    },
    "areaServed": areaServed,
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": audience
    },
    "description": page.meta_description
  };
};

export const generateFAQSchema = (faqs: FAQItem[]) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateBreadcrumbSchema = (path: string, pageTitle: string) => {
  const segments = path.split('/').filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bombaybreed.lovable.app"
    }
  ];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": index === segments.length - 1 ? pageTitle : formatSegment(segment),
      "item": `https://bombaybreed.lovable.app${currentPath}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
};

const formatSegment = (segment: string): string => {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Inject schema into document head
export const injectSchema = (schema: object, id: string) => {
  // Remove existing schema with same id
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

// Remove schema from document head
export const removeSchema = (id: string) => {
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }
};
