import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Edit, History, RefreshCw, TrendingUp } from "lucide-react";

interface Contract {
  id: string;
  title: string;
  type: string;
  status: "active" | "pending" | "expired";
  startDate: string;
  endDate: string;
  value: number;
  nextRenewal?: string;
  nextAdjustment?: string;
}

const sampleContracts: Contract[] = [
  {
    id: "1",
    title: "Contrato de Prestação de Serviços",
    type: "Serviços",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    value: 5000,
    nextRenewal: "2024-12-01",
    nextAdjustment: "2024-06-01",
  },
  {
    id: "2",
    title: "Contrato de Locação",
    type: "Locação",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    value: 3000,
    nextRenewal: "2025-01-01",
    nextAdjustment: "2024-08-01",
  },
];

const ContractManagement = () => {
  const [contracts] = useState<Contract[]>(sampleContracts);
  const navigate = useNavigate();

  const getStatusBadge = (status: Contract["status"]) => {
    const styles = {
      active: "bg-green-500",
      pending: "bg-yellow-500",
      expired: "bg-red-500",
    };

    return (
      <Badge className={styles[status]}>
        {status === "active" ? "Ativo" : status === "pending" ? "Pendente" : "Expirado"}
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Contratos</h1>
          <p className="text-sm text-gray-500">
            Gerencie todos os contratos da associação
          </p>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate("/financial/contracts/approval-levels")}
          >
            Alçadas de Aprovação
          </Button>
          <Button onClick={() => navigate("/financial/contracts/editor/new")}>
            <FileText className="mr-2 h-4 w-4" />
            Novo Contrato
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.filter((c) => c.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renovações Pendentes</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.filter((c) => new Date(c.nextRenewal!) <= new Date()).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reajustes Pendentes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.filter((c) => new Date(c.nextAdjustment!) <= new Date()).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Término</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Próx. Renovação</TableHead>
                <TableHead>Próx. Reajuste</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.title}</TableCell>
                  <TableCell>{contract.type}</TableCell>
                  <TableCell>{getStatusBadge(contract.status)}</TableCell>
                  <TableCell>{formatDate(contract.startDate)}</TableCell>
                  <TableCell>{formatDate(contract.endDate)}</TableCell>
                  <TableCell>{formatCurrency(contract.value)}</TableCell>
                  <TableCell>{contract.nextRenewal ? formatDate(contract.nextRenewal) : "-"}</TableCell>
                  <TableCell>{contract.nextAdjustment ? formatDate(contract.nextAdjustment) : "-"}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/financial/contracts/editor/${contract.id}`)}
                    >
                      <Edit className="h-4 w-4" />
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

export default ContractManagement;
