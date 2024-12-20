import { useState } from "react";
import { ChecklistItem } from "./checklist/ChecklistItem";
import { ScoreSummary } from "./checklist/ScoreSummary";
import { defaultChecklist } from "./checklist/defaultChecklist";
import type { ChecklistItemType } from "./checklist/types";

export function AuditChecklist() {
  const [items, setItems] = useState<Record<string, ChecklistItemType>>(() => {
    const initialItems: Record<string, ChecklistItemType> = {};
    Object.keys(defaultChecklist).forEach((key) => {
      initialItems[key] = {
        id: key,
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

  const handleStatusChange = (id: string, status: ChecklistItemType["status"]) => {
    setItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status,
        checked: status === "approved",
      },
    }));
  };

  const handleObservationChange = (id: string, observation: string) => {
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
        <ScoreSummary {...score} />
      </div>

      <div className="space-y-6">
        {Object.entries(defaultChecklist).map(([key, config]) => (
          <ChecklistItem
            key={key}
            id={key}
            item={items[key]}
            config={config}
            onStatusChange={handleStatusChange}
            onObservationChange={handleObservationChange}
          />
        ))}
      </div>
    </div>
  );
}