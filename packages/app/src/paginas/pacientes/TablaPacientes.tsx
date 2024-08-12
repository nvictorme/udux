import { DataTable } from "@/components/DataTable";
import { columns, Paciente } from "./columnas.pacientes";
import { usePacientesStore } from "@/store/pacientes.store";
import { useEffect, useState } from "react";
import { DialogoPaciente } from "./DialogoPaciente";
import { Button } from "@/components/ui/button";
import { BuscarPaciente } from "./BuscarPaciente";

export function TablaPacientes() {
  const { pacientes, listarPacientes, page, pageCount, setPage } =
    usePacientesStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    listarPacientes({});
  }, [listarPacientes]);

  return (
    <>
      <div
        style={{
          justifyContent: "flex-end",
          right: 0,
          display: "flex",
          gap: "1rem",
        }}
      >
        <BuscarPaciente />
        <Button variant="default" onClick={() => setOpen(true)}>
          + Paciente
        </Button>
        <DialogoPaciente accion="Crear" open={open} onOpenChange={setOpen} />
      </div>
      <DataTable
        columns={columns}
        data={pacientes as Paciente[]}
        page={page}
        pageCount={pageCount}
        setPage={setPage}
      />
    </>
  );
}
