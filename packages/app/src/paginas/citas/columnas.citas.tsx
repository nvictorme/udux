import { ColumnDef } from "@tanstack/react-table";
import { ICita } from "shared/src/interfaces";

// This type is used to define the shape of our data.
export type Cita = Omit<
  ICita,
  | "motivoConsulta"
  | "procedimiento"
  | "enfermedadActual"
  | "examenClinico"
  | "fechaCreado"
  | "fechaModificado"
>;

export const columns: ColumnDef<Cita>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fechaCita",
    header: "Fecha Cita",
    accessorFn: (cita) => new Date(cita.fechaCita).toLocaleDateString(),
  },
  {
    accessorKey: "paciente",
    header: "Paciente",
    accessorFn: (cita) => `${cita.paciente?.nombre} ${cita.paciente?.apellido}`,
  },
  {
    accessorKey: "motivoConsulta",
    header: "Motivo de la consulta",
  },
  {
    accessorKey: "estatus",
    header: "Estatus",
  },
];
