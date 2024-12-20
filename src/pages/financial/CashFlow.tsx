import { CashFlowChart } from "@/components/financial/dashboard/CashFlowChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const CashFlow = () => {
  const [period, setPeriod] = useState("6");

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

  // Cálculos para os cards de resumo
  const totalRevenue = cashFlowData.reduce((acc, curr) => acc + curr.receitas, 0);
  const totalExpenses = cashFlowData.reduce((acc, curr) => acc + curr.despesas, 0);
  const balance = totalRevenue - totalExpenses;
  const growthRate = ((cashFlowData[cashFlowData.length - 1].receitas - cashFlowData[0].receitas) / cashFlowData[0].receitas) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Fluxo de Caixa</h1>
          <p className="text-sm text-gray-500">
            Análise detalhada das receitas e despesas
          </p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">Últimos 3 meses</SelectItem>
            <SelectItem value="6">Últimos 6 meses</SelectItem>
            <SelectItem value="12">Últimos 12 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Receitas</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              +{growthRate.toFixed(1)}% em relação ao início do período
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo do Período</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(balance)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução do Fluxo de Caixa</CardTitle>
        </CardHeader>
        <CardContent>
          <CashFlowChart data={cashFlowData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlow;