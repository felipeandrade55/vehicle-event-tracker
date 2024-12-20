export type OccurrenceType = "collision" | "theft" | "robbery";

export type DriverType = "associate" | "third-party";

export type ContactMethod = "Telefone" | "WhatsApp" | "Site" | "APP";

export type TeamMemberRole = 
  | "technical_analyst"
  | "legal_analyst"
  | "financial_analyst"
  | "field_inspector"
  | "customer_service"
  | "manager";

export interface TeamMember {
  id: string;
  name: string;
  role: TeamMemberRole;
  contact?: string;
  assignedAt: string;
  assignedTo: string[];
  status: "active" | "inactive";
}

export interface TeamAssignment {
  memberId: string;
  processStep: string;
  assignedAt: string;
  assignedBy: string;
}

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

export interface OccurrenceDetailsProps {
  occurrence: {
    id: string;
    date: string;
    associate: string;
    vehicle: string;
    type: string;
    location: string;
    status: string;
    contactMethod?: "Telefone" | "WhatsApp" | "App" | "Site";
    contractNumber?: string;
    phone?: string;
    address?: string;
    vehicleDetails?: {
      brand: string;
      model: string;
      plate: string;
      color: string;
      chassis?: string;
      trackerStatus?: "connected" | "offline";
    };
    description?: string;
    timeline?: Array<{
      date: string;
      action: string;
      agent?: string;
      type?: "team_assignment" | "status_change" | "document_upload" | "general";
      details?: {
        role?: TeamMemberRole;
        previousStatus?: string;
        newStatus?: string;
        documentType?: string;
      };
    }>;
    team?: TeamMember[];
    systemActions?: Array<{
      user: string;
      action: string;
      date: string;
    }>;
    documents?: {
      driversLicense?: string;
      vehicleRegistration?: string;
      eventReport?: string;
      policeReport?: string;
      proofOfResidence?: string;
      vehiclePhotos?: string[];
      tirePhotos?: string[];
    };
  };
}
