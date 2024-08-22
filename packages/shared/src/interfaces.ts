import { ESTADO_CIVIL, GENERO, ESTATUS_CITA } from "./enums";

export interface IBase {
  id: number;
  fechaCreado: string;
  fechaModificado: string;
}

export interface IUsuario extends IBase {
  nombre: string;
  email: string;
  password: string;
}

export interface IPaciente extends IBase {
  nombre: string;
  genero: GENERO;
  cedula: string;
  fechaNacimiento: string;
  estadoCivil: ESTADO_CIVIL;
  profesion: string;
  procedencia: string;
  direccion: string;
  telefono: string;
  email: string;
  antecedentes: IAntecedentes;
  citas: ICita[];
  informes: IInforme[];
}

export interface IAntecedentes extends IBase {
  paciente: IPaciente;
  medicos: string;
  quirurgicos: string;
  habitos: string;
  actividadFisica: string;
}

export interface ICita extends IBase {
  paciente: IPaciente;
  fechaCita: string;
  estatus: ESTATUS_CITA;
  motivoConsulta: string;
  procedimiento: string;
  enfermedadActual: string;
  examenClinico: string;
  impresionDiagnostica: string;
  tratamiento: string;
  observaciones: string;
  honorarios: number;
}

export interface IInforme extends IBase {
  paciente: IPaciente;
  fechaInforme: string;
  informe: string;
  observaciones: string;
}
