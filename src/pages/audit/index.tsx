import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditList } from "@/components/audit/AuditList";
import { Badge } from "@/components/ui/badge";
import { AuditListFilters } from "@/components/audit/AuditListFilters";

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>();
  const [selectedAuditor, setSelectedAuditor] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedPriority, setSelectedPriority] = useState("Todos");

  const handleClearFilters = () => {
    setSearchQuery("");
    setDate(undefined);
    setSelectedAuditor("Todos");
    setSelectedStatus("Todos");
    setSelectedPriority("Todos");
  };

  return (
    <div className="space-y-4 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Auditoria de Acionamentos</h1>
      </div>

      <AuditListFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        date={date}
        setDate={setDate}
        selectedAuditor={selectedAuditor}
        setSelectedAuditor={setSelectedAuditor}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        handleClearFilters={handleClearFilters}
      />

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
              <AuditList 
                status="pending"
                filters={{
                  searchQuery,
                  date,
                  selectedAuditor,
                  selectedStatus,
                  selectedPriority
                }}
              />
            </TabsContent>
            <TabsContent value="in-progress">
              <AuditList 
                status="in-progress"
                filters={{
                  searchQuery,
                  date,
                  selectedAuditor,
                  selectedStatus,
                  selectedPriority
                }}
              />
            </TabsContent>
            <TabsContent value="completed">
              <AuditList 
                status="completed"
                filters={{
                  searchQuery,
                  date,
                  selectedAuditor,
                  selectedStatus,
                  selectedPriority
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}