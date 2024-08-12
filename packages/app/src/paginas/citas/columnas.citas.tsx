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
import { ESTATUS_CITA } from "shared/src/enums";
import { ICita } from "shared/src/interfaces";
import { formatDate } from "shared/src/helpers";
import { useNavigate } from "react-router-dom";

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
    accessorFn: (cita) => formatDate(cita.fechaCita),
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
                  ? "cyan"
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
      // const { eliminarCita } = useCitasStore();
      // const [open, setOpen] = useState(false);
      const navigate = useNavigate();
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-blue-700 text-blue-700"
            onClick={() => {
              navigate(`/consulta/${cita.id}`, {
                state: { cita },
              });
            }}
          >
            Consulta
          </Button>
        </div>
      );
    },
  },
];
