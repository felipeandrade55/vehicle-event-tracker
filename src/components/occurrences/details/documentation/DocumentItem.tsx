import { File, FileImage, Download, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DocumentItemProps {
  type: string;
  url: string;
  label: string;
  description: string;
  index?: number;
  isArray?: boolean;
  onView: (url: string) => void;
  onDownload: (url: string, filename: string) => void;
  onDelete: (type: string, index?: number) => void;
}

export function DocumentItem({
  type,
  url,
  label,
  description,
  index,
  isArray,
  onView,
  onDownload,
  onDelete,
}: DocumentItemProps) {
  const getFileIcon = (type: string) => {
    if (type.includes('Photos')) {
      return <FileImage className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {getFileIcon(type)}
        <div>
          <h4 className="font-medium">{label}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {isArray && (
          <Badge variant="secondary" className="ml-auto">
            {index !== undefined ? `Arquivo ${index + 1}` : ''}
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-secondary/20 transition-colors">
        <span className="text-sm flex items-center gap-2">
          {getFileIcon(type)}
          {label} {index !== undefined ? index + 1 : ''}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(url)}
            className="hover:bg-secondary"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload(url, `${label}-${index || 1}.pdf`)}
            className="hover:bg-secondary"
          >
            <Download className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar remoção</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja remover este documento? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(type, index)}>
                  Remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}