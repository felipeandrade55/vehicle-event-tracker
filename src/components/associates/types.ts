export interface AssociateFormData {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  planId: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

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