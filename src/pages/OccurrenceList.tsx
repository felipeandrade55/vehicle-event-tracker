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
import { Eye, Plus, Shield } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { OccurrenceFilters } from "@/components/occurrences/OccurrenceFilters";
import { mockOccurrences, Occurrence } from "@/data/occurrenceData";
import { format, isEqual, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    navigate(`/occurrences/${encodeURIComponent(occurrenceId)}`);
  };

  const filteredOccurrences = filterOccurrences(mockOccurrences);

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
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

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Filtros e Pesquisa</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold">Processo</TableHead>
                  <TableHead className="font-semibold">Data/Hora</TableHead>
                  <TableHead className="font-semibold">Associado</TableHead>
                  <TableHead className="font-semibold">Veículo</TableHead>
                  <TableHead className="font-semibold">Tipo de Ocorrência</TableHead>
                  <TableHead className="font-semibold">Localidade</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOccurrences.map((occurrence) => (
                  <TableRow 
                    key={occurrence.id}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                    onClick={() => handleViewOccurrence(occurrence.id)}
                  >
                    <TableCell className="font-medium">{occurrence.id}</TableCell>
                    <TableCell>{occurrence.date}</TableCell>
                    <TableCell>{occurrence.associate}</TableCell>
                    <TableCell>{occurrence.vehicle}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {occurrence.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{occurrence.location}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`${getStatusColor(occurrence.status)} font-normal`}
                      >
                        {occurrence.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewOccurrence(occurrence.id);
                        }}
                        className="hover:bg-gray-100"
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OccurrenceList;