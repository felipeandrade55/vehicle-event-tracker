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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
      category: "Infraestrutura",
      previousTotal: 4800,
    },
    {
      id: 2,
      expense: "Energia Elétrica",
      total: 3000,
      administrative: 1000,
      operational: 1500,
      commercial: 500,
      category: "Utilidades",
      previousTotal: 2800,
    },
    {
      id: 3,
      expense: "Internet",
      total: 1000,
      administrative: 400,
      operational: 400,
      commercial: 200,
      category: "Tecnologia",
      previousTotal: 1000,
    },
  ];

  const departments = [
    { value: "all", label: "Todos os Departamentos" },
    { value: "administrative", label: "Administrativo" },
    { value: "operational", label: "Operacional" },
    { value: "commercial", label: "Comercial" },
  ];

  const pieData = [
    { name: "Administrativo", value: 3400 },
    { name: "Operacional", value: 3900 },
    { name: "Comercial", value: 1700 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const calculateVariation = (current: number, previous: number) => {
    const variation = ((current - previous) / previous) * 100;
    return variation.toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rateio de Despesas</h1>
        <p className="text-sm text-gray-500">
          Visualize e analise o rateio das despesas entre departamentos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Departamento</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Período</label>
              <div className="flex gap-2">
                <DatePicker />
                <DatePicker />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
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
                <TableHead>Categoria</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Var%</TableHead>
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
                  <TableCell>{allocation.category}</TableCell>
                  <TableCell>{formatCurrency(allocation.total)}</TableCell>
                  <TableCell>
                    <span className={allocation.total > allocation.previousTotal ? "text-green-600" : "text-red-600"}>
                      {calculateVariation(allocation.total, allocation.previousTotal)}%
                    </span>
                  </TableCell>
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