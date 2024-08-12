import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { usePacientesStore } from "@/store/pacientes.store";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useState } from "react";

export function BuscarPaciente() {
  const [showReset, setShowReset] = useState(false);
  const { listarPacientes, setPage, resetPacientes } = usePacientesStore();
  const { register, handleSubmit, watch } = useForm<{
    nombre: string;
    apellido: string;
    cedula: string;
  }>();
  const onSubmit: SubmitHandler<{
    nombre: string;
    apellido: string;
    cedula: string;
  }> = (data) => {
    setPage(1);
    listarPacientes(data);
    setShowReset(true);
  };
  const onReset = useCallback(() => {
    resetPacientes();
    setShowReset(false);
  }, [resetPacientes]);
  const nombre = watch("nombre");
  const apellido = watch("apellido");
  const cedula = watch("cedula");
  const disabled = !nombre && !apellido && !cedula;
  return (
    <>
      {showReset ? (
        <Button type="button" variant="outline" onClick={onReset}>
          Limpiar búsqueda
        </Button>
      ) : null}
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline">
            Buscar paciente
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <Input placeholder="Nombre" {...register("nombre")} />
              <Input placeholder="Apellido" {...register("apellido")} />
              <Input placeholder="Cédula" {...register("cedula")} />
              <Button variant="secondary" type="submit" disabled={disabled}>
                Buscar
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
