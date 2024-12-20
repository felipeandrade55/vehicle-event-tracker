import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList } from "lucide-react";
import { mockOccurrences } from "@/data/occurrenceData";

interface AuditListProps {
  status: "pending" | "in-progress" | "completed";
}

export function AuditList({ status }: AuditListProps) {
  const navigate = useNavigate();

  const getStatusBadge = (auditStatus: string) => {
    switch (auditStatus) {
      case "Aprovado":
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>;
      case "Recusado":
        return <Badge className="bg-red-100 text-red-800">Recusado</Badge>;
      case "Pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      default:
        return <Badge variant="secondary">{auditStatus}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Associado</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockOccurrences.map((occurrence) => (
          <TableRow key={occurrence.id}>
            <TableCell>{occurrence.id}</TableCell>
            <TableCell>{occurrence.date}</TableCell>
            <TableCell>{occurrence.associate}</TableCell>
            <TableCell>{occurrence.type}</TableCell>
            <TableCell>{getStatusBadge(occurrence.status)}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/audit/${occurrence.id}`)}
                className="flex items-center gap-2"
              >
                <ClipboardList className="h-4 w-4" />
                Auditar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}