import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuditProgress } from "../progress/AuditProgress";
import { AuditScoring } from "../scoring/AuditScoring";
import { AuditStepConfiguration } from "../config/AuditStepConfig";

interface AuditProcessProps {
  occurrenceId: string;
  isAuditing: boolean;
  progress: number;
  currentScore: {
    total: number;
    breakdown: { category: string; score: number; maxScore: number; }[];
  };
  steps: AuditStepConfiguration[];
  onStartAudit: () => void;
  setOccurrenceId: (id: string) => void;
}

export function AuditProcess({
  occurrenceId,
  isAuditing,
  progress,
  currentScore,
  steps,
  onStartAudit,
  setOccurrenceId
}: AuditProcessProps) {
  return (
    <div className="space-y-6">
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
            <Button onClick={onStartAudit} disabled={!occurrenceId || isAuditing}>
              Iniciar Auditoria
            </Button>
          </div>

          <AuditProgress 
            isAuditing={isAuditing} 
            progress={progress}
          />
        </CardContent>
      </Card>

      {steps.some(step => step.result) && (
        <div className="grid gap-4">
          {steps.map((step, index) => (
            step.result && (
              <Card key={step.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className={`text-sm ${
                      step.result.status === "positive" ? "text-green-600" :
                      step.result.status === "partial" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {step.result.message}
                    </p>
                    <AuditScoring score={currentScore} />
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      )}
    </div>
  );
}