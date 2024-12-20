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

export interface MonthlyPaymentFilters {
  status?: "pending" | "paid" | "overdue";
  month?: string;
  associateId?: string;
  planId?: string;
}