import { Progress } from "@/components/ui/progress";

interface TimelineProgressProps {
  value: number;
}

export function TimelineProgress({ value }: TimelineProgressProps) {
  return (
    <div className="flex items-center gap-4">
      <Progress value={value} className="h-2" />
      <span className="text-sm font-medium text-gray-600">
        {Math.round(value)}%
      </span>
    </div>
  );
}