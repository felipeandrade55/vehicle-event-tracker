import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import type { TimelineStep } from "./types";

interface TimelineStepModalProps {
  step: TimelineStep | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TimelineStepModal({ step, isOpen, onOpenChange }: TimelineStepModalProps) {
  if (!step) return null;

  const timeElapsed = step.date 
    ? formatDistanceToNow(new Date(step.date), { locale: ptBR, addSuffix: true })
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{step.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {step.date && (
            <>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Data</h4>
                <p className="mt-1 text-gray-900">
                  {format(new Date(step.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Tempo decorrido</h4>
                <p className="mt-1 text-gray-900">{timeElapsed}</p>
              </div>
            </>
          )}
          {step.description && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Descrição</h4>
              <p className="mt-1 text-gray-900">{step.description}</p>
            </div>
          )}
          {step.agent && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Responsável</h4>
              <p className="mt-1 text-gray-900">{step.agent}</p>
            </div>
          )}
          {step.type === "team_assignment" && step.details?.role && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Função Atribuída</h4>
              <p className="mt-1 text-gray-900">{step.details.role}</p>
            </div>
          )}
          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <Badge 
              variant={
                step.status === "completed" ? "success" :
                step.status === "in-progress" ? "default" :
                "secondary"
              }
              className="mt-2"
            >
              {step.status === "completed" && "Concluído"}
              {step.status === "in-progress" && "Em andamento"}
              {step.status === "pending" && "Pendente"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}