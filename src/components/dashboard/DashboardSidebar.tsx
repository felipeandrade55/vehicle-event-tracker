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
  CreditCard,
  Cog,
  Truck,
  Building
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
    {
      title: "Controle de Custos",
      url: "/financial/costs",
      icon: Building,
      submenu: [
        {
          title: "Centro de Custos",
          url: "/financial/costs/departments",
        },
        {
          title: "Rateio de Despesas",
          url: "/financial/costs/allocation",
        },
        {
          title: "Custos por Associado",
          url: "/financial/costs/associates",
        },
      ],
    },
  ];

  const partnersMenuItems = [
    {
      title: "Oficinas",
      url: "/workshops",
      icon: Cog,
    },
    {
      title: "Fornecedores",
      url: "/suppliers",
      icon: Truck,
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
                  {item.submenu && (
                    <div className="ml-6 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <Link to={subItem.url} className="text-sm py-2">
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">Parceiros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {partnersMenuItems.map((item) => (
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