import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { OccurrenceFormData, OccurrenceType } from "./types";
import { OccurrenceTypeSelector } from "./OccurrenceTypeSelector";
import { VehicleInfoForm } from "./VehicleInfoForm";
import { EventDetailsForm } from "./EventDetailsForm";
import { DocumentUploadForm } from "./DocumentUploadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Steps, Step } from "@/components/ui/steps";

const formSchema = z.object({
  type: z.enum(["collision", "theft", "robbery"] as const),
  date: z.string().min(1, "Data é obrigatória"),
  description: z.string().optional(),
  licensePlate: z.string().min(7, "Placa do veículo é obrigatória"),
  vehicleModel: z.string().min(2, "Modelo do veículo é obrigatório"),
  vehicleBrand: z.string().min(2, "Marca do veículo é obrigatória"),
  documents: z.object({
    driversLicense: z.string().optional(),
    vehicleRegistration: z.string().optional(),
    eventReport: z.string().optional(),
    policeReport: z.string().optional(),
    proofOfResidence: z.string().optional(),
    vehiclePhotos: z.array(z.string()).optional(),
    tirePhotos: z.array(z.string()).optional(),
  }),
});

export function OccurrenceForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm<OccurrenceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "collision",
      date: "",
      description: "",
      licensePlate: "",
      vehicleModel: "",
      vehicleBrand: "",
      documents: {},
    },
  });

  const steps = [
    { title: "Tipo de Evento", component: OccurrenceTypeSelector },
    { title: "Dados do Veículo", component: VehicleInfoForm },
    { title: "Detalhes do Evento", component: EventDetailsForm },
    { title: "Documentação", component: DocumentUploadForm },
  ];

  const CurrentStepComponent = steps[currentStep].component;

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

  const onSubmit = async (data: OccurrenceFormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", data);
      toast({
        title: "Evento registrado com sucesso!",
        description: "Você será notificado sobre o andamento do seu caso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao registrar evento",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Registro de Evento</h1>
      
      <Steps currentStep={currentStep} className="mb-8">
        {steps.map((step, index) => (
          <Step
            key={index}
            title={step.title}
            completed={index < currentStep}
            current={index === currentStep}
          />
        ))}
      </Steps>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CurrentStepComponent form={form} />
              
              <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                  <Button type="button" variant="outline" onClick={previousStep}>
                    Voltar
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    Próximo
                  </Button>
                ) : (
                  <Button type="submit">
                    Registrar Evento
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}