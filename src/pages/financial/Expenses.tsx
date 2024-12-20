import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseFilters } from "@/components/financial/expenses/ExpenseFilters";
import { ExpenseSummaryCards } from "@/components/financial/expenses/ExpenseSummaryCards";
import { ExpenseTable } from "@/components/financial/expenses/ExpenseTable";

const Expenses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dados mockados para exemplo
  const expenses = [
    {
      id: 1,
      date: "2024-03-15",
      description: "Manutenção de Veículos",
      category: "Manutenção",
      value: 2500.0,
      status: "Pago",
    },
    {
      id: 2,
      date: "2024-03-14",
      description: "Material de Escritório",
      category: "Administrativo",
      value: 350.0,
      status: "Pago",
    },
    {
      id: 3,
      date: "2024-03-20",
      description: "Serviços de Marketing",
      category: "Marketing",
      value: 1500.0,
      status: "Pendente",
    },
  ];

  // Filtra as despesas com base nos filtros aplicados
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all"
      ? true
      : expense.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === "all"
      ? true
      : expense.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Receipt className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Despesas</h1>
            <p className="text-sm text-gray-500">
              Gerencie todas as saídas financeiras
            </p>
          </div>
        </div>
        <Button onClick={() => navigate("/financial/expenses/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Despesa
        </Button>
      </div>

      <ExpenseSummaryCards />

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <ExpenseTable expenses={filteredExpenses} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;