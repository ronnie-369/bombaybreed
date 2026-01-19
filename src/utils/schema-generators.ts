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
  "url": "https://bombaybreed.com",
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
      "item": "https://bombaybreed.com"
    }
  ];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": index === segments.length - 1 ? pageTitle : formatSegment(segment),
      "item": `https://bombaybreed.com${currentPath}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
};

export const generateProfessionalServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Bombay Breed",
  "description": "Strategic carbon communications advisory and ESG governance consulting for Indian enterprises",
  "url": "https://bombaybreed.com",
  "priceRange": "$$$$",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "serviceType": [
    "Carbon Communications Strategy",
    "Sustainability Reporting Advisory",
    "Carbon Market Advisory",
    "ESG Communications Consulting",
    "Climate Strategy Consulting"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Climate Advisory Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Carbon Communications Strategy India"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sustainability Reporting Advisory"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Carbon Market Advisory"
        }
      }
    ]
  }
});

export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Bombay Breed",
  "url": "https://bombaybreed.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://bombaybreed.com/services?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export interface ArticleSchemaData {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export const generateArticleSchema = (article: ArticleSchemaData) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "author": {
    "@type": "Person",
    "name": article.author || "Theresa Ronnie"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Bombay Breed",
    "url": "https://bombaybreed.com"
  },
  "image": article.image
});

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
