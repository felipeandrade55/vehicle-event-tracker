import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Occurrence } from "@/data/occurrenceData";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface OccurrenceListTableProps {
  occurrences: Occurrence[];
  getStatusColor: (status: string) => string;
  onViewOccurrence: (id: string) => void;
}

export function OccurrenceListTable({
  occurrences,
  getStatusColor,
  onViewOccurrence,
}: OccurrenceListTableProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        {occurrences.map((occurrence) => (
          <Card key={occurrence.id} className="cursor-pointer" onClick={() => onViewOccurrence(occurrence.id)}>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{occurrence.id}</p>
                  <p className="text-sm text-gray-500">{occurrence.date}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(occurrence.status)} font-normal`}
                >
                  {occurrence.status}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm"><span className="font-medium">Associado:</span> {occurrence.associate}</p>
                <p className="text-sm"><span className="font-medium">Veículo:</span> {occurrence.vehicle}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-normal">
                    {occurrence.type}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewOccurrence(occurrence.id);
                    }}
                    className="hover:bg-gray-100"
                    title="Visualizar detalhes"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold">Processo</TableHead>
                <TableHead className="font-semibold">Data/Hora</TableHead>
                <TableHead className="font-semibold">Associado</TableHead>
                <TableHead className="font-semibold">Veículo</TableHead>
                <TableHead className="font-semibold">Tipo de Ocorrência</TableHead>
                <TableHead className="font-semibold">Localidade</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {occurrences.map((occurrence) => (
                <TableRow
                  key={occurrence.id}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                  onClick={() => onViewOccurrence(occurrence.id)}
                >
                  <TableCell className="font-medium">{occurrence.id}</TableCell>
                  <TableCell>{occurrence.date}</TableCell>
                  <TableCell>{occurrence.associate}</TableCell>
                  <TableCell>{occurrence.vehicle}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {occurrence.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{occurrence.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${getStatusColor(occurrence.status)} font-normal`}
                    >
                      {occurrence.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewOccurrence(occurrence.id);
                      }}
                      className="hover:bg-gray-100"
                      title="Visualizar detalhes"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}