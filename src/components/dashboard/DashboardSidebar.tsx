import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainMenu } from "./menu/MainMenu";
import { FinancialMenu } from "./menu/FinancialMenu";
import { PartnersMenu } from "./menu/PartnersMenu";
import { SettingsMenu } from "./menu/SettingsMenu";

export const DashboardSidebar = () => {
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
      <Sidebar>
        <SidebarContent className="py-4 space-y-4">
          <MainMenu />
          <div className="px-3">
            <FinancialMenu />
          </div>
          <PartnersMenu />
          <SettingsMenu />
        </SidebarContent>
      </Sidebar>
    </div>
  );
};