import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Associate } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Check } from "lucide-react";

const AssociatePlanView = () => {
  const { user } = useAuth();
  const associate = user as Associate;

  if (!associate?.plan) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum plano encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">Meu Plano</h2>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{associate.plan.name}</span>
            <span className="text-lg text-primary">
              {associate.plan.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              /mês
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Descrição</h3>
            <p className="text-gray-600">{associate.plan.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Coberturas</h3>
            <ul className="grid grid-cols-2 gap-2">
              {associate.plan.coverage.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Características do Plano</h3>
            <ul className="grid grid-cols-2 gap-2">
              {associate.plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Detalhes da Assistência 24h</h3>
            <ul className="grid grid-cols-2 gap-2">
              {associate.plan.assistanceDetails.map((detail, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssociatePlanView;