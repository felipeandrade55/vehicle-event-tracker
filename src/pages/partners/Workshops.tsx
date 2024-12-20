import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FipeSearch } from "@/components/fipe/FipeSearch";
import { WorkshopPayments } from "@/components/workshops/payments/WorkshopPayments";
import { ServiceHistory } from "@/components/workshops/history/ServiceHistory";

const Workshops = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Oficinas Credenciadas</h1>
      
      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="fipe">Consulta FIPE</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payments">
          <Card>
            <CardContent className="pt-6">
              <WorkshopPayments />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardContent className="pt-6">
              <ServiceHistory />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fipe">
          <Card>
            <CardContent className="pt-6">
              <FipeSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workshops;