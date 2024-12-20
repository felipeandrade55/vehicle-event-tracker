import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MonthlyPayment } from "@/types/monthly-payments";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface MonthlyPaymentTableProps {
  payments: MonthlyPayment[];
}

export const MonthlyPaymentTable = ({ payments }: MonthlyPaymentTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pago";
      case "pending":
        return "Pendente";
      case "overdue":
        return "Atrasado";
      default:
        return status;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Associado</TableHead>
          <TableHead>Plano</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.associateName}</TableCell>
            <TableCell>{payment.planName}</TableCell>
            <TableCell>
              {new Date(payment.dueDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              {payment.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  payment.status
                )}`}
              >
                {getStatusText(payment.status)}
              </span>
            </TableCell>
            <TableCell>
              {payment.invoiceUrl && (
                <Button variant="ghost" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};