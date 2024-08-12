import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormularioPaciente } from "./FormularioPaciente";
import { IPaciente } from "shared/src/interfaces";
import { useCallback } from "react";

interface DialogoPacienteProps {
  accion: "Crear" | "Actualizar";
  paciente?: IPaciente;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogoPaciente({
  accion,
  paciente,
  open,
  onOpenChange,
}: DialogoPacienteProps) {
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
          <DialogTitle>{accion} Paciente</DialogTitle>
          <DialogDescription>
            Complete el formulario para {accion.toLowerCase()} el paciente.
          </DialogDescription>
        </DialogHeader>
        <FormularioPaciente
          accion={accion}
          paciente={paciente}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
