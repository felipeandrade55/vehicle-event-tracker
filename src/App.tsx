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

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings/users" element={<UserManagement />} />
        <Route path="/settings/roles" element={<RoleManagement />} />
        <Route path="/financial/contracts" element={<ContractManagement />} />
        <Route path="/financial/contracts/editor/:id" element={<ContractEditor />} />
        <Route path="/financial/contracts/approval-levels" element={<ApprovalLevels />} />
        <Route path="/financial/cash-flow" element={<CashFlow />} />
        <Route path="/financial/revenues" element={<Revenues />} />
        <Route path="/financial/expenses" element={<Expenses />} />
      </Route>
    </Routes>
  );
}

export default App;