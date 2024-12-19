import { UseFormReturn } from "react-hook-form";
import { OccurrenceFormData } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface EventDetailsFormProps {
  form: UseFormReturn<OccurrenceFormData>;
}

export function EventDetailsForm({ form }: EventDetailsFormProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data e Hora do Evento</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="driver"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Condutor do Veículo</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="associate" id="associate" />
                  <Label htmlFor="associate">Associado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="third-party" id="third-party" />
                  <Label htmlFor="third-party">Terceiro</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição do Evento</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Descreva os detalhes do evento..."
                className="min-h-[120px]"
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