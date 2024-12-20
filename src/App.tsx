import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Plan from "@/pages/Plan";
import Associates from "@/pages/Associates";
import OccurrenceList from "@/pages/OccurrenceList";
import OccurrenceDetails from "@/pages/OccurrenceDetails";
import { OccurrenceForm } from "@/components/occurrences/OccurrenceForm";
import AuditActionPage from "@/pages/audit/AuditActionPage";
import AiAuditPage from "@/pages/audit/AiAuditPage";
import AuditPage from "@/pages/audit/index";
import FinancialDashboard from "@/pages/financial/FinancialDashboard";
import Revenues from "@/pages/financial/Revenues";
import Expenses from "@/pages/financial/Expenses";
import MonthlyPayments from "@/pages/financial/MonthlyPayments";
import CashFlow from "@/pages/financial/CashFlow";
import ContractManagement from "@/pages/financial/contracts/ContractManagement";
import CostControl from "@/pages/financial/costs/CostControl";
import DepartmentCosts from "@/pages/financial/costs/DepartmentCosts";
import ExpenseAllocation from "@/pages/financial/costs/ExpenseAllocation";
import AssociateCosts from "@/pages/financial/costs/AssociateCosts";
import Suppliers from "@/pages/partners/Suppliers";
import Workshops from "@/pages/partners/Workshops";
import UserManagement from "@/pages/settings/UserManagement";
import RoleManagement from "@/pages/settings/RoleManagement";
import SupportPage from "@/pages/support/index";
import NewTicket from "@/pages/support/NewTicket";
import TicketDetails from "@/pages/support/TicketDetails";

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
          <Route path="occurrences/new" element={<OccurrenceForm />} />
          <Route path="occurrences/:id" element={<OccurrenceDetails />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="audit/action/:id" element={<AuditActionPage />} />
          <Route path="audit/ai" element={<AiAuditPage />} />
          
          {/* Support Routes */}
          <Route path="support" element={<SupportPage />} />
          <Route path="support/tickets/new" element={<NewTicket />} />
          <Route path="support/tickets/:id" element={<TicketDetails />} />
          
          {/* Financial Routes */}
          <Route path="financial" element={<FinancialDashboard />} />
          <Route path="financial/revenues" element={<Revenues />} />
          <Route path="financial/expenses" element={<Expenses />} />
          <Route path="financial/monthly-payments" element={<MonthlyPayments />} />
          <Route path="financial/cash-flow" element={<CashFlow />} />
          <Route path="financial/contracts" element={<ContractManagement />} />
          
          {/* Cost Control Routes */}
          <Route path="financial/costs" element={<CostControl />} />
          <Route path="financial/costs/departments" element={<DepartmentCosts />} />
          <Route path="financial/costs/allocation" element={<ExpenseAllocation />} />
          <Route path="financial/costs/associates" element={<AssociateCosts />} />
          
          {/* Partners Routes */}
          <Route path="partners/suppliers" element={<Suppliers />} />
          <Route path="partners/workshops" element={<Workshops />} />
          
          {/* Settings Routes */}
          <Route path="settings/users" element={<UserManagement />} />
          <Route path="settings/roles" element={<RoleManagement />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;