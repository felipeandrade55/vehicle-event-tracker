import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { VehicleFormData } from "./types";
import { VehicleDocumentationForm } from "./VehicleDocumentationForm";
import { VehicleDetailsForm } from "./VehicleDetailsForm";
import { VehicleHistoryForm } from "./VehicleHistoryForm";
import { VehicleOwnershipForm } from "./VehicleOwnershipForm";
import { VehicleInspectionForm } from "./VehicleInspectionForm";

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
  onSubmit: (data: VehicleFormData) => void;
  initialData?: VehicleFormData;
}

export function VehicleForm({ onSubmit, initialData }: VehicleFormProps) {
  const form = useForm<VehicleFormData>({
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

  function handleSubmit(values: VehicleFormData) {
    onSubmit(values);
    toast({
      title: "Veículo salvo com sucesso!",
      description: "Os dados do veículo foram atualizados.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <VehicleDocumentationForm form={form} />
        <VehicleDetailsForm form={form} />
        <VehicleHistoryForm form={form} />
        <VehicleOwnershipForm form={form} />
        <VehicleInspectionForm form={form} />
        <Button type="submit">Salvar Veículo</Button>
      </form>
    </Form>
  );
}