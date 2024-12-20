import { TeamMemberRole } from "@/components/occurrences/types";

export const mockTeam = [
  {
    id: "1",
    name: "José Santos",
    role: "technical_analyst" as TeamMemberRole,
    contact: "(11) 97777-8888",
    assignedAt: "2024-03-19 10:32",
    assignedTo: ["Registro do evento", "Documentação"],
    status: "active" as const
  },
  {
    id: "2",
    name: "Maria Oliveira",
    role: "customer_service" as TeamMemberRole,
    contact: "(11) 96666-7777",
    assignedAt: "2024-03-19 10:32",
    assignedTo: ["Registro do evento"],
    status: "active" as const
  }
];