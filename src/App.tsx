import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import Preloader from "./components/ui/Preloader";
import { usePreloader } from "./hooks/use-preloader";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import Credentials from "./pages/Credentials";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = usePreloader({ minimumDuration: 1800 });

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div 
        className={isLoading ? 'opacity-0' : 'animate-fade-in'}
        style={{ animationDuration: '0.5s' }}
      >
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
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
