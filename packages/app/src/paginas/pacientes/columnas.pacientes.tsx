/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { IPaciente } from "shared/src/interfaces";
import { MoreHorizontal, PlusCircle, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogoCita } from "../citas/DialogoCita";
import { useState } from "react";
import { DialogoPaciente } from "./DialogoPaciente";
import { calcularEdad } from "shared/src/helpers";
import { DialogoAntecedentes } from "../antecedentes/DialogoAntecedentes";

// This type is used to define the shape of our data.
export type Paciente = Omit<
  IPaciente,
  | "direccion"
  | "telefono"
  | "email"
  | "antecedentes"
  | "citas"
  | "informes"
  | "fechaCreado"
  | "fechaModificado"
>;

export const columns: ColumnDef<Paciente>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "genero",
    header: "Género",
  },
  {
    accessorKey: "fechaNacimiento",
    header: "Edad",
    accessorFn: (paciente) => calcularEdad(paciente.fechaNacimiento),
  },
  {
    accessorKey: "estadoCivil",
    header: "Estado civil",
  },
  {
    accessorKey: "profesion",
    header: "Profesión",
  },
  {
    accessorKey: "procedencia",
    header: "Procedencia",
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [openCita, setOpenCita] = useState(false);
      const [openPaciente, setOpenPaciente] = useState(false);
      const [openAntecedentes, setOpenAntecedentes] = useState(false);
      const paciente = row.original as IPaciente;
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpenCita(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Cita
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenAntecedentes(true)}>
                Antecedentes
              </DropdownMenuItem>
              <DropdownMenuItem disabled>Informes</DropdownMenuItem>
              <DropdownMenuItem disabled>Citas</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenPaciente(true)}>
                <Edit className="mr-2 h-4 w-4" /> Actualizar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogoCita
            accion="Crear"
            paciente={paciente}
            open={openCita}
            onOpenChange={setOpenCita}
          />
          <DialogoPaciente
            accion="Actualizar"
            paciente={paciente}
            open={openPaciente}
            onOpenChange={setOpenPaciente}
          />
          <DialogoAntecedentes
            accion={!paciente.antecedentes ? "Crear" : "Actualizar"}
            paciente={paciente}
            antecedentes={paciente.antecedentes}
            open={openAntecedentes}
            onOpenChange={setOpenAntecedentes}
          />
        </>
      );
    },
  },
];
