import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IBase } from "shared/dist/interfaces";

export abstract class Base implements IBase {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @CreateDateColumn()
  fechaCreado: string;

  @UpdateDateColumn()
  fechaModificado: string;
}
