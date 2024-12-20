import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FipeSearch } from "@/components/fipe/FipeSearch";

const Workshops = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Oficinas Credenciadas</h1>
      
      <FipeSearch />
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Oficinas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conteúdo em desenvolvimento</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workshops;