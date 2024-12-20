export interface ChecklistItemType {
  id: string;
  checked: boolean;
  observation: string;
  status: "pending" | "approved" | "rejected" | "na";
  score: number;
}

export interface ChecklistConfig {
  [key: string]: {
    label: string;
    weight: number;
    required: boolean;
  };
}