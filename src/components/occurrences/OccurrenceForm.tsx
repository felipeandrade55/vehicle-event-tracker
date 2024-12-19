import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { OccurrenceFormData } from "./types";
import { OccurrenceTypeSelector } from "./OccurrenceTypeSelector";
import { VehicleInfoForm } from "./VehicleInfoForm";
import { EventDetailsForm } from "./EventDetailsForm";
import { DocumentUploadForm } from "./DocumentUploadForm";
import { AssociateSelector } from "./AssociateSelector";
import { Card, CardContent } from "@/components/ui/card";
import { Steps, Step } from "@/components/ui/steps";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  // Informações do associado
  associateId: z.string().optional(),
  searchQuery: z.string().optional(),

  // Detalhes do evento
  type: z.enum(["collision", "theft", "robbery"] as const).optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  driver: z.enum(["associate", "third-party"] as const).optional(),

  // Informações do veículo
  licensePlate: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleBrand: z.string().optional(),

  // Documentos
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

// Função para gerar número de protocolo único
const generateProtocolNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${year}${month}${day}-${random}`;
};

export function OccurrenceForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const form = useForm<OccurrenceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      associateId: "",
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
    { title: "Selecionar Associado", component: AssociateSelector },
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
    // Só processa o submit quando estiver na última etapa
    if (currentStep === steps.length - 1) {
      try {
        const protocolNumber = generateProtocolNumber();
        
        console.log("Form submitted:", { ...data, protocolNumber });
        
        toast({
          title: "Evento registrado com sucesso!",
          description: `Seu protocolo de atendimento é: ${protocolNumber}. Você será notificado sobre o andamento do seu caso.`,
        });

        setTimeout(() => {
          navigate('/occurrences');
        }, 2000);
        
      } catch (error) {
        toast({
          title: "Erro ao registrar evento",
          description: "Por favor, tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } else {
      // Se não estiver na última etapa, apenas avança para a próxima
      nextStep();
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
                  <Button type="submit" className="ml-auto">
                    Próximo
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto">
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