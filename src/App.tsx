import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import Preloader from "./components/ui/Preloader";
import PageSkeleton from "./components/ui/PageSkeleton";
import { usePreloader } from "./hooks/use-preloader";

// Lazy load all page components for code splitting
const Index = lazy(() => import("./pages/Index"));
const Resources = lazy(() => import("./pages/Resources"));
const Credentials = lazy(() => import("./pages/Credentials"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminSEO = lazy(() => import("./pages/AdminSEO"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Insights = lazy(() => import("./pages/Insights"));
const WEFGlobalRisksReport = lazy(() => import("./pages/WEFGlobalRisksReport"));
const GreenJobsReport = lazy(() => import("./pages/GreenJobsReport"));

// Static report pages - explicitly routed to prevent Soft 404s
const EnergyTransitionPlaybook = lazy(() => import("./pages/EnergyTransitionPlaybook"));
const CarbonPlaybook = lazy(() => import("./pages/CarbonPlaybook"));
const CarbonMarketOutlook = lazy(() => import("./pages/CarbonMarketOutlook"));
const ComplianceToCredibility = lazy(() => import("./pages/ComplianceToCredibility"));
const WorkingForTheEarth = lazy(() => import("./pages/WorkingForTheEarth"));

const queryClient = new QueryClient();

const AppContent = () => {
  // Reduced preloader duration: 800ms first visit, 300ms return visits
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
              <Route path="/resources" element={<Resources />} />
              <Route path="/credentials" element={<Credentials />} />
              <Route path="/about" element={<About />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/services" element={<Services />} />
              
              {/* Auth & Admin */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/seo" element={<AdminSEO />} />
              
              {/* Report pages - explicitly routed */}
              <Route path="/wef-global-risks-2026" element={<WEFGlobalRisksReport />} />
              <Route path="/green-jobs-india-2026" element={<GreenJobsReport />} />
              <Route path="/energy-transition-playbook" element={<EnergyTransitionPlaybook />} />
              <Route path="/carbon-playbook" element={<CarbonPlaybook />} />
              <Route path="/carbon-market-outlook" element={<CarbonMarketOutlook />} />
              <Route path="/compliance-to-credibility" element={<ComplianceToCredibility />} />
              <Route path="/working-for-the-earth" element={<WorkingForTheEarth />} />
              
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
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
