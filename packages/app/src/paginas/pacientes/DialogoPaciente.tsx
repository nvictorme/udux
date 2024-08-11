import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormularioPaciente } from "./FormularioPaciente";
import { IPaciente } from "shared/src/interfaces";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-lg">
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
