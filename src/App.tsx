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

// Lazy load all page components for code splitting
const Index = lazy(() => import("./pages/Index"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminSEO = lazy(() => import("./pages/AdminSEO"));
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
const RazorpayTest = lazy(() => import("./pages/RazorpayTest"));

// TCD Intelligence routes
const IntelligenceLanding = lazy(() => import("./intelligence/pages/IntelligenceLanding"));
const TcdMembership = lazy(() => import("./intelligence/pages/Membership"));
const TcdSignup = lazy(() => import("./intelligence/pages/Signup"));
const TcdCheckout = lazy(() => import("./intelligence/pages/Checkout"));
const TcdOnboarding = lazy(() => import("./intelligence/pages/Onboarding"));
const TcdDashboard = lazy(() => import("./intelligence/pages/Dashboard"));
const TcdReportDetail = lazy(() => import("./intelligence/pages/ReportDetail"));
const TcdAccount = lazy(() => import("./intelligence/pages/Account"));
const TcdAdmin = lazy(() => import("./intelligence/pages/Admin"));
const TcdAuthGate = lazy(() => import("./intelligence/components/TcdAuthGate"));

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = usePreloader({ minimumDuration: 800 });

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
              <Route path="/services" element={<Services />} />
              
              {/* Auth & Admin */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/seo" element={<AdminSEO />} />
              
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

              {/* TCD Intelligence — subscription platform */}
              <Route path="/intelligence" element={<IntelligenceLanding />} />
              <Route path="/intelligence/membership" element={<TcdMembership />} />
              <Route path="/intelligence/signup" element={<TcdSignup />} />
              <Route
                path="/intelligence/checkout"
                element={<TcdAuthGate><TcdCheckout /></TcdAuthGate>}
              />
              <Route
                path="/intelligence/onboarding"
                element={<TcdAuthGate><TcdOnboarding /></TcdAuthGate>}
              />
              <Route
                path="/intelligence/dashboard"
                element={<TcdAuthGate requireActiveMembership><TcdDashboard /></TcdAuthGate>}
              />
              <Route
                path="/intelligence/reports/:slug"
                element={<TcdAuthGate requireActiveMembership><TcdReportDetail /></TcdAuthGate>}
              />
              <Route
                path="/intelligence/account"
                element={<TcdAuthGate><TcdAccount /></TcdAuthGate>}
              />
              <Route
                path="/intelligence/admin"
                element={<TcdAuthGate requireAdmin><TcdAdmin /></TcdAuthGate>}
              />

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
