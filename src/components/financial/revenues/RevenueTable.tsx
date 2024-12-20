import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Revenue {
  id: number;
  date: string;
  description: string;
  category: string;
  value: number;
  status: string;
}

interface RevenueTableProps {
  revenues: Revenue[];
}

export const RevenueTable = ({ revenues }: RevenueTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {revenues.map((revenue) => (
          <TableRow key={revenue.id}>
            <TableCell>{new Date(revenue.date).toLocaleDateString()}</TableCell>
            <TableCell>{revenue.description}</TableCell>
            <TableCell>{revenue.category}</TableCell>
            <TableCell className="text-right">
              {revenue.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  revenue.status === "Recebido"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {revenue.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};