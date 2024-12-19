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
      <div className="min-h-screen bg-gray-50 flex w-full overflow-x-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-8 bg-gray-50 overflow-x-hidden">
            <div className="container mx-auto max-w-[1400px]">
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