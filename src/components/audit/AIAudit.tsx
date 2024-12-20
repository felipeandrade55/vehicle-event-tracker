import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle2, XCircle, AlertCircle, RotateCcw } from "lucide-react";
import { mockOccurrences } from "@/data/occurrenceData";
import { AuditHistory } from "./AuditHistory";

interface AuditStep {
  id: string;
  title: string;
  status: "pending" | "processing" | "completed" | "error";
  result?: {
    status: "positive" | "negative" | "partial";
    message: string;
  };
}

interface AuditAction {
  id: string;
  date: string;
  user: string;
  action: string;
  status: string;
  details?: string;
}

export function AIAudit() {
  const [occurrenceId, setOccurrenceId] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [auditHistory, setAuditHistory] = useState<AuditAction[]>([]);
  const [steps, setSteps] = useState<AuditStep[]>([
    {
      id: "plan",
      title: "Validação do Plano",
      status: "pending"
    },
    {
      id: "contract",
      title: "Verificação do Contrato",
      status: "pending"
    },
    {
      id: "financial",
      title: "Análise Financeira",
      status: "pending"
    },
    {
      id: "final",
      title: "Análise Final",
      status: "pending"
    }
  ]);
  
  const { toast } = useToast();

  const generateFinalAnalysis = (steps: AuditStep[]) => {
    const positiveCount = steps.filter(s => s.result?.status === "positive").length;
    const partialCount = steps.filter(s => s.result?.status === "partial").length;
    
    if (positiveCount === steps.length - 1) { // All positive except final step
      return {
        status: "positive" as const,
        message: "Auditoria concluída com sucesso. Todos os critérios foram atendidos. Recomendação: Aprovação imediata do processo."
      };
    } else if (partialCount > 0) {
      return {
        status: "partial" as const,
        message: "Auditoria concluída com ressalvas. Foram identificados pontos de atenção que precisam ser revisados, mas não impeditivos."
      };
    } else {
      return {
        status: "negative" as const,
        message: "Auditoria concluída com restrições. Foram identificados pontos críticos que precisam ser resolvidos antes de prosseguir."
      };
    }
  };

  const startAudit = async () => {
    // Format the occurrence ID to include the "#" symbol if not present
    const formattedId = occurrenceId.startsWith("#") ? occurrenceId : `#${occurrenceId}`;
    const occurrence = mockOccurrences.find(o => o.id === formattedId);
    
    if (!occurrence) {
      toast({
        title: "Erro",
        description: "Acionamento não encontrado",
        variant: "destructive"
      });
      return;
    }

    setIsAuditing(true);
    
    // Simulated AI analysis for each step
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Update current step to processing
      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: "processing" } : step
      ));
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update step with result
      setSteps(prev => {
        const newSteps = prev.map((step, idx) => {
          if (idx === i) {
            let result;
            switch (step.id) {
              case "plan":
                result = {
                  status: "positive",
                  message: "Plano válido e cobertura confirmada"
                };
                break;
              case "contract":
                result = {
                  status: "positive",
                  message: "Contrato ativo e dentro da vigência"
                };
                break;
              case "financial":
                result = {
                  status: "partial",
                  message: "Pagamento com atraso de 5 dias"
                };
                break;
              case "final":
                result = generateFinalAnalysis(prev);
                break;
              default:
                result = {
                  status: "negative",
                  message: "Erro na análise"
                };
            }
            return { ...step, status: "completed", result };
          }
          return step;
        });

        // If this is the last step, add to history
        if (i === steps.length - 1) {
          const finalResult = generateFinalAnalysis(newSteps);
          const historyEntry: AuditAction = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            user: "Sistema",
            action: `Auditoria do acionamento ${formattedId}`,
            status: finalResult.status === "positive" ? "Aprovado" : 
                   finalResult.status === "partial" ? "Pendente" : "Reprovado",
            details: finalResult.message
          };
          setAuditHistory(prev => [historyEntry, ...prev]);
        }

        return newSteps;
      });
    }
    
    setIsAuditing(false);
  };

  const getStatusIcon = (status: "positive" | "negative" | "partial") => {
    switch (status) {
      case "positive":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "negative":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "partial":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const rerunAudit = (actionId: string) => {
    const historyItem = auditHistory.find(h => h.id === actionId);
    if (historyItem) {
      const occurrenceNumber = historyItem.action.split(" ").pop(); // Get the occurrence number from action
      setOccurrenceId(occurrenceNumber || "");
      startAudit();
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">Auditoria I.A.</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Iniciar Nova Auditoria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Digite o número do acionamento (ex: 2024-001)"
              value={occurrenceId}
              onChange={(e) => setOccurrenceId(e.target.value)}
              disabled={isAuditing}
            />
            <Button onClick={startAudit} disabled={!occurrenceId || isAuditing}>
              Iniciar Auditoria
            </Button>
          </div>

          {isAuditing && (
            <div className="space-y-4 mt-6">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500 text-center">
                Analisando... {Math.round(progress)}%
              </p>
            </div>
          )}

          <div className="space-y-4 mt-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  step.status === "processing"
                    ? "border-primary bg-primary/5 animate-pulse"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  {step.result && (
                    <div className="flex items-center gap-2">
                      {getStatusIcon(step.result.status)}
                      <span className="text-sm text-gray-600">
                        {step.result.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {auditHistory.length > 0 && (
        <div className="mt-8">
          <AuditHistory 
            actions={auditHistory.map(action => ({
              ...action,
              rerun: (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => rerunAudit(action.id)}
                  className="ml-2"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Refazer
                </Button>
              )
            }))}
          />
        </div>
      )}
    </div>
  );
}