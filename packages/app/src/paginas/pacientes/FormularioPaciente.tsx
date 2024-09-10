/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IPaciente } from "shared/src/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GENERO, ESTADO_CIVIL } from "shared/src/enums";
import { Textarea } from "@/components/ui/textarea";
import { usePacientesStore } from "@/store/pacientes.store";

interface FormularioPacienteProps {
  accion: "Crear" | "Actualizar";
  paciente: IPaciente | null;
  onClose?: () => void;
}

export function FormularioPaciente({
  accion,
  paciente,
  onClose,
}: FormularioPacienteProps) {
  const { crearPaciente, actualizarPaciente } = usePacientesStore();
  const { register, handleSubmit, control } = useForm<IPaciente>({
    ...(paciente && { defaultValues: paciente }),
  });
  const onSubmit: SubmitHandler<IPaciente> = (data) => {
    if (accion === "Crear") {
      crearPaciente(data);
    } else {
      actualizarPaciente(data);
    }
    if (onClose) onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="nombre" className="text-right">
            Nombre
          </Label>
          <Input
            id="nombre"
            className="col-span-3"
            {...register("nombre", {
              required: true,
              maxLength: 100,
            })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="genero" className="text-right">
            Género
          </Label>
          <Controller
            control={control}
            name="genero"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(GENERO).map((genero) => (
                    <SelectItem key={genero} value={genero}>
                      {genero}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cedula" className="text-right">
            Cédula
          </Label>
          <Input
            id="cedula"
            className="col-span-3"
            {...register("cedula", { required: false, maxLength: 20 })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="fechaNacimiento" className="text-right">
            Fecha de Nacimiento
          </Label>
          <Input
            id="fechaNacimiento"
            type="date"
            className="col-span-3"
            {...register("fechaNacimiento", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="estadoCivil" className="text-right">
            Estado Civil
          </Label>
          <Controller
            control={control}
            name="estadoCivil"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ESTADO_CIVIL).map((ec) => (
                    <SelectItem key={ec} value={ec}>
                      {ec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="profesion" className="text-right">
            Profesión
          </Label>
          <Input
            id="profesion"
            className="col-span-3"
            {...register("profesion", { required: false, maxLength: 50 })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="procedencia" className="text-right">
            Procedencia
          </Label>
          <Input
            id="procedencia"
            className="col-span-3"
            {...register("procedencia", { required: false, maxLength: 50 })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="telefono" className="text-right">
            Teléfono
          </Label>
          <Input
            id="telefono"
            type="tel"
            className="col-span-3"
            {...register("telefono", { required: false, maxLength: 30 })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            className="col-span-3"
            {...register("email", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="direccion" className="text-right">
            Dirección
          </Label>
          <Textarea
            id="direccion"
            className="col-span-3"
            {...register("direccion", { required: false, maxLength: 100 })}
          />
        </div>
        <div className="flex flex-col justify-center gap-6 my-4">
          <Button type="submit">{accion} Paciente</Button>
          <Button
            type="button"
            variant="link"
            className="text-red-400"
            onClick={onClose}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
}
