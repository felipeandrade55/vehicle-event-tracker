import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AssociateFormData } from "../types";

interface PlanSelectorProps {
  form: UseFormReturn<AssociateFormData>;
}

const plans = [
  { id: "plan-basic", name: "Plano Basic" },
  { id: "plan-intermediate", name: "Plano Intermediate" },
  { id: "plan-premium", name: "Plano Premium" },
];

export function PlanSelector({ form }: PlanSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="planId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Plano</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um plano" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {plans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}