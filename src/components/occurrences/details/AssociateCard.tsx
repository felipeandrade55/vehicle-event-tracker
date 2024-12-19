import { User, AlertTriangle, Phone, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AssociateCardProps {
  associate: string;
  contractNumber?: string;
  phone?: string;
  address?: string;
}

export function AssociateCard({ associate, contractNumber, phone, address }: AssociateCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5" />
          Informações do Associado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Associado: {associate}</span>
        </div>
        {contractNumber && (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Contrato: {contractNumber}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Telefone: {phone}</span>
          </div>
        )}
        {address && (
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Endereço: {address}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}