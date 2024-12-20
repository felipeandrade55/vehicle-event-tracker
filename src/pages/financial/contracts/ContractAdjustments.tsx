import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle } from "lucide-react";

interface ContractAdjustment {
  id: string;
  contractTitle: string;
  currentValue: number;
  adjustmentDate: string;
  adjustmentIndex: string;
  estimatedValue: number;
  status: "pending" | "processed" | "cancelled";
  daysUntilAdjustment: number;
}

const sampleAdjustments: ContractAdjustment[] = [
  {
    id: "1",
    contractTitle: "Contrato de Prestação de Serviços",
    currentValue: 5000,
    adjustmentDate: "2024-06-01",
    adjustmentIndex: "IPCA",
    estimatedValue: 5300,
    status: "pending",
    daysUntilAdjustment: 45,
  },
  {
    id: "2",
    contractTitle: "Contrato de Locação",
    currentValue: 3000,
    adjustmentDate: "2024-08-01",
    adjustmentIndex: "IGP-M",
    estimatedValue: 3150,
    status: "pending",
    daysUntilAdjustment: 90,
  },
];

const ContractAdjustments = () => {
  const getStatusBadge = (status: ContractAdjustment["status"]) => {
    const styles = {
      pending: "bg-yellow-500",
      processed: "bg-green-500",
      cancelled: "bg-red-500",
    };

    return (
      <Badge className={styles[status]}>
        {status === "pending"
          ? "Pendente"
          : status === "processed"
          ? "Processado"
          : "Cancelado"}
      </Badge>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reajustes de Contratos</h1>
        <p className="text-sm text-gray-500">
          Gerencie os reajustes programados dos contratos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reajustes Pendentes
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sampleAdjustments.filter((a) => a.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximo Reajuste
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.min(...sampleAdjustments.map((a) => a.daysUntilAdjustment))} dias
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reajustes Programados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead>Valor Atual</TableHead>
                <TableHead>Data Reajuste</TableHead>
                <TableHead>Índice</TableHead>
                <TableHead>Valor Estimado</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleAdjustments.map((adjustment) => (
                <TableRow key={adjustment.id}>
                  <TableCell className="font-medium">
                    {adjustment.contractTitle}
                  </TableCell>
                  <TableCell>{formatCurrency(adjustment.currentValue)}</TableCell>
                  <TableCell>{formatDate(adjustment.adjustmentDate)}</TableCell>
                  <TableCell>{adjustment.adjustmentIndex}</TableCell>
                  <TableCell>{formatCurrency(adjustment.estimatedValue)}</TableCell>
                  <TableCell>{getStatusBadge(adjustment.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Processar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractAdjustments;