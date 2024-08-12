import { DataTable } from "@/components/DataTable";
import { columns, Paciente } from "./columnas.pacientes";
import { usePacientesStore } from "@/store/pacientes.store";
import { useEffect, useState } from "react";
import { DialogoPaciente } from "./DialogoPaciente";
import { Button } from "@/components/ui/button";
import { BuscarPaciente } from "./BuscarPaciente";
import { PlusCircle } from "lucide-react";

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
          <PlusCircle className="mr-2 h-4 w-4" /> Crear
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
