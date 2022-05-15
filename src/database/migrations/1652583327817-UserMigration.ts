import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1652583327817 implements MigrationInterface {
  name = 'UserMigration1652583327817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "github_username" character varying NOT NULL, "email" character varying NOT NULL, "avatar_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
