import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VehicleFormData, VehicleContract } from "./types";
import { Edit, Plus } from "lucide-react";

interface VehicleListProps {
  vehicles: (VehicleFormData & { id: string; contract?: VehicleContract })[];
  onAddVehicle: () => void;
  onEditVehicle: (vehicleId: string) => void;
}

export function VehicleList({ vehicles, onAddVehicle, onEditVehicle }: VehicleListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Veículos Cadastrados</h2>
        <Button onClick={onAddVehicle}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Veículo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{vehicle.brand} {vehicle.model}</CardTitle>
                  <CardDescription>Placa: {vehicle.licensePlate}</CardDescription>
                </div>
                <Button variant="outline" size="icon" onClick={() => onEditVehicle(vehicle.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  Ano: {vehicle.manufacturingYear}/{vehicle.modelYear}
                </p>
                {vehicle.contract && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Contrato</p>
                    <p className="text-sm text-muted-foreground">
                      Status: {vehicle.contract.status}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Validade: {new Date(vehicle.contract.startDate).toLocaleDateString()} - {new Date(vehicle.contract.endDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vehicles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum veículo cadastrado</p>
        </div>
      )}
    </div>
  );
}