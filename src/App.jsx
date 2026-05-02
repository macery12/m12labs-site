import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import ScreenshotsPage from "./pages/ScreenshotsPage";
import SupportPage from "./pages/SupportPage";
import { siteConfig } from "./data/site";

function DiscordRedirect() {
  window.location.replace(siteConfig.discordUrl);
  return null;
}

function HealthPage() {
  return <pre style={{ padding: "1rem" }}>{JSON.stringify({ status: "ok" }, null, 2)}</pre>;
}

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform" element={<FeaturesPage />} />
        <Route path="/showcase" element={<ScreenshotsPage />} />
        <Route path="/features" element={<Navigate to="/platform" replace />} />
        <Route path="/screenshots" element={<Navigate to="/showcase" replace />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/discord" element={<DiscordRedirect />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}
