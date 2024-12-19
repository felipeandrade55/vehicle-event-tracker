import React, { useState } from "react";
import { Plan } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Plus } from "lucide-react";

// Dados mockados para demonstração
const MOCK_PLANS: Plan[] = [
  {
    id: "1",
    name: "Plano Básico",
    description: "Proteção essencial para seu veículo",
    type: "basic",
    price: 89.90,
    coverage: ["Roubo", "Furto", "Incêndio"],
    features: ["Cobertura básica para colisões", "Assistência 24h limitada"],
    assistanceDetails: ["Guincho até 100km", "Chaveiro básico"],
  },
  {
    id: "2",
    name: "Plano Intermediário",
    description: "Melhor custo-benefício",
    type: "intermediate",
    price: 149.90,
    coverage: ["Roubo", "Furto", "Incêndio", "Colisão"],
    features: ["Cobertura ampla para colisões", "Assistência 24h completa", "Proteção contra terceiros"],
    assistanceDetails: ["Guincho até 300km", "Chaveiro completo", "Socorro mecânico"],
  },
  {
    id: "3",
    name: "Plano Premium",
    description: "Proteção completa para seu veículo",
    type: "premium",
    price: 299.90,
    coverage: ["Roubo", "Furto", "Incêndio", "Colisão", "Danos a terceiros"],
    features: ["Cobertura total", "Assistência 24h premium", "Carro reserva"],
    assistanceDetails: ["Guincho ilimitado", "Serviços completos", "Hospedagem em viagem"],
  },
];

const PlanManagement = () => {
  const [plans, setPlans] = useState<Plan[]>(MOCK_PLANS);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsAdding(false);
  };

  const handleDelete = (planId: string) => {
    setPlans(plans.filter((plan) => plan.id !== planId));
  };

  const handleSave = (plan: Plan) => {
    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === plan.id ? plan : p)));
    } else {
      setPlans([...plans, { ...plan, id: String(Date.now()) }]);
    }
    setEditingPlan(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Planos</h2>
        <Button
          onClick={() => {
            setIsAdding(true);
            setEditingPlan(null);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Novo Plano
        </Button>
      </div>

      {(isAdding || editingPlan) && (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h3 className="text-lg font-semibold">
            {editingPlan ? "Editar Plano" : "Novo Plano"}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const plan: Plan = {
                id: editingPlan?.id || "",
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                type: formData.get("type") as "basic" | "intermediate" | "premium",
                price: Number(formData.get("price")),
                coverage: (formData.get("coverage") as string).split(","),
                features: (formData.get("features") as string).split(","),
                assistanceDetails: (formData.get("assistanceDetails") as string).split(","),
              };
              handleSave(plan);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do Plano</label>
                <Input
                  name="name"
                  defaultValue={editingPlan?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <select
                  name="type"
                  defaultValue={editingPlan?.type}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required
                >
                  <option value="basic">Básico</option>
                  <option value="intermediate">Intermediário</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                name="description"
                defaultValue={editingPlan?.description}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preço</label>
              <Input
                name="price"
                type="number"
                step="0.01"
                defaultValue={editingPlan?.price}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Coberturas (separadas por vírgula)</label>
              <Input
                name="coverage"
                defaultValue={editingPlan?.coverage.join(",")}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Características (separadas por vírgula)</label>
              <Input
                name="features"
                defaultValue={editingPlan?.features.join(",")}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Detalhes da Assistência (separados por vírgula)</label>
              <Input
                name="assistanceDetails"
                defaultValue={editingPlan?.assistanceDetails.join(",")}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingPlan(null);
                  setIsAdding(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Coberturas</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>
                  {plan.type === "basic" && "Básico"}
                  {plan.type === "intermediate" && "Intermediário"}
                  {plan.type === "premium" && "Premium"}
                </TableCell>
                <TableCell>
                  {plan.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>{plan.coverage.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(plan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(plan.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PlanManagement;