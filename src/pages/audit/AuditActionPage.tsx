import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Check, X, AlertCircle } from "lucide-react";
import { AuditChecklist } from "@/components/audit/AuditChecklist";
import { AuditHistory } from "@/components/audit/AuditHistory";
import { mockOccurrences } from "@/data/occurrenceData";

export default function AuditActionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const occurrence = mockOccurrences.find(o => o.id === id);

  if (!occurrence) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Acionamento não encontrado</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate("/audit")}
          className="mt-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>
    );
  }

  const handleAuditDecision = (decision: "approved" | "rejected" | "pending") => {
    const status = 
      decision === "approved" ? "Aprovado" :
      decision === "rejected" ? "Reprovado" : 
      "Pendente de Informações";

    toast({
      title: "Auditoria finalizada",
      description: `O acionamento foi ${status.toLowerCase()} com sucesso.`,
    });

    navigate("/audit");
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/audit")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">
            Auditoria do Acionamento {occurrence.id}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Acionamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Associado</p>
              <p>{occurrence.associate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Veículo</p>
              <p>{occurrence.vehicle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tipo</p>
              <p>{occurrence.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Data/Hora</p>
              <p>{occurrence.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Local</p>
              <p>{occurrence.location}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Auditoria</CardTitle>
          </CardHeader>
          <CardContent>
            <AuditHistory 
              actions={[
                {
                  id: "1",
                  date: new Date().toISOString(),
                  user: "Auditor",
                  action: "Iniciou a auditoria",
                  status: "Em andamento",
                }
              ]} 
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <AuditChecklist />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Parecer Técnico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Digite seu parecer técnico detalhado..."
              className="min-h-[150px]"
            />

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleAuditDecision("pending")}
              >
                <AlertCircle className="h-4 w-4" />
                Pendente de Informações
              </Button>
              <Button
                variant="destructive"
                className="flex items-center gap-2"
                onClick={() => handleAuditDecision("rejected")}
              >
                <X className="h-4 w-4" />
                Recusar
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={() => handleAuditDecision("approved")}
              >
                <Check className="h-4 w-4" />
                Aprovar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}