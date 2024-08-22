import { Entity, Column, BeforeInsert } from "typeorm";
import { Base } from "./Base";
import { IUsuario } from "shared/src/interfaces";
import { encryptPassword } from "../providers/encryption";

@Entity("usuarios")
export class Usuario extends Base implements IUsuario {
  @Column({ type: "varchar", length: 50, nullable: false })
  nombre: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  email: string;

  @BeforeInsert()
  hashPassword() {
    this.password = encryptPassword(this.password);
  }
  @Column()
  password: string;
}
