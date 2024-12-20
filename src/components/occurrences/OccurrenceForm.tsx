import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { OccurrenceFormData } from "./types";
import { AssociateSelector } from "./form/AssociateSelector";
import { OccurrenceTypeSelector } from "./OccurrenceTypeSelector";
import { EventDetailsForm } from "./EventDetailsForm";
import { VehicleInfoForm } from "./VehicleInfoForm";
import { DocumentUploadForm } from "./DocumentUploadForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps } from "@/components/ui/steps";

const formSchema = z.object({
  associateId: z.string().min(1, {
    message: "Selecione um associado.",
  }),
  searchQuery: z.string().optional(),
  type: z.enum(["collision", "theft", "robbery"]),
  date: z.string(),
  description: z.string().min(1, "A descrição é obrigatória"),
  driver: z.enum(["associate", "third-party"]),
  contactMethod: z.enum(["Telefone", "WhatsApp", "Site", "APP"]),
  licensePlate: z.string().min(1, "A placa é obrigatória"),
  vehicleModel: z.string().min(1, "O modelo é obrigatório"),
  vehicleBrand: z.string().min(1, "A marca é obrigatória"),
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
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const form = useForm<OccurrenceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      associateId: "",
      type: "collision",
      date: new Date().toISOString().slice(0, 16),
      description: "",
      driver: "associate",
      contactMethod: "Telefone",
      licensePlate: "",
      vehicleModel: "",
      vehicleBrand: "",
      documents: {},
    },
  });

  const steps = [
    {
      title: "Associado",
      description: "Identificação do associado",
      component: <AssociateSelector form={form} />,
    },
    {
      title: "Tipo",
      description: "Tipo de ocorrência",
      component: <OccurrenceTypeSelector form={form} />,
    },
    {
      title: "Detalhes",
      description: "Detalhes do evento",
      component: <EventDetailsForm form={form} />,
    },
    {
      title: "Veículo",
      description: "Informações do veículo",
      component: <VehicleInfoForm form={form} />,
    },
    {
      title: "Documentos",
      description: "Upload de documentos",
      component: <DocumentUploadForm form={form} />,
    },
  ];

  function onSubmit(values: OccurrenceFormData) {
    console.log(values);
    toast({
      title: "Ocorrência registrada com sucesso!",
      description: "A ocorrência foi registrada e será analisada pela equipe.",
    });
    navigate("/occurrences");
    onSuccess?.();
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Registro de Ocorrência</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Steps
              steps={steps.map(step => ({
                title: step.title,
                description: step.description,
              }))}
              currentStep={currentStep}
            />

            <div className="mt-8">
              {steps[currentStep].component}
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={previousStep}
                disabled={currentStep === 0}
              >
                Voltar
              </Button>
              
              {isLastStep ? (
                <Button type="submit">Finalizar Registro</Button>
              ) : (
                <Button type="button" onClick={nextStep}>
                  Próximo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}