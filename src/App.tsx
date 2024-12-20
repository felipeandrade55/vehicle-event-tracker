import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import UserManagement from "@/pages/settings/UserManagement";
import RoleManagement from "@/pages/settings/RoleManagement";
import ContractManagement from "@/pages/financial/contracts/ContractManagement";
import ContractEditor from "@/pages/financial/contracts/ContractEditor";
import ApprovalLevels from "@/pages/financial/contracts/ApprovalLevels";
import DashboardLayout from "@/components/DashboardLayout";
import CashFlow from "@/pages/financial/CashFlow";
import Revenues from "@/pages/financial/Revenues";
import Expenses from "@/pages/financial/Expenses";
import FinancialDashboard from "@/pages/financial/FinancialDashboard";
import ContractHistory from "@/pages/financial/contracts/ContractHistory";
import ContractRenewals from "@/pages/financial/contracts/ContractRenewals";
import ContractAdjustments from "@/pages/financial/contracts/ContractAdjustments";
import CostControl from "@/pages/financial/costs/CostControl";
import DepartmentCosts from "@/pages/financial/costs/DepartmentCosts";
import ExpenseAllocation from "@/pages/financial/costs/ExpenseAllocation";
import AssociateCosts from "@/pages/financial/costs/AssociateCosts";
import Associates from "@/pages/Associates";
import Plan from "@/pages/Plan";
import OccurrenceList from "@/pages/OccurrenceList";
import OccurrenceDetails from "@/pages/OccurrenceDetails";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings/users" element={<UserManagement />} />
        <Route path="/settings/roles" element={<RoleManagement />} />
        
        {/* Rotas Principais */}
        <Route path="/associates" element={<Associates />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/occurrences" element={<OccurrenceList />} />
        <Route path="/occurrences/:id" element={<OccurrenceDetails />} />
        
        {/* Rotas Financeiras */}
        <Route path="/financial" element={<FinancialDashboard />} />
        <Route path="/financial/cash-flow" element={<CashFlow />} />
        <Route path="/financial/revenues" element={<Revenues />} />
        <Route path="/financial/expenses" element={<Expenses />} />
        
        {/* Contratos */}
        <Route path="/financial/contracts" element={<ContractManagement />} />
        <Route path="/financial/contracts/editor/:id" element={<ContractEditor />} />
        <Route path="/financial/contracts/approval-levels" element={<ApprovalLevels />} />
        <Route path="/financial/contracts/history" element={<ContractHistory />} />
        <Route path="/financial/contracts/renewals" element={<ContractRenewals />} />
        <Route path="/financial/contracts/adjustments" element={<ContractAdjustments />} />
        
        {/* Controle de Custos */}
        <Route path="/financial/costs" element={<CostControl />} />
        <Route path="/financial/costs/departments" element={<DepartmentCosts />} />
        <Route path="/financial/costs/allocation" element={<ExpenseAllocation />} />
        <Route path="/financial/costs/associates" element={<AssociateCosts />} />
      </Route>
    </Routes>
  );
}

export default App;