export type OccurrenceType = "collision" | "theft" | "robbery";

export interface OccurrenceFormData {
  // Associate information
  associateId: string;
  searchQuery?: string;

  // Event details
  type: OccurrenceType;
  date: string;
  description?: string;

  // Vehicle information
  licensePlate: string;
  vehicleModel: string;
  vehicleBrand: string;

  // Documents
  documents: {
    driversLicense?: string; // CNH
    vehicleRegistration?: string; // CRLV
    eventReport?: string; // Comunicado de Evento
    policeReport?: string; // BO
    proofOfResidence?: string;
    vehiclePhotos?: string[];
    tirePhotos?: string[]; // Only for associates
  };
}

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  type: "file" | "multiple-files";
  acceptedFormats: string[];
}