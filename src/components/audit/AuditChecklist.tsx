import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface ChecklistItem {
  id: keyof typeof defaultChecklist;
  checked: boolean;
  observation: string;
  status: "pending" | "approved" | "rejected" | "na";
  score: number;
}

const defaultChecklist = {
  documentsComplete: {
    label: "Documentação completa e legível",
    weight: 10,
    required: true,
  },
  vehiclePhotos: {
    label: "Fotos do veículo em conformidade",
    weight: 8,
    required: true,
  },
  policeReport: {
    label: "Boletim de Ocorrência presente e válido",
    weight: 10,
    required: true,
  },
  driverLicense: {
    label: "CNH do condutor válida",
    weight: 8,
    required: true,
  },
  vehicleRegistration: {
    label: "CRLV do veículo em dia",
    weight: 8,
    required: true,
  },
  contractActive: {
    label: "Contrato ativo e regular",
    weight: 10,
    required: true,
  },
  paymentStatus: {
    label: "Pagamentos em dia",
    weight: 10,
    required: true,
  },
  eventDescription: {
    label: "Descrição do evento consistente",
    weight: 8,
    required: true,
  },
  witnessStatements: {
    label: "Declarações de testemunhas",
    weight: 6,
    required: false,
  },
  technicalReport: {
    label: "Laudo técnico anexado",
    weight: 8,
    required: true,
  },
};

export function AuditChecklist() {
  const [items, setItems] = useState<Record<string, ChecklistItem>>(() => {
    const initialItems: Record<string, ChecklistItem> = {};
    Object.keys(defaultChecklist).forEach((key) => {
      initialItems[key] = {
        id: key as keyof typeof defaultChecklist,
        checked: false,
        observation: "",
        status: "pending",
        score: 0,
      };
    });
    return initialItems;
  });

  const calculateTotalScore = () => {
    let total = 0;
    let maxPossible = 0;

    Object.entries(items).forEach(([key, item]) => {
      const { weight } = defaultChecklist[key as keyof typeof defaultChecklist];
      if (item.status === "approved") {
        total += weight;
      }
      if (defaultChecklist[key as keyof typeof defaultChecklist].required) {
        maxPossible += weight;
      }
    });

    return { total, maxPossible, percentage: (total / maxPossible) * 100 };
  };

  const getStatusBadge = (status: ChecklistItem["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Reprovado</Badge>;
      case "na":
        return <Badge variant="secondary">N/A</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
    }
  };

  const handleStatusChange = (id: keyof typeof defaultChecklist, status: ChecklistItem["status"]) => {
    setItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status,
        checked: status === "approved",
      },
    }));
  };

  const handleObservationChange = (id: keyof typeof defaultChecklist, observation: string) => {
    setItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        observation,
      },
    }));
  };

  const score = calculateTotalScore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Checklist de Auditoria</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Pontuação:</span>
          <Badge variant="outline" className="text-lg">
            {score.total}/{score.maxPossible} ({Math.round(score.percentage)}%)
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(defaultChecklist).map(([key, config]) => (
          <Card key={key} className="p-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id={key}
                    checked={items[key].checked}
                    onCheckedChange={() => 
                      handleStatusChange(
                        key as keyof typeof defaultChecklist,
                        items[key].checked ? "pending" : "approved"
                      )
                    }
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor={key}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {config.label}
                      {config.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Peso: {config.weight}</span>
                      {getStatusBadge(items[key].status)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(key as keyof typeof defaultChecklist, "approved")}
                    className="p-1 hover:bg-green-50 rounded-full"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(key as keyof typeof defaultChecklist, "rejected")}
                    className="p-1 hover:bg-red-50 rounded-full"
                  >
                    <XCircle className="h-5 w-5 text-red-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(key as keyof typeof defaultChecklist, "na")}
                    className="p-1 hover:bg-gray-50 rounded-full"
                  >
                    <AlertCircle className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <Textarea
                placeholder="Observações sobre este item..."
                value={items[key].observation}
                onChange={(e) => handleObservationChange(key as keyof typeof defaultChecklist, e.target.value)}
                className="h-20"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}