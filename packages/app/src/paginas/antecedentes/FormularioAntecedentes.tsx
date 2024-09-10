import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAntecedentesStore } from "@/store/antecedentes.store";
import { usePacientesStore } from "@/store/pacientes.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAntecedentes, IPaciente } from "shared/src/interfaces";

interface FormularioAntecedentesProps {
  accion: "Crear" | "Actualizar";
  paciente: IPaciente | null;
  antecedentes: IAntecedentes | null;
  onClose?: () => void;
}

export function FormularioAntecedentes({
  accion,
  paciente,
  antecedentes,
  onClose,
}: FormularioAntecedentesProps) {
  const { crearAntecedente } = useAntecedentesStore();
  const { actualizarPaciente } = usePacientesStore();
  const { register, handleSubmit } = useForm<IAntecedentes>({
    ...(antecedentes && { defaultValues: antecedentes }),
  });
  const onSubmit: SubmitHandler<IAntecedentes> = (data) => {
    if (!paciente) return;
    if (accion === "Crear") {
      crearAntecedente({ ...data, paciente });
    } else {
      actualizarPaciente({ ...paciente, antecedentes: data });
    }
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="medicos" className="text-right">
            Médicos
          </Label>
          <Textarea
            id="medicos"
            className="col-span-3 text-xl"
            defaultValue={antecedentes?.medicos}
            {...register("medicos", { required: false })}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quirurgicos" className="text-right">
            Quirúrgicos
          </Label>
          <Textarea
            id="quirurgicos"
            className="col-span-3 text-xl"
            defaultValue={antecedentes?.quirurgicos}
            {...register("quirurgicos", { required: false })}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="habitos" className="text-right">
            Hábitos
          </Label>
          <Textarea
            id="habitos"
            className="col-span-3 text-xl"
            defaultValue={antecedentes?.habitos}
            {...register("habitos", { required: false })}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="actividadFisica" className="text-right">
            Actividad Física
          </Label>
          <Textarea
            id="actividadFisica"
            className="col-span-3 text-xl"
            defaultValue={antecedentes?.actividadFisica}
            {...register("actividadFisica", { required: false })}
          />
        </div>

        <div className="flex flex-col justify-center gap-6 my-4">
          <Button type="submit">{accion} Antecedentes</Button>
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
