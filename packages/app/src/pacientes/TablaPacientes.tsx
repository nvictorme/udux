import { DataTabTable } from "@/components/DataTable";
import { columns, Paciente } from "./columnas";
import { usePacientesStore } from "@/store/pacientes.store";
import { useCallback, useEffect } from "react";
import { IPaciente } from "shared/src/interfaces";
import { Button } from "@/components/ui/button";
import { ESTADO_CIVIL, GENERO } from "shared/src/enums";

export function TablaPacientes() {
  const { pacientes, listarPacientes, crearPaciente, eliminarPaciente } =
    usePacientesStore();

  useEffect(() => {
    listarPacientes();
  }, [listarPacientes]);

  const insertPaciente = useCallback(
    (paciente: Partial<IPaciente>) => {
      crearPaciente(paciente as IPaciente);
    },
    [crearPaciente]
  );

  return (
    <div>
      <div
        style={{
          justifyContent: "flex-end",
          right: 0,
          display: "flex",
        }}
      >
        <Button
          onClick={() =>
            insertPaciente({
              nombre: "Victor",
              apellido: "Hugo",
              genero: GENERO.MASCULINO,
              cedula: "V-17066986",
              fechaNacimiento: "1984-05-11",
              estadoCivil: ESTADO_CIVIL.CASADO,
              profesion: "Ingeniero",
              procedencia: "Naguanagua",
              direccion: "",
              telefono: "",
              email: "nvictor@pm.me",
            })
          }
        >
          insertar paciente
        </Button>
      </div>
      <DataTabTable columns={columns} data={pacientes as Paciente[]} />
    </div>
  );
}
