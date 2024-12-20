import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export interface AuditStepConfiguration {
  id: string;
  title: string;
  enabled: boolean;
  weight: number;
}

interface AuditStepConfigProps {
  steps: AuditStepConfiguration[];
  onSaveConfig: (config: AuditStepConfiguration[]) => void;
}

export function AuditStepConfig({ steps, onSaveConfig }: AuditStepConfigProps) {
  const [configuration, setConfiguration] = useState<AuditStepConfiguration[]>(steps);
  const { toast } = useToast();

  const handleToggleStep = (stepId: string) => {
    setConfiguration(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, enabled: !step.enabled } : step
      )
    );
  };

  const handleWeightChange = (stepId: string, weight: string) => {
    const numWeight = parseFloat(weight);
    if (isNaN(numWeight) || numWeight < 0 || numWeight > 10) return;

    setConfiguration(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, weight: numWeight } : step
      )
    );
  };

  const handleSave = () => {
    onSaveConfig(configuration);
    toast({
      title: "Configuração salva",
      description: "As etapas da auditoria foram atualizadas com sucesso.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração das Etapas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {configuration.map((step) => (
            <div key={step.id} className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <Label>{step.title}</Label>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={step.weight}
                    onChange={(e) => handleWeightChange(step.id, e.target.value)}
                    placeholder="Peso"
                  />
                </div>
                <Switch
                  checked={step.enabled}
                  onCheckedChange={() => handleToggleStep(step.id)}
                />
              </div>
            </div>
          ))}
          <Button onClick={handleSave} className="w-full">
            Salvar Configuração
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}