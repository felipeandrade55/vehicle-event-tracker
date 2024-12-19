import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleForm } from "./vehicle/VehicleForm";
import { VehicleList } from "./vehicle/VehicleList";
import { PersonalDataForm } from "./personal/PersonalDataForm";
import { AddressForm } from "./address/AddressForm";
import { VehicleFormData, AssociateFormData } from "./types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  cpf: z.string().min(11, {
    message: "CPF inválido",
  }),
  phone: z.string().min(10, {
    message: "Telefone inválido",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  planId: z.string().min(1, {
    message: "Selecione um plano",
  }),
  address: z.object({
    street: z.string().min(1, { message: "Rua é obrigatória" }),
    number: z.string().min(1, { message: "Número é obrigatório" }),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, { message: "Bairro é obrigatório" }),
    city: z.string().min(1, { message: "Cidade é obrigatória" }),
    state: z.string().min(2, { message: "Estado é obrigatório" }),
    zipCode: z.string().min(8, { message: "CEP inválido" }),
  }),
});

interface AssociateFormProps {
  onSubmit: (data: AssociateFormData) => void;
  initialData?: AssociateFormData;
}

export function AssociateForm({ onSubmit, initialData }: AssociateFormProps) {
  const [vehicles, setVehicles] = useState<(VehicleFormData & { id: string })[]>([]);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);

  const form = useForm<AssociateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      cpf: "",
      phone: "",
      email: "",
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
  });

  function handleSubmit(values: AssociateFormData) {
    onSubmit(values);
    toast({
      title: "Associado salvo com sucesso!",
      description: "Os dados do associado foram atualizados.",
    });
  }

  function handleVehicleSubmit(vehicleData: VehicleFormData) {
    if (editingVehicleId) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicleId ? { ...vehicleData, id: editingVehicleId } : v
      ));
      setEditingVehicleId(null);
    } else {
      setVehicles([...vehicles, { ...vehicleData, id: crypto.randomUUID() }]);
    }
    setIsAddingVehicle(false);
    toast({
      title: "Veículo adicionado com sucesso!",
      description: "O veículo foi vinculado ao associado.",
    });
  }

  function handleEditVehicle(vehicleId: string) {
    setEditingVehicleId(vehicleId);
    setIsAddingVehicle(true);
  }

  const editingVehicle = editingVehicleId 
    ? vehicles.find(v => v.id === editingVehicleId)
    : undefined;

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
        <TabsTrigger value="address">Endereço</TabsTrigger>
        <TabsTrigger value="vehicle">Veículos</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <PersonalDataForm form={form} />
            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="address">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <AddressForm form={form} />
            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="vehicle">
        {isAddingVehicle ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingVehicleId ? "Editar" : "Adicionar"} Veículo
              </h2>
              <Button variant="outline" onClick={() => {
                setIsAddingVehicle(false);
                setEditingVehicleId(null);
              }}>
                Voltar
              </Button>
            </div>
            <VehicleForm 
              onSubmit={handleVehicleSubmit}
              initialData={editingVehicle}
            />
          </div>
        ) : (
          <VehicleList
            vehicles={vehicles}
            onAddVehicle={() => setIsAddingVehicle(true)}
            onEditVehicle={handleEditVehicle}
          />
        )}
      </TabsContent>
    </Tabs>
  );
}