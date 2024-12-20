import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";

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
          <DialogTitle>Legenda da Avaliação</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          {legendItems.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}