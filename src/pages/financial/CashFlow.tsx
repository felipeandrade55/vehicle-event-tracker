import { CashFlowChart } from "@/components/financial/dashboard/CashFlowChart";

const CashFlow = () => {
  // Dados mockados para exemplo - mesmos dados do dashboard financeiro
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fluxo de Caixa</h1>
      </div>
      <CashFlowChart data={cashFlowData} />
    </div>
  );
};

export default CashFlow;