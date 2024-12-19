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
        <div className="flex-1">
          <DashboardHeader />
          <main className="flex-1 p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
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