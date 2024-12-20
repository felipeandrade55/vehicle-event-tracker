import {
  Banknote,
  Receipt,
  CreditCard,
  TrendingUp,
  FileText,
  DollarSign,
  FileSpreadsheet,
} from "lucide-react";
import { MenuItems } from "./MenuItems";
import { MenuItem } from "../types/sidebar";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";

const items: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/financial",
    icon: DollarSign,
  },
  {
    title: "Receitas",
    url: "/financial/revenues",
    icon: Banknote,
  },
  {
    title: "Despesas",
    url: "/financial/expenses",
    icon: Receipt,
  },
  {
    title: "Mensalidades",
    url: "/financial/monthly-payments",
    icon: CreditCard,
  },
  {
    title: "Fluxo de Caixa",
    url: "/financial/cash-flow",
    icon: TrendingUp,
  },
  {
    title: "Gestão de Contratos",
    url: "/financial/contracts",
    icon: FileText,
  },
  {
    title: "Controle de Custos",
    url: "/financial/costs",
    icon: FileSpreadsheet,
    submenu: [
      {
        title: "Por Departamento",
        url: "/financial/costs/departments",
      },
      {
        title: "Alocação de Despesas",
        url: "/financial/costs/allocation",
      },
      {
        title: "Por Associado",
        url: "/financial/costs/associates",
      },
    ],
  },
];

export const FinancialMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base font-semibold">Financeiro</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <MenuItems items={items} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};