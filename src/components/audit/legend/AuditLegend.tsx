import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export function AuditLegend() {
  const legendItems = [
    {
      status: "positive",
      label: "Aprovado",
      color: "bg-green-500"
    },
    {
      status: "partial",
      label: "Parcial",
      color: "bg-yellow-500"
    },
    {
      status: "negative",
      label: "Reprovado",
      color: "bg-red-500"
    }
  ];

  const riskLevels = [
    {
      level: "Alto Risco",
      threshold: "80% ou mais",
      color: "text-red-600",
      description: "Indica que há MUITAS irregularidades identificadas no processo. Requer atenção urgente e análise detalhada."
    },
    {
      level: "Risco Moderado",
      threshold: "Entre 50% e 79%",
      color: "text-yellow-600",
      description: "Indica que há ALGUMAS irregularidades que precisam de atenção e acompanhamento."
    },
    {
      level: "Baixo Risco",
      threshold: "Abaixo de 50%",
      color: "text-green-600",
      description: "Indica que há POUCAS ou nenhuma irregularidade. O caso apresenta maior segurança."
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Info className="h-4 w-4 mr-2" />
          Legenda
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Informações da Avaliação</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="status">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="risk">Pontuação de Risco</TabsTrigger>
          </TabsList>
          <TabsContent value="status" className="mt-4">
            <div className="flex gap-4">
              {legendItems.map((item) => (
                <div key={item.status} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="risk" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Como Interpretar a Pontuação</h4>
                <p className="text-sm text-gray-600 mb-4">
                  A pontuação de risco indica o nível de irregularidades encontradas durante a análise. 
                  Quanto maior a porcentagem, mais irregularidades foram identificadas:
                </p>
              </div>
              
              <div className="space-y-4">
                {riskLevels.map((risk) => (
                  <div key={risk.level} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${risk.color}`}>{risk.level}</span>
                      <span className="text-sm text-gray-600">{risk.threshold}</span>
                    </div>
                    <p className="text-sm text-gray-600">{risk.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Cálculo da Pontuação</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• Aprovado: 100% do peso da etapa</p>
                <p>• Parcial: 50% do peso da etapa</p>
                <p>• Reprovado: 0% do peso da etapa</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}