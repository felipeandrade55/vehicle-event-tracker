import { CashFlowChart } from "@/components/financial/dashboard/CashFlowChart";
import { FinancialSummaryCards } from "@/components/financial/dashboard/FinancialSummaryCards";
import { UpcomingPayments } from "@/components/financial/dashboard/UpcomingPayments";

const FinancialDashboard = () => {
  // Dados mockados para exemplo
  const cashFlowData = [
    {
      month: "Jan",
      receitas: 12450,
      despesas: 8230,
    },
    {
      month: "Fev",
      receitas: 14200,
      despesas: 7800,
    },
    {
      month: "Mar",
      receitas: 13800,
      despesas: 8500,
    },
    {
      month: "Abr",
      receitas: 15300,
      despesas: 9200,
    },
    {
      month: "Mai",
      receitas: 14700,
      despesas: 8900,
    },
    {
      month: "Jun",
      receitas: 16200,
      despesas: 9500,
    },
  ];

  const summaryData = {
    totalBalance: 45231.89,
    monthlyRevenue: 12450.00,
    monthlyExpenses: 8230.50,
    defaultRate: 3.2,
    revenueCount: 32,
    expenseCount: 15,
    defaultCount: 5,
    monthlyGrowth: 20.1,
  };

  const upcomingPayments = [
    {
      id: "1",
      description: "Fornecedor XYZ",
      dueDate: new Date(),
      value: 1250.00,
      daysUntilDue: 3,
    },
    {
      id: "2",
      description: "Manutenção Preventiva",
      dueDate: new Date(),
      value: 890.00,
      daysUntilDue: 5,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
      </div>

      <FinancialSummaryCards data={summaryData} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CashFlowChart data={cashFlowData} />
        <UpcomingPayments payments={upcomingPayments} />
      </div>
    </div>
  );
};

export default FinancialDashboard;