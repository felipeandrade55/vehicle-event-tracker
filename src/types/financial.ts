export interface MonthlyPayment {
  id: string;
  associateId: string;
  associateName: string;
  planId: string;
  planName: string;
  value: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  paymentMethod?: string;
  paymentDate?: string;
  invoiceUrl?: string;
}

export interface Revenue {
  id: string;
  description: string;
  category: "monthly_payment" | "enrollment_fee" | "protection" | "other";
  value: number;
  dueDate: string;
  status: "pending" | "paid";
  associateId?: string;
  planId?: string;
  paymentMethod?: string;
  paymentDate?: string;
  invoiceUrl?: string;
}

export interface RevenueCategory {
  id: string;
  name: string;
  description: string;
  type: "monthly_payment" | "enrollment_fee" | "protection" | "other";
}