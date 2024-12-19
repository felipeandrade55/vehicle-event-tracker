export type OccurrenceType = "collision" | "theft" | "robbery";

export type DriverType = "associate" | "third-party";

export type ContactMethod = "Telefone" | "WhatsApp" | "Site" | "APP";

export interface OccurrenceFormData {
  // Associate information
  associateId: string;
  searchQuery?: string;

  // Event details
  type: OccurrenceType;
  date: string;
  description?: string;
  driver?: DriverType;
  contactMethod?: ContactMethod;

  // Vehicle information
  licensePlate: string;
  vehicleModel: string;
  vehicleBrand: string;

  // Documents
  documents: {
    driversLicense?: string;
    vehicleRegistration?: string;
    eventReport?: string;
    policeReport?: string;
    proofOfResidence?: string;
    vehiclePhotos?: string[];
    tirePhotos?: string[];
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
