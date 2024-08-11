import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormularioPaciente } from "./FormularioPaciente";

interface DialogoPacienteProps {
  accion?: "Crear" | "Actualizar";
}

export function DialogoPaciente({ accion = "Crear" }: DialogoPacienteProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{accion} Paciente</Button>
      </DialogTrigger>
      <DialogContent className="max-lg">
        <DialogHeader>
          <DialogTitle>{accion} Paciente</DialogTitle>
          <DialogDescription>
            Complete el formulario para {accion.toLowerCase()} el paciente.
          </DialogDescription>
        </DialogHeader>
        <FormularioPaciente accion={accion} />
      </DialogContent>
    </Dialog>
  );
}
