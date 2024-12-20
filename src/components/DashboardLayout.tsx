import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardFooter } from "./dashboard/DashboardFooter";
import { DashboardSidebar } from "./dashboard/DashboardSidebar";
import { SidebarProvider } from "./ui/sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6">
            <div className="w-full max-w-[1400px] mx-auto">
              <Outlet />
            </div>
            <DashboardFooter />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;