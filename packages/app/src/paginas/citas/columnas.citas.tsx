/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCitasStore } from "@/store/citas.store";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { ESTATUS_CITA } from "shared/src/enums";
import { ICita } from "shared/src/interfaces";
import { DialogoCita } from "./DialogoCita";

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
    cell: ({ row }) => {
      const cita = row.original as ICita;
      const estatus = cita.estatus as ESTATUS_CITA;
      const { actualizarCita } = useCitasStore();
      return (
        <Select
          defaultValue={estatus}
          onValueChange={(value) => {
            cita.estatus = value as ESTATUS_CITA;
            actualizarCita(cita);
          }}
        >
          <SelectTrigger
            className="w-32"
            style={{
              backgroundColor:
                estatus === ESTATUS_CITA.EN_ESPERA
                  ? "yellow"
                  : estatus === ESTATUS_CITA.EN_CONSULTA
                  ? "pink"
                  : estatus === ESTATUS_CITA.CANCELADA
                  ? "lightgray"
                  : estatus === ESTATUS_CITA.PAGADA
                  ? "lightgreen"
                  : "white",
            }}
          >
            <SelectValue>{estatus}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.values(ESTATUS_CITA).map((ec) => (
              <SelectItem key={ec} value={ec}>
                {ec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const cita = row.original as ICita;
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Actualizar
          </Button>
          <DialogoCita
            accion="Actualizar"
            cita={cita}
            paciente={cita.paciente}
            open={open}
            onOpenChange={setOpen}
          />
        </>
      );
    },
  },
];
