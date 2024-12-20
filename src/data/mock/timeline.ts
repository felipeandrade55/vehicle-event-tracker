export const mockTimeline = [
  {
    date: "2024-03-19 10:32",
    action: "Acionamento registrado",
    agent: "Sistema",
    type: "general" as const
  },
  {
    date: "2024-03-19 10:35",
    action: "Equipe técnica notificada",
    agent: "Central de Atendimento",
    type: "team_assignment" as const
  },
  {
    date: "2024-03-19 10:40",
    action: "Documentação recebida: CNH",
    agent: "João da Silva",
    type: "document_upload" as const,
    details: {
      documentType: "driversLicense"
    }
  },
  {
    date: "2024-03-19 10:45",
    action: "Documentação recebida: CRLV",
    agent: "João da Silva",
    type: "document_upload" as const,
    details: {
      documentType: "vehicleRegistration"
    }
  },
  {
    date: "2024-03-19 11:00",
    action: "Fotos do veículo recebidas",
    agent: "João da Silva",
    type: "document_upload" as const,
    details: {
      documentType: "vehiclePhotos"
    }
  }
];