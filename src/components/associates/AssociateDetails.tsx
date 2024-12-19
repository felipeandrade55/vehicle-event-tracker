import { Associate } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, ArrowLeft, Car } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AssociateDetailsProps {
  associate: Associate;
  onEdit: () => void;
  onBack: () => void;
}

export function AssociateDetails({
  associate,
  onEdit,
  onBack,
}: AssociateDetailsProps) {
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
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-5 w-5" />
              <h3 className="font-medium">Veículos</h3>
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