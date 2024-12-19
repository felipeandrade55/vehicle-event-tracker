export interface Occurrence {
  id: string;
  date: string;
  associate: string;
  vehicle: string;
  type: string;
  location: string;
  status: string;
}

export const mockOccurrences: Occurrence[] = [
  {
    id: "#2024-001",
    date: "2024-03-19 10:32",
    associate: "João da Silva",
    vehicle: "ABC-1234 (Fiesta)",
    type: "Colisão",
    location: "São Paulo - SP",
    status: "Em Análise",
  },
  {
    id: "#2024-002",
    date: "2024-03-19 09:15",
    associate: "Maria Oliveira",
    vehicle: "XYZ-5678 (Onix)",
    type: "Roubo/Furto",
    location: "Curitiba - PR",
    status: "Em Atendimento",
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