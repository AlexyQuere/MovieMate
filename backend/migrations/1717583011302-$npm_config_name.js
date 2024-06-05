import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1717583011302 {
    name = ' $npmConfigName1717583011302'

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
            CREATE TABLE "rating" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "Like" boolean NOT NULL,
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL
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
            CREATE TABLE "movie_genres_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_actors_actor" (
                "movieId" integer NOT NULL,
                "actorId" integer NOT NULL,
                PRIMARY KEY ("movieId", "actorId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "image" varchar NOT NULL,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "name", "image")
            SELECT "id",
                "name",
                "image"
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
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "image" varchar NOT NULL,
                "releasedate" datetime NOT NULL,
                "globalrating" integer,
                "synopsis" varchar NOT NULL,
                "directorId" integer,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "name", "image")
            SELECT "id",
                "name",
                "image"
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
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "image" varchar NOT NULL,
                "releasedate" datetime NOT NULL,
                "globalrating" integer,
                "synopsis" varchar NOT NULL,
                "directorId" integer,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "name",
                    "image",
                    "releasedate",
                    "globalrating",
                    "synopsis",
                    "directorId"
                )
            SELECT "id",
                "name",
                "image",
                "releasedate",
                "globalrating",
                "synopsis",
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
            CREATE TABLE "temporary_rating" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "Like" boolean NOT NULL,
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_1a3badf27affbca3a224f01f7de" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_rating"("id", "Like", "userId", "movieId")
            SELECT "id",
                "Like",
                "userId",
                "movieId"
            FROM "rating"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_rating"
                RENAME TO "rating"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "image" varchar NOT NULL,
                "releasedate" datetime NOT NULL,
                "globalrating" integer,
                "synopsis" varchar NOT NULL,
                "directorId" integer,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name"),
                CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "director" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "name",
                    "image",
                    "releasedate",
                    "globalrating",
                    "synopsis",
                    "directorId"
                )
            SELECT "id",
                "name",
                "image",
                "releasedate",
                "globalrating",
                "synopsis",
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
        await queryRunner.query(`
            DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_1996ce31a9e067304ab168d671"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_genres_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_genres_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "movie_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_genres_genre"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_genres_genre"
                RENAME TO "movie_genres_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_992f9af300d8c96c46fea4e541"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_65be8ded67af2677acfd19854c"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_actors_actor" (
                "movieId" integer NOT NULL,
                "actorId" integer NOT NULL,
                CONSTRAINT "FK_992f9af300d8c96c46fea4e5419" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_65be8ded67af2677acfd19854c2" FOREIGN KEY ("actorId") REFERENCES "actor" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("movieId", "actorId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_actors_actor"("movieId", "actorId")
            SELECT "movieId",
                "actorId"
            FROM "movie_actors_actor"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_actors_actor"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_actors_actor"
                RENAME TO "movie_actors_actor"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_65be8ded67af2677acfd19854c"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_992f9af300d8c96c46fea4e541"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_actors_actor"
                RENAME TO "temporary_movie_actors_actor"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_actors_actor" (
                "movieId" integer NOT NULL,
                "actorId" integer NOT NULL,
                PRIMARY KEY ("movieId", "actorId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_actors_actor"("movieId", "actorId")
            SELECT "movieId",
                "actorId"
            FROM "temporary_movie_actors_actor"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_actors_actor"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_1996ce31a9e067304ab168d671"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_genres_genre"
                RENAME TO "temporary_movie_genres_genre"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_genres_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_genres_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "temporary_movie_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_genres_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId")
        `);
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
                "image" varchar NOT NULL,
                "releasedate" datetime NOT NULL,
                "globalrating" integer,
                "synopsis" varchar NOT NULL,
                "directorId" integer,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "name",
                    "image",
                    "releasedate",
                    "globalrating",
                    "synopsis",
                    "directorId"
                )
            SELECT "id",
                "name",
                "image",
                "releasedate",
                "globalrating",
                "synopsis",
                "directorId"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
                RENAME TO "temporary_rating"
        `);
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "Like" boolean NOT NULL,
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "rating"("id", "Like", "userId", "movieId")
            SELECT "id",
                "Like",
                "userId",
                "movieId"
            FROM "temporary_rating"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "image" varchar NOT NULL,
                "releasedate" datetime NOT NULL,
                "globalrating" integer,
                "synopsis" varchar NOT NULL,
                "directorId" integer,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "name",
                    "image",
                    "releasedate",
                    "globalrating",
                    "synopsis",
                    "directorId"
                )
            SELECT "id",
                "name",
                "image",
                "releasedate",
                "globalrating",
                "synopsis",
                "directorId"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "image" varchar NOT NULL,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "name", "image")
            SELECT "id",
                "name",
                "image"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
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
                "genre" text NOT NULL,
                "rating" integer NOT NULL,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "name", "image")
            SELECT "id",
                "name",
                "image"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_65be8ded67af2677acfd19854c"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_992f9af300d8c96c46fea4e541"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_actors_actor"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_1996ce31a9e067304ab168d671"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_genres_genre"
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
            DROP TABLE "rating"
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
