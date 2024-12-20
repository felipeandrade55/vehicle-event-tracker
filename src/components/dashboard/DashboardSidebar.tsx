import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainMenu } from "./menu/MainMenu";
import { FinancialMenu } from "./menu/FinancialMenu";
import { PartnersMenu } from "./menu/PartnersMenu";
import { SettingsMenu } from "./menu/SettingsMenu";

export const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <MainMenu />
        <FinancialMenu />
        <PartnersMenu />
        <SettingsMenu />
      </SidebarContent>
    </Sidebar>
  );
};