import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { OccurrenceFilters } from "@/components/occurrences/OccurrenceFilters";
import { mockOccurrences, Occurrence } from "@/data/occurrenceData";
import { format, isEqual, parseISO } from "date-fns";

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

  const filterOccurrences = (occurrences: Occurrence[]) => {
    return occurrences.filter((occurrence) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        occurrence.associate.toLowerCase().includes(searchLower) ||
        occurrence.id.toLowerCase().includes(searchLower) ||
        occurrence.vehicle.toLowerCase().includes(searchLower);

      const matchesDate =
        !date ||
        isEqual(
          parseISO(occurrence.date),
          new Date(format(date, "yyyy-MM-dd"))
        );

      const matchesType = !selectedType || occurrence.type === selectedType;

      const matchesStatus = !selectedStatus || occurrence.status === selectedStatus;

      return matchesSearch && matchesDate && matchesType && matchesStatus;
    });
  };

  const handleViewOccurrence = (occurrenceId: string) => {
    console.log("Navigating to occurrence:", occurrenceId);
    navigate(`/occurrences/${occurrenceId.replace("#", "")}`);
  };

  const filteredOccurrences = filterOccurrences(mockOccurrences);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Ocorrências / Acionamentos de Proteção Veicular
          </h1>
          <Button onClick={() => navigate("/occurrences/new")}>
            <Plus className="mr-2 h-4 w-4" /> Novo Registro
          </Button>
        </div>

        <OccurrenceFilters
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

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Processo</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Associado</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Tipo de Ocorrência</TableHead>
                <TableHead>Localidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOccurrences.map((occurrence) => (
                <TableRow 
                  key={occurrence.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleViewOccurrence(occurrence.id)}
                >
                  <TableCell>{occurrence.id}</TableCell>
                  <TableCell>{occurrence.date}</TableCell>
                  <TableCell>{occurrence.associate}</TableCell>
                  <TableCell>{occurrence.vehicle}</TableCell>
                  <TableCell>{occurrence.type}</TableCell>
                  <TableCell>{occurrence.location}</TableCell>
                  <TableCell>{occurrence.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewOccurrence(occurrence.id);
                      }}
                      title="Visualizar detalhes"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 border-t">
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
      </div>
    </DashboardLayout>
  );
};

export default OccurrenceList;