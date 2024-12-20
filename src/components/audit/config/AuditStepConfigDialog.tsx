import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";
import { AuditStepConfig, AuditStepConfiguration } from "./AuditStepConfig";

interface AuditStepConfigDialogProps {
  steps: AuditStepConfiguration[];
  onSaveConfig: (config: AuditStepConfiguration[]) => void;
}

export function AuditStepConfigDialog({ steps, onSaveConfig }: AuditStepConfigDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4 mr-2" />
          Configurar Pesos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Configuração dos Pesos das Etapas</DialogTitle>
        </DialogHeader>
        <AuditStepConfig steps={steps} onSaveConfig={onSaveConfig} />
      </DialogContent>
    </Dialog>
  );
}