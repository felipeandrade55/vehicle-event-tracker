import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { OccurrenceActions } from "./OccurrenceActions";
import { OccurrenceHeader } from "./OccurrenceHeader";
import { AssociateCard } from "./details/AssociateCard";
import { VehicleCard } from "./details/VehicleCard";
import { TeamCard } from "./details/TeamCard";
import { DocumentationCard } from "./details/DocumentationCard";
import { ProcessTimeline } from "./details/ProcessTimeline";
import { EventDetailsCard } from "./details/EventDetailsCard";
import { EditOccurrenceDialog } from "./details/EditOccurrenceDialog";
import { OccurrenceFormData, OccurrenceType } from "./types";
import type { StepStatus } from "./details/ProcessTimeline";
import type { OccurrenceDetailsProps } from "./types";

export function OccurrenceDetails({ occurrence }: OccurrenceDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const processSteps = [
    {
      id: 1,
      title: "Registro do evento",
      status: "completed" as StepStatus,
      date: occurrence.date,
      description: occurrence.description,
    },
    {
      id: 2,
      title: "Documentação recebida",
      status: occurrence.documents ? ("completed" as StepStatus) : ("pending" as StepStatus),
      date: occurrence.timeline?.find(t => t.action.includes("documentação"))?.date,
    },
    {
      id: 3,
      title: "Análise jurídica",
      status: "in-progress" as StepStatus,
      date: occurrence.timeline?.find(t => t.action.includes("jurídica"))?.date,
      agent: occurrence.timeline?.find(t => t.action.includes("jurídica"))?.agent,
    },
    {
      id: 4,
      title: "Aprovação para reparo",
      status: "pending" as StepStatus,
    },
    {
      id: 5,
      title: "Finalização do processo",
      status: "pending" as StepStatus,
    },
  ];

  const handleRefresh = () => {
    toast({
      title: "Atualizado",
      description: "Os dados do acionamento foram atualizados.",
    });
  };

  const handleDocumentDelete = (documentType: string, index?: number) => {
    console.log("Removendo documento:", documentType, index);
    handleRefresh();
  };

  const mapOccurrenceToFormData = (occurrence: any): Partial<OccurrenceFormData> => {
    return {
      associateId: occurrence.id,
      type: occurrence.type.toLowerCase() as OccurrenceType,
      date: occurrence.date,
      description: occurrence.description,
      contactMethod: occurrence.contactMethod,
      licensePlate: occurrence.vehicleDetails?.plate || "",
      vehicleModel: occurrence.vehicleDetails?.model || "",
      vehicleBrand: occurrence.vehicleDetails?.brand || "",
      documents: {},
    };
  };

  return (
    <div className="space-y-6">
      <OccurrenceActions 
        id={occurrence.id} 
        onEdit={() => setIsEditing(true)}
        onRefresh={handleRefresh}
      />

      <OccurrenceHeader 
        id={occurrence.id}
        status={occurrence.status}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AssociateCard 
          associate={occurrence.associate}
          contractNumber={occurrence.contractNumber}
          phone={occurrence.phone}
          address={occurrence.address}
        />

        <VehicleCard 
          vehicle={occurrence.vehicle}
          vehicleDetails={occurrence.vehicleDetails}
        />

        <EventDetailsCard 
          date={occurrence.date}
          location={occurrence.location}
          type={occurrence.type}
          contactMethod={occurrence.contactMethod}
          description={occurrence.description}
        />

        <Card className="md:col-span-2">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Timeline do processo</h2>
            <ProcessTimeline steps={processSteps} />
          </div>
        </Card>

        <TeamCard 
          team={occurrence.team}
          systemActions={occurrence.systemActions}
        />

        <DocumentationCard
          documents={occurrence.documents || {}}
          onDocumentDelete={handleDocumentDelete}
        />
      </div>

      <EditOccurrenceDialog
        isOpen={isEditing}
        onOpenChange={setIsEditing}
        initialData={mapOccurrenceToFormData(occurrence)}
        onSuccess={handleRefresh}
      />
    </div>
  );
}