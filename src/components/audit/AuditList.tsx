import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuditListFilters } from "./AuditListFilters";
import { mockOccurrences } from "@/data/occurrenceData";

export function AuditList() {
  const navigate = useNavigate();

  const handleAuditClick = (id: string) => {
    navigate(`/audit/action/${id}`);
  };

  return (
    <Card>
      <div className="p-6">
        <AuditListFilters />
        
        <ScrollArea className="h-[600px] mt-6">
          <div className="space-y-4">
            {mockOccurrences.map((occurrence) => (
              <div
                key={occurrence.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{occurrence.associate}</h3>
                  <p className="text-sm text-gray-500">
                    {occurrence.type} - {occurrence.date}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleAuditClick(occurrence.id)}
                >
                  Auditar
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}