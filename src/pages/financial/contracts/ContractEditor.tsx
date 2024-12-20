import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const contractTemplates = {
  services: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

CONTRATANTE: [Nome do Contratante], pessoa jurídica de direito privado, inscrita no CNPJ sob nº [número], com sede em [endereço].

CONTRATADA: [Nome da Contratada], pessoa jurídica de direito privado, inscrita no CNPJ sob nº [número], com sede em [endereço].

CLÁUSULA PRIMEIRA - DO OBJETO
O presente contrato tem por objeto a prestação de serviços de [descrição dos serviços].

CLÁUSULA SEGUNDA - DO VALOR
Pelo serviço prestado, a CONTRATANTE pagará à CONTRATADA o valor de R$ [valor] ([valor por extenso]).

CLÁUSULA TERCEIRA - DA VIGÊNCIA
O presente contrato terá vigência de [período], iniciando-se em [data inicial] e terminando em [data final].

[Local e Data]

_______________________
CONTRATANTE

_______________________
CONTRATADA`,
  
  rental: `CONTRATO DE LOCAÇÃO

LOCADOR: [Nome do Locador], pessoa jurídica de direito privado, inscrita no CNPJ sob nº [número].

LOCATÁRIO: [Nome do Locatário], pessoa jurídica de direito privado, inscrita no CNPJ sob nº [número].

CLÁUSULA PRIMEIRA - DO OBJETO
O LOCADOR dá em locação ao LOCATÁRIO o imóvel situado em [endereço completo].

CLÁUSULA SEGUNDA - DO VALOR
O valor mensal do aluguel é de R$ [valor] ([valor por extenso]).

CLÁUSULA TERCEIRA - DO PRAZO
A presente locação terá o prazo de [período], iniciando-se em [data inicial] e terminando em [data final].

[Local e Data]

_______________________
LOCADOR

_______________________
LOCATÁRIO`,
};

const ContractEditor = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [contractType, setContractType] = useState("services");
  const [contractText, setContractText] = useState(contractTemplates.services);

  const handleTemplateChange = (type: keyof typeof contractTemplates) => {
    setContractType(type);
    setContractText(contractTemplates[type]);
  };

  const handleSave = () => {
    toast({
      title: "Contrato salvo",
      description: "O contrato foi salvo com sucesso!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Editor de Contratos</h1>
          <p className="text-sm text-gray-500">
            Edite ou crie novos contratos a partir de modelos
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => handleTemplateChange("services")}>
            Modelo de Serviços
          </Button>
          <Button variant="outline" onClick={() => handleTemplateChange("rental")}>
            Modelo de Locação
          </Button>
          <Button onClick={handleSave}>Salvar Contrato</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Contrato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Contrato</Label>
              <Input id="title" placeholder="Digite o título do contrato" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo do Contrato</Label>
              <Input id="type" placeholder="Digite o tipo do contrato" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Término</Label>
              <Input id="endDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Valor</Label>
              <Input id="value" type="number" placeholder="0,00" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo do Contrato</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            className="min-h-[500px] font-mono"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractEditor;