import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { mockOccurrences } from "@/data/occurrenceData";

interface AuditStep {
  id: string;
  title: string;
  status: "pending" | "processing" | "completed" | "error";
  result?: {
    status: "positive" | "negative" | "partial";
    message: string;
  };
}

export function AIAudit() {
  const [occurrenceId, setOccurrenceId] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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

  const startAudit = async () => {
    const occurrence = mockOccurrences.find(o => o.id === occurrenceId);
    
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
      setSteps(prev => prev.map((step, idx) => {
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
              result = {
                status: "positive",
                message: "Auditoria concluída com sucesso"
              };
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
      }));
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
              placeholder="Digite o número do acionamento"
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
    </div>
  );
}