import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface AuditProgressProps {
  isAuditing: boolean;
  progress: number;
  onComplete?: () => void;
}

export function AuditProgress({ isAuditing, progress, onComplete }: AuditProgressProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (progress === 100) {
      toast({
        title: "Análise Concluída",
        description: "A auditoria foi finalizada com sucesso!",
      });
      onComplete?.();
    }
  }, [progress, toast, onComplete]);

  if (!isAuditing) return null;

  return (
    <div className="space-y-2 animate-fade-in">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-gray-500 text-center animate-fade-in">
        {Math.round(progress)}% concluído
      </p>
    </div>
  );
}