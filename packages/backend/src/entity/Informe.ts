import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { Paciente } from "./Paciente";
import { IInforme } from "shared/src/interfaces";

@Entity("informes")
export class Informe extends Base implements IInforme {
  @Column({ type: "date", nullable: false, default: () => "CURRENT_DATE" })
  fechaInforme: string;

  @Column({ type: "text", nullable: false })
  informe: string;

  @Column({ type: "text", nullable: true })
  observaciones: string;

  @ManyToOne(() => Paciente, (paciente: Paciente) => paciente.informes)
  @JoinColumn()
  paciente: Paciente;
}
