import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixBlog1671924516337 implements MigrationInterface {
  name = 'fixBlog1671924516337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" RENAME COLUMN "decription" TO "description"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" RENAME COLUMN "description" TO "decription"`,
    );
  }
}
