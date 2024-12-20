import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TeamMember, TeamMemberRole } from "../../types";
import { roleLabels, processSteps } from "./constants";

interface TeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Partial<TeamMember>;
  onMemberChange: (member: Partial<TeamMember>) => void;
  onSave: () => void;
  title: string;
}

export function TeamMemberDialog({
  open,
  onOpenChange,
  member,
  onMemberChange,
  onSave,
  title,
}: TeamMemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={member.name}
              onChange={(e) =>
                onMemberChange({ ...member, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="role">Função</Label>
            <Select
              value={member.role}
              onValueChange={(value: TeamMemberRole) =>
                onMemberChange({ ...member, role: value })
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
              value={member.contact}
              onChange={(e) =>
                onMemberChange({ ...member, contact: e.target.value })
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
                    checked={member.assignedTo?.includes(step)}
                    onChange={(e) => {
                      const updatedSteps = e.target.checked
                        ? [...(member.assignedTo || []), step]
                        : (member.assignedTo || []).filter((s) => s !== step);
                      onMemberChange({ ...member, assignedTo: updatedSteps });
                    }}
                  />
                  <label htmlFor={`step-${step}`}>{step}</label>
                </div>
              ))}
            </ScrollArea>
          </div>
          <Button onClick={onSave} className="w-full">
            {title === "Adicionar Novo Membro" ? "Adicionar" : "Salvar Alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}