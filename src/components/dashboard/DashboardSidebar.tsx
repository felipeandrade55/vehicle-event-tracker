import { Link } from "react-router-dom";
import { Settings, Users } from "lucide-react";

export const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <nav className="space-y-2">
        <div className="pt-4 border-t">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Configurações
            </h2>
            <div className="space-y-1">
              <Link
                to="/settings/users"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              >
                <Users className="h-4 w-4" />
                Usuários
              </Link>
              <Link
                to="/settings/roles"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              >
                <Settings className="h-4 w-4" />
                Cargos
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
