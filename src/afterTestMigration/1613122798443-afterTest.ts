import { MigrationInterface, QueryRunner } from 'typeorm';

export class AfterTest1613122798443 implements MigrationInterface {
  name = 'AfterTest1613122798443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      	SELECT
  pg_terminate_backend(pg_stat_activity.pid)
FROM
  pg_stat_activity
WHERE
  pg_stat_activity.datname = 'opwfsbkv'
AND pid <> pg_backend_pid();
`,
    );
  }

  public async down(): Promise<void> {}
}
