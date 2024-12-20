import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { TeamMember } from "../types";
import { TeamMemberCard } from "./team/TeamMemberCard";
import { TeamMemberDialog } from "./team/TeamMemberDialog";

interface TeamCardProps {
  team?: TeamMember[];
  systemActions?: Array<{
    user: string;
    action: string;
    date: string;
  }>;
  onTeamUpdate?: (team: TeamMember[]) => void;
}

export function TeamCard({ team = [], onTeamUpdate }: TeamCardProps) {
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
      role: newMember.role as TeamMember["role"],
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
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" onClick={() => setIsAddingMember(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Membro
          </Button>
        </DialogTrigger>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onEdit={setEditingMember}
                onDelete={handleDeleteMember}
              />
            ))}
          </div>
        </ScrollArea>

        <TeamMemberDialog
          open={isAddingMember}
          onOpenChange={setIsAddingMember}
          member={newMember}
          onMemberChange={setNewMember}
          onSave={handleAddMember}
          title="Adicionar Novo Membro"
        />

        <TeamMemberDialog
          open={!!editingMember}
          onOpenChange={() => setEditingMember(null)}
          member={editingMember || {}}
          onMemberChange={(changes) =>
            setEditingMember(changes as TeamMember)
          }
          onSave={() => editingMember && handleEditMember(editingMember)}
          title="Editar Membro"
        />
      </CardContent>
    </Card>
  );
}