import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Ticket {
  id: string;
  title: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  category: string;
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Solicitação de Acionamento - Colisão",
    status: "open",
    priority: "high",
    createdAt: new Date().toISOString(),
    category: "Acionamento",
  },
  {
    id: "2",
    title: "Dúvida sobre cobertura",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date().toISOString(),
    category: "Dúvidas",
  },
];

export function TicketList() {
  const navigate = useNavigate();
  const [tickets] = useState<Ticket[]>(mockTickets);

  const getStatusBadge = (status: Ticket["status"]) => {
    const statusConfig = {
      open: { label: "Aberto", className: "bg-blue-100 text-blue-800" },
      in_progress: { label: "Em Andamento", className: "bg-yellow-100 text-yellow-800" },
      resolved: { label: "Resolvido", className: "bg-green-100 text-green-800" },
      closed: { label: "Fechado", className: "bg-gray-100 text-gray-800" },
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: Ticket["priority"]) => {
    const priorityConfig = {
      low: { label: "Baixa", className: "bg-gray-100 text-gray-800" },
      medium: { label: "Média", className: "bg-yellow-100 text-yellow-800" },
      high: { label: "Alta", className: "bg-red-100 text-red-800" },
    };

    const config = priorityConfig[priority];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Data de Abertura</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow
            key={ticket.id}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/support/tickets/${ticket.id}`)}
          >
            <TableCell className="font-medium">{ticket.title}</TableCell>
            <TableCell>{ticket.category}</TableCell>
            <TableCell>{getStatusBadge(ticket.status)}</TableCell>
            <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
            <TableCell>
              {format(new Date(ticket.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}