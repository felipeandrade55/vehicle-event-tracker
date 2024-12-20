import { FileImage } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

export function DocumentHeader() {
  return (
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <FileImage className="h-5 w-5" />
        Documentação
      </CardTitle>
    </CardHeader>
  );
}