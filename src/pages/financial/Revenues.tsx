import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RevenueSummaryCards } from "@/components/financial/revenues/RevenueSummaryCards";
import { RevenueFilters } from "@/components/financial/revenues/RevenueFilters";
import { RevenueTable } from "@/components/financial/revenues/RevenueTable";

const Revenues = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dados mockados para exemplo
  const revenues = [
    {
      id: 1,
      date: "2024-03-15",
      description: "Mensalidade - Plano Premium",
      category: "Mensalidades",
      value: 1250.0,
      status: "Recebido",
    },
    {
      id: 2,
      date: "2024-03-14",
      description: "Taxa de Adesão",
      category: "Taxas",
      value: 500.0,
      status: "Recebido",
    },
    {
      id: 3,
      date: "2024-03-20",
      description: "Mensalidade - Plano Básico",
      category: "Mensalidades",
      value: 750.0,
      status: "Pendente",
    },
  ];

  // Filtra as receitas com base nos filtros aplicados
  const filteredRevenues = revenues.filter((revenue) => {
    const matchesSearch = revenue.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" 
      ? true 
      : revenue.status.toLowerCase() === statusFilter;
    const matchesCategory = categoryFilter === "all"
      ? true
      : revenue.category.toLowerCase() === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Receitas</h1>
            <p className="text-sm text-gray-500">
              Gerencie todas as entradas financeiras
            </p>
          </div>
        </div>
        <Button onClick={() => navigate("/financial/revenues/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Receita
        </Button>
      </div>

      <RevenueSummaryCards />

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Receitas</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <RevenueTable revenues={filteredRevenues} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Revenues;