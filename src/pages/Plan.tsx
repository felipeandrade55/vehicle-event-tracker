import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import PlanManagement from "@/components/PlanManagement";
import AssociatePlanView from "@/components/AssociatePlanView";
import DashboardLayout from "@/components/DashboardLayout";

const Plan = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {user?.role === "admin" ? <PlanManagement /> : <AssociatePlanView />}
    </DashboardLayout>
  );
};

export default Plan;