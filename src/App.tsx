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
import { RevenueForm } from "./components/financial/RevenueForm";
import Expenses from "./pages/financial/Expenses";
import { ExpenseForm } from "./components/financial/ExpenseForm";
import { MonthlyPaymentList } from "./components/financial/monthly-payments/MonthlyPaymentList";
import CashFlow from "./pages/financial/CashFlow";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Workshops from "./pages/partners/Workshops";
import Suppliers from "./pages/partners/Suppliers";
import CostControl from "./pages/financial/costs/CostControl";
import DepartmentCosts from "./pages/financial/costs/DepartmentCosts";
import ExpenseAllocation from "./pages/financial/costs/ExpenseAllocation";
import AssociateCosts from "./pages/financial/costs/AssociateCosts";
import ContractManagement from "./pages/financial/contracts/ContractManagement";
import ContractEditor from "./pages/financial/contracts/ContractEditor";
import ContractHistory from "./pages/financial/contracts/ContractHistory";
import ContractRenewals from "./pages/financial/contracts/ContractRenewals";
import ContractAdjustments from "./pages/financial/contracts/ContractAdjustments";

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />

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
        <Route path="/financial/revenues/new" element={<RevenueForm />} />
        <Route path="/financial/monthly-payments" element={<MonthlyPaymentList />} />
        <Route path="/financial/expenses" element={<Expenses />} />
        <Route path="/financial/expenses/new" element={<ExpenseForm />} />
        <Route path="/financial/cash-flow" element={<CashFlow />} />
        <Route path="/financial/costs" element={<CostControl />} />
        <Route path="/financial/costs/departments" element={<DepartmentCosts />} />
        <Route path="/financial/costs/allocation" element={<ExpenseAllocation />} />
        <Route path="/financial/costs/associates" element={<AssociateCosts />} />
        <Route path="/settings/users" element={<UserManagement />} />
        <Route path="/settings/roles" element={<RoleManagement />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/financial/contracts" element={<ContractManagement />} />
        <Route path="/financial/contracts/editor/:id" element={<ContractEditor />} />
        <Route path="/financial/contracts/history" element={<ContractHistory />} />
        <Route path="/financial/contracts/renewals" element={<ContractRenewals />} />
        <Route path="/financial/contracts/adjustments" element={<ContractAdjustments />} />
      </Route>
    </Routes>
  );
}

export default App;
