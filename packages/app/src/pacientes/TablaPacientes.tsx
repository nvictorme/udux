import { DataTabTable } from "@/components/DataTable";
import { columns, Paciente } from "./columnas";

export function TablaPacientes({ pacientes }: { pacientes: Paciente[] }) {
  return <DataTabTable columns={columns} data={pacientes} />;
}
