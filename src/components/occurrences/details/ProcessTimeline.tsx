import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, Timeline, ZoomIn, ZoomOut } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"timeline" | "list">("timeline");
  const [zoomLevel, setZoomLevel] = useState(100);

  const progress = calculateProgress(steps);

  const handleStepClick = (step: TimelineStepType) => {
    setSelectedStep(step);
    setIsModalOpen(true);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const filteredSteps = steps.filter(step => {
    if (activeFilter === "all") return true;
    if (activeFilter === "documents") return step.type === "document_upload";
    if (activeFilter === "team") return step.type === "team_assignment";
    if (activeFilter === "status") return step.type === "status_change";
    return true;
  });

  const getSLAStatus = (step: TimelineStepType) => {
    if (!step.date) return null;
    const currentDate = new Date();
    const stepDate = new Date(step.date);
    const diffInDays = Math.floor((currentDate.getTime() - stepDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (step.status === "completed") return "completed";
    if (diffInDays > 5) return "delayed";
    if (diffInDays > 3) return "warning";
    return "ontrack";
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <TimelineProgress value={progress} />
        
        <div className="flex items-center justify-between mb-4">
          <TimelineFilters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className="flex items-center gap-4">
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "timeline" | "list")}>
              <ToggleGroupItem value="timeline" aria-label="Visualização em Timeline">
                <Timeline className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="Visualização em Lista">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 50}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{zoomLevel}%</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 150}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div 
          className={`relative p-6 bg-white rounded-lg shadow-sm transition-all duration-300 ${
            viewMode === "list" ? "space-y-4" : "before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-blue-500 before:via-blue-300 before:to-gray-200"
          }`}
          style={{ 
            fontSize: `${zoomLevel}%`,
          }}
        >
          <div className={`${viewMode === "timeline" ? "space-y-8" : "space-y-4"}`}>
            {filteredSteps.map((step) => (
              <TimelineStep
                key={step.id}
                step={step}
                onClick={() => handleStepClick(step)}
                viewMode={viewMode}
                slaStatus={getSLAStatus(step)}
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