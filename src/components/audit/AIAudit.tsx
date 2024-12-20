import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { mockOccurrences } from "@/data/occurrenceData";
import { AuditHistory } from "./AuditHistory";
import { AuditStepConfig, AuditStepConfiguration } from "./config/AuditStepConfig";
import { AuditScoring } from "./scoring/AuditScoring";
import { AuditHistoryFilters, AuditHistoryFilters as FilterType } from "./history/AuditHistoryFilters";
import { AuditLegend } from "./legend/AuditLegend";
import { AuditProgress } from "./progress/AuditProgress";

interface AuditAction {
  id: string;
  date: string;
  user: string;
  action: string;
  status: string;
  details?: string;
}

const defaultSteps: AuditStepConfiguration[] = [
  {
    id: "plan",
    title: "Validação do Plano",
    enabled: true,
    weight: 1.0
  },
  {
    id: "contract",
    title: "Verificação do Contrato",
    enabled: true,
    weight: 1.0
  },
  {
    id: "legal",
    title: "Análise Jurídica",
    enabled: true,
    weight: 1.5
  },
  {
    id: "technical",
    title: "Análise Técnica",
    enabled: true,
    weight: 1.5
  },
  {
    id: "financial",
    title: "Análise Financeira",
    enabled: true,
    weight: 1.0
  }
];

export function AIAudit() {
  const [occurrenceId, setOccurrenceId] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [auditHistory, setAuditHistory] = useState<AuditAction[]>([]);
  const [steps, setSteps] = useState<AuditStepConfiguration[]>(defaultSteps);
  const [filters, setFilters] = useState<FilterType>({
    search: "",
    status: "",
    dateRange: { start: null, end: null }
  });
  const { toast } = useToast();

  const calculateRiskScore = (stepResults: any[]) => {
    const enabledSteps = steps.filter(s => s.enabled);
    const totalWeight = enabledSteps.reduce((acc, step) => acc + step.weight, 0);
    
    const breakdown = enabledSteps.map(step => {
      const result = stepResults.find(r => r.id === step.id);
      const score = result?.result?.status === "positive" ? step.weight :
                   result?.result?.status === "partial" ? step.weight * 0.5 : 0;
      
      return {
        category: step.title,
        score,
        maxScore: step.weight
      };
    });

    const totalScore = (breakdown.reduce((acc, item) => acc + item.score, 0) / totalWeight) * 100;

    return {
      total: Math.round(totalScore),
      breakdown
    };
  };

  const startAudit = async () => {
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
    setCurrentStep(0);
    
    const enabledSteps = steps.filter(s => s.enabled);
    
    for (let i = 0; i < enabledSteps.length; i++) {
      setCurrentStep(i);
      
      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: "processing" as const } : step
      ));
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setSteps(prev => {
        const newSteps = prev.map((step, idx) => {
          if (idx === i) {
            let result;
            switch (step.id) {
              case "plan":
                result = {
                  status: "positive" as const,
                  message: "Plano válido e cobertura confirmada"
                };
                break;
              case "contract":
                result = {
                  status: "positive" as const,
                  message: "Contrato ativo e dentro da vigência"
                };
                break;
              case "legal":
                result = {
                  status: "negative" as const,
                  message: "Irregularidades identificadas: Excesso de velocidade."
                };
                break;
              case "technical":
                result = {
                  status: "positive" as const,
                  message: "Veículo em boas condições técnicas. Pneus e freios em estado adequado."
                };
                break;
              case "financial":
                result = {
                  status: "partial" as const,
                  message: "Pagamento com atraso de 5 dias"
                };
                break;
              default:
                result = {
                  status: "negative" as const,
                  message: "Erro na análise"
                };
            }
            return { ...step, status: "completed" as const, result };
          }
          return step;
        });

        if (i === enabledSteps.length - 1) {
          const finalResult = {
            status: "positive" as const,
            message: "Auditoria concluída com sucesso. Todos os critérios foram atendidos satisfatoriamente."
          };
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
    
    const riskScore = calculateRiskScore(steps);
    setIsAuditing(false);
  };

  const handleConfigSave = (newConfig: AuditStepConfiguration[]) => {
    setSteps(newConfig);
  };

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const filteredHistory = auditHistory.filter(item => {
    if (filters.search && !item.action.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && item.status.toLowerCase() !== filters.status.toLowerCase()) {
      return false;
    }
    if (filters.dateRange.start || filters.dateRange.end) {
      const itemDate = new Date(item.date);
      if (filters.dateRange.start && itemDate < filters.dateRange.start) {
        return false;
      }
      if (filters.dateRange.end && itemDate > filters.dateRange.end) {
        return false;
      }
    }
    return true;
  });

  const progress = (currentStep / (steps.filter(s => s.enabled).length)) * 100;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">Auditoria I.A.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nova Auditoria</CardTitle>
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

            <AuditProgress 
              isAuditing={isAuditing} 
              progress={progress}
            />
          </CardContent>
        </Card>

        <AuditLegend />

        <AuditStepConfig
          steps={steps}
          onSaveConfig={handleConfigSave}
        />

        {steps.some(step => step.result) && (
          <AuditScoring
            score={calculateRiskScore(steps)}
          />
        )}
      </div>

      {auditHistory.length > 0 && (
        <div className="mt-8">
          <AuditHistoryFilters onFilterChange={handleFilterChange} />
          <div className="mt-4">
            <AuditHistory actions={filteredHistory} />
          </div>
        </div>
      )}
    </div>
  );
}
