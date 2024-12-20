import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Defaulter {
  id: string;
  name: string;
  monthsOverdue: number;
  totalDebt: number;
  lastPayment: string;
  status: "critical" | "moderate" | "light";
}

export const DefaultersReport = () => {
  const defaulters: Defaulter[] = [
    {
      id: "1",
      name: "João Silva",
      monthsOverdue: 3,
      totalDebt: 750.0,
      lastPayment: "2024-01-15",
      status: "critical",
    },
    {
      id: "2",
      name: "Maria Santos",
      monthsOverdue: 2,
      totalDebt: 300.0,
      lastPayment: "2024-02-15",
      status: "moderate",
    },
  ];

  const getStatusColor = (status: Defaulter["status"]) => {
    switch (status) {
      case "critical":
        return "text-red-500";
      case "moderate":
        return "text-yellow-500";
      case "light":
        return "text-blue-500";
      default:
        return "";
    }
  };

  const handleExportReport = () => {
    // Aqui será implementada a lógica de exportação do relatório
    console.log("Exportando relatório...");
  };

  const totalDebt = defaulters.reduce((acc, curr) => acc + curr.totalDebt, 0);
  const averageDebt = totalDebt / defaulters.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">
              Relatório de Inadimplência
            </CardTitle>
            <CardDescription>
              Total de {defaulters.length} associados inadimplentes
            </CardDescription>
          </div>
          <Button onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Débito Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalDebt)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Média por Associado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(averageDebt)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Casos Críticos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {defaulters.filter((d) => d.status === "critical").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Associado</TableHead>
              <TableHead>Meses em Atraso</TableHead>
              <TableHead>Último Pagamento</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {defaulters.map((defaulter) => (
              <TableRow key={defaulter.id}>
                <TableCell>{defaulter.name}</TableCell>
                <TableCell>{defaulter.monthsOverdue}</TableCell>
                <TableCell>{new Date(defaulter.lastPayment).toLocaleDateString()}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(defaulter.totalDebt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <AlertTriangle
                      className={`h-4 w-4 mr-2 ${getStatusColor(defaulter.status)}`}
                    />
                    <span className={getStatusColor(defaulter.status)}>
                      {defaulter.monthsOverdue} meses
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};