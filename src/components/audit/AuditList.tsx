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
import { mockOccurrences, Occurrence } from "@/data/occurrenceData";

interface AuditListProps {
  status: "pending" | "in-progress" | "completed";
}

export function AuditList({ status }: AuditListProps) {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em Análise":
        return <Badge className="bg-yellow-100 text-yellow-800">Em Análise</Badge>;
      case "Em Atendimento":
        return <Badge className="bg-blue-100 text-blue-800">Em Atendimento</Badge>;
      case "Concluído":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>;
      case "Cancelado":
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      case "Aguardando Documentação":
        return <Badge className="bg-purple-100 text-purple-800">Aguardando Docs</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filterOccurrencesByAuditStatus = (occurrences: Occurrence[]) => {
    switch (status) {
      case "pending":
        return occurrences.filter(
          (occ) => occ.status === "Em Análise" || occ.status === "Aguardando Documentação"
        );
      case "in-progress":
        return occurrences.filter((occ) => occ.status === "Em Atendimento");
      case "completed":
        return occurrences.filter(
          (occ) => occ.status === "Concluído" || occ.status === "Cancelado"
        );
      default:
        return occurrences;
    }
  };

  const filteredOccurrences = filterOccurrencesByAuditStatus(mockOccurrences);

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
        {filteredOccurrences.map((occurrence) => (
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