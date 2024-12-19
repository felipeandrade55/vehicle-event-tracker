import { UseFormReturn } from "react-hook-form";
import { OccurrenceFormData } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Associate } from "@/types";

interface AssociateSelectorProps {
  form: UseFormReturn<OccurrenceFormData>;
}

export function AssociateSelector({ form }: AssociateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssociate, setSelectedAssociate] = useState<Associate | null>(null);

  const handleSearch = () => {
    const testAssociates = localStorage.getItem('testAssociates');
    if (testAssociates) {
      const associates = JSON.parse(testAssociates);
      const foundAssociate = associates.find((associate: Associate) => 
        associate.cpf.includes(searchQuery) ||
        associate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        associate.contractId.includes(searchQuery) ||
        associate.vehicles.some(vehicle => vehicle.licensePlate.includes(searchQuery.toUpperCase()))
      );

      if (foundAssociate) {
        setSelectedAssociate(foundAssociate);
        form.setValue("associateId", foundAssociate.id);
      } else {
        setSelectedAssociate(null);
        form.setValue("associateId", "");
      }
    } else {
      // Fallback to mock data for demonstration
      const mockAssociate: Associate = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        cpf: "123.456.789-00",
        phone: "(11) 99999-9999",
        role: "associate",
        planId: "plan-basic",
        contractId: "CONT-001",
        plan: {
          id: "basic",
          name: "Plano Básico",
          description: "Cobertura básica",
          coverage: [],
          type: "basic",
          price: 100,
          features: [],
          assistanceDetails: [],
        },
        address: {
          street: "Rua Example",
          number: "123",
          neighborhood: "Centro",
          city: "São Paulo",
          state: "SP",
          zipCode: "01001-000",
        },
        vehicles: [],
      };
      setSelectedAssociate(mockAssociate);
      form.setValue("associateId", mockAssociate.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buscar Associado</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input 
                    placeholder="Digite a placa, CPF, nome ou ID do contrato" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </FormControl>
                <Button type="button" onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {selectedAssociate && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Associado Selecionado</h3>
              <p>Nome: {selectedAssociate.name}</p>
              <p>CPF: {selectedAssociate.cpf}</p>
              <p>Contrato: {selectedAssociate.contractId}</p>
              {selectedAssociate.vehicles && selectedAssociate.vehicles.length > 0 && (
                <div>
                  <p className="font-semibold mt-4">Veículos:</p>
                  {selectedAssociate.vehicles.map((vehicle, index) => (
                    <div key={index} className="ml-4">
                      <p>Placa: {vehicle.licensePlate}</p>
                      <p>{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}