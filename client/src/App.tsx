import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import BotSEO from "./pages/BotSEO";
import BotAds from "./pages/BotAds";
import BotSocial from "./pages/BotSocial";
import BotAssistant from "./pages/BotAssistant";
import BotProducts from "./pages/BotProducts";
import Design from "./pages/Design";
import Motion from "./pages/Motion";
import ImageGen from "./pages/ImageGen";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import SallaIntegration from "./pages/SallaIntegration";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/bot/seo" component={BotSEO} />
      <Route path="/bot/ads" component={BotAds} />
      <Route path="/bot/social" component={BotSocial} />
      <Route path="/bot/assistant" component={BotAssistant} />
      <Route path="/bot/products" component={BotProducts} />
      <Route path="/design" component={Design} />
      <Route path="/motion" component={Motion} />
      <Route path="/image-gen" component={ImageGen} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/services" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/salla" component={SallaIntegration} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
