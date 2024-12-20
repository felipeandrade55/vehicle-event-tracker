export interface Occurrence {
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
  }>;
  team?: Array<{
    id: string;
    name: string;
    role: string;
    contact?: string;
    assignedAt: string;
    assignedTo: string[];
    status: "active" | "inactive";
  }>;
  systemActions?: Array<{
    user: string;
    action: string;
    date: string;
  }>;
}

export const mockOccurrences: Occurrence[] = [
  {
    id: "#2024-001",
    date: "2024-03-19 10:32",
    associate: "João da Silva",
    vehicle: "Fiesta",
    type: "Colisão",
    location: "Av. Paulista, 1000 - São Paulo, SP",
    status: "Em Análise",
    contactMethod: "Telefone",
    contractNumber: "CTR-2024-001",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - São Paulo, SP",
    vehicleDetails: {
      brand: "Ford",
      model: "Fiesta",
      plate: "ABC-1234",
      color: "Prata",
      chassis: "9BWZZZ377VT004251",
      trackerStatus: "connected"
    },
    description: "Colisão traseira em semáforo. Danos materiais apenas.",
    timeline: [
      {
        date: "2024-03-19 10:32",
        action: "Acionamento registrado",
        agent: "Sistema"
      },
      {
        date: "2024-03-19 10:35",
        action: "Equipe técnica notificada",
        agent: "Central de Atendimento"
      },
      {
        date: "2024-03-19 10:40",
        action: "Equipe a caminho do local",
        agent: "José Santos"
      }
    ],
    team: [
      {
        id: "1",
        name: "José Santos",
        role: "technical_analyst",
        contact: "(11) 97777-8888",
        assignedAt: "2024-03-19 10:32",
        assignedTo: ["Registro do evento", "Documentação"],
        status: "active"
      },
      {
        id: "2",
        name: "Maria Oliveira",
        role: "customer_service",
        contact: "(11) 96666-7777",
        assignedAt: "2024-03-19 10:32",
        assignedTo: ["Registro do evento"],
        status: "active"
      }
    ],
    systemActions: [
      {
        user: "Sistema",
        action: "Registro inicial do acionamento",
        date: "2024-03-19 10:32"
      }
    ]
  },
  {
    id: "#2024-002",
    date: "2024-03-19 09:15",
    associate: "Maria Oliveira",
    vehicle: "XYZ-5678 (Onix)",
    type: "Roubo/Furto",
    location: "Curitiba - PR",
    status: "Em Atendimento",
    contactMethod: "WhatsApp",
  },
  {
    id: "#2024-003",
    date: "2024-03-18 14:50",
    associate: "Carlos Pereira",
    vehicle: "AAA-9999 (Corsa)",
    type: "Pane Mecânica",
    location: "Belo Horizonte - MG",
    status: "Concluído",
  },
  {
    id: "#2024-004",
    date: "2024-03-17 08:20",
    associate: "Ana Santos",
    vehicle: "DEF-4321 (HB20)",
    type: "Incêndio",
    location: "Rio de Janeiro - RJ",
    status: "Aguardando Documentação",
  },
  {
    id: "#2024-005",
    date: "2024-03-16 16:45",
    associate: "Pedro Almeida",
    vehicle: "GHI-7890 (Civic)",
    type: "Colisão",
    location: "Salvador - BA",
    status: "Em Análise",
  },
  {
    id: "#2024-006",
    date: "2024-03-15 11:30",
    associate: "Lucia Ferreira",
    vehicle: "JKL-2468 (Creta)",
    type: "Roubo/Furto",
    location: "Fortaleza - CE",
    status: "Em Atendimento",
  },
  {
    id: "#2024-007",
    date: "2024-03-14 13:25",
    associate: "Roberto Costa",
    vehicle: "MNO-1357 (Compass)",
    type: "Pane Mecânica",
    location: "Recife - PE",
    status: "Concluído",
  },
  {
    id: "#2024-008",
    date: "2024-03-13 09:40",
    associate: "Fernanda Lima",
    vehicle: "PQR-9876 (T-Cross)",
    type: "Colisão",
    location: "Brasília - DF",
    status: "Em Análise",
  },
  {
    id: "#2024-009",
    date: "2024-03-12 15:10",
    associate: "Ricardo Santos",
    vehicle: "STU-5432 (Tracker)",
    type: "Roubo/Furto",
    location: "Porto Alegre - RS",
    status: "Cancelado",
  },
  {
    id: "#2024-010",
    date: "2024-03-11 17:55",
    associate: "Camila Souza",
    vehicle: "VWX-1598 (Kicks)",
    type: "Incêndio",
    location: "Manaus - AM",
    status: "Concluído",
  },
];

export const occurrenceTypes = [
  "Colisão",
  "Roubo/Furto",
  "Pane Mecânica",
  "Incêndio",
];

export const occurrenceStatus = [
  "Em Análise",
  "Em Atendimento",
  "Concluído",
  "Cancelado",
  "Aguardando Documentação",
];
