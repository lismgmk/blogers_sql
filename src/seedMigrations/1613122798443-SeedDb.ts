import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1613122798443 implements MigrationInterface {
  name = 'SeedDb1613122798443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.black_list ("tokenValue") VALUES ('testValue');`,
    );

    //password=123456
    await queryRunner.query(
      `INSERT INTO public."user"(
	name, email, "passwordHash", "confirmationCode", "isConfirmed", "createdAt")
	VALUES ('lismgmk','lismgmk@mail.com', '$2b$10$003Lg9ezbu3CigyAhfgC..kjJ9/Dr5EHjz5JQ7gUT9nyCsKIdlKl6', '2022-12-09 13:34:30.646', 'true', now());
	`,
    );

    await queryRunner.query(
      `INSERT INTO public."blog"(
	name, email, "passwordHash", "confirmationCode", "isConfirmed", "createdAt")
	VALUES ('lismgmk','lismgmk@mail.com', '$2b$10$003Lg9ezbu3CigyAhfgC..kjJ9/Dr5EHjz5JQ7gUT9nyCsKIdlKl6', '2022-12-09 13:34:30.646', 'true', now());
	`,
    );
  }

  public async down(): Promise<void> {}
}
