import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { OccurrenceDetails } from "@/components/occurrences/OccurrenceDetails";
import { mockOccurrences } from "@/data/occurrenceData";

export default function OccurrenceDetailsPage() {
  const { id } = useParams();
  const occurrence = mockOccurrences.find((o) => o.id === id);

  if (!occurrence) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-600">Ocorrência não encontrada</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <OccurrenceDetails occurrence={occurrence} />
      </div>
    </DashboardLayout>
  );
}