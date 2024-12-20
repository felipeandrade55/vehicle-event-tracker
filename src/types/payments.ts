export interface ServicePayment {
  id: string;
  workshopId: string;
  workshopName: string;
  serviceDate: string;
  paymentDate: string;
  amount: number;
  status: "pending" | "paid" | "cancelled";
  description: string;
  serviceType: string;
  occurrenceId: string;
  vehicleInfo?: {
    brand: string;
    model: string;
    licensePlate: string;
  };
}

export interface ServiceHistory {
  id: string;
  workshopId: string;
  serviceDate: string;
  completionDate: string;
  serviceType: string;
  description: string;
  cost: number;
  vehicleInfo: {
    brand: string;
    model: string;
    licensePlate: string;
  };
  status: "in_progress" | "completed" | "cancelled";
}