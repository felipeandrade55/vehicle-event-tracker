import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const testData = {
  associates: [
    {
      id: "TEST-001",
      name: "João Silva",
      email: "joao.silva@example.com",
      cpf: "123.456.789-00",
      phone: "(11) 98765-4321",
      contractId: "CONT-001",
      role: "associate",
      plan: {
        id: "basic",
        name: "Plano Básico",
        description: "Cobertura básica",
        coverage: [],
        type: "basic",
        price: 100,
        features: [],
        assistanceDetails: [],
      },
      address: {
        street: "Rua das Flores",
        number: "123",
        neighborhood: "Jardim Europa",
        city: "São Paulo",
        state: "SP",
        zipCode: "01001-000",
      },
      vehicles: [
        {
          licensePlate: "ABC1D23",
          brand: "Toyota",
          model: "Corolla",
          year: "2022",
        }
      ],
    },
    {
      id: "TEST-002",
      name: "Maria Santos",
      email: "maria.santos@example.com",
      cpf: "987.654.321-00",
      phone: "(11) 91234-5678",
      contractId: "CONT-002",
      role: "associate",
      plan: {
        id: "premium",
        name: "Plano Premium",
        description: "Cobertura completa",
        coverage: [],
        type: "premium",
        price: 200,
        features: [],
        assistanceDetails: [],
      },
      address: {
        street: "Avenida Paulista",
        number: "1000",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-100",
      },
      vehicles: [
        {
          licensePlate: "XYZ9W87",
          brand: "Honda",
          model: "Civic",
          year: "2023",
        }
      ],
    },
  ],
  occurrences: [
    {
      id: "OCC-001",
      associateId: "TEST-001",
      type: "collision",
      date: "2024-03-15T14:30:00",
      description: "Colisão traseira na Marginal Tietê",
      licensePlate: "ABC1D23",
      vehicleModel: "Corolla",
      vehicleBrand: "Toyota",
      status: "em_analise",
    },
    {
      id: "OCC-002",
      associateId: "TEST-002",
      type: "theft",
      date: "2024-03-10T20:15:00",
      description: "Veículo furtado no estacionamento do shopping",
      licensePlate: "XYZ9W87",
      vehicleModel: "Civic",
      vehicleBrand: "Honda",
      status: "aprovado",
    },
  ],
};

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [testModeActive, setTestModeActive] = useState(false);

  // Check initial state on component mount
  useEffect(() => {
    const hasTestData = localStorage.getItem('testAssociates') !== null;
    setTestModeActive(hasTestData);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleTestData = () => {
    if (!testModeActive) {
      // Save test data to localStorage
      localStorage.setItem('testAssociates', JSON.stringify(testData.associates));
      localStorage.setItem('testOccurrences', JSON.stringify(testData.occurrences));
      toast({
        title: "Modo de teste ativado",
        description: "Dados de exemplo foram carregados no sistema.",
      });
    } else {
      // Remove test data from localStorage
      localStorage.removeItem('testAssociates');
      localStorage.removeItem('testOccurrences');
      toast({
        title: "Modo de teste desativado",
        description: "Dados de exemplo foram removidos do sistema.",
      });
    }
    setTestModeActive(!testModeActive);
  };

  return (
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
            <Button
              variant={testModeActive ? "destructive" : "outline"}
              size="sm"
              onClick={toggleTestData}
              className="flex items-center gap-2"
            >
              <Database className="h-4 w-4" />
              {testModeActive ? "Desativar Teste" : "Dados de Teste"}
            </Button>
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
  );
};