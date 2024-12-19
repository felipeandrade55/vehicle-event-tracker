import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  // Documentação do veículo
  licensePlate: z.string().min(7, {
    message: "Placa do veículo é obrigatória",
  }),
  chassisNumber: z.string().min(17, {
    message: "Número do chassi deve ter 17 caracteres",
  }),
  renavam: z.string().min(11, {
    message: "RENAVAM deve ter 11 dígitos",
  }),
  registrationDocument: z.string().min(1, {
    message: "CRLV é obrigatório",
  }),

  // Dados do automóvel
  brand: z.string().min(2, {
    message: "Marca é obrigatória",
  }),
  model: z.string().min(2, {
    message: "Modelo é obrigatório",
  }),
  manufacturingYear: z.string().min(4, {
    message: "Ano de fabricação é obrigatório",
  }),
  modelYear: z.string().min(4, {
    message: "Ano do modelo é obrigatório",
  }),
  version: z.string().optional(),
  specifications: z.string().optional(),

  // Histórico
  hasPreviousAccidents: z.boolean(),
  previousAccidentsDetails: z.string().optional(),
  wasAuctioned: z.boolean(),
  wasStolen: z.boolean(),
  modifications: z.string().optional(),

  // Propriedade
  ownershipType: z.enum(["own", "leasing", "financing", "authorized"]),
  ownershipDocument: z.string().min(1, {
    message: "Documento de propriedade é obrigatório",
  }),

  // Vistoria
  inspectionPhotos: z.string().min(1, {
    message: "Fotos da vistoria são obrigatórias",
  }),
  inspectionReport: z.string().min(1, {
    message: "Laudo de vistoria é obrigatório",
  }),
});

interface VehicleFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  initialData?: z.infer<typeof formSchema>;
}

export function VehicleForm({ onSubmit, initialData }: VehicleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      licensePlate: "",
      chassisNumber: "",
      renavam: "",
      registrationDocument: "",
      brand: "",
      model: "",
      manufacturingYear: "",
      modelYear: "",
      version: "",
      specifications: "",
      hasPreviousAccidents: false,
      previousAccidentsDetails: "",
      wasAuctioned: false,
      wasStolen: false,
      modifications: "",
      ownershipType: "own",
      ownershipDocument: "",
      inspectionPhotos: "",
      inspectionReport: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    toast({
      title: "Veículo salvo com sucesso!",
      description: "Os dados do veículo foram atualizados.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Documentação do Veículo</h3>
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
            name="chassisNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Chassi</FormLabel>
                <FormControl>
                  <Input placeholder="9BWZZZ377VT004251" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="renavam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RENAVAM</FormLabel>
                <FormControl>
                  <Input placeholder="00123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CRLV (URL do documento)</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="URL do documento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vistoria Prévia</h3>
          <FormField
            control={form.control}
            name="inspectionPhotos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fotos da Vistoria (URLs)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="URLs das fotos (separadas por vírgula)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inspectionReport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Laudo de Vistoria (URL)</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="URL do laudo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Salvar Veículo</Button>
      </form>
    </Form>
  );
}