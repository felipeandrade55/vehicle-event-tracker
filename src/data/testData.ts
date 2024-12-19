import { Associate, Plan, Vehicle } from "@/types";

const createTestPlan = (
  type: "basic" | "intermediate" | "premium",
  price: number
): Plan => ({
  id: `plan-${type}`,
  name: `Plano ${type.charAt(0).toUpperCase() + type.slice(1)}`,
  description: `Plano ${type} com cobertura ${
    type === "premium" ? "completa" : "parcial"
  }`,
  coverage: [
    "Roubo",
    "Furto",
    "Colisão",
    ...(type === "premium" ? ["Incêndio", "Danos naturais"] : []),
  ],
  type,
  price,
  features: [
    "Assistência 24h",
    "Guincho até 100km",
    ...(type === "premium" ? ["Carro reserva", "Proteção para terceiros"] : []),
  ],
  assistanceDetails: [
    "Chaveiro",
    "Troca de pneu",
    ...(type === "premium" ? ["Hospedagem", "Táxi"] : []),
  ],
});

const createTestVehicle = (index: number): Vehicle => {
  const brands = ["Toyota", "Honda", "Volkswagen", "Fiat", "Chevrolet"];
  const models = ["Corolla", "Civic", "Golf", "Pulse", "Onix"];
  const colors = ["Preto", "Prata", "Branco", "Azul", "Vermelho"];
  const versions = ["LX", "EX", "XEi", "Premier", "GTI"];

  const brandIndex = index % brands.length;
  const year = 2020 + (index % 4);

  return {
    id: `VEH-${String(index + 1).padStart(3, "0")}`,
    brand: brands[brandIndex],
    model: models[brandIndex],
    year,
    licensePlate: `ABC${index + 1}D${year}`,
    chassisNumber: `9BR${String(index + 1).padStart(14, "0")}`,
    color: colors[index % colors.length],
    associateId: `ASS-${String(index + 1).padStart(3, "0")}`,
  };
};

const createTestAssociate = (index: number): Associate => {
  const plans = [
    createTestPlan("basic", 100),
    createTestPlan("intermediate", 150),
    createTestPlan("premium", 200),
  ];

  return {
    id: `ASS-${String(index + 1).padStart(3, "0")}`,
    name: `Associado Teste ${index + 1}`,
    email: `associado${index + 1}@teste.com`,
    cpf: String(Math.floor(10000000000 + Math.random() * 90000000000)),
    phone: `(11) 9${String(Math.floor(10000000 + Math.random() * 90000000))}`,
    role: "associate",
    plan: plans[index % plans.length],
    contractId: `CTR-${String(index + 1).padStart(3, "0")}`,
    address: {
      street: `Rua Teste ${index + 1}`,
      number: String(index + 100),
      neighborhood: `Bairro ${index + 1}`,
      city: `Cidade ${index + 1}`,
      state: "SP",
      zipCode: `${String(1000000 + index).padStart(8, "0")}`,
    },
    vehicles: [createTestVehicle(index)],
  };
};

export const testAssociates: Associate[] = Array.from({ length: 10 }, (_, i) =>
  createTestAssociate(i)
);

export const clearTestData = () => {
  localStorage.removeItem("associates");
  localStorage.removeItem("testDataActive");
};

export const loadTestData = () => {
  localStorage.setItem("associates", JSON.stringify(testAssociates));
  localStorage.setItem("testDataActive", "true");
};

export const isTestDataActive = () => {
  return localStorage.getItem("testDataActive") === "true";
};