import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordHash1724363714468 implements MigrationInterface {
    name = 'PasswordHash1724363714468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "nombre" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(50) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_usuarios"("id", "fechaCreado", "fechaModificado", "nombre", "email", "password") SELECT "id", "fechaCreado", "fechaModificado", "nombre", "email", "password" FROM "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuarios" RENAME TO "usuarios"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "nombre" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_20c859a7dd79567cadb034173c1" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_usuarios"("id", "fechaCreado", "fechaModificado", "nombre", "email", "password") SELECT "id", "fechaCreado", "fechaModificado", "nombre", "email", "password" FROM "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuarios" RENAME TO "usuarios"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME TO "temporary_usuarios"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "nombre" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(50) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "usuarios"("id", "fechaCreado", "fechaModificado", "nombre", "email", "password") SELECT "id", "fechaCreado", "fechaModificado", "nombre", "email", "password" FROM "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "temporary_usuarios"`);
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME TO "temporary_usuarios"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fechaCreado" datetime NOT NULL DEFAULT (datetime('now')), "fechaModificado" datetime NOT NULL DEFAULT (datetime('now')), "nombre" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(50) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "usuarios"("id", "fechaCreado", "fechaModificado", "nombre", "email", "password") SELECT "id", "fechaCreado", "fechaModificado", "nombre", "email", "password" FROM "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "temporary_usuarios"`);
    }

}
