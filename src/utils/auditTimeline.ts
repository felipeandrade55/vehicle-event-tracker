import { TimelineStep } from "@/components/occurrences/details/timeline/types";

export const createAuditTimelineEntry = (
  action: string,
  auditor: string,
  details?: {
    previousStatus?: string;
    newStatus?: string;
    score?: number;
    observation?: string;
  }
): Partial<TimelineStep> => {
  return {
    title: `Auditoria: ${action}`,
    description: details?.observation,
    status: "completed",
    date: new Date().toISOString(),
    agent: auditor,
    type: "status_change",
    details: {
      role: "auditor",
      previousStatus: details?.previousStatus,
      newStatus: details?.newStatus,
    },
  };
};