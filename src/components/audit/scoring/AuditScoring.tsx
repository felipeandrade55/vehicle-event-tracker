import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

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
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedScores, setAnimatedScores] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Initialize all scores to zero first
    score.breakdown.forEach((item) => {
      setAnimatedScores(prev => ({
        ...prev,
        [item.category]: 0
      }));
    });
    setAnimatedTotal(0);

    // Animate to final values after a short delay
    const timer = setTimeout(() => {
      setAnimatedTotal(score.total);
      score.breakdown.forEach((item) => {
        const percentage = Math.round((item.score / item.maxScore) * 100);
        setAnimatedScores(prev => ({
          ...prev,
          [item.category]: percentage
        }));
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [score]);

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { label: "Alto Risco", color: "bg-red-500" };
    if (score >= 50) return { label: "Risco Moderado", color: "bg-yellow-500" };
    return { label: "Baixo Risco", color: "bg-green-500" };
  };

  const risk = getRiskLevel(animatedTotal);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pontuação de Risco</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-2xl font-bold">{animatedTotal}%</span>
            <p className={`text-sm font-medium ${
              risk.color === "bg-red-500" ? "text-red-600" :
              risk.color === "bg-yellow-500" ? "text-yellow-600" :
              "text-green-600"
            }`}>
              {risk.label}
            </p>
          </div>

          <Progress 
            value={animatedTotal} 
            className={`h-2 ${risk.color} transition-all duration-1000`} 
          />

          <div className="space-y-4">
            {score.breakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span>{animatedScores[item.category] || 0}%</span>
                </div>
                <Progress
                  value={animatedScores[item.category] || 0}
                  className="h-1 transition-all duration-1000"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}