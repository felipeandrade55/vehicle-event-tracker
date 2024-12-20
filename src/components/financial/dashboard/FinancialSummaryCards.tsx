import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, DollarSign, AlertTriangle } from "lucide-react";

interface FinancialSummaryData {
  totalBalance: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  defaultRate: number;
  revenueCount: number;
  expenseCount: number;
  defaultCount: number;
  monthlyGrowth: number;
}

interface FinancialSummaryCardsProps {
  data: FinancialSummaryData;
}

export const FinancialSummaryCards = ({ data }: FinancialSummaryCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data.totalBalance)}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.monthlyGrowth > 0 ? "+" : ""}
            {data.monthlyGrowth}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receitas do Mês</CardTitle>
          <ArrowUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data.monthlyRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.revenueCount} pagamentos recebidos
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
          <ArrowDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data.monthlyExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.expenseCount} pagamentos realizados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inadimplência</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.defaultRate}%</div>
          <p className="text-xs text-muted-foreground">
            {data.defaultCount} associados pendentes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};