import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardFooter } from "./dashboard/DashboardFooter";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
        <DashboardFooter />
      </main>
    </div>
  );
};

export default DashboardLayout;