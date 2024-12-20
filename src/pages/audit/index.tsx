import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditList } from "@/components/audit/AuditList";
import { Badge } from "@/components/ui/badge";

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="space-y-4 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Auditoria de Acionamentos</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Acionamentos para Auditoria</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="pending">
                Pendentes
                <Badge variant="secondary" className="ml-2">3</Badge>
              </TabsTrigger>
              <TabsTrigger value="in-progress">
                Em Análise
                <Badge variant="secondary" className="ml-2">2</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Concluídos
                <Badge variant="secondary" className="ml-2">5</Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <AuditList status="pending" />
            </TabsContent>
            <TabsContent value="in-progress">
              <AuditList status="in-progress" />
            </TabsContent>
            <TabsContent value="completed">
              <AuditList status="completed" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}