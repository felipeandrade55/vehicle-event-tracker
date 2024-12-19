import { UseFormReturn } from "react-hook-form";
import { OccurrenceFormData } from "./types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Car, AlertTriangle, ShieldAlert } from "lucide-react";

interface OccurrenceTypeSelectorProps {
  form: UseFormReturn<OccurrenceFormData>;
}

export function OccurrenceTypeSelector({ form }: OccurrenceTypeSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Tipo de Evento</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="collision" id="collision" />
                <label
                  htmlFor="collision"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Car className="h-4 w-4" />
                  <span>Colisão</span>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="theft" id="theft" />
                <label
                  htmlFor="theft"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Furto</span>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="robbery" id="robbery" />
                <label
                  htmlFor="robbery"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span>Roubo</span>
                </label>
              </div>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}