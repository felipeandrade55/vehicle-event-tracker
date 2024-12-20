import { Link } from "react-router-dom";
import { 
  Settings, 
  Users, 
  Home, 
  Car, 
  ClipboardList,
  FileText,
  DollarSign,
  BarChart,
  Receipt,
  Wallet,
  CreditCard
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const DashboardSidebar = () => {
  const mainMenuItems = [
    {
      title: "Início",
      url: "/",
      icon: Home,
    },
    {
      title: "Associados",
      url: "/associates",
      icon: Car,
    },
    {
      title: "Planos",
      url: "/plan",
      icon: FileText,
    },
    {
      title: "Ocorrências",
      url: "/occurrences",
      icon: ClipboardList,
    },
  ];

  const financialMenuItems = [
    {
      title: "Dashboard Financeiro",
      url: "/financial",
      icon: BarChart,
    },
    {
      title: "Receitas",
      url: "/financial/revenues",
      icon: DollarSign,
    },
    {
      title: "Mensalidades",
      url: "/financial/monthly-payments",
      icon: CreditCard,
    },
    {
      title: "Despesas",
      url: "/financial/expenses",
      icon: Receipt,
    },
    {
      title: "Fluxo de Caixa",
      url: "/financial/cash-flow",
      icon: Wallet,
    },
  ];

  const settingsMenuItems = [
    {
      title: "Usuários",
      url: "/settings/users",
      icon: Users,
    },
    {
      title: "Cargos",
      url: "/settings/roles",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="text-base py-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financialMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="text-base py-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">Configurações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="text-base py-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};