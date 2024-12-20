import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const contractHistory = [
  {
    id: 1,
    contractId: "CONT-001",
    date: "2024-03-15",
    type: "edit",
    description: "Alteração de valor do contrato",
    user: "João Silva",
    details: "Valor atualizado de R$ 5.000,00 para R$ 5.500,00",
  },
  {
    id: 2,
    contractId: "CONT-001",
    date: "2024-03-01",
    type: "renewal",
    description: "Renovação automática",
    user: "Sistema",
    details: "Contrato renovado por mais 12 meses",
  },
  {
    id: 3,
    contractId: "CONT-002",
    date: "2024-02-28",
    type: "adjustment",
    description: "Reajuste anual",
    user: "Maria Santos",
    details: "Aplicado reajuste de 5,5% conforme IPCA",
  },
];

const ContractHistory = () => {
  const getTypeBadge = (type: string) => {
    const styles = {
      edit: "bg-blue-500",
      renewal: "bg-green-500",
      adjustment: "bg-yellow-500",
    };

    const labels = {
      edit: "Edição",
      renewal: "Renovação",
      adjustment: "Reajuste",
    };

    return (
      <Badge className={styles[type as keyof typeof styles]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Histórico de Alterações</h1>
        <p className="text-sm text-gray-500">
          Visualize todas as alterações realizadas nos contratos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractHistory.map((history) => (
                <TableRow key={history.id}>
                  <TableCell className="font-medium">{history.contractId}</TableCell>
                  <TableCell>
                    {new Date(history.date).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>{getTypeBadge(history.type)}</TableCell>
                  <TableCell>{history.description}</TableCell>
                  <TableCell>{history.user}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {history.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractHistory;