import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormularioCita } from "./FormularioCita";

interface DialogoCitaProps {
  accion?: "Crear" | "Actualizar";
}

export function DialogoCita({ accion = "Crear" }: DialogoCitaProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{accion} Cita</Button>
      </DialogTrigger>
      <DialogContent className="max-lg">
        <DialogHeader>
          <DialogTitle>{accion} Cita</DialogTitle>
          <DialogDescription>
            Complete el formulario para {accion.toLowerCase()} la cita.
          </DialogDescription>
        </DialogHeader>
        <FormularioCita accion={accion} />
      </DialogContent>
    </Dialog>
  );
}
