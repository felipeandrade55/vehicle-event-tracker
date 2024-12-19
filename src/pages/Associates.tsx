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
import { Plus, Search } from "lucide-react";
import { Associate } from "@/types";
import { AssociateForm } from "@/components/associates/AssociateForm";
import { AssociateDetails } from "@/components/associates/AssociateDetails";
import { toast } from "@/components/ui/use-toast";

const Associates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [associates, setAssociates] = useState<Associate[]>([]);
  const [selectedAssociate, setSelectedAssociate] = useState<Associate | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssociate, setEditingAssociate] = useState<Associate | null>(
    null
  );

  const handleSearch = () => {
    console.log("Buscando por:", searchQuery);
    // Implementar lógica de busca aqui
  };

  const handleSaveAssociate = (data: Partial<Associate>) => {
    const newAssociate: Associate = {
      id: editingAssociate?.id || crypto.randomUUID(),
      name: data.name || "",
      cpf: data.cpf || "",
      phone: data.phone || "",
      email: data.email || "",
      role: "associate",
      plan: {
        id: "default",
        name: "Plano Básico",
        description: "Plano básico de proteção veicular",
        coverage: [],
        type: "basic",
        price: 0,
        features: [],
        assistanceDetails: [],
      },
      contractId: crypto.randomUUID(),
      address: {
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
      vehicles: [],
    };

    if (editingAssociate) {
      setAssociates(associates.map(a => 
        a.id === editingAssociate.id ? { ...a, ...newAssociate } : a
      ));
      toast({
        title: "Associado atualizado",
        description: "Os dados do associado foram atualizados com sucesso.",
      });
    } else {
      setAssociates([...associates, newAssociate]);
      toast({
        title: "Associado cadastrado",
        description: "Novo associado foi cadastrado com sucesso.",
      });
    }
    
    setIsFormOpen(false);
    setEditingAssociate(null);
  };

  const handleViewDetails = (associate: Associate) => {
    setSelectedAssociate(associate);
    setIsFormOpen(false);
  };

  const handleEdit = (associate: Associate) => {
    setEditingAssociate(associate);
    setIsFormOpen(true);
    setSelectedAssociate(null);
  };

  const handleBack = () => {
    setSelectedAssociate(null);
    setIsFormOpen(false);
    setEditingAssociate(null);
  };

  if (selectedAssociate) {
    return (
      <AssociateDetails
        associate={selectedAssociate}
        onEdit={() => handleEdit(selectedAssociate)}
        onBack={handleBack}
      />
    );
  }

  if (isFormOpen) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">
            {editingAssociate ? "Editar" : "Novo"} Associado
          </h2>
        </div>
        <AssociateForm
          onSubmit={handleSaveAssociate}
          initialData={editingAssociate || undefined}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gerenciamento de Associados</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Novo Associado
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por CPF, Telefone, ID ou Nome"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Plano</TableHead>
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
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(associate)}
                  >
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {associates.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Nenhum associado encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Associates;