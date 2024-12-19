import { UseFormReturn } from "react-hook-form";
import { VehicleFormData } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Link } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface VehicleDocumentationFormProps {
  form: UseFormReturn<VehicleFormData>;
}

export function VehicleDocumentationForm({ form }: VehicleDocumentationFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    registrationDocument: null,
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof VehicleFormData) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Here you would typically upload the file to your storage service
    // For now, we'll just store it locally and show a success message
    setUploadedFiles(prev => ({ ...prev, [fieldName]: file }));
    
    // Update the form with a temporary local URL
    const localUrl = URL.createObjectURL(file);
    form.setValue(fieldName, localUrl);
    
    toast({
      title: "Arquivo carregado com sucesso",
      description: `${file.name} foi anexado ao formulário.`,
    });
  };

  const viewFile = (fieldName: keyof VehicleFormData) => {
    const value = form.getValues(fieldName);
    if (typeof value === 'string' && value.length > 0) {
      window.open(value, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Documentação do Veículo</h3>
      <FormField
        control={form.control}
        name="licensePlate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Placa do Veículo</FormLabel>
            <FormControl>
              <Input placeholder="ABC-1234" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="chassisNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número do Chassi</FormLabel>
            <FormControl>
              <Input placeholder="9BWZZZ377VT004251" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="renavam"
        render={({ field }) => (
          <FormItem>
            <FormLabel>RENAVAM</FormLabel>
            <FormControl>
              <Input placeholder="00123456789" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="registrationDocument"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CRLV</FormLabel>
            <div className="space-y-2">
              <FormControl>
                <Input type="url" placeholder="URL do documento" {...field} />
              </FormControl>
              <div className="flex gap-2">
                <div className="relative">
                  <Input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleFileUpload(e, "registrationDocument")}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <Button type="button" variant="outline" className="flex gap-2">
                    <Upload className="h-4 w-4" />
                    Fazer upload
                  </Button>
                </div>
                {field.value && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => viewFile("registrationDocument")}
                    className="flex gap-2"
                  >
                    <Link className="h-4 w-4" />
                    Visualizar
                  </Button>
                )}
              </div>
              {uploadedFiles.registrationDocument && (
                <p className="text-sm text-gray-500">
                  Arquivo atual: {uploadedFiles.registrationDocument.name}
                </p>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}