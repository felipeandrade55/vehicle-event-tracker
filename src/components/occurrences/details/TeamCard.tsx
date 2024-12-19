import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TeamMember {
  name: string;
  role: string;
  contact?: string;
  actions?: string[];
  lastAction?: string;
}

interface TeamCardProps {
  team?: TeamMember[];
  systemActions?: Array<{
    user: string;
    action: string;
    date: string;
  }>;
}

export function TeamCard({ team, systemActions }: TeamCardProps) {
  // Combinar membros da equipe com usuários que realizaram ações
  const allTeamMembers = [...(team || [])];
  
  // Adicionar usuários que realizaram ações mas não são parte da equipe
  systemActions?.forEach(action => {
    const existingMember = allTeamMembers.find(member => member.name === action.user);
    if (!existingMember) {
      allTeamMembers.push({
        name: action.user,
        role: "Usuário do Sistema",
        actions: [action.action],
        lastAction: action.date
      });
    } else {
      if (!existingMember.actions) {
        existingMember.actions = [];
      }
      existingMember.actions.push(action.action);
      existingMember.lastAction = action.date;
    }
  });

  if (!allTeamMembers.length) return null;

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Equipe e Usuários Envolvidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTeamMembers.map((member, index) => (
              <div key={index} className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted/50">
                <Avatar>
                  <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  {member.contact && (
                    <p className="text-sm text-muted-foreground">{member.contact}</p>
                  )}
                  {member.actions && member.actions.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      <p>Última ação: {member.actions[member.actions.length - 1]}</p>
                      <p>Em: {member.lastAction}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}