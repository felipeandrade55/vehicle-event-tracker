import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface OccurrenceHeaderProps {
  id: string;
  status: string;
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

export function OccurrenceHeader({ id, status }: OccurrenceHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-between'} items-start md:items-center`}>
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Detalhes do Acionamento</h1>
        <p className="text-muted-foreground">ID: {id}</p>
      </div>
      <Badge 
        variant="secondary" 
        className={`px-4 py-2 text-sm ${getStatusColor(status)}`}
      >
        {status}
      </Badge>
    </div>
  );
}