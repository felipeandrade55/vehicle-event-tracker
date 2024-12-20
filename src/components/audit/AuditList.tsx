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
    navigate(`/audit/action/${encodeURIComponent(id)}`);
  };

  // Map the tab values to occurrence status
  const statusMap = {
    'pending': 'Pendente',
    'in-progress': 'Em Análise',
    'completed': 'Concluído'
  };

  // Filter occurrences based on the filters prop and current tab status
  const filteredOccurrences = mockOccurrences.filter((occurrence) => {
    const matchesSearch = occurrence.associate.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         occurrence.id.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    const matchesDate = !filters.date || occurrence.date.includes(filters.date.toISOString().split('T')[0]);
    
    const matchesStatus = filters.selectedStatus === "Todos" || occurrence.status === filters.selectedStatus;
    
    // Match the current tab status
    const matchesTabStatus = occurrence.status === statusMap[status as keyof typeof statusMap];

    return matchesSearch && matchesDate && matchesStatus && matchesTabStatus;
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
            {filteredOccurrences.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum acionamento encontrado para esta aba
              </div>
            ) : (
              filteredOccurrences.map((occurrence) => (
                <div
                  key={occurrence.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium">{occurrence.associate}</h3>
                    <p className="text-sm text-gray-500">
                      {occurrence.type} - {occurrence.date}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs rounded-full mt-1"
                          style={{
                            backgroundColor: occurrence.status === 'Pendente' ? '#FEF3C7' :
                                          occurrence.status === 'Em Análise' ? '#DBEAFE' :
                                          occurrence.status === 'Concluído' ? '#D1FAE5' : '#E5E7EB',
                            color: occurrence.status === 'Pendente' ? '#92400E' :
                                  occurrence.status === 'Em Análise' ? '#1E40AF' :
                                  occurrence.status === 'Concluído' ? '#065F46' : '#374151'
                          }}>
                      {occurrence.status}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleAuditClick(occurrence.id)}
                  >
                    Auditar
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}