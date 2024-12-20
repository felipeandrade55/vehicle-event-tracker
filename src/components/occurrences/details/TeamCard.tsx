import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus, Edit2, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { TeamMember, TeamMemberRole } from "../types";

interface TeamCardProps {
  team?: TeamMember[];
  systemActions?: Array<{
    user: string;
    action: string;
    date: string;
  }>;
  onTeamUpdate?: (team: TeamMember[]) => void;
}

const roleLabels: Record<TeamMemberRole, string> = {
  technical_analyst: "Analista Técnico",
  legal_analyst: "Analista Jurídico",
  financial_analyst: "Analista Financeiro",
  field_inspector: "Inspetor de Campo",
  customer_service: "Atendimento ao Cliente",
  manager: "Gerente",
};

const processSteps = [
  "Registro do evento",
  "Documentação",
  "Análise jurídica",
  "Aprovação para reparo",
  "Finalização do processo",
];

export function TeamCard({ team = [], systemActions = [], onTeamUpdate }: TeamCardProps) {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: "",
    role: "technical_analyst",
    contact: "",
    assignedTo: [],
  });
  const { toast } = useToast();

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const member: TeamMember = {
      id: crypto.randomUUID(),
      name: newMember.name,
      role: newMember.role as TeamMemberRole,
      contact: newMember.contact,
      assignedAt: new Date().toISOString(),
      assignedTo: newMember.assignedTo || [],
      status: "active",
    };

    onTeamUpdate?.([...team, member]);
    setIsAddingMember(false);
    setNewMember({
      name: "",
      role: "technical_analyst",
      contact: "",
      assignedTo: [],
    });

    toast({
      title: "Sucesso",
      description: "Membro adicionado à equipe",
    });
  };

  const handleEditMember = (member: TeamMember) => {
    if (!member.name || !member.role) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const updatedTeam = team.map((m) =>
      m.id === member.id ? { ...member } : m
    );

    onTeamUpdate?.(updatedTeam);
    setEditingMember(null);

    toast({
      title: "Sucesso",
      description: "Informações do membro atualizadas",
    });
  };

  const handleDeleteMember = (memberId: string) => {
    const updatedTeam = team.filter((m) => m.id !== memberId);
    onTeamUpdate?.(updatedTeam);

    toast({
      title: "Sucesso",
      description: "Membro removido da equipe",
    });
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Equipe e Usuários Envolvidos
        </CardTitle>
        <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Membro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Membro</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="role">Função</Label>
                <Select
                  value={newMember.role}
                  onValueChange={(value: TeamMemberRole) =>
                    setNewMember({ ...newMember, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contact">Contato</Label>
                <Input
                  id="contact"
                  value={newMember.contact}
                  onChange={(e) =>
                    setNewMember({ ...newMember, contact: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Etapas Responsável</Label>
                <ScrollArea className="h-[100px] border rounded-md p-2">
                  {processSteps.map((step) => (
                    <div key={step} className="flex items-center space-x-2 p-1">
                      <input
                        type="checkbox"
                        id={`step-${step}`}
                        checked={newMember.assignedTo?.includes(step)}
                        onChange={(e) => {
                          const updatedSteps = e.target.checked
                            ? [...(newMember.assignedTo || []), step]
                            : (newMember.assignedTo || []).filter((s) => s !== step);
                          setNewMember({ ...newMember, assignedTo: updatedSteps });
                        }}
                      />
                      <label htmlFor={`step-${step}`}>{step}</label>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <Button onClick={handleAddMember} className="w-full">
                Adicionar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.map((member) => (
              <div
                key={member.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <Avatar>
                  <AvatarFallback>
                    {member.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {roleLabels[member.role]}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingMember(member)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  {member.contact && (
                    <p className="text-sm text-muted-foreground">
                      {member.contact}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {member.assignedTo.map((step) => (
                      <Badge key={step} variant="secondary">
                        {step}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Membro</DialogTitle>
            </DialogHeader>
            {editingMember && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Nome</Label>
                  <Input
                    id="edit-name"
                    value={editingMember.name}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-role">Função</Label>
                  <Select
                    value={editingMember.role}
                    onValueChange={(value: TeamMemberRole) =>
                      setEditingMember({
                        ...editingMember,
                        role: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roleLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-contact">Contato</Label>
                  <Input
                    id="edit-contact"
                    value={editingMember.contact}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Etapas Responsável</Label>
                  <ScrollArea className="h-[100px] border rounded-md p-2">
                    {processSteps.map((step) => (
                      <div key={step} className="flex items-center space-x-2 p-1">
                        <input
                          type="checkbox"
                          id={`edit-step-${step}`}
                          checked={editingMember.assignedTo.includes(step)}
                          onChange={(e) => {
                            const updatedSteps = e.target.checked
                              ? [...editingMember.assignedTo, step]
                              : editingMember.assignedTo.filter((s) => s !== step);
                            setEditingMember({
                              ...editingMember,
                              assignedTo: updatedSteps,
                            });
                          }}
                        />
                        <label htmlFor={`edit-step-${step}`}>{step}</label>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <Button
                  onClick={() => handleEditMember(editingMember)}
                  className="w-full"
                >
                  Salvar Alterações
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}