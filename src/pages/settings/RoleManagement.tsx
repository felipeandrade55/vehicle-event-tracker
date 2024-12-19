import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Role } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
  });

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    const role: Role = {
      id: crypto.randomUUID(),
      name: newRole.name,
      description: newRole.description,
      permissions: [],
    };
    setRoles([...roles, role]);
    setNewRole({ name: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestão de Cargos</h1>

      <form onSubmit={handleAddRole} className="space-y-4">
        <div>
          <Label htmlFor="name">Nome do Cargo</Label>
          <Input
            id="name"
            value={newRole.name}
            onChange={(e) =>
              setNewRole({ ...newRole, name: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Input
            id="description"
            value={newRole.description}
            onChange={(e) =>
              setNewRole({ ...newRole, description: e.target.value })
            }
            required
          />
        </div>

        <Button type="submit">Adicionar Cargo</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoleManagement;