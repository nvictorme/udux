import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Base } from "./Base";
import {
  IAntecedentes,
  ICita,
  IInforme,
  IPaciente,
} from "shared/src/interfaces";
import { GENERO, ESTADO_CIVIL } from "shared/src/enums";
import { Informe } from "./Informe";
import { Antecedentes } from "./Antecedentes";
import { Cita } from "./Cita";

@Entity("pacientes")
export class Paciente extends Base implements IPaciente {
  @Column({ type: "varchar", length: 50, nullable: false })
  nombre: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
    default: GENERO.MASCULINO,
  })
  genero: GENERO;

  @BeforeInsert()
  @BeforeUpdate()
  sanitizeCedula() {
    if (this.cedula) {
      this.cedula = this.cedula.replace(/\D/g, "").trim();
    }
  }
  @Column({ type: "varchar", length: 20, nullable: true })
  cedula: string;

  @Column({ type: "date", nullable: false })
  fechaNacimiento: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
    default: ESTADO_CIVIL.SOLTERO,
  })
  estadoCivil: ESTADO_CIVIL;

  @Column({ type: "varchar", length: 50, nullable: true })
  profesion: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  procedencia: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  direccion: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  telefono: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  email: string;

  @OneToOne(() => Antecedentes, (antecedentes) => antecedentes.paciente, {
    cascade: true,
  })
  antecedentes: IAntecedentes;

  @OneToMany(() => Cita, (cita) => cita.paciente, { cascade: true })
  citas: ICita[];

  @OneToMany(() => Informe, (informe) => informe.paciente, { cascade: true })
  informes: IInforme[];
}
