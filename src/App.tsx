import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import FloatingInquiryForm from "./components/FloatingInquiryForm";
import Index from "./pages/Index";
import ClimateStrategicCommunications from "./pages/ClimateStrategicCommunications";
import ClimateDesk from "./pages/ClimateDesk";
import BusinessStrategy from "./pages/BusinessStrategy";
import GreenJobsReport from "./pages/GreenJobsReport";
import CarbonMarketOutlook from "./pages/CarbonMarketOutlook";
import CarbonPlaybook from "./pages/CarbonPlaybook";
import ComplianceToCredibility from "./pages/ComplianceToCredibility";
import EnergyTransitionPlaybook from "./pages/EnergyTransitionPlaybook";
import GrowthRooms from "./pages/GrowthRooms";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/climate-communications" element={<ClimateStrategicCommunications />} />
          <Route path="/climate-desk" element={<ClimateDesk />} />
          <Route path="/business-strategy" element={<BusinessStrategy />} />
          <Route path="/green-jobs-report" element={<GreenJobsReport />} />
          <Route path="/carbon-market-outlook" element={<CarbonMarketOutlook />} />
          <Route path="/carbon-playbook" element={<CarbonPlaybook />} />
          <Route path="/compliance-to-credibility" element={<ComplianceToCredibility />} />
          <Route path="/energy-transition-playbook" element={<EnergyTransitionPlaybook />} />
          <Route path="/growth-rooms" element={<GrowthRooms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
        <FloatingInquiryForm />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
