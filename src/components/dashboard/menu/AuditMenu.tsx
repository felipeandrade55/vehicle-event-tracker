import { ClipboardCheck, Brain } from "lucide-react";
import { MenuItem } from "../types/sidebar";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { MenuItems } from "./MenuItems";

const auditMenuItems: MenuItem[] = [
  {
    title: "Auditoria",
    url: "/audit",
    icon: ClipboardCheck,
  },
  {
    title: "Auditoria I.A.",
    url: "/audit/ai",
    icon: Brain,
  },
];

export const AuditMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base font-semibold">Auditoria</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <MenuItems items={auditMenuItems} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};