import { DataTabTable } from "@/components/DataTable";
import { columns, Cita } from "./columnas.citas";
import { useEffect } from "react";
import { useCitasStore } from "@/store/citas.store";

export function TablaCitas() {
  const { citas, listarCitas, page, pageCount, setPage } = useCitasStore();

  useEffect(() => {
    listarCitas();
  }, [listarCitas]);

  return (
    <>
      <div>
        <DataTabTable
          columns={columns}
          data={citas as Cita[]}
          page={page}
          pageCount={pageCount}
          setPage={setPage}
        />
      </div>
    </>
  );
}
