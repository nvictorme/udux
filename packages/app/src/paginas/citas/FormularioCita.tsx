/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ICita, IPaciente } from "shared/src/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ESTATUS_CITA } from "shared/src/enums";
import { Textarea } from "@/components/ui/textarea";
import { useCitasStore } from "@/store/citas.store";

interface FormularioCitaProps {
  accion: "Crear" | "Actualizar";
  paciente: IPaciente;
  cita?: ICita;
  onClose?: () => void;
}

export function FormularioCita({
  accion,
  paciente,
  cita,
  onClose,
}: FormularioCitaProps) {
  const { crearCita, actualizarCita } = useCitasStore();
  const { register, handleSubmit, control } = useForm<ICita>({
    ...(cita && { defaultValues: cita }),
  });
  const onSubmit: SubmitHandler<ICita> = (data) => {
    if (accion === "Crear") {
      crearCita({ ...data, paciente });
    } else {
      actualizarCita(data);
    }
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="fechaCita" className="text-right">
            Fecha de la Cita
          </Label>
          <Input
            id="fechaCita"
            type="date"
            className="col-span-3"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("fechaCita", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="motivoConsulta" className="text-right">
            Motivo de la Consulta
          </Label>
          <Textarea
            id="motivoConsulta"
            className="col-span-3"
            {...register("motivoConsulta", { required: true, maxLength: 200 })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="procedimiento" className="text-right">
            Procedimiento
          </Label>
          <Textarea
            id="procedimiento"
            className="col-span-3"
            {...register("procedimiento", { required: false })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="enfermedadActual" className="text-right">
            Enfermedad Actual
          </Label>
          <Textarea
            id="enfermedadActual"
            className="col-span-3"
            {...register("enfermedadActual", { required: false })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="examenClinico" className="text-right">
            Examen Clínico
          </Label>
          <Textarea
            id="examenClinico"
            className="col-span-3"
            {...register("examenClinico", { required: false })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="impresionDiagnostica" className="text-right">
            Impresión Diagnóstica
          </Label>
          <Textarea
            id="impresionDiagnostica"
            className="col-span-3"
            {...register("impresionDiagnostica", { required: false })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="tratamiento" className="text-right">
            Tratamiento
          </Label>
          <Textarea
            id="tratamiento"
            className="col-span-3"
            {...register("tratamiento", { required: false })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="observaciones" className="text-right">
            Observaciones
          </Label>
          <Textarea
            id="observaciones"
            className="col-span-3"
            {...register("observaciones", { required: false })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="honorarios" className="text-right">
            Honorarios
          </Label>
          <Input
            id="honorarios"
            type="number"
            className="col-span-3"
            {...register("honorarios", { required: false })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="estatus" className="text-right">
            Estatus
          </Label>
          <Controller
            control={control}
            name="estatus"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={ESTATUS_CITA.EN_ESPERA}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ESTATUS_CITA).map((ec) => (
                    <SelectItem key={ec} value={ec}>
                      {ec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="self-center m-auto">
          <Button type="button" variant="link" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{accion} Cita</Button>
        </div>
      </div>
    </form>
  );
}
