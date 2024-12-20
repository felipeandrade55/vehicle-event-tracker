import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface ContractRenewal {
  id: string;
  contractTitle: string;
  currentEndDate: string;
  renewalDate: string;
  status: "pending" | "processed" | "cancelled";
  daysUntilRenewal: number;
}

const sampleRenewals: ContractRenewal[] = [
  {
    id: "1",
    contractTitle: "Contrato de Prestação de Serviços",
    currentEndDate: "2024-12-31",
    renewalDate: "2025-01-01",
    status: "pending",
    daysUntilRenewal: 30,
  },
  {
    id: "2",
    contractTitle: "Contrato de Locação",
    currentEndDate: "2024-06-30",
    renewalDate: "2024-07-01",
    status: "processed",
    daysUntilRenewal: 15,
  },
];

const ContractRenewals = () => {
  const getStatusBadge = (status: ContractRenewal["status"]) => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Renovações de Contratos</h1>
        <p className="text-sm text-gray-500">
          Gerencie as renovações automáticas dos contratos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Renovações Pendentes
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sampleRenewals.filter((r) => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próxima Renovação
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.min(...sampleRenewals.map((r) => r.daysUntilRenewal))} dias
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Renovações Programadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead>Término Atual</TableHead>
                <TableHead>Data Renovação</TableHead>
                <TableHead>Dias Restantes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleRenewals.map((renewal) => (
                <TableRow key={renewal.id}>
                  <TableCell className="font-medium">
                    {renewal.contractTitle}
                  </TableCell>
                  <TableCell>{formatDate(renewal.currentEndDate)}</TableCell>
                  <TableCell>{formatDate(renewal.renewalDate)}</TableCell>
                  <TableCell>{renewal.daysUntilRenewal} dias</TableCell>
                  <TableCell>{getStatusBadge(renewal.status)}</TableCell>
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

export default ContractRenewals;