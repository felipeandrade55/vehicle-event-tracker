import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  ArrowLeft, 
  RefreshCw, 
  FileText, 
  Car, 
  Calendar, 
  MapPin, 
  AlertTriangle, 
  User, 
  Phone, 
  Home,
  FileImage,
  History,
  Users,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface OccurrenceDetailsProps {
  occurrence: {
    id: string;
    date: string;
    associate: string;
    vehicle: string;
    type: string;
    location: string;
    status: string;
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

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "em análise":
      return "bg-yellow-100 text-yellow-800";
    case "em atendimento":
      return "bg-blue-100 text-blue-800";
    case "concluído":
      return "bg-green-100 text-green-800";
    case "cancelado":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function OccurrenceDetails({ occurrence }: OccurrenceDetailsProps) {
  const navigate = useNavigate();
  const formattedDate = format(new Date(occurrence.date), "dd/MM/yyyy 'às' HH:mm", {
    locale: ptBR,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/occurrences")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à Lista
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Event Identification */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Detalhes do Acionamento</h1>
          <p className="text-muted-foreground">ID: {occurrence.id}</p>
        </div>
        <Badge 
          variant="secondary" 
          className={`px-4 py-2 text-sm ${getStatusColor(occurrence.status)}`}
        >
          {occurrence.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Associate Information */}
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
              <span className="text-sm">Associado: {occurrence.associate}</span>
            </div>
            {occurrence.contractNumber && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Contrato: {occurrence.contractNumber}</span>
              </div>
            )}
            {occurrence.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Telefone: {occurrence.phone}</span>
              </div>
            )}
            {occurrence.address && (
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Endereço: {occurrence.address}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vehicle Information */}
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
              <span className="text-sm">Veículo: {occurrence.vehicle}</span>
            </div>
            {occurrence.vehicleDetails && (
              <>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Placa: {occurrence.vehicleDetails.plate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Status do Rastreador: 
                    <Badge 
                      variant="secondary" 
                      className={occurrence.vehicleDetails.trackerStatus === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {occurrence.vehicleDetails.trackerStatus === "connected" ? "Conectado" : "Offline"}
                    </Badge>
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Event Details */}
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

        {/* Timeline */}
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

        {/* Team */}
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

        {/* Documents */}
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
    </div>
  );
}