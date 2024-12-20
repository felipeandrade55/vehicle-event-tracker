import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, MessageSquare } from "lucide-react";

interface TicketComment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface TicketDetails {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: string;
  comments: TicketComment[];
}

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketDetails | null>(null);

  useEffect(() => {
    // Simulating API call to fetch ticket details
    const mockTicket: TicketDetails = {
      id: id!,
      title: "Solicitação de Acionamento - Colisão",
      description: "Necessito acionar o serviço devido a uma colisão no veículo...",
      status: "open",
      priority: "high",
      category: "Acionamento",
      createdAt: new Date().toISOString(),
      comments: [
        {
          id: "1",
          content: "Ticket recebido, estamos analisando sua solicitação.",
          author: "Atendente",
          createdAt: new Date().toISOString(),
        },
      ],
    };

    setTicket(mockTicket);
  }, [id]);

  if (!ticket) {
    return <div>Carregando...</div>;
  }

  const getStatusBadge = (status: TicketDetails["status"]) => {
    const statusConfig = {
      open: { label: "Aberto", className: "bg-blue-100 text-blue-800" },
      in_progress: { label: "Em Andamento", className: "bg-yellow-100 text-yellow-800" },
      resolved: { label: "Resolvido", className: "bg-green-100 text-green-800" },
      closed: { label: "Fechado", className: "bg-gray-100 text-gray-800" },
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/support")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Detalhes do Ticket</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle>{ticket.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                Aberto em{" "}
                {format(new Date(ticket.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </div>
            </div>
            <div className="flex gap-2">
              {getStatusBadge(ticket.status)}
              <Badge variant="outline">{ticket.category}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Descrição</h3>
            <p className="text-sm text-muted-foreground">{ticket.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-semibold">Comentários</h3>
            </div>
            <div className="space-y-4">
              {ticket.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-muted p-4 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(comment.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}