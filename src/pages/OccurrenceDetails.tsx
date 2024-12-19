import { useParams } from "react-router-dom";
import { OccurrenceDetails } from "@/components/occurrences/OccurrenceDetails";
import { mockOccurrences } from "@/data/occurrenceData";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function OccurrenceDetailsPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const decodedId = id ? decodeURIComponent(id) : "";
  const occurrence = mockOccurrences.find((o) => o.id === decodedId);

  useEffect(() => {
    if (!occurrence) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Acionamento não encontrado",
      });
      navigate("/occurrences");
    }
  }, [occurrence, toast, navigate]);

  if (!occurrence) {
    return null;
  }

  return <OccurrenceDetails occurrence={occurrence} />;
}