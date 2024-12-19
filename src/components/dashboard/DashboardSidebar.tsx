import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, Users, FileText, Car } from "lucide-react";

export const DashboardSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-4rem)] border-r border-gray-100">
      <nav className="p-6 space-y-3">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => navigate("/dashboard")}
        >
          <User className="mr-3 h-4 w-4" />
          Perfil
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => navigate("/associates")}
        >
          <Users className="mr-3 h-4 w-4" />
          Associados
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => navigate("/occurrences")}
        >
          <FileText className="mr-3 h-4 w-4" />
          Ocorrências
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => navigate("/plan")}
        >
          <Car className="mr-3 h-4 w-4" />
          Meu Plano
        </Button>
      </nav>
    </aside>
  );
};