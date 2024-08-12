import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { Paciente } from "./Paciente";
import { IAntecedentes, IPaciente } from "shared/src/interfaces";

@Entity("antecedentes")
export class Antecedentes extends Base implements IAntecedentes {
  @Column({ type: "text", nullable: true })
  medicos: string;

  @Column({ type: "text", nullable: true })
  quirurgicos: string;

  @Column({ type: "text", nullable: true })
  habitos: string;

  @Column({ type: "text", nullable: true })
  actividadFisica: string;

  @OneToOne(() => Paciente, (paciente: Paciente) => paciente.antecedentes)
  @JoinColumn()
  paciente: IPaciente;
}
