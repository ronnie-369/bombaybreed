import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
              <Route path="/" element={<Index />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/credentials" element={<Credentials />} />
              <Route path="/about" element={<About />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/seo" element={<AdminSEO />} />
              <Route path="/services" element={<Services />} />
              <Route path="/wef-global-risks-2026" element={<WEFGlobalRisksReport />} />
              <Route path="/green-jobs-india-2026" element={<GreenJobsReport />} />
              <Route path="/404" element={<NotFound />} />
              {/* SEO DYNAMIC ROUTES - catches all programmatic pages */}
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
