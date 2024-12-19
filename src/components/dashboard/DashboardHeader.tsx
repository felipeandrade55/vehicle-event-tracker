import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Database, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loadTestData, clearTestData, isTestDataActive } from "@/data/testData";
import { useState, useEffect } from "react";
import { toast } from "../ui/use-toast";

export function DashboardHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [testDataEnabled, setTestDataEnabled] = useState(false);

  useEffect(() => {
    setTestDataEnabled(isTestDataActive());
  }, []);

  const handleTestData = () => {
    if (testDataEnabled) {
      clearTestData();
      setTestDataEnabled(false);
      toast({
        title: "Dados de teste removidos",
        description: "Todos os dados de exemplo foram removidos do sistema.",
      });
    } else {
      loadTestData();
      setTestDataEnabled(true);
      toast({
        title: "Dados de teste carregados",
        description: "10 associados de exemplo foram adicionados ao sistema.",
      });
    }
    // Force a page reload to update the data
    window.location.reload();
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex items-center flex-1">
          <img 
            src="/lovable-uploads/ancore-logo.png" 
            alt="Ancore Logo" 
            className="h-8 mr-4"
          />
          <h1 className="text-xl font-semibold">Ancore Clube de Benefícios</h1>
        </div>
        <Button
          variant={testDataEnabled ? "destructive" : "outline"}
          onClick={handleTestData}
          className="flex items-center gap-2"
        >
          <Database className="h-4 w-4" />
          {testDataEnabled ? "Remover Dados de Teste" : "Carregar Dados de Teste"}
        </Button>
        <Avatar>
          <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="icon" onClick={() => {
          signOut();
          navigate("/login");
        }}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}