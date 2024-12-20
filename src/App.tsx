import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Index from "./pages/Index";
import OccurrenceList from "./pages/OccurrenceList";
import OccurrenceDetails from "./pages/OccurrenceDetails";
import { OccurrenceForm } from "./components/occurrences/OccurrenceForm";
import Associates from "./pages/Associates";
import Plan from "./pages/Plan";
import UserManagement from "./pages/settings/UserManagement";
import RoleManagement from "./pages/settings/RoleManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Index />} />
        <Route path="/occurrences" element={<OccurrenceList />} />
        <Route path="/occurrences/new" element={<OccurrenceForm />} />
        <Route path="/occurrences/:id" element={<OccurrenceDetails />} />
        <Route path="/associates" element={<Associates />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/settings/users" element={<UserManagement />} />
        <Route path="/settings/roles" element={<RoleManagement />} />
      </Route>
    </Routes>
  );
}

export default App;