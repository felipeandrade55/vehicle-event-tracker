import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { RotateCw } from "lucide-react";

interface AuditAction {
  id: string;
  date: string;
  user: string;
  action: string;
  status: string;
  details?: string;
  occurrenceId: string;
  steps: {
    id: string;
    title: string;
    status: "completed" | "processing";
    result?: {
      status: "positive" | "negative" | "partial";
      message: string;
    };
  }[];
  score: {
    total: number;
    breakdown: { category: string; score: number; maxScore: number; }[];
  };
}

interface AuditHistoryProps {
  actions: AuditAction[];
  onItemClick: (action: AuditAction) => void;
}

export function AuditHistory({ actions, onItemClick }: AuditHistoryProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "aprovado":
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>;
      case "reprovado":
        return <Badge className="bg-red-100 text-red-800">Reprovado</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Histórico de Auditoria</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {actions.map((action) => (
              <div
                key={action.id}
                onClick={() => onItemClick(action)}
                className="flex flex-col space-y-2 pb-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 rounded-lg p-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{action.user}</span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(action.date), "dd/MM/yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{action.action}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemClick(action);
                      }}
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </div>
                  {getStatusBadge(action.status)}
                </div>
                {action.details && (
                  <p className="text-sm text-gray-600 mt-1">{action.details}</p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}