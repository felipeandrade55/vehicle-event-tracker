import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

interface AuditHistoryFiltersProps {
  onFilterChange: (filters: AuditHistoryFilters) => void;
}

export interface AuditHistoryFilters {
  search: string;
  status: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

export function AuditHistoryFilters({ onFilterChange }: AuditHistoryFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFilterChange({ search: value, status: "", dateRange: { start: null, end: null } });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ search: "", status: value, dateRange: { start: null, end: null } });
  };

  const handleDateChange = (type: "start" | "end", date: Date | null) => {
    onFilterChange({
      search: "",
      status: "",
      dateRange: {
        start: type === "start" ? date : null,
        end: type === "end" ? date : null,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar por ID ou usuário..."
          onChange={(e) => handleSearchChange(e.target.value)}
          className="sm:w-64"
        />
        
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aprovado">Aprovado</SelectItem>
            <SelectItem value="reprovado">Reprovado</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <DatePicker
            date={null}
            onChange={(date) => handleDateChange("start", date)}
          />
          <DatePicker
            date={null}
            onChange={(date) => handleDateChange("end", date)}
          />
        </div>
      </div>
    </div>
  );
}