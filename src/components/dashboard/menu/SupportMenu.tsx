import { LifeBuoy } from "lucide-react";
import { MenuItem } from "../types/sidebar";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { MenuItems } from "./MenuItems";

const supportMenuItems: MenuItem[] = [
  {
    title: "Central de Suporte",
    url: "/support",
    icon: LifeBuoy,
  },
];

export const SupportMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Suporte</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <MenuItems items={supportMenuItems} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};