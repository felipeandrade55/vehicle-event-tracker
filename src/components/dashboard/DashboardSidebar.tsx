import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainMenu } from "./menu/MainMenu";
import { FinancialMenu } from "./menu/FinancialMenu";
import { PartnersMenu } from "./menu/PartnersMenu";
import { SettingsMenu } from "./menu/SettingsMenu";

export const DashboardSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <Sidebar>
        <SidebarContent className="py-4 h-screen overflow-y-auto">
          <MainMenu />
          <FinancialMenu />
          <PartnersMenu />
          <SettingsMenu />
        </SidebarContent>
      </Sidebar>
    </div>
  );
};