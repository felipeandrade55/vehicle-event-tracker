import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function AuditChecklist() {
  const [checklist, setChecklist] = useState({
    documentsComplete: false,
    vehiclePhotos: false,
    policeReport: false,
    driverLicense: false,
    vehicleRegistration: false,
    contractActive: false,
    paymentStatus: false,
    eventDescription: false,
    witnessStatements: false,
    technicalReport: false,
  });

  const handleCheckboxChange = (key: keyof typeof checklist) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Checkbox
          id="documentsComplete"
          checked={checklist.documentsComplete}
          onCheckedChange={() => handleCheckboxChange("documentsComplete")}
        />
        <Label htmlFor="documentsComplete" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Documentação completa e legível
        </Label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="vehiclePhotos"
          checked={checklist.vehiclePhotos}
          onCheckedChange={() => handleCheckboxChange("vehiclePhotos")}
        />
        <Label htmlFor="vehiclePhotos" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Fotos do veículo em conformidade
        </Label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="policeReport"
          checked={checklist.policeReport}
          onCheckedChange={() => handleCheckboxChange("policeReport")}
        />
        <Label htmlFor="policeReport" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Boletim de Ocorrência presente e válido
        </Label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="driverLicense"
          checked={checklist.driverLicense}
          onCheckedChange={() => handleCheckboxChange("driverLicense")}
        />
        <Label htmlFor="driverLicense" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          CNH do condutor válida
        </Label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="vehicleRegistration"
          checked={checklist.vehicleRegistration}
          onCheckedChange={() => handleCheckboxChange("vehicleRegistration")}
        />
        <Label htmlFor="vehicleRegistration" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          CRLV do veículo em dia
        </Label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="contractActive"
          checked={checklist.contractActive}
          onCheckedChange={() => handleCheckboxChange("contractActive")}
        />
        <Label htmlFor="contractActive" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Contrato ativo e regular
        </Label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="paymentStatus"
          checked={checklist.paymentStatus}
          onCheckedChange={() => handleCheckboxChange("paymentStatus")}
        />
        <Label htmlFor="paymentStatus" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Pagamentos em dia
        </Label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="eventDescription"
          checked={checklist.eventDescription}
          onCheckedChange={() => handleCheckboxChange("eventDescription")}
        />
        <Label htmlFor="eventDescription" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Descrição do evento consistente
        </Label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="witnessStatements"
          checked={checklist.witnessStatements}
          onCheckedChange={() => handleCheckboxChange("witnessStatements")}
        />
        <Label htmlFor="witnessStatements" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Declarações de testemunhas (se aplicável)
        </Label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="technicalReport"
          checked={checklist.technicalReport}
          onCheckedChange={() => handleCheckboxChange("technicalReport")}
        />
        <Label htmlFor="technicalReport" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Laudo técnico anexado
        </Label>
      </div>
    </div>
  );
}