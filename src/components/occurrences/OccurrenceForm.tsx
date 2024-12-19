import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AssociateSelector } from "./AssociateSelector";
import { OccurrenceFormData } from "./types";

const formSchema = z.object({
  associateId: z.string().min(1, {
    message: "Selecione um associado.",
  }),
  searchQuery: z.string().optional(),
  type: z.enum(["collision", "theft", "robbery"]),
  date: z.string(),
  description: z.string().optional(),
  driver: z.enum(["associate", "third-party"]).optional(),
  contactMethod: z.enum(["Telefone", "WhatsApp", "Site", "APP"]).optional(),
  licensePlate: z.string(),
  vehicleModel: z.string(),
  vehicleBrand: z.string(),
  documents: z.object({
    driversLicense: z.string().optional(),
    vehicleRegistration: z.string().optional(),
    eventReport: z.string().optional(),
    policeReport: z.string().optional(),
    proofOfResidence: z.string().optional(),
    vehiclePhotos: z.array(z.string()).optional(),
    tirePhotos: z.array(z.string()).optional(),
  }).optional(),
});

interface OccurrenceFormProps {
  initialData?: Partial<OccurrenceFormData>;
  onSuccess?: () => void;
}

export function OccurrenceForm({ initialData, onSuccess }: OccurrenceFormProps) {
  const form = useForm<OccurrenceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      associateId: "",
      type: "collision",
      date: new Date().toISOString(),
      licensePlate: "",
      vehicleModel: "",
      vehicleBrand: "",
      documents: {},
    },
  });

  function onSubmit(values: OccurrenceFormData) {
    console.log(values);
    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AssociateSelector form={form} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Ocorrência</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="collision">Colisão</SelectItem>
                    <SelectItem value="theft">Furto</SelectItem>
                    <SelectItem value="robbery">Roubo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Método de Contato</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Telefone">Telefone</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Site">Site</SelectItem>
                    <SelectItem value="APP">APP</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa do Veículo</FormLabel>
                <FormControl>
                  <Input placeholder="ABC1234" {...field} />
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
                  <Input placeholder="Ex: Gol" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva os detalhes da ocorrência"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </Form>
  );
}