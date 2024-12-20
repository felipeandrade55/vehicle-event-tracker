import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RevenueFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
}

export const RevenueFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
}: RevenueFiltersProps) => {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <Input
          placeholder="Pesquisar por descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-48">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="recebido">Recebido</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-48">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="mensalidades">Mensalidades</SelectItem>
            <SelectItem value="taxas">Taxas</SelectItem>
            <SelectItem value="protecoes">Proteções</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};