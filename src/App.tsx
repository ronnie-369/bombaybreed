import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import GreenJobsReport from "./pages/GreenJobsReport";
import CarbonMarketOutlook from "./pages/CarbonMarketOutlook";
import CarbonPlaybook from "./pages/CarbonPlaybook";
import ComplianceToCredibility from "./pages/ComplianceToCredibility";
import EnergyTransitionPlaybook from "./pages/EnergyTransitionPlaybook";
import GrowthRooms from "./pages/GrowthRooms";
import NotFound from "./pages/NotFound";

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
          <Route path="/green-jobs-report" element={<GreenJobsReport />} />
          <Route path="/carbon-market-outlook" element={<CarbonMarketOutlook />} />
          <Route path="/carbon-playbook" element={<CarbonPlaybook />} />
          <Route path="/compliance-to-credibility" element={<ComplianceToCredibility />} />
          <Route path="/energy-transition-playbook" element={<EnergyTransitionPlaybook />} />
          <Route path="/growth-rooms" element={<GrowthRooms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
