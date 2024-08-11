import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormularioCita } from "./FormularioCita";
import { ICita, IPaciente } from "shared/src/interfaces";

interface DialogoCitaProps {
  accion: "Crear" | "Actualizar";
  cita: ICita;
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
          cita={cita}
          paciente={paciente}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
