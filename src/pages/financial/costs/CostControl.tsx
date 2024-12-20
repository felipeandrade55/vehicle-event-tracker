import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, PieChart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CostControl = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Controle de Custos</h1>
        <p className="text-sm text-gray-500">
          Gerencie e analise os custos da associação
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/financial/costs/departments">
          <Card className="hover:bg-gray-50 transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Centro de Custos por Departamento
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Visualize e gerencie os custos por departamento da associação
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/financial/costs/allocation">
          <Card className="hover:bg-gray-50 transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Rateio de Despesas
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Faça o rateio das despesas administrativas entre departamentos
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/financial/costs/associates">
          <Card className="hover:bg-gray-50 transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Custos por Associado
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Analise os custos individuais por associado
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default CostControl;