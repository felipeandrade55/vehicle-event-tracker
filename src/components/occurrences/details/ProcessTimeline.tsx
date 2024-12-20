import { Check, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type StepStatus = "completed" | "pending" | "in-progress";

interface TimelineStep {
  id: number;
  title: string;
  description?: string;
  status: StepStatus;
  date?: string;
  agent?: string;
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
}

const getStatusIcon = (status: StepStatus) => {
  switch (status) {
    case "completed":
      return <Check className="h-4 w-4 text-white" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-white" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-white" />;
  }
};

const getStatusColor = (status: StepStatus) => {
  switch (status) {
    case "completed":
      return "bg-green-500 shadow-green-200";
    case "in-progress":
      return "bg-blue-500 shadow-blue-200";
    case "pending":
      return "bg-gray-300 shadow-gray-100";
  }
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [selectedStep, setSelectedStep] = useState<TimelineStep | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStepClick = (step: TimelineStep) => {
    setSelectedStep(step);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative p-6 bg-white rounded-lg shadow-sm">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-blue-500 before:via-blue-300 before:to-gray-200">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={cn(
                "relative animate-fade-in cursor-pointer group",
                "transition-all duration-500 hover:scale-[1.02]"
              )}
              onClick={() => handleStepClick(step)}
            >
              <div className="flex items-center">
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  getStatusColor(step.status),
                  "transition-all duration-700 shadow-lg",
                  "group-hover:ring-4 group-hover:ring-offset-2",
                  step.status === "in-progress" && "animate-pulse duration-[2000ms]",
                  "group-hover:ring-blue-100"
                )}>
                  {getStatusIcon(step.status)}
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className={cn(
                      "font-medium text-gray-900",
                      "group-hover:text-blue-600 transition-colors duration-300"
                    )}>
                      {step.title}
                    </h4>
                    {step.date && (
                      <time className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        {format(new Date(step.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </time>
                    )}
                  </div>
                  {step.description && (
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{step.description}</p>
                  )}
                  {step.agent && (
                    <p className="mt-1 text-sm font-medium text-blue-500">por {step.agent}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{selectedStep?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedStep?.date && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Data</h4>
                <p className="mt-1 text-gray-900">
                  {format(new Date(selectedStep.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            )}
            {selectedStep?.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Descrição</h4>
                <p className="mt-1 text-gray-900">{selectedStep.description}</p>
              </div>
            )}
            {selectedStep?.agent && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Responsável</h4>
                <p className="mt-1 text-gray-900">{selectedStep.agent}</p>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <div className="mt-1 flex items-center gap-2">
                <div className={cn(
                  "h-3 w-3 rounded-full",
                  getStatusColor(selectedStep?.status as StepStatus)
                )} />
                <span className="capitalize text-gray-900">
                  {selectedStep?.status === "completed" && "Concluído"}
                  {selectedStep?.status === "in-progress" && "Em andamento"}
                  {selectedStep?.status === "pending" && "Pendente"}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}