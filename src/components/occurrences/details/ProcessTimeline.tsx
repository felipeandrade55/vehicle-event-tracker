import { Check, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

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
      return "bg-green-500";
    case "in-progress":
      return "bg-blue-500";
    case "pending":
      return "bg-gray-300";
  }
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-gray-200">
      {steps.map((step, index) => (
        <div key={step.id} className="relative animate-fade-in">
          <div className="flex items-center">
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              getStatusColor(step.status),
              "transition-colors duration-300"
            )}>
              {getStatusIcon(step.status)}
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{step.title}</h4>
                {step.date && (
                  <time className="text-sm text-gray-500">
                    {format(new Date(step.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </time>
                )}
              </div>
              {step.description && (
                <p className="mt-1 text-sm text-gray-500">{step.description}</p>
              )}
              {step.agent && (
                <p className="mt-1 text-sm text-gray-500">por {step.agent}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}