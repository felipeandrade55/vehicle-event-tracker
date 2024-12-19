import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Calendar, 
  MapPin, 
  AlertTriangle,
  Phone,
  FileImage,
  History,
  Users,
  Plus
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OccurrenceActions } from "./OccurrenceActions";
import { OccurrenceHeader } from "./OccurrenceHeader";
import { useToast } from "@/components/ui/use-toast";
import { AssociateCard } from "./details/AssociateCard";
import { VehicleCard } from "./details/VehicleCard";
import { OccurrenceForm } from "./OccurrenceForm";

interface OccurrenceDetailsProps {
  occurrence: {
    id: string;
    date: string;
    associate: string;
    vehicle: string;
    type: string;
    location: string;
    status: string;
    contactMethod?: "Telefone" | "WhatsApp" | "App" | "Site";
    contractNumber?: string;
    phone?: string;
    address?: string;
    vehicleDetails?: {
      brand: string;
      model: string;
      plate: string;
      color: string;
      chassis?: string;
      trackerStatus?: "connected" | "offline";
    };
    description?: string;
    timeline?: Array<{
      date: string;
      action: string;
      agent?: string;
    }>;
    team?: Array<{
      name: string;
      role: string;
      contact?: string;
    }>;
  };
}

export function OccurrenceDetails({ occurrence }: OccurrenceDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const formattedDate = format(new Date(occurrence.date), "dd/MM/yyyy 'às' HH:mm", {
    locale: ptBR,
  });

  const handleRefresh = () => {
    toast({
      title: "Atualizado",
      description: "Os dados do acionamento foram atualizados.",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <OccurrenceActions 
        id={occurrence.id} 
        onEdit={handleEdit}
        onRefresh={handleRefresh}
      />

      <OccurrenceHeader 
        id={occurrence.id}
        status={occurrence.status}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AssociateCard 
          associate={occurrence.associate}
          contractNumber={occurrence.contractNumber}
          phone={occurrence.phone}
          address={occurrence.address}
        />

        <VehicleCard 
          vehicle={occurrence.vehicle}
          vehicleDetails={occurrence.vehicleDetails}
        />

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
              <span className="text-sm">Local: {occurrence.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Tipo: {occurrence.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Método de Contato: {occurrence.contactMethod || "Não informado"}</span>
            </div>
            {occurrence.description && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Descrição do Evento:</h4>
                <p className="text-sm text-muted-foreground">{occurrence.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {occurrence.timeline && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="h-5 w-5" />
                Linha do Tempo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-4">
                  {occurrence.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-24 flex-shrink-0 text-sm text-muted-foreground">
                        {format(new Date(event.date), "HH:mm")}
                      </div>
                      <div>
                        <p className="text-sm">{event.action}</p>
                        {event.agent && (
                          <p className="text-sm text-muted-foreground">por {event.agent}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {occurrence.team && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Equipe Mobilizada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {occurrence.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      {member.contact && (
                        <p className="text-sm text-muted-foreground">{member.contact}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Documentação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-4">Fotos / Imagens Anexadas</h4>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Imagens
                </Button>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-4">Documentos Relacionados</h4>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Documentos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl">
          <OccurrenceForm
            initialData={occurrence}
            onSuccess={() => {
              setIsEditing(false);
              handleRefresh();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}