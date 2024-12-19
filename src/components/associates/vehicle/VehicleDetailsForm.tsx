import { UseFormReturn } from "react-hook-form";
import { VehicleFormData } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface VehicleDetailsFormProps {
  form: UseFormReturn<VehicleFormData>;
}

export function VehicleDetailsForm({ form }: VehicleDetailsFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dados do Automóvel</h3>
      <FormField
        control={form.control}
        name="brand"
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
        name="model"
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

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="manufacturingYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano de Fabricação</FormLabel>
              <FormControl>
                <Input placeholder="2023" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="modelYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano Modelo</FormLabel>
              <FormControl>
                <Input placeholder="2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="version"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Versão</FormLabel>
            <FormControl>
              <Input placeholder="Ex: GTI 2.0 TSI" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="specifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Especificações Adicionais</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Motor, câmbio, itens de série..."
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