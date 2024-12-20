import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands, fetchModels, fetchYears, fetchVehicleDetails, FipeVehicle } from "@/services/fipeApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FipeSearch() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState<FipeVehicle | null>(null);

  const { data: brands } = useQuery({
    queryKey: ["fipe", "brands"],
    queryFn: fetchBrands,
  });

  const { data: models } = useQuery({
    queryKey: ["fipe", "models", selectedBrand],
    queryFn: () => fetchModels(selectedBrand),
    enabled: !!selectedBrand,
  });

  const { data: years } = useQuery({
    queryKey: ["fipe", "years", selectedBrand, selectedModel],
    queryFn: () => fetchYears(selectedBrand, selectedModel),
    enabled: !!selectedBrand && !!selectedModel,
  });

  const handleSearch = async () => {
    if (selectedBrand && selectedModel && selectedYear) {
      const details = await fetchVehicleDetails(selectedBrand, selectedModel, selectedYear);
      setVehicleDetails(details);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consulta Tabela FIPE</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a marca" />
            </SelectTrigger>
            <SelectContent>
              {brands?.map((brand: { codigo: string; nome: string }) => (
                <SelectItem key={brand.codigo} value={brand.codigo}>
                  {brand.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedModel}
            onValueChange={setSelectedModel}
            disabled={!selectedBrand}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o modelo" />
            </SelectTrigger>
            <SelectContent>
              {models?.modelos?.map((model: { codigo: string; nome: string }) => (
                <SelectItem key={model.codigo} value={model.codigo}>
                  {model.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
            disabled={!selectedModel}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {years?.map((year: { codigo: string; nome: string }) => (
                <SelectItem key={year.codigo} value={year.codigo}>
                  {year.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSearch} disabled={!selectedYear}>
          Consultar
        </Button>

        {vehicleDetails && (
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-semibold">{vehicleDetails.marca} {vehicleDetails.modelo}</h3>
            <p>Ano: {vehicleDetails.anoModelo}</p>
            <p>Valor: {vehicleDetails.valor}</p>
            <p>Combustível: {vehicleDetails.combustivel}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}