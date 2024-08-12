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
    accessorKey: "apellido",
    header: "Apellido",
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
  },
  {
    accessorKey: "genero",
    header: "Género",
  },
  {
    accessorKey: "fechaNacimiento",
    header: "Edad",
    accessorFn: (paciente) => {
      const fechaNacimiento = new Date(paciente.fechaNacimiento);
      const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
      return edad;
    },
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
    id: "actions",
    cell: ({ row }) => {
      const [dialogoCitaOpen, setDialogoCitaOpen] = useState(false);
      const [dialogoPacienteOpen, setDialogoPacienteOpen] = useState(false);
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
              <DropdownMenuItem onClick={() => setDialogoCitaOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Cita
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Antecedentes</DropdownMenuItem>
              <DropdownMenuItem>Informes</DropdownMenuItem>
              <DropdownMenuItem>Citas</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDialogoPacienteOpen(true)}>
                <Edit className="mr-2 h-4 w-4" /> Actualizar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogoCita
            accion="Crear"
            paciente={paciente}
            open={dialogoCitaOpen}
            onOpenChange={setDialogoCitaOpen}
          />
          <DialogoPaciente
            accion="Actualizar"
            paciente={paciente}
            open={dialogoPacienteOpen}
            onOpenChange={setDialogoPacienteOpen}
          />
        </>
      );
    },
  },
];
