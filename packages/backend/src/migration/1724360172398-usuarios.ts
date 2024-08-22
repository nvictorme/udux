import { MigrationInterface, QueryRunner } from "typeorm";

export class Usuarios1724360172398 implements MigrationInterface {
    name = 'Usuarios1724360172398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "nombre" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(50) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
