import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NewTicketButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/support/tickets/new")} className="flex items-center gap-2">
      <Plus className="h-4 w-4" />
      Novo Ticket
    </Button>
  );
}