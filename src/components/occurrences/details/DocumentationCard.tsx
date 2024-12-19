import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileImage, Download, Trash2, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

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

export function DocumentationCard({ documents, onDocumentDelete }: DocumentationCardProps) {
  const [selectedDoc, setSelectedDoc] = useState<{ type: string; index?: number } | null>(null);

  const documentLabels: { [key: string]: string } = {
    driversLicense: "CNH",
    vehicleRegistration: "CRLV",
    eventReport: "Comunicado de Evento",
    policeReport: "Boletim de Ocorrência",
    proofOfResidence: "Comprovante de Residência",
    vehiclePhotos: "Fotos do Veículo",
    tirePhotos: "Fotos dos Pneus",
  };

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
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao baixar arquivo",
        description: "Não foi possível fazer o download do arquivo.",
      });
    }
  };

  const handleDelete = () => {
    if (selectedDoc && onDocumentDelete) {
      onDocumentDelete(selectedDoc.type, selectedDoc.index);
      setSelectedDoc(null);
      toast({
        title: "Documento removido",
        description: "O documento foi removido com sucesso.",
      });
    }
  };

  const renderDocumentActions = (url: string, type: string, index?: number) => (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleView(url)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleDownload(url, `${documentLabels[type]}-${index || 1}.pdf`)}
      >
        <Download className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDoc({ type, index })}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar remoção</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este documento? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedDoc(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Remover</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileImage className="h-5 w-5" />
          Documentação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(documents).map(([type, value]) => {
          if (!value) return null;

          if (Array.isArray(value)) {
            return (
              <div key={type} className="space-y-2">
                <h4 className="text-sm font-medium">{documentLabels[type]}</h4>
                {value.map((url, index) => (
                  <div key={`${type}-${index}`} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <span className="text-sm">
                      {documentLabels[type]} {index + 1}
                    </span>
                    {renderDocumentActions(url, type, index)}
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div key={type} className="space-y-2">
              <h4 className="text-sm font-medium">{documentLabels[type]}</h4>
              <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span className="text-sm">{documentLabels[type]}</span>
                {renderDocumentActions(value, type)}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}