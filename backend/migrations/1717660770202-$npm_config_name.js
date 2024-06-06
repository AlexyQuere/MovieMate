import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1717660770202 {
    name = ' $npmConfigName1717660770202'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "actor" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "director" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "UQ_dd8cd9e50dd049656e4be1f7e8c" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "releasedate" datetime NOT NULL,
                "image" varchar NOT NULL,
                "globalrating" integer,
                "synopsis" varchar NOT NULL,
                "isliked" boolean,
                "directorId" integer
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "actor_movies_movie" (
                "actorId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("actorId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_48fa78b2634b01bf58ad1686ef" ON "actor_movies_movie" ("actorId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_45708bd514560bac8a3a54470d" ON "actor_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE TABLE "genre_movies_movie" (
                "genreId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("genreId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dff457c114a6294863814818b0" ON "genre_movies_movie" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e59764a417d4f8291747b744fa" ON "genre_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "releasedate" datetime NOT NULL,
                "image" varchar NOT NULL,
                "globalrating" integer,
                "synopsis" varchar NOT NULL,
                "isliked" boolean,
                "directorId" integer,
                CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "director" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "name",
                    "releasedate",
                    "image",
                    "globalrating",
                    "synopsis",
                    "isliked",
                    "directorId"
                )
            SELECT "id",
                "name",
                "releasedate",
                "image",
                "globalrating",
                "synopsis",
                "isliked",
                "directorId"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_48fa78b2634b01bf58ad1686ef"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_45708bd514560bac8a3a54470d"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_actor_movies_movie" (
                "actorId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5" FOREIGN KEY ("actorId") REFERENCES "actor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_45708bd514560bac8a3a54470d5" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("actorId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_actor_movies_movie"("actorId", "movieId")
            SELECT "actorId",
                "movieId"
            FROM "actor_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "actor_movies_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_actor_movies_movie"
                RENAME TO "actor_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_48fa78b2634b01bf58ad1686ef" ON "actor_movies_movie" ("actorId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_45708bd514560bac8a3a54470d" ON "actor_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_dff457c114a6294863814818b0"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e59764a417d4f8291747b744fa"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_genre_movies_movie" (
                "genreId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_dff457c114a6294863814818b0f" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_e59764a417d4f8291747b744faa" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("genreId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_genre_movies_movie"("genreId", "movieId")
            SELECT "genreId",
                "movieId"
            FROM "genre_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "genre_movies_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_genre_movies_movie"
                RENAME TO "genre_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dff457c114a6294863814818b0" ON "genre_movies_movie" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e59764a417d4f8291747b744fa" ON "genre_movies_movie" ("movieId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_e59764a417d4f8291747b744fa"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_dff457c114a6294863814818b0"
        `);
        await queryRunner.query(`
            ALTER TABLE "genre_movies_movie"
                RENAME TO "temporary_genre_movies_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "genre_movies_movie" (
                "genreId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("genreId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "genre_movies_movie"("genreId", "movieId")
            SELECT "genreId",
                "movieId"
            FROM "temporary_genre_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_genre_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e59764a417d4f8291747b744fa" ON "genre_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dff457c114a6294863814818b0" ON "genre_movies_movie" ("genreId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_45708bd514560bac8a3a54470d"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_48fa78b2634b01bf58ad1686ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "actor_movies_movie"
                RENAME TO "temporary_actor_movies_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "actor_movies_movie" (
                "actorId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("actorId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "actor_movies_movie"("actorId", "movieId")
            SELECT "actorId",
                "movieId"
            FROM "temporary_actor_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_actor_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_45708bd514560bac8a3a54470d" ON "actor_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_48fa78b2634b01bf58ad1686ef" ON "actor_movies_movie" ("actorId")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "releasedate" datetime NOT NULL,
                "image" varchar NOT NULL,
                "globalrating" integer,
                "synopsis" varchar NOT NULL,
                "isliked" boolean,
                "directorId" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "name",
                    "releasedate",
                    "image",
                    "globalrating",
                    "synopsis",
                    "isliked",
                    "directorId"
                )
            SELECT "id",
                "name",
                "releasedate",
                "image",
                "globalrating",
                "synopsis",
                "isliked",
                "directorId"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e59764a417d4f8291747b744fa"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_dff457c114a6294863814818b0"
        `);
        await queryRunner.query(`
            DROP TABLE "genre_movies_movie"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_45708bd514560bac8a3a54470d"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_48fa78b2634b01bf58ad1686ef"
        `);
        await queryRunner.query(`
            DROP TABLE "actor_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
        await queryRunner.query(`
            DROP TABLE "director"
        `);
        await queryRunner.query(`
            DROP TABLE "actor"
        `);
    }
}
