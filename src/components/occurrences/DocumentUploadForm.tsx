import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { OccurrenceFormData, DocumentRequirement } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Link } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface DocumentUploadFormProps {
  form: UseFormReturn<OccurrenceFormData>;
}

export function DocumentUploadForm({ form }: DocumentUploadFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File[] }>({});

  const documentRequirements: DocumentRequirement[] = [
    {
      id: "driversLicense",
      name: "CNH",
      description: "Carteira Nacional de Habilitação",
      required: true,
      type: "file",
      acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    },
    {
      id: "vehicleRegistration",
      name: "CRLV",
      description: "Certificado de Registro e Licenciamento de Veículo",
      required: true,
      type: "file",
      acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    },
    {
      id: "eventReport",
      name: "Comunicado de Evento",
      description: "Documento descrevendo o evento",
      required: true,
      type: "file",
      acceptedFormats: [".pdf", ".doc", ".docx"],
    },
    {
      id: "policeReport",
      name: "Boletim de Ocorrência",
      description: "BO registrado na delegacia",
      required: true,
      type: "file",
      acceptedFormats: [".pdf"],
    },
    {
      id: "proofOfResidence",
      name: "Comprovante de Residência",
      description: "Documento atualizado",
      required: true,
      type: "file",
      acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    },
    {
      id: "vehiclePhotos",
      name: "Fotos do Veículo",
      description: "Fotos do veículo de diferentes ângulos",
      required: true,
      type: "multiple-files",
      acceptedFormats: [".jpg", ".jpeg", ".png"],
    },
    {
      id: "tirePhotos",
      name: "Fotos dos Pneus",
      description: "Fotos detalhadas dos pneus (apenas para associados)",
      required: false,
      type: "multiple-files",
      acceptedFormats: [".jpg", ".jpeg", ".png"],
    },
  ];

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    docId: string,
    isMultiple: boolean
  ) => {
    const files = event.target.files;
    if (!files?.length) return;

    const fileList = Array.from(files);
    
    // Here you would typically upload the files to your storage service
    // For now, we'll just store them locally
    setUploadedFiles(prev => ({
      ...prev,
      [docId]: isMultiple ? [...(prev[docId] || []), ...fileList] : [fileList[0]],
    }));

    // Update the form with temporary local URLs
    const urls = fileList.map(file => URL.createObjectURL(file));
    if (isMultiple) {
      const currentUrls = form.getValues(`documents.${docId}` as any) || [];
      form.setValue(`documents.${docId}` as any, [...currentUrls, ...urls]);
    } else {
      form.setValue(`documents.${docId}` as any, urls[0]);
    }

    toast({
      title: "Arquivo(s) carregado(s) com sucesso",
      description: `${fileList.length} arquivo(s) anexado(s).`,
    });
  };

  const viewFile = (docId: string, index?: number) => {
    const value = form.getValues(`documents.${docId}` as any);
    if (Array.isArray(value) && typeof index === "number") {
      window.open(value[index], "_blank");
    } else if (typeof value === "string") {
      window.open(value, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      {documentRequirements.map((doc) => (
        <FormItem key={doc.id} className="space-y-4">
          <div>
            <FormLabel>{doc.name}</FormLabel>
            <p className="text-sm text-gray-500">{doc.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative">
                <Input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileUpload(e, doc.id, doc.type === "multiple-files")}
                  accept={doc.acceptedFormats.join(",")}
                  multiple={doc.type === "multiple-files"}
                />
                <Button type="button" variant="outline" className="flex gap-2">
                  <Upload className="h-4 w-4" />
                  Fazer upload
                </Button>
              </div>

              {uploadedFiles[doc.id]?.map((file, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  onClick={() => viewFile(doc.id, doc.type === "multiple-files" ? index : undefined)}
                  className="flex gap-2"
                >
                  <Link className="h-4 w-4" />
                  Visualizar
                </Button>
              ))}
            </div>

            {uploadedFiles[doc.id]?.map((file, index) => (
              <p key={index} className="text-sm text-gray-500">
                Arquivo {index + 1}: {file.name}
              </p>
            ))}
          </div>
        </FormItem>
      ))}
    </div>
  );
}