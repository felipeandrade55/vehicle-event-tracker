import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import PlanManagement from "@/components/PlanManagement";
import AssociatePlanView from "@/components/AssociatePlanView";

const Plan = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "admin" ? <PlanManagement /> : <AssociatePlanView />}
    </>
  );
};

export default Plan;