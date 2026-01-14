import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedPage {
  slug?: string;
  url?: string;
  title?: string;
  type?: string;
}

interface ContentSections {
  the_problem?: string;
  why_this_fails?: string;
  what_changes?: string;
  our_approach?: string;
  market_risks?: string;
  introduction?: string;
  main_content?: string;
  [key: string]: string | undefined;
}

interface SEOPageData {
  id: string;
  slug: string;
  page_type: string;
  meta_title: string;
  meta_description: string | null;
  h1_headline: string;
  direct_answer_block: string | null;
  faq_items: FAQItem[];
  content_sections: ContentSections;
  internal_links: RelatedPage[];
  is_published: boolean;
  capability: { name: string; slug: string } | null;
  industry: { name: string; slug: string } | null;
  geography: { name: string; slug: string } | null;
  regulation: { name: string; slug: string } | null;
}

const parseJsonArray = <T,>(json: Json | null, fallback: T[]): T[] => {
  if (!json) return fallback;
  if (Array.isArray(json)) return json as unknown as T[];
  return fallback;
};

const parseJsonObject = <T,>(json: Json | null, fallback: T): T => {
  if (!json) return fallback;
  if (typeof json === 'object' && !Array.isArray(json)) return json as unknown as T;
  return fallback;
};

export const useSEOPage = (slug: string) => {
  return useQuery({
    queryKey: ['seo-page', slug],
    queryFn: async (): Promise<SEOPageData | null> => {
      const { data, error } = await supabase
        .from('seo_pages')
        .select(`
          id,
          slug,
          page_type,
          meta_title,
          meta_description,
          h1_headline,
          direct_answer_block,
          faq_items,
          content_sections,
          internal_links,
          is_published,
          capability:seo_capabilities(name, slug),
          industry:seo_industries(name, slug),
          geography:seo_geographies(name, slug),
          regulation:seo_regulations(name, slug)
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw error;
      }

      return {
        ...data,
        faq_items: parseJsonArray<FAQItem>(data.faq_items, []),
        content_sections: parseJsonObject<ContentSections>(data.content_sections, {}),
        internal_links: parseJsonArray<RelatedPage>(data.internal_links, []),
        capability: data.capability as { name: string; slug: string } | null,
        industry: data.industry as { name: string; slug: string } | null,
        geography: data.geography as { name: string; slug: string } | null,
        regulation: data.regulation as { name: string; slug: string } | null
      };
    },
    staleTime: 1000 * 60 * 5,
    retry: false
  });
};

export const useSEOPageBySlugPattern = (segments: string[]) => {
  const possibleSlugs = [
    segments.join('/'),
    segments.slice(0, 2).join('/'),
    segments[0]
  ].filter(Boolean);

  return useQuery({
    queryKey: ['seo-page-pattern', segments],
    queryFn: async (): Promise<SEOPageData | null> => {
      for (const slug of possibleSlugs) {
        const { data, error } = await supabase
          .from('seo_pages')
          .select(`
            id,
            slug,
            page_type,
            meta_title,
            meta_description,
            h1_headline,
            direct_answer_block,
            faq_items,
            content_sections,
            internal_links,
            is_published,
            capability:seo_capabilities(name, slug),
            industry:seo_industries(name, slug),
            geography:seo_geographies(name, slug),
            regulation:seo_regulations(name, slug)
          `)
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (!error && data) {
          return {
            ...data,
            faq_items: parseJsonArray<FAQItem>(data.faq_items, []),
            content_sections: parseJsonObject<ContentSections>(data.content_sections, {}),
            internal_links: parseJsonArray<RelatedPage>(data.internal_links, []),
            capability: data.capability as { name: string; slug: string } | null,
            industry: data.industry as { name: string; slug: string } | null,
            geography: data.geography as { name: string; slug: string } | null,
            regulation: data.regulation as { name: string; slug: string } | null
          };
        }
      }
      return null;
    },
    staleTime: 1000 * 60 * 5,
    retry: false
  });
};
