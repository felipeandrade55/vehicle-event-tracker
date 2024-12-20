import { Home, Car, FileText, ClipboardList } from "lucide-react";
import { MenuItem } from "../types/sidebar";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { MenuItems } from "./MenuItems";

const mainMenuItems: MenuItem[] = [
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

export const MainMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base font-semibold">Menu Principal</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <MenuItems items={mainMenuItems} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};