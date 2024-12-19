import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OccurrenceFilters } from "@/components/occurrences/OccurrenceFilters";

interface OccurrenceListFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  handleClearFilters: () => void;
}

export function OccurrenceListFilters({
  searchQuery,
  setSearchQuery,
  date,
  setDate,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  handleClearFilters,
}: OccurrenceListFiltersProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">Filtros e Pesquisa</CardTitle>
      </CardHeader>
      <CardContent>
        <OccurrenceFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          date={date}
          setDate={setDate}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          handleClearFilters={handleClearFilters}
        />
      </CardContent>
    </Card>
  );
}