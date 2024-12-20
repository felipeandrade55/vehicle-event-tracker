import { FinancialSummaryCards } from "@/components/financial/dashboard/FinancialSummaryCards";
import { UpcomingPayments } from "@/components/financial/dashboard/UpcomingPayments";
import { CashFlowChart } from "@/components/financial/dashboard/CashFlowChart";
import { PaymentNotifications } from "@/components/financial/notifications/PaymentNotifications";
import { DefaultersReport } from "@/components/financial/reports/DefaultersReport";

const FinancialDashboard = () => {
  // Dados mockados para exemplo
  const summaryData = {
    totalBalance: 25000.0,
    monthlyRevenue: 15000.0,
    monthlyExpenses: 8000.0,
    defaultRate: 5.2,
    revenueCount: 45,
    expenseCount: 12,
    defaultCount: 3,
    monthlyGrowth: 12.5,
  };

  const upcomingPayments = [
    {
      id: "1",
      description: "Mensalidade João Silva",
      dueDate: new Date("2024-04-15"),
      value: 250.0,
      daysUntilDue: 2,
    },
    {
      id: "2",
      description: "Mensalidade Maria Santos",
      dueDate: new Date("2024-04-16"),
      value: 150.0,
      daysUntilDue: 3,
    },
  ];

  const cashFlowData = [
    {
      month: "Jan",
      receitas: 12000,
      despesas: 8000,
    },
    {
      month: "Fev",
      receitas: 15000,
      despesas: 9000,
    },
    {
      month: "Mar",
      receitas: 18000,
      despesas: 10000,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
      
      <FinancialSummaryCards data={summaryData} />
      
      <div className="grid gap-4 md:grid-cols-2">
        <PaymentNotifications />
        <UpcomingPayments payments={upcomingPayments} />
      </div>
      
      <div className="grid gap-4">
        <DefaultersReport />
      </div>
      
      <div className="grid gap-4">
        <CashFlowChart data={cashFlowData} />
      </div>
    </div>
  );
};

export default FinancialDashboard;