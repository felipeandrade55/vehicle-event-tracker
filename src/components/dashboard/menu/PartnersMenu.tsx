import { Cog, Truck } from "lucide-react";
import { MenuItem } from "../types/sidebar";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { MenuItems } from "./MenuItems";

const partnersMenuItems: MenuItem[] = [
  {
    title: "Oficinas",
    url: "/partners/workshops",
    icon: Cog,
  },
  {
    title: "Fornecedores",
    url: "/partners/suppliers",
    icon: Truck,
  },
];

export const PartnersMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base font-semibold">Parceiros</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <MenuItems items={partnersMenuItems} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};