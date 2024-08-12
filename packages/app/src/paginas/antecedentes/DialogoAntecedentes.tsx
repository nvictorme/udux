import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormularioAntecedentes } from "./FormularioAntecedentes";
import { IAntecedentes, IPaciente } from "shared/src/interfaces";
import { useCallback } from "react";

interface DialogoAntecedentesProps {
  accion: "Crear" | "Actualizar";
  paciente: IPaciente;
  antecedentes: IAntecedentes | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogoAntecedentes({
  accion,
  paciente,
  antecedentes,
  open,
  onOpenChange,
}: DialogoAntecedentesProps) {
  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      // Prevent closing the dialog when clicking the overlay (backdrop)
      if (!isOpen) {
        onOpenChange(true);
      }
    },
    [onOpenChange]
  );
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-lg scrollable-content">
        <DialogHeader>
          <DialogTitle>{accion} Antecedentes</DialogTitle>
          <DialogDescription>
            Complete el formulario para {accion.toLowerCase()} antecedentes.
          </DialogDescription>
        </DialogHeader>
        <FormularioAntecedentes
          accion={accion}
          paciente={paciente}
          antecedentes={antecedentes}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
