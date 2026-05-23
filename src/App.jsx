import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ConsultationRequests from "./pages/ConsultationRequests";
import EngineerRoster from "./pages/EngineerRoster";
import SpecialtiesTechStack from "./pages/SpecialtiesTechStack";
import PricingPlans from "./pages/PricingPlans";
import WebsiteContent from "./pages/WebsiteContent";
import Settings from "./pages/Settings";
import CaseStudies from "./pages/CaseStudies";
import AdminUsersRoles from "./pages/AdminUsersRoles";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/consultations" element={<ConsultationRequests />} />
          <Route path="/roster" element={<EngineerRoster />} />
          <Route path="/specialties" element={<SpecialtiesTechStack />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route path="/content" element={<WebsiteContent />} />
          <Route path="/casestudies" element={<CaseStudies />} />
          <Route path="/admin-users" element={<AdminUsersRoles />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
