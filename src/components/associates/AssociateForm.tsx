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
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleForm } from "./vehicle/VehicleForm";
import { VehicleList } from "./vehicle/VehicleList";
import { VehicleFormData } from "./vehicle/types";

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
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  initialData?: z.infer<typeof formSchema>;
}

export function AssociateForm({ onSubmit, initialData }: AssociateFormProps) {
  const [vehicles, setVehicles] = useState<(VehicleFormData & { id: string })[]>([]);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
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

  function handleSubmit(values: z.infer<typeof formSchema>) {
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do associado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="address">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input placeholder="Complemento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address.neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Estado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="00000-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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