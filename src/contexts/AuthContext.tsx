import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulação de usuários para demonstração
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@example.com",
    role: "associate",
    cpf: "123.456.789-00",
    phone: "(11) 99999-9999",
    plan: {
      id: "1",
      name: "Plano Premium",
      description: "Cobertura completa para seu veículo",
      coverage: ["Colisão", "Roubo", "Furto", "Assistência 24h"],
    },
  },
] as User[];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulação de login
    const foundUser = MOCK_USERS.find((u) => u.email === email);
    if (foundUser && password === "123456") {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
    } else {
      throw new Error("Credenciais inválidas");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}