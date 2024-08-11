import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormularioCita } from "./FormularioCita";
import { ICita, IPaciente } from "shared/src/interfaces";
import { useCallback } from "react";

interface DialogoCitaProps {
  accion: "Crear" | "Actualizar";
  cita?: ICita;
  paciente: IPaciente;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogoCita({
  accion,
  cita,
  paciente,
  open,
  onOpenChange,
}: DialogoCitaProps) {
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
      <DialogContent className="max-lg">
        <DialogHeader>
          <DialogTitle>{accion} Cita</DialogTitle>
          <DialogDescription>
            Complete el formulario para {accion.toLowerCase()} la cita.
          </DialogDescription>
        </DialogHeader>
        <FormularioCita
          accion={accion}
          cita={cita}
          paciente={paciente}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
