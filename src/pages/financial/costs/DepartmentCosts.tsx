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

const DepartmentCosts = () => {
  // Dados mockados para exemplo
  const departments = [
    {
      id: 1,
      name: "Administrativo",
      budget: 50000,
      currentCost: 35000,
      percentage: 70,
    },
    {
      id: 2,
      name: "Operacional",
      budget: 80000,
      currentCost: 65000,
      percentage: 81.25,
    },
    {
      id: 3,
      name: "Comercial",
      budget: 30000,
      currentCost: 25000,
      percentage: 83.33,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Centro de Custos por Departamento</h1>
        <p className="text-sm text-gray-500">
          Acompanhe os custos de cada departamento
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custos Departamentais</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Departamento</TableHead>
                <TableHead>Orçamento</TableHead>
                <TableHead>Custo Atual</TableHead>
                <TableHead>% Utilizado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{formatCurrency(dept.budget)}</TableCell>
                  <TableCell>{formatCurrency(dept.currentCost)}</TableCell>
                  <TableCell>{dept.percentage.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentCosts;