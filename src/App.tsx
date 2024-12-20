import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Plan from "@/pages/Plan";
import Associates from "@/pages/Associates";
import OccurrenceList from "@/pages/OccurrenceList";
import OccurrenceDetails from "@/pages/OccurrenceDetails";
import AuditActionPage from "@/pages/audit/AuditActionPage";
import AiAuditPage from "@/pages/audit/AiAuditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Index />} />
          <Route path="associates" element={<Associates />} />
          <Route path="plan" element={<Plan />} />
          <Route path="occurrences" element={<OccurrenceList />} />
          <Route path="occurrences/:id" element={<OccurrenceDetails />} />
          <Route path="audit/action/:id" element={<AuditActionPage />} />
          <Route path="audit/ai" element={<AiAuditPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
