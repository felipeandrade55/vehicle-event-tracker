export type StepStatus = "completed" | "pending" | "in-progress";

export interface TimelineStep {
  id: number;
  title: string;
  description?: string;
  status: StepStatus;
  date?: string;
  agent?: string;
  type?: "team_assignment" | "status_change" | "document_upload" | "general";
  details?: {
    role?: string;
    previousStatus?: string;
    newStatus?: string;
    documentType?: string;
    sla?: {
      deadline: string;
      priority: "low" | "medium" | "high";
    };
  };
}