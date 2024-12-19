export type UserRole = "admin" | "associate";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Associate extends User {
  cpf: string;
  phone: string;
  plan: Plan;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  coverage: string[];
  type: "basic" | "intermediate" | "premium";
  price: number;
  features: string[];
  assistanceDetails: string[];
}

export interface Occurrence {
  id: string;
  type: "collision" | "theft" | "robbery";
  date: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "rejected";
  documents: string[];
  associateId: string;
}