import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyPayment } from "@/types/monthly-payments";
import { DollarSign, AlertTriangle, CheckCircle } from "lucide-react";

interface MonthlyPaymentSummaryProps {
  payments: MonthlyPayment[];
}

export const MonthlyPaymentSummary = ({ payments }: MonthlyPaymentSummaryProps) => {
  const totalReceived = payments
    .filter((p) => p.status === "paid")
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalOverdue = payments
    .filter((p) => p.status === "overdue")
    .reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalReceived.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {payments.filter((p) => p.status === "paid").length} pagamentos
            recebidos
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">A Receber</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalPending.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {payments.filter((p) => p.status === "pending").length} pagamentos
            pendentes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Atrasados</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalOverdue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {payments.filter((p) => p.status === "overdue").length} pagamentos
            atrasados
          </p>
        </CardContent>
      </Card>
    </div>
  );
};