export type OccurrenceType = "collision" | "theft" | "robbery";

export type DriverType = "associate" | "third-party";

export interface OccurrenceFormData {
  // Associate information
  associateId: string;
  searchQuery?: string;

  // Event details
  type: OccurrenceType;
  date: string;
  description?: string;
  driver?: DriverType;

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