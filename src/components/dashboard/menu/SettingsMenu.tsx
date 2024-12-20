import { Users, Settings } from "lucide-react";
import { MenuItem } from "../types/sidebar";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { MenuItems } from "./MenuItems";

const settingsMenuItems: MenuItem[] = [
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

export const SettingsMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base font-semibold">Configurações</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <MenuItems items={settingsMenuItems} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};