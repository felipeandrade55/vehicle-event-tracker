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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Download, Filter, Search, X, CalendarIcon } from "lucide-react";
import { occurrenceTypes, occurrenceStatus } from "@/data/occurrenceData";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

interface OccurrenceFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  handleClearFilters: () => void;
}

export function OccurrenceFilters({
  searchQuery,
  setSearchQuery,
  date,
  setDate,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  handleClearFilters,
}: OccurrenceFiltersProps) {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleExportPDF = () => {
    try {
      // PDF export logic
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na exportação",
        description: "Não foi possível gerar o arquivo PDF",
      });
    }
  };

  const handleExportCSV = () => {
    try {
      // CSV export logic
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na exportação",
        description: "Não foi possível gerar o arquivo CSV",
      });
    }
  };

  return (
    <div className={cn(
      "bg-white rounded-lg shadow",
      isMobile ? "p-4 space-y-4" : "p-4"
    )}>
      <div className={cn(
        "grid gap-4",
        isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4"
      )}>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por associado, processo..."
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
                {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                initialFocus={false}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de ocorrência" />
          </SelectTrigger>
          <SelectContent>
            {occurrenceTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {occurrenceStatus.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={cn(
        "flex mt-4",
        isMobile ? "flex-col gap-2" : "justify-between"
      )}>
        <div className={cn(
          "flex",
          isMobile ? "flex-col w-full gap-2" : "space-x-2"
        )}>
          <Button variant="secondary" className="w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Aplicar Filtros
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            className="w-full md:w-auto"
          >
            <X className="mr-2 h-4 w-4" />
            Limpar Filtros
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline"
              className={cn(
                "mt-2 md:mt-0",
                isMobile ? "w-full" : ""
              )}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleExportPDF}>
              Exportar como PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportCSV}>
              Exportar como CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
