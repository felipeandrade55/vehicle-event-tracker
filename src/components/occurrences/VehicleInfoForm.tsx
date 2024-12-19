import { UseFormReturn } from "react-hook-form";
import { OccurrenceFormData } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface VehicleInfoFormProps {
  form: UseFormReturn<OccurrenceFormData>;
}

export function VehicleInfoForm({ form }: VehicleInfoFormProps) {
  return (
    <div className="space-y-4">
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
        name="vehicleBrand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marca</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Volkswagen" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vehicleModel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Modelo</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Golf" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}