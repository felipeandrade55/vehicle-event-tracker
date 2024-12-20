import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, AlertTriangle, Phone } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EventDetailsCardProps {
  date: string;
  location: string;
  type: string;
  contactMethod?: string;
  description?: string;
}

export function EventDetailsCard({ date, location, type, contactMethod, description }: EventDetailsCardProps) {
  const formattedDate = format(new Date(date), "dd/MM/yyyy 'às' HH:mm", {
    locale: ptBR,
  });

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Detalhes do Evento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Data/Hora: {formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Local: {location}</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Tipo: {type}</span>
        </div>
        {contactMethod && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Método de Contato: {contactMethod}</span>
          </div>
        )}
        {description && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Descrição do Evento:</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}