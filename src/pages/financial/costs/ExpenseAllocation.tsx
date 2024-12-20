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

const ExpenseAllocation = () => {
  // Dados mockados para exemplo
  const allocations = [
    {
      id: 1,
      expense: "Aluguel",
      total: 5000,
      administrative: 2000,
      operational: 2000,
      commercial: 1000,
    },
    {
      id: 2,
      expense: "Energia Elétrica",
      total: 3000,
      administrative: 1000,
      operational: 1500,
      commercial: 500,
    },
    {
      id: 3,
      expense: "Internet",
      total: 1000,
      administrative: 400,
      operational: 400,
      commercial: 200,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rateio de Despesas</h1>
        <p className="text-sm text-gray-500">
          Visualize o rateio das despesas administrativas entre departamentos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rateio por Departamento</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Despesa</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Administrativo</TableHead>
                <TableHead>Operacional</TableHead>
                <TableHead>Comercial</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell className="font-medium">
                    {allocation.expense}
                  </TableCell>
                  <TableCell>{formatCurrency(allocation.total)}</TableCell>
                  <TableCell>{formatCurrency(allocation.administrative)}</TableCell>
                  <TableCell>{formatCurrency(allocation.operational)}</TableCell>
                  <TableCell>{formatCurrency(allocation.commercial)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseAllocation;