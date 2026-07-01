import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import Preloader from "./components/ui/Preloader";
import PageSkeleton from "./components/ui/PageSkeleton";
import { usePreloader } from "./hooks/use-preloader";
import Index from "./pages/Index";

// Lazy load all page components for code splitting
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const GrievanceRedressal = lazy(() => import("./pages/GrievanceRedressal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminSEO = lazy(() => import("./pages/AdminSEO"));
const AdminSecurity = lazy(() => import("./pages/AdminSecurity"));
const AdminInquiries = lazy(() => import("./pages/AdminInquiries"));
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightDetail = lazy(() => import("./pages/InsightDetail"));

// Special pages that stay as-is (custom interactive layouts)
const GreenJobsGuide = lazy(() => import("./pages/GreenJobsGuide"));
const WorkingForTheEarth = lazy(() => import("./pages/WorkingForTheEarth"));
const GridAnalysis = lazy(() => import("./pages/GridAnalysis"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const NewsletterArchive = lazy(() => import("./pages/NewsletterArchive"));
const CarbonMarketTracker = lazy(() => import("./pages/CarbonMarketTracker"));
const BRSRReportingAdvisory = lazy(() => import("./pages/BRSRReportingAdvisory"));
const CarbonCreditTradingScheme = lazy(() => import("./pages/CarbonCreditTradingScheme"));
// RazorpayTest lazy import removed: route disabled in production. Restore when payments launch.
const NarrativeHiringGap = lazy(() => import("./pages/NarrativeHiringGap"));
const BeforeThePeak = lazy(() => import("./pages/BeforeThePeak"));
const RaisingRenaissanceChild = lazy(() => import("./pages/RaisingRenaissanceChild"));
const WhyEuropeMelts = lazy(() => import("./pages/series/WhyEuropeMelts"));
const WhyEuropeMeltsRead = lazy(() => import("./pages/series/WhyEuropeMeltsRead"));
const EuropeIndiaSeriesIndex = lazy(() => import("./pages/series/EuropeIndiaSeriesIndex"));

// TCD Intelligence routes are disabled in production until payments launch.
// All code remains in /src/intelligence/ and can be re-wired with the block below:
//   const IntelligenceLanding = lazy(() => import("./intelligence/pages/IntelligenceLanding"));
//   ... (see git history for the full set)

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = usePreloader({ minimumDuration: 200 });

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div 
        className={isLoading ? 'opacity-0' : 'animate-fade-in'}
        style={{ animationDuration: '0.4s' }}
      >
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              {/* Core pages */}
              <Route path="/" element={<Index />} />
              <Route path="/resources" element={<Navigate to="/insights" replace />} />
              <Route path="/credentials" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/cancellation-policy" element={<Navigate to="/refund-policy" replace />} />
              <Route path="/grievance-redressal" element={<GrievanceRedressal />} />
              <Route path="/services" element={<Services />} />
              
              {/* Auth & Admin */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/seo" element={<AdminSEO />} />
              <Route path="/admin/security" element={<AdminSecurity />} />
              <Route path="/admin/inquiries" element={<AdminInquiries />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              
              {/* Insight detail pages (template-driven) */}
              <Route path="/insights/:slug" element={<InsightDetail />} />

              {/* Legacy redirects → new /insights/:slug routes */}
              <Route path="/carbon-playbook" element={<Navigate to="/insights/carbon-playbook" replace />} />
              <Route path="/wef-global-risks-2026" element={<Navigate to="/insights/wef-global-risks-2026" replace />} />
              <Route path="/green-jobs-india-2026" element={<Navigate to="/insights/green-jobs-india-2026" replace />} />
              <Route path="/energy-transition-playbook" element={<Navigate to="/insights/energy-transition-playbook" replace />} />
              <Route path="/carbon-market-outlook" element={<Navigate to="/insights/carbon-market-outlook" replace />} />
              <Route path="/compliance-to-credibility" element={<Navigate to="/insights/compliance-to-credibility" replace />} />

              {/* Renamed/deleted page redirects */}
              <Route path="/article-6-advisory-uae" element={<Navigate to="/article-6-consulting-uae" replace />} />
              <Route path="/green-jobs-report" element={<Navigate to="/insights/green-jobs-india-2026" replace />} />

              {/* Special pages (custom interactive layouts - not template-driven) */}
              <Route path="/green-jobs-guide" element={<GreenJobsGuide />} />
              <Route path="/working-for-the-earth" element={<WorkingForTheEarth />} />
              <Route path="/india-renewable-grid-analysis" element={<GridAnalysis />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/newsletter" element={<NewsletterArchive />} />
              <Route path="/india-carbon-market-tracker" element={<CarbonMarketTracker />} />
              <Route path="/brsr-reporting-advisory-india" element={<BRSRReportingAdvisory />} />
              <Route path="/carbon-credit-trading-scheme-india" element={<CarbonCreditTradingScheme />} />
              <Route path="/insights/narrative-hiring-gap" element={<NarrativeHiringGap />} />
              <Route path="/insights/before-the-peak" element={<BeforeThePeak />} />
              <Route path="/insights/raising-the-renaissance-child" element={<RaisingRenaissanceChild />} />
              <Route path="/series/europe-india" element={<EuropeIndiaSeriesIndex />} />
              <Route path="/series/europe-india/why-europe-melts" element={<WhyEuropeMelts />} />
              <Route path="/series/europe-india/why-europe-melts/read" element={<WhyEuropeMeltsRead />} />

              {/* Paid tier redirects — payments not live in production. Code lives in /src/intelligence/*
                  and can be restored in one commit when we launch subscriptions. Until then all paid URLs
                  redirect to the free editorial hub. */}
              <Route path="/pricing" element={<Navigate to="/services" replace />} />
              <Route path="/intelligence" element={<Navigate to="/insights" replace />} />
              <Route path="/intelligence/*" element={<Navigate to="/insights" replace />} />

              {/* Redirect /index.html to root to prevent Soft 404 */}
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              
              {/* 404 page */}
              <Route path="/404" element={<NotFound />} />
              
              {/* SEO DYNAMIC ROUTES - catches all programmatic pages from database */}
              <Route path="/*" element={<ServicePage />} />
            </Routes>
          </Suspense>
          <CookieBanner />
        </BrowserRouter>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
