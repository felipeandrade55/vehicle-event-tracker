import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@/types";

interface ApprovalLevel {
  id: string;
  role: UserRole;
  minValue: number;
  maxValue: number;
  description: string;
}

const ApprovalLevels = () => {
  const { toast } = useToast();
  const [levels, setLevels] = useState<ApprovalLevel[]>([
    {
      id: "1",
      role: "operator",
      minValue: 0,
      maxValue: 5000,
      description: "Aprovação de contratos de baixo valor",
    },
    {
      id: "2",
      role: "manager",
      minValue: 5001,
      maxValue: 50000,
      description: "Aprovação de contratos de médio valor",
    },
    {
      id: "3",
      role: "admin",
      minValue: 50001,
      maxValue: 999999999,
      description: "Aprovação de contratos de alto valor",
    },
  ]);

  const [newLevel, setNewLevel] = useState<Omit<ApprovalLevel, "id">>({
    role: "operator",
    minValue: 0,
    maxValue: 0,
    description: "",
  });

  const handleAddLevel = () => {
    const level: ApprovalLevel = {
      id: crypto.randomUUID(),
      ...newLevel,
    };

    setLevels([...levels, level]);
    toast({
      title: "Alçada adicionada",
      description: "Nova alçada de aprovação foi adicionada com sucesso.",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getRoleLabel = (role: UserRole) => {
    const labels = {
      admin: "Administrador",
      manager: "Gerente",
      operator: "Operador",
    };
    return labels[role];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Controle de Alçadas</h1>
          <p className="text-sm text-gray-500">
            Defina os níveis de aprovação para contratos
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Nova Alçada</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Alçada</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="role">Cargo</Label>
                <Select
                  value={newLevel.role}
                  onValueChange={(value: UserRole) =>
                    setNewLevel({ ...newLevel, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="operator">Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="minValue">Valor Mínimo</Label>
                <Input
                  id="minValue"
                  type="number"
                  value={newLevel.minValue}
                  onChange={(e) =>
                    setNewLevel({
                      ...newLevel,
                      minValue: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="maxValue">Valor Máximo</Label>
                <Input
                  id="maxValue"
                  type="number"
                  value={newLevel.maxValue}
                  onChange={(e) =>
                    setNewLevel({
                      ...newLevel,
                      maxValue: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newLevel.description}
                  onChange={(e) =>
                    setNewLevel({
                      ...newLevel,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <Button onClick={handleAddLevel} className="w-full">
                Adicionar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alçadas de Aprovação</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cargo</TableHead>
                <TableHead>Valor Mínimo</TableHead>
                <TableHead>Valor Máximo</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levels.map((level) => (
                <TableRow key={level.id}>
                  <TableCell>{getRoleLabel(level.role)}</TableCell>
                  <TableCell>{formatCurrency(level.minValue)}</TableCell>
                  <TableCell>{formatCurrency(level.maxValue)}</TableCell>
                  <TableCell>{level.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovalLevels;