import { UseFormReturn } from "react-hook-form";
import { OccurrenceFormData } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EventDetailsFormProps {
  form: UseFormReturn<OccurrenceFormData>;
}

export function EventDetailsForm({ form }: EventDetailsFormProps) {
  return (
    <div className="space-y-4">
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