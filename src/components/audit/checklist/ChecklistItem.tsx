import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ChecklistItemType } from "./types";

interface ChecklistItemProps {
  id: string;
  item: ChecklistItemType;
  config: {
    label: string;
    weight: number;
    required: boolean;
  };
  onStatusChange: (id: string, status: "pending" | "approved" | "rejected" | "na") => void;
  onObservationChange: (id: string, observation: string) => void;
}

export function ChecklistItem({
  id,
  item,
  config,
  onStatusChange,
  onObservationChange,
}: ChecklistItemProps) {
  const getStatusBadge = (status: "pending" | "approved" | "rejected" | "na") => {
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

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2">
            <Checkbox
              id={id}
              checked={item.checked}
              onCheckedChange={() =>
                onStatusChange(id, item.checked ? "pending" : "approved")
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor={id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {config.label}
                {config.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Peso: {config.weight}</span>
                {getStatusBadge(item.status)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStatusChange(id, "approved")}
              className="p-1 hover:bg-green-50 rounded-full"
            >
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </button>
            <button
              type="button"
              onClick={() => onStatusChange(id, "rejected")}
              className="p-1 hover:bg-red-50 rounded-full"
            >
              <XCircle className="h-5 w-5 text-red-600" />
            </button>
            <button
              type="button"
              onClick={() => onStatusChange(id, "na")}
              className="p-1 hover:bg-gray-50 rounded-full"
            >
              <AlertCircle className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        <Textarea
          placeholder="Observações sobre este item..."
          value={item.observation}
          onChange={(e) => onObservationChange(id, e.target.value)}
          className="h-20"
        />
      </div>
    </Card>
  );
}