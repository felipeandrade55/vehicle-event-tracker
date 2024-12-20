import { BarChart, DollarSign, CreditCard, Receipt, Wallet, Building } from "lucide-react";
import { MenuItem } from "../types/sidebar";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { MenuItems } from "./MenuItems";

const financialMenuItems: MenuItem[] = [
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
  },
];

export const FinancialMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base font-semibold">Financeiro</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <MenuItems items={financialMenuItems} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};