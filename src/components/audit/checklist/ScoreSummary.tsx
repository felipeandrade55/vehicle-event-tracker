import { Badge } from "@/components/ui/badge";

interface ScoreSummaryProps {
  total: number;
  maxPossible: number;
  percentage: number;
}

export function ScoreSummary({ total, maxPossible, percentage }: ScoreSummaryProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Pontuação:</span>
      <Badge variant="outline" className="text-lg">
        {total}/{maxPossible} ({Math.round(percentage)}%)
      </Badge>
    </div>
  );
}