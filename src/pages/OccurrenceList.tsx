import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Plus, Shield } from "lucide-react";
import { mockOccurrences } from "@/data/occurrenceData";
import { format, isEqual, parseISO } from "date-fns";
import { OccurrenceListFilters } from "@/components/occurrences/OccurrenceListFilters";
import { OccurrenceListTable } from "@/components/occurrences/OccurrenceListTable";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "em análise":
      return "bg-yellow-100 text-yellow-800";
    case "em atendimento":
      return "bg-blue-100 text-blue-800";
    case "concluído":
      return "bg-green-100 text-green-800";
    case "cancelado":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OccurrenceList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>();
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleClearFilters = () => {
    setSearchQuery("");
    setDate(undefined);
    setSelectedType("");
    setSelectedStatus("");
  };

  const filterOccurrences = (occurrences: typeof mockOccurrences) => {
    return occurrences.filter((occurrence) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        occurrence.associate.toLowerCase().includes(searchLower) ||
        occurrence.id.toLowerCase().includes(searchLower) ||
        occurrence.vehicle.toLowerCase().includes(searchLower);

      const matchesDate =
        !date ||
        isEqual(parseISO(occurrence.date), new Date(format(date, "yyyy-MM-dd")));

      const matchesType = !selectedType || occurrence.type === selectedType;
      const matchesStatus = !selectedStatus || occurrence.status === selectedStatus;

      return matchesSearch && matchesDate && matchesType && matchesStatus;
    });
  };

  const handleViewOccurrence = (occurrenceId: string) => {
    navigate(`/occurrences/${encodeURIComponent(occurrenceId)}`);
  };

  const filteredOccurrences = filterOccurrences(mockOccurrences);

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Ocorrências / Acionamentos
            </h1>
            <p className="text-sm text-gray-500">
              Gerencie todas as ocorrências de proteção veicular
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate("/occurrences/new")}
          className="shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Registro
        </Button>
      </div>

      <OccurrenceListFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        date={date}
        setDate={setDate}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        handleClearFilters={handleClearFilters}
      />

      <OccurrenceListTable
        occurrences={filteredOccurrences}
        getStatusColor={getStatusColor}
        onViewOccurrence={handleViewOccurrence}
      />

      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default OccurrenceList;