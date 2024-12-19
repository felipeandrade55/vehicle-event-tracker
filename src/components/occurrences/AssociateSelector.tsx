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
    // Simulated search - in a real app, this would call an API
    console.log("Searching for associate with query:", searchQuery);
    // Mock data for demonstration
    const mockAssociate: Associate = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      cpf: "123.456.789-00",
      phone: "(11) 99999-9999",
      role: "associate",
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}