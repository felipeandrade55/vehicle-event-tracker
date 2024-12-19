import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Associates from "./pages/Associates";
import Plan from "./pages/Plan";
import OccurrenceList from "./pages/OccurrenceList";
import OccurrenceDetails from "./pages/OccurrenceDetails";
import DashboardLayout from "@/components/DashboardLayout";
import { OccurrenceForm } from "@/components/occurrences/OccurrenceForm";

// Componente de proteção de rota
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route
            path="/associates"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Associates />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <Plan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/occurrences"
            element={
              <ProtectedRoute>
                <OccurrenceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/occurrences/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OccurrenceDetails />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/occurrences/new"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OccurrenceForm />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}

export default App;