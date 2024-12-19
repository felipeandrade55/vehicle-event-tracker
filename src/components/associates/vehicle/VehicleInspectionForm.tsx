import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { VehicleFormData } from "./types";

interface VehicleInspectionFormProps {
  form: UseFormReturn<VehicleFormData>;
}

export function VehicleInspectionForm({ form }: VehicleInspectionFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Vistoria Prévia</h3>
      
      <FormField
        control={form.control}
        name="inspectionPhotos"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fotos da Vistoria (URLs)</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="URLs das fotos (separadas por vírgula)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="inspectionReport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Laudo de Vistoria (URL)</FormLabel>
            <FormControl>
              <Input type="url" placeholder="URL do laudo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}