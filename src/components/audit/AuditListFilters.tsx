import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Filter, Search, X, CalendarIcon } from "lucide-react";

interface AuditListFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedAuditor: string;
  setSelectedAuditor: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedPriority: string;
  setSelectedPriority: (value: string) => void;
  handleClearFilters: () => void;
}

const auditStatus = ["Todos", "Pendente", "Em Análise", "Aprovado", "Reprovado"];
const priorities = ["Todos", "Alta", "Média", "Baixa"];
const auditors = ["Todos", "João Silva", "Maria Santos", "Pedro Oliveira"]; // Mock data

export function AuditListFilters({
  searchQuery,
  setSearchQuery,
  date,
  setDate,
  selectedAuditor,
  setSelectedAuditor,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  handleClearFilters,
}: AuditListFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por ID, associado..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Select value={selectedAuditor} onValueChange={setSelectedAuditor}>
        <SelectTrigger>
          <SelectValue placeholder="Auditor" />
        </SelectTrigger>
        <SelectContent>
          {auditors.map((auditor) => (
            <SelectItem key={auditor} value={auditor}>
              {auditor}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {auditStatus.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedPriority} onValueChange={setSelectedPriority}>
        <SelectTrigger>
          <SelectValue placeholder="Prioridade" />
        </SelectTrigger>
        <SelectContent>
          {priorities.map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="md:col-span-3 flex justify-end space-x-2">
        <Button variant="outline" onClick={handleClearFilters}>
          <X className="mr-2 h-4 w-4" />
          Limpar Filtros
        </Button>
        <Button>
          <Filter className="mr-2 h-4 w-4" />
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}