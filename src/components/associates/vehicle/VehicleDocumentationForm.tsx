import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { VehicleFormData } from "./types";

interface VehicleDocumentationFormProps {
  form: UseFormReturn<VehicleFormData>;
}

export function VehicleDocumentationForm({ form }: VehicleDocumentationFormProps) {
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
            <FormLabel>CRLV (URL do documento)</FormLabel>
            <FormControl>
              <Input type="url" placeholder="URL do documento" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}