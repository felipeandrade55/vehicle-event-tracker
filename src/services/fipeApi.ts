const FIPE_BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

export interface FipeVehicle {
  codigo: string;
  nome: string;
  valor: string;
  marca: string;
  modelo: string;
  anoModelo: number;
  combustivel: string;
}

export const fetchBrands = async () => {
  const response = await fetch(`${FIPE_BASE_URL}/carros/marcas`);
  return response.json();
};

export const fetchModels = async (brandId: string) => {
  const response = await fetch(`${FIPE_BASE_URL}/carros/marcas/${brandId}/modelos`);
  return response.json();
};

export const fetchYears = async (brandId: string, modelId: string) => {
  const response = await fetch(`${FIPE_BASE_URL}/carros/marcas/${brandId}/modelos/${modelId}/anos`);
  return response.json();
};

export const fetchVehicleDetails = async (brandId: string, modelId: string, yearId: string): Promise<FipeVehicle> => {
  const response = await fetch(`${FIPE_BASE_URL}/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`);
  return response.json();
};