import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Download, Eye, Filter, Plus, Search, X } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const mockData = [
  {
    id: "#2024-001",
    date: "2024-03-19 10:32",
    associate: "João da Silva",
    vehicle: "ABC-1234 (Fiesta)",
    type: "Colisão",
    location: "São Paulo - SP",
    status: "Em Análise",
  },
  {
    id: "#2024-002",
    date: "2024-03-19 09:15",
    associate: "Maria Oliveira",
    vehicle: "XYZ-5678 (Onix)",
    type: "Roubo/Furto",
    location: "Curitiba - PR",
    status: "Em Atendimento",
  },
  {
    id: "#2024-003",
    date: "2024-03-18 14:50",
    associate: "Carlos Pereira",
    vehicle: "AAA-9999 (Corsa)",
    type: "Pane Mecânica",
    location: "Belo Horizonte - MG",
    status: "Concluído",
  },
];

const OccurrenceList = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ocorrências / Acionamentos de Proteção Veicular</h1>
          <Button onClick={() => navigate("/occurrences/new")}>
            <Plus className="mr-2 h-4 w-4" /> Novo Registro
          </Button>
        </div>

        {/* Área de Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por associado, processo..."
              className="pl-8"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: ptBR }) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de ocorrência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="collision">Colisão</SelectItem>
              <SelectItem value="theft">Roubo/Furto</SelectItem>
              <SelectItem value="mechanical">Pane Mecânica</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="analysis">Em Análise</SelectItem>
              <SelectItem value="in_progress">Em Atendimento</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <div className="md:col-span-4 flex justify-between">
            <div className="space-x-2">
              <Button variant="secondary">
                <Filter className="mr-2 h-4 w-4" />
                Aplicar Filtros
              </Button>
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                Limpar Filtros
              </Button>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Tabela */}
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
              {mockData.map((occurrence) => (
                <TableRow key={occurrence.id}>
                  <TableCell>{occurrence.id}</TableCell>
                  <TableCell>{occurrence.date}</TableCell>
                  <TableCell>{occurrence.associate}</TableCell>
                  <TableCell>{occurrence.vehicle}</TableCell>
                  <TableCell>{occurrence.type}</TableCell>
                  <TableCell>{occurrence.location}</TableCell>
                  <TableCell>{occurrence.status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Paginação */}
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
                  <PaginationLink href="#" isActive>2</PaginationLink>
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