import { Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bem-vindo ao Sistema
          </h1>
          <p className="text-sm text-gray-500">
            Gerencie suas operações de proteção veicular
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-2">Ocorrências</h3>
          <p className="text-gray-600 text-sm">
            Gerencie todas as ocorrências e acionamentos de proteção veicular
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-2">Associados</h3>
          <p className="text-gray-600 text-sm">
            Cadastre e gerencie informações dos associados
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-2">Planos</h3>
          <p className="text-gray-600 text-sm">
            Configure e gerencie os planos de proteção veicular
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;