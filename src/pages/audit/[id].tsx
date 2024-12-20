import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, X, AlertCircle, ArrowLeft } from "lucide-react";
import { mockOccurrences } from "@/data/occurrenceData";
import { useNavigate } from "react-router-dom";
import { AuditChecklist } from "@/components/audit/AuditChecklist";

export default function AuditDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [technicalOpinion, setTechnicalOpinion] = useState("");
  
  const occurrence = mockOccurrences.find(o => o.id === id);

  if (!occurrence) {
    return <div>Acionamento não encontrado</div>;
  }

  const handleAuditDecision = (decision: "approved" | "rejected" | "partial") => {
    if (!technicalOpinion.trim()) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "É necessário incluir um parecer técnico antes de finalizar a auditoria.",
      });
      return;
    }

    // Here you would typically make an API call to update the audit status
    toast({
      title: "Auditoria finalizada",
      description: `O acionamento foi ${
        decision === "approved" ? "aprovado" : 
        decision === "rejected" ? "recusado" : 
        "marcado como pendente de informações"
      } com sucesso.`,
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
            <CardTitle>Checklist de Auditoria</CardTitle>
          </CardHeader>
          <CardContent>
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
              value={technicalOpinion}
              onChange={(e) => setTechnicalOpinion(e.target.value)}
            />

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleAuditDecision("partial")}
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