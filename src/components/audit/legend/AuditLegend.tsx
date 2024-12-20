import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AuditLegend() {
  const legendItems = [
    {
      status: "positive",
      label: "Aprovado",
      description: "Critério atendido completamente",
      color: "bg-green-100 text-green-800"
    },
    {
      status: "partial",
      label: "Parcial",
      description: "Critério atendido parcialmente",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      status: "negative",
      label: "Reprovado",
      description: "Critério não atendido",
      color: "bg-red-100 text-red-800"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Legenda da Avaliação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {legendItems.map((item) => (
            <div key={item.status} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                item.status === "positive" ? "bg-green-500" :
                item.status === "partial" ? "bg-yellow-500" : "bg-red-500"
              }`} />
              <div>
                <span className={`text-sm font-medium px-2 py-1 rounded ${item.color}`}>
                  {item.label}
                </span>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}