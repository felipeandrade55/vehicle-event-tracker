import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardFooter } from "./dashboard/DashboardFooter";
import { DashboardSidebar } from "./dashboard/DashboardSidebar";
import { SidebarProvider } from "./ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col w-full ml-[var(--sidebar-width)]">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6 bg-gray-50">
            <div className="w-full max-w-[1400px] mx-auto">
              {children}
            </div>
            <DashboardFooter />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;