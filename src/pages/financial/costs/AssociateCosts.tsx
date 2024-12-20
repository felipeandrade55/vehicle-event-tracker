import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

const AssociateCosts = () => {
  // Dados mockados para exemplo
  const associateCosts = [
    {
      id: 1,
      associate: "João Silva",
      monthlyFee: 250,
      serviceCosts: 1500,
      administrativeCosts: 100,
      total: 1850,
    },
    {
      id: 2,
      associate: "Maria Santos",
      monthlyFee: 250,
      serviceCosts: 800,
      administrativeCosts: 100,
      total: 1150,
    },
    {
      id: 3,
      associate: "Pedro Oliveira",
      monthlyFee: 250,
      serviceCosts: 2000,
      administrativeCosts: 100,
      total: 2350,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Custos por Associado</h1>
        <p className="text-sm text-gray-500">
          Analise os custos individuais de cada associado
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análise de Custos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Associado</TableHead>
                <TableHead>Mensalidade</TableHead>
                <TableHead>Custos com Serviços</TableHead>
                <TableHead>Custos Administrativos</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {associateCosts.map((cost) => (
                <TableRow key={cost.id}>
                  <TableCell className="font-medium">{cost.associate}</TableCell>
                  <TableCell>{formatCurrency(cost.monthlyFee)}</TableCell>
                  <TableCell>{formatCurrency(cost.serviceCosts)}</TableCell>
                  <TableCell>{formatCurrency(cost.administrativeCosts)}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(cost.total)}
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

export default AssociateCosts;