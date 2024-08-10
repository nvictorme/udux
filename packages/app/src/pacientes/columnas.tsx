import { ColumnDef } from "@tanstack/react-table";
import { IPaciente } from "shared/src/interfaces";

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
];
