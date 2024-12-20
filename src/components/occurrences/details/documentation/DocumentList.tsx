import { ScrollArea } from "@/components/ui/scroll-area";
import { DocumentItem } from "./DocumentItem";
import { CardContent } from "@/components/ui/card";

interface DocumentListProps {
  documents: {
    driversLicense?: string;
    vehicleRegistration?: string;
    eventReport?: string;
    policeReport?: string;
    proofOfResidence?: string;
    vehiclePhotos?: string[];
    tirePhotos?: string[];
  };
  documentLabels: {
    [key: string]: {
      label: string;
      description: string;
    };
  };
  onView: (url: string) => void;
  onDownload: (url: string, filename: string) => void;
  onDelete: (type: string, index?: number) => void;
}

export function DocumentList({
  documents,
  documentLabels,
  onView,
  onDownload,
  onDelete,
}: DocumentListProps) {
  return (
    <CardContent>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {Object.entries(documents).map(([type, value]) => {
            if (!value) return null;

            if (Array.isArray(value)) {
              return value.map((url, index) => (
                <DocumentItem
                  key={`${type}-${index}`}
                  type={type}
                  url={url}
                  label={documentLabels[type].label}
                  description={documentLabels[type].description}
                  index={index}
                  isArray={true}
                  onView={onView}
                  onDownload={onDownload}
                  onDelete={onDelete}
                />
              ));
            }

            return (
              <DocumentItem
                key={type}
                type={type}
                url={value}
                label={documentLabels[type].label}
                description={documentLabels[type].description}
                onView={onView}
                onDownload={onDownload}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      </ScrollArea>
    </CardContent>
  );
}