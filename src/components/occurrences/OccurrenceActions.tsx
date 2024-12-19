import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, FileText, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface OccurrenceActionsProps {
  id: string;
  onEdit: () => void;
  onRefresh: () => void;
}

export function OccurrenceActions({ id, onEdit, onRefresh }: OccurrenceActionsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = async () => {
    // In a real application, this would make an API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Acionamento excluído",
        description: `O acionamento ${id} foi excluído com sucesso.`,
      });
      
      navigate("/occurrences");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Não foi possível excluir o acionamento. Tente novamente.",
      });
    }
  };

  return (
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
        <Button 
          variant="outline" 
          onClick={onRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Atualizar
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onEdit}
          className="flex items-center gap-2"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="flex items-center gap-2"
        >
          <Trash className="h-4 w-4" />
          Excluir
        </Button>
      </div>
    </div>
  );
}