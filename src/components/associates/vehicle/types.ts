export interface VehicleFormData {
  // Documentação do veículo
  licensePlate: string;
  chassisNumber: string;
  renavam: string;
  registrationDocument: string;

  // Dados do automóvel
  brand: string;
  model: string;
  manufacturingYear: string;
  modelYear: string;
  version?: string;
  specifications?: string;

  // Histórico
  hasPreviousAccidents: boolean;
  previousAccidentsDetails?: string;
  wasAuctioned: boolean;
  wasStolen: boolean;
  modifications?: string;

  // Propriedade
  ownershipType: "own" | "leasing" | "financing" | "authorized";
  ownershipDocument: string;

  // Vistoria
  inspectionPhotos: string;
  inspectionReport: string;
}

export interface VehicleContract {
  id: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "cancelled" | "expired";
  value: number;
  paymentMethod: string;
  documents: string[];
}