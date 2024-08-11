import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormularioCita } from "./FormularioCita";
import { IPaciente } from "shared/src/interfaces";

interface DialogoCitaProps {
  accion: "Crear" | "Actualizar";
  paciente: IPaciente;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogoCita({
  accion,
  paciente,
  open,
  onOpenChange,
}: DialogoCitaProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-lg">
        <DialogHeader>
          <DialogTitle>{accion} Cita</DialogTitle>
          <DialogDescription>
            Complete el formulario para {accion.toLowerCase()} la cita.
          </DialogDescription>
        </DialogHeader>
        <FormularioCita
          accion={accion}
          paciente={paciente}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
