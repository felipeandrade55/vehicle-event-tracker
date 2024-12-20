import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RiskScore {
  total: number;
  breakdown: {
    category: string;
    score: number;
    maxScore: number;
  }[];
}

interface AuditScoringProps {
  score: RiskScore;
}

export function AuditScoring({ score }: AuditScoringProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { label: "Alto Risco", color: "bg-red-500" };
    if (score >= 50) return { label: "Risco Moderado", color: "bg-yellow-500" };
    return { label: "Baixo Risco", color: "bg-green-500" };
  };

  const risk = getRiskLevel(score.total);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pontuação de Risco</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-2xl font-bold">{score.total}%</span>
            <p className={`text-sm font-medium ${
              risk.color === "bg-red-500" ? "text-red-600" :
              risk.color === "bg-yellow-500" ? "text-yellow-600" :
              "text-green-600"
            }`}>
              {risk.label}
            </p>
          </div>

          <Progress value={score.total} className={`h-2 ${risk.color}`} />

          <div className="space-y-4">
            {score.breakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span>{Math.round((item.score / item.maxScore) * 100)}%</span>
                </div>
                <Progress
                  value={(item.score / item.maxScore) * 100}
                  className="h-1"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}