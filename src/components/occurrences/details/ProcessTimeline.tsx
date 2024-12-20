import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TimelineProgress } from "./timeline/TimelineProgress";
import { TimelineStep } from "./timeline/TimelineStep";
import { TimelineStepModal } from "./timeline/TimelineStepModal";
import { TimelineFilters } from "./timeline/TimelineFilters";
import type { TimelineStep as TimelineStepType } from "./timeline/types";

interface ProcessTimelineProps {
  steps: TimelineStepType[];
}

const calculateProgress = (steps: TimelineStepType[]) => {
  const completed = steps.filter(step => step.status === "completed").length;
  return (completed / steps.length) * 100;
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [selectedStep, setSelectedStep] = useState<TimelineStepType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "documents" | "team" | "status">("all");

  const progress = calculateProgress(steps);

  const handleStepClick = (step: TimelineStepType) => {
    setSelectedStep(step);
    setIsModalOpen(true);
  };

  const filteredSteps = steps.filter(step => {
    if (activeFilter === "all") return true;
    if (activeFilter === "documents") return step.type === "document_upload";
    if (activeFilter === "team") return step.type === "team_assignment";
    if (activeFilter === "status") return step.type === "status_change";
    return true;
  });

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <TimelineProgress value={progress} />
        
        <TimelineFilters 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        
        <div className="relative p-6 bg-white rounded-lg shadow-sm">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-blue-500 before:via-blue-300 before:to-gray-200">
            {filteredSteps.map((step) => (
              <TimelineStep
                key={step.id}
                step={step}
                onClick={() => handleStepClick(step)}
              />
            ))}
          </div>
        </div>
      </div>

      <TimelineStepModal
        step={selectedStep}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </TooltipProvider>
  );
}