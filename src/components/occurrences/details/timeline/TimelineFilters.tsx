import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type FilterType = "all" | "documents" | "team" | "status";

interface TimelineFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TimelineFilters({ activeFilter, onFilterChange }: TimelineFiltersProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Filter className="h-4 w-4 text-gray-500" />
      <div className="flex gap-2">
        <Button 
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          Todos
        </Button>
        <Button
          variant={activeFilter === "documents" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("documents")}
        >
          Documentos
        </Button>
        <Button
          variant={activeFilter === "team" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("team")}
        >
          Equipe
        </Button>
        <Button
          variant={activeFilter === "status" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("status")}
        >
          Status
        </Button>
      </div>
    </div>
  );
}