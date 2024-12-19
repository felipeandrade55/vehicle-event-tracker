import { Car, MapPin, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VehicleCardProps {
  vehicle: string;
  vehicleDetails?: {
    brand: string;
    model: string;
    plate: string;
    color: string;
    chassis?: string;
    trackerStatus?: "connected" | "offline";
  };
}

export function VehicleCard({ vehicle, vehicleDetails }: VehicleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Car className="h-5 w-5" />
          Informações do Veículo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Veículo: {vehicle}</span>
        </div>
        {vehicleDetails && (
          <>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Placa: {vehicleDetails.plate}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Status do Rastreador:{" "}
                <Badge 
                  variant="secondary" 
                  className={vehicleDetails.trackerStatus === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                >
                  {vehicleDetails.trackerStatus === "connected" ? "Conectado" : "Offline"}
                </Badge>
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}