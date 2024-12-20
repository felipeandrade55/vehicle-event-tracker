import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface AuditProgressProps {
  isAuditing: boolean;
  progress: number;
  onComplete?: () => void;
}

export function AuditProgress({ isAuditing, progress, onComplete }: AuditProgressProps) {
  const { toast } = useToast();
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (isAuditing) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, isAuditing]);

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
      <Progress 
        value={animatedProgress} 
        className="h-2 transition-all duration-1000" 
      />
      <p className="text-sm text-gray-500 text-center animate-fade-in">
        {Math.round(animatedProgress)}% concluído
      </p>
    </div>
  );
}