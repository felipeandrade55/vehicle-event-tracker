import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OccurrenceFormData } from "../types";

interface AssociateSelectorProps {
  form: UseFormReturn<OccurrenceFormData>;
}

interface Associate {
  id: string;
  name: string;
  isActive: boolean;
  contractId: string;
}

export function AssociateSelector({ form }: AssociateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [associates, setAssociates] = useState<Associate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Simulated data - replace with actual API call
  const fetchAssociates = (query: string) => {
    // This is a mock implementation. Replace with actual API call
    const mockAssociates: Associate[] = [
      { id: "1", name: "João Silva", isActive: true, contractId: "CONT-001" },
      { id: "2", name: "Maria Santos", isActive: true, contractId: "CONT-002" },
      { id: "3", name: "Pedro Alves", isActive: false, contractId: "CONT-003" },
    ];

    return mockAssociates.filter(
      (associate) =>
        associate.name.toLowerCase().includes(query.toLowerCase()) ||
        associate.contractId.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = () => {
    const results = fetchAssociates(searchQuery);
    setAssociates(results);
  };

  return (
    <FormField
      control={form.control}
      name="associateId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Associado</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Input
                placeholder="Buscar por nome ou número do contrato"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </FormControl>
            <Button type="button" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? associates.find((associate) => associate.id === field.value)
                        ?.name
                    : "Selecione um associado"}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Buscar associado..." />
                <CommandEmpty>Nenhum associado encontrado.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-72">
                    {associates.map((associate) => (
                      <CommandItem
                        key={associate.id}
                        disabled={!associate.isActive}
                        className={cn(
                          "flex items-center gap-2",
                          !associate.isActive && "line-through opacity-50"
                        )}
                        onSelect={() => {
                          if (associate.isActive) {
                            form.setValue("associateId", associate.id);
                            setOpen(false);
                          }
                        }}
                      >
                        {associate.name}
                        {field.value === associate.id && (
                          <Check className="h-4 w-4 ml-auto" />
                        )}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}