import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1723503340855 implements MigrationInterface {
    name = 'Init1723503340855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "informes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "fechaInforme" date NOT NULL DEFAULT (CURRENT_DATE), "informe" text NOT NULL, "observaciones" text, "pacienteId" integer)`);
        await queryRunner.query(`CREATE TABLE "antecedentes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "medicos" text, "quirurgicos" text, "habitos" text, "actividadFisica" text, "pacienteId" integer, CONSTRAINT "REL_1c7e293cef3530f6b0c64940e5" UNIQUE ("pacienteId"))`);
        await queryRunner.query(`CREATE TABLE "citas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "fechaCita" date NOT NULL DEFAULT (CURRENT_DATE), "motivoConsulta" text(200) NOT NULL, "procedimiento" text, "enfermedadActual" text, "examenClinico" text, "impresionDiagnostica" text, "tratamiento" text, "observaciones" text, "honorarios" integer DEFAULT (0), "estatus" varchar(20) NOT NULL DEFAULT ('En espera'), "pacienteId" integer)`);
        await queryRunner.query(`CREATE TABLE "pacientes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "nombre" varchar(50) NOT NULL, "genero" varchar(20) NOT NULL DEFAULT ('Masculino'), "cedula" varchar(20), "fechaNacimiento" date NOT NULL, "estadoCivil" varchar(20) NOT NULL DEFAULT ('Soltero'), "profesion" varchar(50), "procedencia" varchar(50), "direccion" varchar(100), "telefono" varchar(30), "email" varchar(100))`);
        await queryRunner.query(`CREATE TABLE "temporary_informes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "fechaInforme" date NOT NULL DEFAULT (CURRENT_DATE), "informe" text NOT NULL, "observaciones" text, "pacienteId" integer, CONSTRAINT "FK_d3bf0e7903acf828c32fe037b69" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_informes"("id", "fechaCreado", "fechaModificado", "fechaInforme", "informe", "observaciones", "pacienteId") SELECT "id", "fechaCreado", "fechaModificado", "fechaInforme", "informe", "observaciones", "pacienteId" FROM "informes"`);
        await queryRunner.query(`DROP TABLE "informes"`);
        await queryRunner.query(`ALTER TABLE "temporary_informes" RENAME TO "informes"`);
        await queryRunner.query(`CREATE TABLE "temporary_antecedentes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "medicos" text, "quirurgicos" text, "habitos" text, "actividadFisica" text, "pacienteId" integer, CONSTRAINT "REL_1c7e293cef3530f6b0c64940e5" UNIQUE ("pacienteId"), CONSTRAINT "FK_1c7e293cef3530f6b0c64940e58" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_antecedentes"("id", "fechaCreado", "fechaModificado", "medicos", "quirurgicos", "habitos", "actividadFisica", "pacienteId") SELECT "id", "fechaCreado", "fechaModificado", "medicos", "quirurgicos", "habitos", "actividadFisica", "pacienteId" FROM "antecedentes"`);
        await queryRunner.query(`DROP TABLE "antecedentes"`);
        await queryRunner.query(`ALTER TABLE "temporary_antecedentes" RENAME TO "antecedentes"`);
        await queryRunner.query(`CREATE TABLE "temporary_citas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "fechaCita" date NOT NULL DEFAULT (CURRENT_DATE), "motivoConsulta" text(200) NOT NULL, "procedimiento" text, "enfermedadActual" text, "examenClinico" text, "impresionDiagnostica" text, "tratamiento" text, "observaciones" text, "honorarios" integer DEFAULT (0), "estatus" varchar(20) NOT NULL DEFAULT ('En espera'), "pacienteId" integer, CONSTRAINT "FK_8fd4b119d549914f5bafe0cc189" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_citas"("id", "fechaCreado", "fechaModificado", "fechaCita", "motivoConsulta", "procedimiento", "enfermedadActual", "examenClinico", "impresionDiagnostica", "tratamiento", "observaciones", "honorarios", "estatus", "pacienteId") SELECT "id", "fechaCreado", "fechaModificado", "fechaCita", "motivoConsulta", "procedimiento", "enfermedadActual", "examenClinico", "impresionDiagnostica", "tratamiento", "observaciones", "honorarios", "estatus", "pacienteId" FROM "citas"`);
        await queryRunner.query(`DROP TABLE "citas"`);
        await queryRunner.query(`ALTER TABLE "temporary_citas" RENAME TO "citas"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "citas" RENAME TO "temporary_citas"`);
        await queryRunner.query(`CREATE TABLE "citas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "fechaCita" date NOT NULL DEFAULT (CURRENT_DATE), "motivoConsulta" text(200) NOT NULL, "procedimiento" text, "enfermedadActual" text, "examenClinico" text, "impresionDiagnostica" text, "tratamiento" text, "observaciones" text, "honorarios" integer DEFAULT (0), "estatus" varchar(20) NOT NULL DEFAULT ('En espera'), "pacienteId" integer)`);
        await queryRunner.query(`INSERT INTO "citas"("id", "fechaCreado", "fechaModificado", "fechaCita", "motivoConsulta", "procedimiento", "enfermedadActual", "examenClinico", "impresionDiagnostica", "tratamiento", "observaciones", "honorarios", "estatus", "pacienteId") SELECT "id", "fechaCreado", "fechaModificado", "fechaCita", "motivoConsulta", "procedimiento", "enfermedadActual", "examenClinico", "impresionDiagnostica", "tratamiento", "observaciones", "honorarios", "estatus", "pacienteId" FROM "temporary_citas"`);
        await queryRunner.query(`DROP TABLE "temporary_citas"`);
        await queryRunner.query(`ALTER TABLE "antecedentes" RENAME TO "temporary_antecedentes"`);
        await queryRunner.query(`CREATE TABLE "antecedentes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "medicos" text, "quirurgicos" text, "habitos" text, "actividadFisica" text, "pacienteId" integer, CONSTRAINT "REL_1c7e293cef3530f6b0c64940e5" UNIQUE ("pacienteId"))`);
        await queryRunner.query(`INSERT INTO "antecedentes"("id", "fechaCreado", "fechaModificado", "medicos", "quirurgicos", "habitos", "actividadFisica", "pacienteId") SELECT "id", "fechaCreado", "fechaModificado", "medicos", "quirurgicos", "habitos", "actividadFisica", "pacienteId" FROM "temporary_antecedentes"`);
        await queryRunner.query(`DROP TABLE "temporary_antecedentes"`);
        await queryRunner.query(`ALTER TABLE "informes" RENAME TO "temporary_informes"`);
        await queryRunner.query(`CREATE TABLE "informes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "fechaInforme" date NOT NULL DEFAULT (CURRENT_DATE), "informe" text NOT NULL, "observaciones" text, "pacienteId" integer)`);
        await queryRunner.query(`INSERT INTO "informes"("id", "fechaCreado", "fechaModificado", "fechaInforme", "informe", "observaciones", "pacienteId") SELECT "id", "fechaCreado", "fechaModificado", "fechaInforme", "informe", "observaciones", "pacienteId" FROM "temporary_informes"`);
        await queryRunner.query(`DROP TABLE "temporary_informes"`);
        await queryRunner.query(`DROP TABLE "pacientes"`);
        await queryRunner.query(`DROP TABLE "citas"`);
        await queryRunner.query(`DROP TABLE "antecedentes"`);
        await queryRunner.query(`DROP TABLE "informes"`);
    }

}
