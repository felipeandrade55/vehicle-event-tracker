import { Check, Clock, AlertCircle, User, FileText, Scale, Car, CheckCircle2, CalendarClock } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TimelineStep as TimelineStepType } from "./types";

interface TimelineStepProps {
  step: TimelineStepType;
  onClick: () => void;
  viewMode: "timeline" | "list";
  slaStatus: "completed" | "delayed" | "warning" | "ontrack" | null;
}

const getStepIcon = (title: string) => {
  if (title.toLowerCase().includes("registro")) return <Car className="h-4 w-4 text-blue-500" />;
  if (title.toLowerCase().includes("documentação")) return <FileText className="h-4 w-4 text-blue-500" />;
  if (title.toLowerCase().includes("jurídica")) return <Scale className="h-4 w-4 text-blue-500" />;
  if (title.toLowerCase().includes("aprovação")) return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
  if (title.toLowerCase().includes("finalização")) return <CalendarClock className="h-4 w-4 text-blue-500" />;
  return null;
};

const getStatusIcon = (status: TimelineStepType["status"], type?: string) => {
  if (type === "document_upload") return <FileText className="h-4 w-4 text-white" />;
  if (type === "team_assignment") return <User className="h-4 w-4 text-white" />;
  
  switch (status) {
    case "completed":
      return <Check className="h-4 w-4 text-white" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-white" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-white" />;
  }
};

const getStatusColor = (status: TimelineStepType["status"], slaStatus: TimelineStepProps["slaStatus"]) => {
  if (status === "completed") return "bg-green-500 shadow-green-200";
  if (status === "in-progress") {
    if (slaStatus === "delayed") return "bg-red-500 shadow-red-200";
    if (slaStatus === "warning") return "bg-yellow-500 shadow-yellow-200";
    return "bg-blue-500 shadow-blue-200";
  }
  return "bg-gray-300 shadow-gray-100";
};

const getSLATooltip = (slaStatus: TimelineStepProps["slaStatus"]) => {
  switch (slaStatus) {
    case "completed":
      return "Concluído dentro do prazo";
    case "delayed":
      return "Atrasado - Ação necessária";
    case "warning":
      return "Próximo do limite do SLA";
    case "ontrack":
      return "Dentro do prazo";
    default:
      return null;
  }
};

export function TimelineStep({ step, onClick, viewMode, slaStatus }: TimelineStepProps) {
  const timeElapsed = step.date 
    ? formatDistanceToNow(new Date(step.date), { locale: ptBR, addSuffix: true })
    : null;

  const slaTooltip = getSLATooltip(slaStatus);

  return (
    <div 
      className={cn(
        "relative animate-fade-in cursor-pointer group",
        "transition-all duration-500 hover:scale-[1.02]",
        viewMode === "list" && "flex items-center gap-4 p-4 border rounded-lg"
      )}
      onClick={onClick}
    >
      <Tooltip>
        <TooltipTrigger>
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            getStatusColor(step.status, slaStatus),
            "transition-all duration-700 shadow-lg",
            "group-hover:ring-4 group-hover:ring-offset-2",
            step.status === "in-progress" && "animate-pulse duration-[2000ms]",
            "group-hover:ring-blue-100"
          )}>
            {getStatusIcon(step.status, step.type)}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Status: {
            step.status === "completed" ? "Concluído" :
            step.status === "in-progress" ? "Em andamento" :
            "Pendente"
          }</p>
          {timeElapsed && (
            <p className="text-xs text-gray-500">{timeElapsed}</p>
          )}
          {slaTooltip && (
            <p className="text-xs font-medium mt-1">{slaTooltip}</p>
          )}
        </TooltipContent>
      </Tooltip>
      
      <div className={cn(
        "flex-grow",
        viewMode === "timeline" ? "ml-4" : "ml-0"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className={cn(
              "font-medium text-gray-900",
              "group-hover:text-blue-600 transition-colors duration-300"
            )}>
              {step.title}
            </h4>
            {getStepIcon(step.title)}
          </div>
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
        {step.type === "team_assignment" && step.details?.role && (
          <Badge variant="secondary" className="mt-2">
            {step.details.role}
          </Badge>
        )}
      </div>
    </div>
  );
}