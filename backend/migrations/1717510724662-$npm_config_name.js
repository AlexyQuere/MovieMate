import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1717510724662 {
    name = ' $npmConfigName1717510724662'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "date" datetime NOT NULL,
                "image" varchar NOT NULL,
                "genre" text NOT NULL,
                "rating" integer NOT NULL,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "name", "date", "image", "genre", "rating")
            SELECT "id",
                "name",
                "date",
                "image",
                "genre",
                "rating"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "date" datetime NOT NULL,
                "image" varchar NOT NULL,
                "genre" varchar NOT NULL,
                "rating" integer NOT NULL,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "name", "date", "image", "genre", "rating")
            SELECT "id",
                "name",
                "date",
                "image",
                "genre",
                "rating"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
