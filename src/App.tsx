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
import FinancialDashboard from "./pages/financial/FinancialDashboard";
import Revenues from "./pages/financial/Revenues";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
      
      <Route
        path="/"
        element={user ? <DashboardLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Index />} />
        <Route path="/occurrences" element={<OccurrenceList />} />
        <Route path="/occurrences/new" element={<OccurrenceForm />} />
        <Route path="/occurrences/:id" element={<OccurrenceDetails />} />
        <Route path="/associates" element={<Associates />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/financial" element={<FinancialDashboard />} />
        <Route path="/financial/revenues" element={<Revenues />} />
        <Route path="/settings/users" element={<UserManagement />} />
        <Route path="/settings/roles" element={<RoleManagement />} />
      </Route>
    </Routes>
  );
}

export default App;