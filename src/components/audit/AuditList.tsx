import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuditListFilters } from "./AuditListFilters";
import { mockOccurrences } from "@/data/occurrenceData";

interface AuditListProps {
  status: string;
  filters: {
    searchQuery: string;
    date: Date | undefined;
    selectedAuditor: string;
    selectedStatus: string;
    selectedPriority: string;
  };
}

export function AuditList({ status, filters }: AuditListProps) {
  const navigate = useNavigate();

  const handleAuditClick = (id: string) => {
    navigate(`/audit/action/${id}`);
  };

  // Filter occurrences based on the filters prop
  const filteredOccurrences = mockOccurrences.filter((occurrence) => {
    const matchesSearch = occurrence.associate.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         occurrence.id.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    const matchesDate = !filters.date || occurrence.date.includes(filters.date.toISOString().split('T')[0]);
    
    const matchesStatus = filters.selectedStatus === "Todos" || occurrence.status === filters.selectedStatus;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <Card>
      <div className="p-6">
        <AuditListFilters
          searchQuery={filters.searchQuery}
          setSearchQuery={() => {}} // This will be handled by the parent component
          date={filters.date}
          setDate={() => {}} // This will be handled by the parent component
          selectedAuditor={filters.selectedAuditor}
          setSelectedAuditor={() => {}} // This will be handled by the parent component
          selectedStatus={filters.selectedStatus}
          setSelectedStatus={() => {}} // This will be handled by the parent component
          selectedPriority={filters.selectedPriority}
          setSelectedPriority={() => {}} // This will be handled by the parent component
          handleClearFilters={() => {}} // This will be handled by the parent component
        />
        
        <ScrollArea className="h-[600px] mt-6">
          <div className="space-y-4">
            {filteredOccurrences.map((occurrence) => (
              <div
                key={occurrence.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{occurrence.associate}</h3>
                  <p className="text-sm text-gray-500">
                    {occurrence.type} - {occurrence.date}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleAuditClick(occurrence.id)}
                >
                  Auditar
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}