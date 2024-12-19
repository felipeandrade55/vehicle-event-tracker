import { Associate } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, ArrowLeft, Car, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { VehicleForm } from "./VehicleForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

interface AssociateDetailsProps {
  associate: Associate;
  onEdit: () => void;
  onBack: () => void;
  onUpdateAssociate: (updatedAssociate: Associate) => void;
}

export function AssociateDetails({
  associate,
  onEdit,
  onBack,
  onUpdateAssociate,
}: AssociateDetailsProps) {
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);

  const handleAddVehicle = (vehicleData: any) => {
    const newVehicle = {
      ...vehicleData,
      id: crypto.randomUUID(),
      associateId: associate.id,
    };

    const updatedAssociate = {
      ...associate,
      vehicles: [...associate.vehicles, newVehicle],
    };

    onUpdateAssociate(updatedAssociate);
    setIsAddingVehicle(false);
    toast({
      title: "Veículo adicionado",
      description: "O veículo foi adicionado com sucesso.",
    });
  };

  const handleEditVehicle = (vehicleData: any) => {
    const updatedVehicles = associate.vehicles.map((vehicle) =>
      vehicle.id === editingVehicleId
        ? { ...vehicleData, id: vehicle.id, associateId: associate.id }
        : vehicle
    );

    const updatedAssociate = {
      ...associate,
      vehicles: updatedVehicles,
    };

    onUpdateAssociate(updatedAssociate);
    setEditingVehicleId(null);
    toast({
      title: "Veículo atualizado",
      description: "O veículo foi atualizado com sucesso.",
    });
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    const updatedVehicles = associate.vehicles.filter(
      (vehicle) => vehicle.id !== vehicleId
    );

    const updatedAssociate = {
      ...associate,
      vehicles: updatedVehicles,
    };

    onUpdateAssociate(updatedAssociate);
    toast({
      title: "Veículo removido",
      description: "O veículo foi removido com sucesso.",
    });
  };

  if (isAddingVehicle || editingVehicleId) {
    const editingVehicle = editingVehicleId
      ? associate.vehicles.find((v) => v.id === editingVehicleId)
      : undefined;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsAddingVehicle(false);
              setEditingVehicleId(null);
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">
            {editingVehicleId ? "Editar" : "Adicionar"} Veículo
          </h2>
        </div>
        <VehicleForm
          onSubmit={editingVehicleId ? handleEditVehicle : handleAddVehicle}
          initialData={editingVehicle}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Detalhes do Associado</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{associate.name}</CardTitle>
              <CardDescription>ID: {associate.id}</CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Informações Pessoais</h3>
            <div className="mt-2 space-y-2">
              <p>CPF: {associate.cpf}</p>
              <p>Email: {associate.email}</p>
              <p>Telefone: {associate.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Endereço</h3>
            <div className="mt-2 space-y-2">
              <p>
                {associate.address.street}, {associate.address.number}
                {associate.address.complement
                  ? ` - ${associate.address.complement}`
                  : ""}
              </p>
              <p>
                {associate.address.neighborhood} - {associate.address.city}/
                {associate.address.state}
              </p>
              <p>CEP: {associate.address.zipCode}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Plano</h3>
            <div className="mt-2">
              <p>{associate.plan.name}</p>
              <p className="text-sm text-muted-foreground">
                {associate.plan.description}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                <h3 className="font-medium">Veículos</h3>
              </div>
              <Button onClick={() => setIsAddingVehicle(true)} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Veículo
              </Button>
            </div>
            {associate.vehicles.length > 0 ? (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Placa</TableHead>
                      <TableHead>Marca/Modelo</TableHead>
                      <TableHead>Ano</TableHead>
                      <TableHead>Cor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {associate.vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>{vehicle.licensePlate}</TableCell>
                        <TableCell>
                          {vehicle.brand} {vehicle.model}
                        </TableCell>
                        <TableCell>{vehicle.year}</TableCell>
                        <TableCell>{vehicle.color}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditingVehicleId(vehicle.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirmar exclusão
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja remover este veículo? Esta
                                  ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteVehicle(vehicle.id)}
                                >
                                  Confirmar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum veículo cadastrado
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}