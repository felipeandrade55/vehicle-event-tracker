import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OccurrenceForm } from "../OccurrenceForm";
import { OccurrenceFormData, OccurrenceType } from "../types";

interface EditOccurrenceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Partial<OccurrenceFormData>;
  onSuccess: () => void;
}

export function EditOccurrenceDialog({ 
  isOpen, 
  onOpenChange, 
  initialData, 
  onSuccess 
}: EditOccurrenceDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <OccurrenceForm
          initialData={initialData}
          onSuccess={() => {
            onOpenChange(false);
            onSuccess();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}