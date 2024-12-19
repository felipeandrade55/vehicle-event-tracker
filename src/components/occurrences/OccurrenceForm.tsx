import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AssociateSelector } from "./form/AssociateSelector";
import { OccurrenceFormData } from "./types";

const formSchema = z.object({
  associateId: z.string().min(1, {
    message: "Selecione um associado.",
  }),
  contractNumber: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  vehicle: z.string().min(2, {
    message: "A descrição do veículo deve ter pelo menos 2 caracteres.",
  }),
  type: z.string().min(1, {
    message: "Selecione o tipo de ocorrência.",
  }),
  location: z.string().min(2, {
    message: "A localização deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().optional(),
  contactMethod: z.enum(["Telefone", "WhatsApp", "App", "Site"]).optional(),
});

interface OccurrenceFormProps {
  initialData?: OccurrenceFormData;
  onSuccess?: () => void;
}

export function OccurrenceForm({ initialData, onSuccess }: OccurrenceFormProps) {
  const form = useForm<OccurrenceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      associateId: "",
      contractNumber: "",
      phone: "",
      address: "",
      vehicle: "",
      type: "",
      location: "",
      description: "",
      contactMethod: undefined,
    },
  });

  function onSubmit(values: OccurrenceFormData) {
    console.log(values);
    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AssociateSelector form={form} />
          <FormField
            control={form.control}
            name="contractNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Contrato</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
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
                      <SelectValue placeholder="Selecione o método de contato" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Telefone">Telefone</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="App">App</SelectItem>
                    <SelectItem value="Site">Site</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veículo</FormLabel>
                <FormControl>
                  <Input placeholder="Marca/Modelo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <SelectItem value="Roubo">Roubo</SelectItem>
                    <SelectItem value="Furto">Furto</SelectItem>
                    <SelectItem value="Acidente">Acidente</SelectItem>
                    <SelectItem value="Pane">Pane</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>
                <FormControl>
                  <Input placeholder="Endereço do evento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço do Associado</FormLabel>
                <FormControl>
                  <Input placeholder="Endereço completo" {...field} />
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
