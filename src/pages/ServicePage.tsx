import { useParams, Navigate } from 'react-router-dom';
import { useSEOPage } from '@/hooks/use-seo-page';
import ServicePageTemplate from '@/components/seo/ServicePageTemplate';
import ServicePageErrorBoundary from '@/components/seo/ServicePageErrorBoundary';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ServicePageLoading = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-20">
      <section className="bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <Skeleton className="h-4 w-48 mb-4" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </section>
      <div className="container mx-auto px-6 md:px-8 max-w-5xl py-12">
        <Skeleton className="h-32 w-full mb-8" />
        <Skeleton className="h-48 w-full mb-8" />
        <Skeleton className="h-48 w-full" />
      </div>
    </main>
    <Footer />
  </div>
);

const ServicePageContent = () => {
  // Get all URL parameters
  const params = useParams<{ '*': string }>();
  const fullPath = params['*'] || '';
  
  // Use the full path as slug
  const { data: page, isLoading, error } = useSEOPage(fullPath);

  if (isLoading) {
    return <ServicePageLoading />;
  }

  // If page not found, redirect to 404
  if (!page || error) {
    return <Navigate to="/404" replace />;
  }

  return (
    <ServicePageTemplate
      slug={page.slug}
      meta_title={page.meta_title}
      meta_description={page.meta_description || undefined}
      h1_headline={page.h1_headline}
      direct_answer_block={page.direct_answer_block || undefined}
      capability={page.capability || undefined}
      industry={page.industry || undefined}
      geography={page.geography || undefined}
      regulation={page.regulation || undefined}
      faq_items={page.faq_items}
      content_sections={page.content_sections}
      internal_links={page.internal_links}
    />
  );
};

// Wrap with error boundary to catch any rendering errors
const ServicePage = () => (
  <ServicePageErrorBoundary>
    <ServicePageContent />
  </ServicePageErrorBoundary>
);

export default ServicePage;
