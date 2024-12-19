import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Associate } from "@/types";

const Associates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [associates, setAssociates] = useState<Associate[]>([]);

  // Função de busca que será implementada posteriormente com backend
  const handleSearch = () => {
    console.log("Buscando por:", searchQuery);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Associados</h1>
      
      {/* Barra de pesquisa */}
      <div className="flex gap-4">
        <Input
          placeholder="Buscar por CPF, Telefone, Placa, ID ou Nome"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xl"
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {/* Tabela de Associados */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {associates.map((associate) => (
              <TableRow key={associate.id}>
                <TableCell>{associate.id}</TableCell>
                <TableCell>{associate.name}</TableCell>
                <TableCell>{associate.cpf}</TableCell>
                <TableCell>{associate.phone}</TableCell>
                <TableCell>{associate.plan.name}</TableCell>
                <TableCell>Placa do Veículo</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Associates;