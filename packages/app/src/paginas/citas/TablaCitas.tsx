import { DataTabTable } from "@/components/DataTable";
import { columns, Cita } from "./columnas.citas";
import { useEffect } from "react";
import { useCitasStore } from "@/store/citas.store";

export function TablaCitas() {
  const { citas, listarCitas } = useCitasStore();

  useEffect(() => {
    listarCitas();
  }, [listarCitas]);

  return (
    <>
      <div>
        <DataTabTable columns={columns} data={citas as Cita[]} />
      </div>
    </>
  );
}
