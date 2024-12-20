import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthlyPaymentFiltersProps {
  filters: {
    status: string;
    month: string;
    associateId: string;
    planId: string;
  };
  setFilters: (filters: any) => void;
}

export const MonthlyPaymentFilters = ({
  filters,
  setFilters,
}: MonthlyPaymentFiltersProps) => {
  return (
    <div className="flex gap-4 mb-4">
      <div className="w-48">
        <Select
          value={filters.status}
          onValueChange={(value) =>
            setFilters({ ...filters, status: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="paid">Pago</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="overdue">Atrasado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-48">
        <Select
          value={filters.month}
          onValueChange={(value) =>
            setFilters({ ...filters, month: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="0">Janeiro</SelectItem>
            <SelectItem value="1">Fevereiro</SelectItem>
            <SelectItem value="2">Março</SelectItem>
            <SelectItem value="3">Abril</SelectItem>
            <SelectItem value="4">Maio</SelectItem>
            <SelectItem value="5">Junho</SelectItem>
            <SelectItem value="6">Julho</SelectItem>
            <SelectItem value="7">Agosto</SelectItem>
            <SelectItem value="8">Setembro</SelectItem>
            <SelectItem value="9">Outubro</SelectItem>
            <SelectItem value="10">Novembro</SelectItem>
            <SelectItem value="11">Dezembro</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};