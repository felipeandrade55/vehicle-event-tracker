import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { DocumentHeader } from "./documentation/DocumentHeader";
import { DocumentList } from "./documentation/DocumentList";

interface DocumentationCardProps {
  documents: {
    driversLicense?: string;
    vehicleRegistration?: string;
    eventReport?: string;
    policeReport?: string;
    proofOfResidence?: string;
    vehiclePhotos?: string[];
    tirePhotos?: string[];
  };
  onDocumentDelete?: (documentType: string, index?: number) => void;
}

const documentLabels: { [key: string]: { label: string; description: string } } = {
  driversLicense: {
    label: "CNH",
    description: "Carteira Nacional de Habilitação"
  },
  vehicleRegistration: {
    label: "CRLV",
    description: "Certificado de Registro e Licenciamento de Veículo"
  },
  eventReport: {
    label: "Comunicado de Evento",
    description: "Documento descrevendo o evento"
  },
  policeReport: {
    label: "Boletim de Ocorrência",
    description: "BO registrado na delegacia"
  },
  proofOfResidence: {
    label: "Comprovante de Residência",
    description: "Documento atualizado"
  },
  vehiclePhotos: {
    label: "Fotos do Veículo",
    description: "Fotos do veículo de diferentes ângulos"
  },
  tirePhotos: {
    label: "Fotos dos Pneus",
    description: "Fotos detalhadas dos pneus"
  },
};

export function DocumentationCard({ documents, onDocumentDelete }: DocumentationCardProps) {
  const handleView = (url: string) => {
    window.open(url, "_blank");
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      toast({
        title: "Download iniciado",
        description: `O arquivo ${filename} está sendo baixado.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao baixar arquivo",
        description: "Não foi possível fazer o download do arquivo.",
      });
    }
  };

  const handleDelete = (type: string, index?: number) => {
    if (onDocumentDelete) {
      onDocumentDelete(type, index);
      toast({
        title: "Documento removido",
        description: "O documento foi removido com sucesso.",
      });
    }
  };

  return (
    <Card>
      <DocumentHeader />
      <DocumentList
        documents={documents}
        documentLabels={documentLabels}
        onView={handleView}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />
    </Card>
  );
}