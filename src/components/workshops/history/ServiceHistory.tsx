import { useState } from "react";
import type { ServiceHistory as ServiceHistoryType } from "@/types/payments";
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
const MOCK_HISTORY: ServiceHistory[] = [
  {
    id: "1",
    workshopId: "1",
    serviceDate: "2024-03-15",
    completionDate: "2024-03-16",
    serviceType: "Mecânica",
    description: "Troca de embreagem",
    cost: 1500.0,
    vehicleInfo: {
      brand: "Fiat",
      model: "Uno",
      licensePlate: "ABC1234",
    },
    status: "completed",
  },
  {
    id: "2",
    workshopId: "2",
    serviceDate: "2024-03-18",
    completionDate: "",
    serviceType: "Revisão",
    description: "Revisão completa",
    cost: 800.0,
    vehicleInfo: {
      brand: "Volkswagen",
      model: "Gol",
      licensePlate: "XYZ5678",
    },
    status: "in_progress",
  },
];

export function ServiceHistory() {
  const [history, setHistory] = useState<ServiceHistoryType[]>(MOCK_HISTORY);

  const getStatusBadge = (status: ServiceHistoryType["status"]) => {
    const statusConfig = {
      completed: { label: "Concluído", variant: "success" as const },
      in_progress: { label: "Em Andamento", variant: "warning" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Histórico de Serviços</h2>
        <Button>Registrar Serviço</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo de Serviço</TableHead>
            <TableHead>Veículo</TableHead>
            <TableHead>Data Início</TableHead>
            <TableHead>Data Conclusão</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((service) => (
            <TableRow key={service.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{service.serviceType}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">
                    {service.vehicleInfo.brand} {service.vehicleInfo.model}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {service.vehicleInfo.licensePlate}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                {format(new Date(service.serviceDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                {service.completionDate
                  ? format(new Date(service.completionDate), "dd/MM/yyyy")
                  : "-"}
              </TableCell>
              <TableCell>{formatCurrency(service.cost)}</TableCell>
              <TableCell>{getStatusBadge(service.status)}</TableCell>
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