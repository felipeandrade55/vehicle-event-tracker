import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { VehicleFormData } from "./types";

interface VehicleOwnershipFormProps {
  form: UseFormReturn<VehicleFormData>;
}

export function VehicleOwnershipForm({ form }: VehicleOwnershipFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Propriedade do Veículo</h3>
      
      <FormField
        control={form.control}
        name="ownershipType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Propriedade</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de propriedade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="own">Próprio</SelectItem>
                <SelectItem value="leasing">Leasing</SelectItem>
                <SelectItem value="financing">Financiamento</SelectItem>
                <SelectItem value="authorized">Autorizado</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ownershipDocument"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Documento de Propriedade (URL)</FormLabel>
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