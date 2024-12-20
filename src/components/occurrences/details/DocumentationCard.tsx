import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileImage, Download, Trash2, Eye, File } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const getFileIcon = (type: string) => {
    if (type.includes('Photos')) {
      return <FileImage className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  const renderDocumentActions = (url: string, type: string, index?: number) => (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleView(url)}
        className="hover:bg-secondary"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleDownload(url, `${documentLabels[type].label}-${index || 1}.pdf`)}
        className="hover:bg-secondary"
      >
        <Download className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDoc({ type, index })}
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
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
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {Object.entries(documents).map(([type, value]) => {
              if (!value) return null;

              if (Array.isArray(value)) {
                return (
                  <div key={type} className="space-y-3">
                    <div className="flex items-center gap-2">
                      {getFileIcon(type)}
                      <div>
                        <h4 className="font-medium">{documentLabels[type].label}</h4>
                        <p className="text-sm text-muted-foreground">
                          {documentLabels[type].description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {value.length} arquivo{value.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {value.map((url, index) => (
                        <div
                          key={`${type}-${index}`}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-secondary/20 transition-colors"
                        >
                          <span className="text-sm flex items-center gap-2">
                            {getFileIcon(type)}
                            {documentLabels[type].label} {index + 1}
                          </span>
                          {renderDocumentActions(url, type, index)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div key={type} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getFileIcon(type)}
                    <div>
                      <h4 className="font-medium">{documentLabels[type].label}</h4>
                      <p className="text-sm text-muted-foreground">
                        {documentLabels[type].description}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-secondary/20 transition-colors"
                  >
                    <span className="text-sm flex items-center gap-2">
                      {getFileIcon(type)}
                      {documentLabels[type].label}
                    </span>
                    {renderDocumentActions(value, type)}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}