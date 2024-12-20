import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { TeamMember } from "../../types";
import { roleLabels } from "./constants";

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (memberId: string) => void;
}

export function TeamMemberCard({ member, onEdit, onDelete }: TeamMemberCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
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
              onClick={() => onEdit(member)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(member.id)}
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
  );
}