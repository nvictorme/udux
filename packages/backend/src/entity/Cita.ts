import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { Paciente } from "./Paciente";
import { ICita } from "shared/dist/interfaces";
import { ESTATUS_CITA } from "shared/dist/enums";

@Entity("citas")
export class Cita extends Base implements ICita {
  @Column({ type: "date", nullable: false, default: () => "CURRENT_DATE" })
  fechaCita: string;

  @Column({ type: "text", length: 200, nullable: false })
  motivoConsulta: string;

  @Column({ type: "text", nullable: true })
  procedimiento: string;

  @Column({ type: "text", nullable: true })
  enfermedadActual: string;

  @Column({ type: "text", nullable: true })
  examenClinico: string;

  @Column({ type: "text", nullable: true })
  impresionDiagnostica: string;

  @Column({ type: "text", nullable: true })
  tratamiento: string;

  @Column({ type: "text", nullable: true })
  observaciones: string;

  @Column({ type: "int", nullable: true, default: 0 })
  honorarios: number;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
    default: ESTATUS_CITA.EN_ESPERA,
  })
  estatus: ESTATUS_CITA;

  @ManyToOne(() => Paciente, (paciente: Paciente) => paciente.citas)
  @JoinColumn()
  paciente: Paciente;
}
