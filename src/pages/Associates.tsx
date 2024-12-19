import { useState, useEffect } from "react";
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
import { Plus, Search, Eye, UserCircle } from "lucide-react";
import { Associate } from "@/types";
import { AssociateForm } from "@/components/associates/AssociateForm";
import { AssociateDetails } from "@/components/associates/AssociateDetails";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  useEffect(() => {
    const storedAssociates = localStorage.getItem("associates");
    if (storedAssociates) {
      setAssociates(JSON.parse(storedAssociates));
    }
  }, []);

  const handleSearch = () => {
    const storedAssociates = localStorage.getItem("associates");
    if (!storedAssociates) return;

    const allAssociates: Associate[] = JSON.parse(storedAssociates);
    if (!searchQuery.trim()) {
      setAssociates(allAssociates);
      return;
    }

    const filteredAssociates = allAssociates.filter((associate) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        associate.name.toLowerCase().includes(searchLower) ||
        associate.cpf.includes(searchQuery) ||
        associate.phone.includes(searchQuery) ||
        associate.email.toLowerCase().includes(searchLower) ||
        associate.vehicles.some((vehicle) =>
          vehicle.licensePlate.toLowerCase().includes(searchLower)
        )
      );
    });

    setAssociates(filteredAssociates);
  };

  const handleSaveAssociate = (data: Partial<Associate>) => {
    const newAssociate: Associate = {
      id: editingAssociate?.id || crypto.randomUUID(),
      name: data.name || "",
      cpf: data.cpf || "",
      phone: data.phone || "",
      email: data.email || "",
      role: "associate",
      planId: data.planId || "plan-basic", // Add default planId
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

  const handleUpdateAssociate = (updatedAssociate: Associate) => {
    const updatedAssociates = associates.map((associate) =>
      associate.id === updatedAssociate.id ? updatedAssociate : associate
    );
    setAssociates(updatedAssociates);
    localStorage.setItem("associates", JSON.stringify(updatedAssociates));
    setSelectedAssociate(updatedAssociate);
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
        onUpdateAssociate={handleUpdateAssociate}
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Associados</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie os associados e seus veículos
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Associado
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Associados</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os associados cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por CPF, Telefone, ID ou Nome"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={handleSearch} variant="secondary">
              Buscar
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {associates.map((associate) => (
                  <TableRow
                    key={associate.id}
                    className="hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleViewDetails(associate)}
                  >
                    <TableCell className="font-medium">{associate.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCircle className="h-5 w-5 text-primary" />
                        </div>
                        {associate.name}
                      </div>
                    </TableCell>
                    <TableCell>{associate.cpf}</TableCell>
                    <TableCell>{associate.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {associate.plan.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(associate);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {associates.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-32 text-center text-muted-foreground"
                    >
                      Nenhum associado encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedAssociate && (
        <AssociateDetails
          associate={selectedAssociate}
          onEdit={() => handleEdit(selectedAssociate)}
          onBack={handleBack}
          onUpdateAssociate={handleUpdateAssociate}
        />
      )}

      {isFormOpen && (
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
      )}
    </div>
  );
};

export default Associates;