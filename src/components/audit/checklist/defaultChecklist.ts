export const defaultChecklist = {
  documentsComplete: {
    label: "Documentação completa e legível",
    weight: 10,
    required: true,
  },
  vehiclePhotos: {
    label: "Fotos do veículo em conformidade",
    weight: 8,
    required: true,
  },
  policeReport: {
    label: "Boletim de Ocorrência presente e válido",
    weight: 10,
    required: true,
  },
  driverLicense: {
    label: "CNH do condutor válida",
    weight: 8,
    required: true,
  },
  vehicleRegistration: {
    label: "CRLV do veículo em dia",
    weight: 8,
    required: true,
  },
  contractActive: {
    label: "Contrato ativo e regular",
    weight: 10,
    required: true,
  },
  paymentStatus: {
    label: "Pagamentos em dia",
    weight: 10,
    required: true,
  },
  eventDescription: {
    label: "Descrição do evento consistente",
    weight: 8,
    required: true,
  },
  witnessStatements: {
    label: "Declarações de testemunhas",
    weight: 6,
    required: false,
  },
  technicalReport: {
    label: "Laudo técnico anexado",
    weight: 8,
    required: true,
  },
} as const;