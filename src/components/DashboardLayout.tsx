import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, LogOut, User, FileText, Car, Users } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img 
                src="https://ancore.app/wp-content/uploads/2024/07/Ancore-logo.png" 
                alt="Ancore Proteção Veicular" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
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

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
          
          {/* Footer */}
          <footer className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <p className="text-center text-sm text-gray-600">
                Ancore Proteção Veicular - Uma empresa subsidiária do Grupo ARX
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;