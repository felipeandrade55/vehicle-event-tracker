import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AuditList } from "@/components/audit/AuditList";
import { Brain } from "lucide-react";

export default function AiAuditPage() {
  const [filters, setFilters] = useState({
    searchQuery: "",
    date: undefined,
    selectedAuditor: "Todos",
    selectedStatus: "Todos",
    selectedPriority: "Todos",
  });

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      date: undefined,
      selectedAuditor: "Todos",
      selectedStatus: "Todos",
      selectedPriority: "Todos",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Auditoria I.A.</h1>
          <p className="text-sm text-gray-500">
            Análise automatizada de ocorrências usando inteligência artificial
          </p>
        </div>
      </div>

      <Card className="p-6">
        <AuditList
          status="ai"
          filters={{
            searchQuery: filters.searchQuery,
            date: filters.date,
            selectedAuditor: filters.selectedAuditor,
            selectedStatus: filters.selectedStatus,
            selectedPriority: filters.selectedPriority,
          }}
        />
      </Card>
    </div>
  );
}