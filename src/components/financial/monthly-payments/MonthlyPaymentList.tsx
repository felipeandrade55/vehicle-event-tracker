import { useState } from "react";
import { MonthlyPayment } from "@/types/monthly-payments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyPaymentTable } from "./MonthlyPaymentTable";
import { MonthlyPaymentFilters } from "./MonthlyPaymentFilters";
import { MonthlyPaymentSummary } from "./MonthlyPaymentSummary";
import { GenerateMonthlyPayments } from "./GenerateMonthlyPayments";

// Dados mockados para exemplo
const mockMonthlyPayments: MonthlyPayment[] = [
  {
    id: "1",
    associateId: "1",
    associateName: "João Silva",
    planId: "1",
    planName: "Plano Premium",
    value: 250.0,
    dueDate: "2024-03-15",
    status: "paid",
    paymentMethod: "boleto",
    paymentDate: "2024-03-14",
    invoiceUrl: "#",
  },
  {
    id: "2",
    associateId: "2",
    associateName: "Maria Santos",
    planId: "2",
    planName: "Plano Básico",
    value: 150.0,
    dueDate: "2024-03-15",
    status: "pending",
  },
];

export const MonthlyPaymentList = () => {
  const [payments, setPayments] = useState<MonthlyPayment[]>(mockMonthlyPayments);
  const [filters, setFilters] = useState({
    status: "",
    month: "",
    associateId: "",
    planId: "",
  });

  const filteredPayments = payments.filter((payment) => {
    if (filters.status && payment.status !== filters.status) return false;
    if (
      filters.month &&
      new Date(payment.dueDate).getMonth().toString() !== filters.month
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <MonthlyPaymentSummary payments={payments} />
        <GenerateMonthlyPayments />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mensalidades</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyPaymentFilters
            filters={filters}
            setFilters={setFilters}
          />
          <MonthlyPaymentTable payments={filteredPayments} />
        </CardContent>
      </Card>
    </div>
  );
};