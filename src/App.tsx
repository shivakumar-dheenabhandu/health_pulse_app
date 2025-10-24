import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import HealthTracker from "./pages/HealthTracker";
import Medicines from "./pages/Medicines";
import ConsultTests from "./pages/ConsultTests";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/health-tracker" element={<HealthTracker />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/consult-tests" element={<ConsultTests />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reminders" element={<PlaceholderPage title="Reminders" description="Manage your health reminders" gradient="gradient-wellness" />} />
          <Route path="/lab-tests" element={<PlaceholderPage title="Lab Tests" description="Book tests and view results" gradient="gradient-secondary" />} />
          <Route path="/doctors" element={<PlaceholderPage title="Doctor Consultation" description="Connect with specialists" gradient="gradient-wellness" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
