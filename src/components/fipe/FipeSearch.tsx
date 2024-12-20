import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { fetchBrands, fetchModels, fetchYears, fetchVehicleDetails } from "@/services/fipeApi";

export function FipeSearch() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { data: brands = [], isLoading: isLoadingBrands } = useQuery({
    queryKey: ["fipe", "brands"],
    queryFn: fetchBrands,
  });

  const { data: modelsData, isLoading: isLoadingModels } = useQuery({
    queryKey: ["fipe", "models", selectedBrand],
    queryFn: () => fetchModels(selectedBrand),
    enabled: !!selectedBrand,
  });

  const { data: years = [], isLoading: isLoadingYears } = useQuery({
    queryKey: ["fipe", "years", selectedBrand, selectedModel],
    queryFn: () => fetchYears(selectedBrand, selectedModel),
    enabled: !!selectedBrand && !!selectedModel,
  });

  const { data: vehicleDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["fipe", "details", selectedBrand, selectedModel, selectedYear],
    queryFn: () => fetchVehicleDetails(selectedBrand, selectedModel, selectedYear),
    enabled: !!selectedBrand && !!selectedModel && !!selectedYear,
  });

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedModel("");
    setSelectedYear("");
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setSelectedYear("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consulta Tabela FIPE</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedBrand} onValueChange={handleBrandChange}>
            <SelectTrigger>
              {isLoadingBrands ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SelectValue placeholder="Selecione a marca" />
              )}
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand: any) => (
                <SelectItem key={brand.codigo} value={brand.codigo}>
                  {brand.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedModel}
            onValueChange={handleModelChange}
            disabled={!selectedBrand || isLoadingModels}
          >
            <SelectTrigger>
              {isLoadingModels ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SelectValue placeholder="Selecione o modelo" />
              )}
            </SelectTrigger>
            <SelectContent>
              {modelsData?.modelos?.map((model: any) => (
                <SelectItem key={model.codigo} value={model.codigo}>
                  {model.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
            disabled={!selectedModel || isLoadingYears}
          >
            <SelectTrigger>
              {isLoadingYears ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SelectValue placeholder="Selecione o ano" />
              )}
            </SelectTrigger>
            <SelectContent>
              {years.map((year: any) => (
                <SelectItem key={year.codigo} value={year.codigo}>
                  {year.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoadingDetails ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : vehicleDetails && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Detalhes do Veículo</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Marca/Modelo</p>
                <p className="font-medium">{vehicleDetails.marca} {vehicleDetails.modelo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ano</p>
                <p className="font-medium">{vehicleDetails.anoModelo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valor</p>
                <p className="font-medium text-green-600">{vehicleDetails.valor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Combustível</p>
                <p className="font-medium">{vehicleDetails.combustivel}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}