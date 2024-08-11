import { DataTabTable } from "@/components/DataTable";
import { columns, Paciente } from "./columnas.pacientes";
import { usePacientesStore } from "@/store/pacientes.store";
import { useEffect } from "react";
import { DialogoPaciente } from "./DialogoPaciente";

export function TablaPacientes() {
  const { pacientes, listarPacientes, eliminarPaciente } = usePacientesStore();

  useEffect(() => {
    listarPacientes();
  }, [listarPacientes]);

  return (
    <div>
      <div
        style={{
          justifyContent: "flex-end",
          right: 0,
          display: "flex",
        }}
      >
        <DialogoPaciente />
      </div>
      <DataTabTable columns={columns} data={pacientes as Paciente[]} />
    </div>
  );
}
