import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1613122798443 implements MigrationInterface {
  name = 'SeedDb1613122798443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.black_list ("tokenValue") VALUES ('testValue');`,
    );

    //password1=123456
    //password2=1234567
    //password3=12345678
    await queryRunner.query(
      `INSERT INTO public."user"(
	name, email, "passwordHash", "confirmationCode", "isConfirmed", "createdAt")
	VALUES 
  ('lismgmk','lismgmk@mail.com', '$2b$10$003Lg9ezbu3CigyAhfgC..kjJ9/Dr5EHjz5JQ7gUT9nyCsKIdlKl6', '2022-12-09 13:34:30.646', 'true', now()),
  ('lismgmk1','lismgmk@mail.com', '$2y$10$834wgtZZL4X.Xjz3OwOUe.btSVFnl9QBGfJXLfClHmCff5wEXAHVS', '2022-12-09 13:34:30.646', 'true', now()),
  ('lismgmk2','lismgmk@mail.com', '$2y$10$QTBcugNIOmZIOIojEC5pIOoQRXu937iNR2z2QocyMcFCeNBK7pPqm', '2022-12-09 13:34:30.646', 'true', now());
	`,
    );

    await queryRunner.query(
      `INSERT INTO public.blog(
	name, "websiteUrl", decription)
	VALUES 
  ('incub', 'https://cama.com', 'stuff'),	
  ('short', 'https://ulb.com', 'simple speed'),	
  ('general', 'https://codep.com', 'best practice'),	
  ('tima', 'https://howrprogr.com', 'algoritms');	
  `,
    );

    //   await queryRunner.query(`
    //     INSERT INTO public.post(
    // "shortDescription", "content", "title", "blogId")
    // VALUES
    // ('some post INCUB_1', 'maaany latters and digits 1', 'awesome post 1', '2a6c4853-5dcd-4b13-ac35-9350ea5bedc7'),
    // ('some post INCUB_2', 'maaany latters and digits 2', 'awesome post 2', '2a6c4853-5dcd-4b13-ac35-9350ea5bedc7'),
    // ('some post INCUB_3', 'maaany latters and digits 3', 'awesome post 3', '2a6c4853-5dcd-4b13-ac35-9350ea5bedc7'),
    // ('some post INCUB_4', 'maaany latters and digits 4', 'awesome post 4', '2a6c4853-5dcd-4b13-ac35-9350ea5bedc7'),

    // ('some post ULB_1', 'maaany latters and digits 1', 'awesome post 1', '3d5c3828-da12-41ce-b54a-002b4f620795'),
    // ('some post ULB_2', 'maaany latters and digits 2', 'awesome post 2', '3d5c3828-da12-41ce-b54a-002b4f620795'),
    // ('some post ULB_3', 'maaany latters and digits 3', 'awesome post 3', '3d5c3828-da12-41ce-b54a-002b4f620795'),
    // ('some post ULB_4', 'maaany latters and digits 4', 'awesome post 4', '3d5c3828-da12-41ce-b54a-002b4f620795'),

    // ('some post TIMA_1', 'maaany latters and digits 1', 'awesome post 1', 'f9b514a7-5cd3-48c6-b173-efeeab6dd72c'),
    // ('some post TIMA_2', 'maaany latters and digits 2', 'awesome post 2', 'f9b514a7-5cd3-48c6-b173-efeeab6dd72c'),
    // ('some post TIMA_3', 'maaany latters and digits 3', 'awesome post 3', 'f9b514a7-5cd3-48c6-b173-efeeab6dd72c'),
    // ('some post TIMA_4', 'maaany latters and digits 4', 'awesome post 4', 'f9b514a7-5cd3-48c6-b173-efeeab6dd72c');
    // `);
  }

  public async down(): Promise<void> {}
}
