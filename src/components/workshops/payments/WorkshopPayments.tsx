import { useState } from "react";
import { ServicePayment } from "@/types/payments";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Dados mockados para demonstração
const MOCK_PAYMENTS: ServicePayment[] = [
  {
    id: "1",
    workshopId: "1",
    workshopName: "Oficina São João",
    serviceDate: "2024-03-15",
    paymentDate: "2024-03-20",
    amount: 1500.0,
    status: "paid",
    description: "Troca de embreagem",
    serviceType: "Mecânica",
    vehicleInfo: {
      brand: "Fiat",
      model: "Uno",
      licensePlate: "ABC1234",
    },
  },
  {
    id: "2",
    workshopId: "2",
    workshopName: "Auto Center Express",
    serviceDate: "2024-03-18",
    paymentDate: "",
    amount: 800.0,
    status: "pending",
    description: "Revisão completa",
    serviceType: "Revisão",
    vehicleInfo: {
      brand: "Volkswagen",
      model: "Gol",
      licensePlate: "XYZ5678",
    },
  },
];

export function WorkshopPayments() {
  const [payments, setPayments] = useState<ServicePayment[]>(MOCK_PAYMENTS);

  const getStatusBadge = (status: ServicePayment["status"]) => {
    const statusConfig = {
      paid: { label: "Pago", variant: "success" as const },
      pending: { label: "Pendente", variant: "warning" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pagamentos a Prestadores</h2>
        <Button>Novo Pagamento</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Oficina</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Veículo</TableHead>
            <TableHead>Data do Serviço</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.workshopName}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{payment.serviceType}</p>
                  <p className="text-sm text-muted-foreground">
                    {payment.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                {payment.vehicleInfo && (
                  <div>
                    <p className="font-medium">
                      {payment.vehicleInfo.brand} {payment.vehicleInfo.model}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payment.vehicleInfo.licensePlate}
                    </p>
                  </div>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(payment.serviceDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{formatCurrency(payment.amount)}</TableCell>
              <TableCell>{getStatusBadge(payment.status)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}