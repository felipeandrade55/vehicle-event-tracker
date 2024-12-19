import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { VehicleFormData } from "./types";

interface VehicleHistoryFormProps {
  form: UseFormReturn<VehicleFormData>;
}

export function VehicleHistoryForm({ form }: VehicleHistoryFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Histórico do Veículo</h3>
      
      <FormField
        control={form.control}
        name="hasPreviousAccidents"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Possui sinistros anteriores?</FormLabel>
            </div>
          </FormItem>
        )}
      />

      {form.watch("hasPreviousAccidents") && (
        <FormField
          control={form.control}
          name="previousAccidentsDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalhes dos Sinistros</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva os sinistros anteriores..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="wasAuctioned"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Veículo de leilão?</FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="wasStolen"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Recuperado de roubo/furto?</FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="modifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Modificações ou Personalizações</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Descreva as modificações não originais..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}