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
	id, name, email, "passwordHash", "confirmationCode", "isConfirmed", "createdAt")
	VALUES 
  ('2ebe083d-374c-4564-90d8-9ade26b79e94', 'lismgmk','lismgmk@mail.com', '$2b$10$003Lg9ezbu3CigyAhfgC..kjJ9/Dr5EHjz5JQ7gUT9nyCsKIdlKl6', '2022-12-09 13:34:30.646', 'true', now()),
  ('2ebe083d-374c-4564-90d8-9ade26b79e99', 'unknown','lismgmk@mail.com', '$2b$10$003Lg9ezbu3CigyAhfgC..kjJ9/Dr5EHjz5JQ7gUT9nyCsKIdlKl6', '2022-12-09 13:34:30.646', 'true', now()),
  ('5a0a001a-5f82-4710-98d6-d2213d24c0a3', 'lismgmk1','lismgmk@mail.com', '$2y$10$834wgtZZL4X.Xjz3OwOUe.btSVFnl9QBGfJXLfClHmCff5wEXAHVS', '2022-12-09 13:34:30.646', 'true', now()),
  ('78fa6ee5-1b35-4c67-8ccc-697b036f2f57', 'lismgmk2','lismgmk@mail.com', '$2y$10$QTBcugNIOmZIOIojEC5pIOoQRXu937iNR2z2QocyMcFCeNBK7pPqm', '2022-12-09 13:34:30.646', 'true', now());
	`,
    );

    await queryRunner.query(
      `INSERT INTO public.blog(
	id, name, "websiteUrl", decription)
	VALUES 
  ('2a6c4853-5dcd-4b13-ac35-9350ea5bedc7', 'incub', 'https://cama.com', 'stuff'),	
  ('3d5c3828-da12-41ce-b54a-002b4f620795', 'short', 'https://ulb.com', 'simple speed'),	
  ('f9b514a7-5cd3-48c6-b173-efeeab6dd72c', 'general', 'https://codep.com', 'best practice'),	
  ('f9b514a7-5cd3-48c6-b173-efeeab6dd70c', 'tima', 'https://howrprogr.com', 'algoritms');	
  `,
    );

    await queryRunner.query(`
        INSERT INTO public.post(
   "id", "shortDescription", "content", "title", "blogId")
    VALUES
    ('b2fd9a53-6ece-4cca-af6b-84ba56de59b8','some post INCUB_1', 'maaany latters and digits 1', 'awesome post 1', '2a6c4853-5dcd-4b13-ac35-9350ea5bedc7'),
    ( 'd8d8e993-6f8a-43eb-b663-8f970eab160d','some post INCUB_2', 'maaany latters and digits 2', 'awesome post 2', '2a6c4853-5dcd-4b13-ac35-9350ea5bedc7'),
    ( '17abd51b-6741-4ed9-b927-ff526c578c0e','some post INCUB_3', 'maaany latters and digits 3', 'awesome post 3', '2a6c4853-5dcd-4b13-ac35-9350ea5bedc7'),
    ( '86bf9e80-6f43-4b51-89c7-af729fb05907','some post INCUB_4', 'maaany latters and digits 4', 'awesome post 4', '2a6c4853-5dcd-4b13-ac35-9350ea5bedc7'),
    
    ( 'f729c5ee-ebbd-4acb-b003-b18890dba283','some post ULB_1', 'maaany latters and digits 1', 'awesome post 1', '3d5c3828-da12-41ce-b54a-002b4f620795'),
    ( '183cd2f6-f891-40f6-9129-0af52a77f89a','some post ULB_2', 'maaany latters and digits 2', 'awesome post 2', '3d5c3828-da12-41ce-b54a-002b4f620795'),
    ( '60b5bddf-cef2-4fba-84d0-87b78d1d1288','some post ULB_3', 'maaany latters and digits 3', 'awesome post 3', '3d5c3828-da12-41ce-b54a-002b4f620795'),
    ( 'bb9d92d5-dcb4-4a86-b583-a66ee545c3bb','some post ULB_4', 'maaany latters and digits 4', 'awesome post 4', '3d5c3828-da12-41ce-b54a-002b4f620795'),
    
    ( 'e88e147a-eecb-42bf-8109-8f0f78770c02','some post GENERAL_1', 'maaany latters and digits 1', 'awesome post 1', 'f9b514a7-5cd3-48c6-b173-efeeab6dd72c'),
    ( 'c0153169-c63f-4912-926e-9df79ac5b733','some post GENERAL_2', 'maaany latters and digits 2', 'awesome post 2', 'f9b514a7-5cd3-48c6-b173-efeeab6dd72c'),
    ( 'a1e88603-cc8f-4196-9c00-086721353367','some post GENERAL_3', 'maaany latters and digits 3', 'awesome post 3', 'f9b514a7-5cd3-48c6-b173-efeeab6dd72c'),
    ( 'b885f3c3-bead-4e2b-97ca-f25d9745778a','some post GENERAL_4', 'maaany latters and digits 4', 'awesome post 4', 'f9b514a7-5cd3-48c6-b173-efeeab6dd72c'),
    
    ( '2ba0bf5f-d37c-4148-a208-8d03f3d48f50','some post TIMA_1', 'maaany latters and digits 1', 'awesome post 1', 'f9b514a7-5cd3-48c6-b173-efeeab6dd70c'),
    ( '8cb454d6-eb5b-40ff-83b2-8925751a37c8','some post TIMA_2', 'maaany latters and digits 2', 'awesome post 2', 'f9b514a7-5cd3-48c6-b173-efeeab6dd70c'),
    ( '8d57be9e-85b8-456a-974f-243811af2342','some post TIMA_3', 'maaany latters and digits 3', 'awesome post 3', 'f9b514a7-5cd3-48c6-b173-efeeab6dd70c'),
    ( 'a403761d-4d4c-4c22-a0c9-d7f183ab52e6','some post TIMA_4', 'maaany latters and digits 4', 'awesome post 4', 'f9b514a7-5cd3-48c6-b173-efeeab6dd70c');
    `);

    await queryRunner.query(`
    INSERT INTO public.post_comment(
 id, content, "postId", "userId")
	VALUES 
	('d72392c3-ceb6-4ca5-9877-d054fcf58720', 'some content for user lismgmk post INCUB_1!!!', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e94'),
	('8ab87446-a318-406b-b0c4-c06df618fee9', 'some content for  lismgmk post INCUB_1!!!', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e94'),
	('510e2a2d-f9cf-4bc4-b459-e77907b03472', 'some content1 for user lismgmk post INCUB_1!!!', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e94'),
	('5bb3218f-6396-4578-9bfa-b4b3e046c1c8', 'some content2 for  lismgmk post INCUB_1!!!', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e94'),
	('3c1ea29c-ecac-4ed9-a70b-6066a8ceb3a5', 'some content3 for user lismgmk1 post INCUB_1!!!', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '5a0a001a-5f82-4710-98d6-d2213d24c0a3'),
	('247b06d0-8d62-41e4-8823-b842088a85dc', 'some content4 for  lismgmk1 post INCUB_1!!!', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '5a0a001a-5f82-4710-98d6-d2213d24c0a3'),
	('c30fb284-0bc1-49c5-87b4-bcd599b98247', 'some content5 for  lismgmk1 post INCUB_1!!!', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '5a0a001a-5f82-4710-98d6-d2213d24c0a3'),
	('10f8ef77-8abd-47b6-ba83-710d94264fee', 'some conten6 for user lismgmk2 post INCUB_1!!!', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '78fa6ee5-1b35-4c67-8ccc-697b036f2f57'),
	('ce0604aa-ff0e-4491-84ae-575971d87ca6', 'some content7 for  lismgmk2 post INCUB_1!!!', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '78fa6ee5-1b35-4c67-8ccc-697b036f2f57');

    `);

    await queryRunner.query(`
    INSERT INTO public."like"(
 "status", "postId", "userId", "commentId")
	VALUES 
	('Like', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e94', null),
	('Like', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e94', null),
	('Like', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '78fa6ee5-1b35-4c67-8ccc-697b036f2f57', null),
	('Like', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e99', null),
	('Dislike', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e94', null),
	('Dislike', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e94', null),
	('Dislike', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '78fa6ee5-1b35-4c67-8ccc-697b036f2f57', null),
	('Dislike', 'b2fd9a53-6ece-4cca-af6b-84ba56de59b8', '2ebe083d-374c-4564-90d8-9ade26b79e99', null),
	
	('Like', null, '2ebe083d-374c-4564-90d8-9ade26b79e94', 'd72392c3-ceb6-4ca5-9877-d054fcf58720' ),
	('Like', null, '2ebe083d-374c-4564-90d8-9ade26b79e94', 'd72392c3-ceb6-4ca5-9877-d054fcf58720' ),
	('Like', null, '78fa6ee5-1b35-4c67-8ccc-697b036f2f57', 'd72392c3-ceb6-4ca5-9877-d054fcf58720' ),
	('Like', null, '2ebe083d-374c-4564-90d8-9ade26b79e99', 'd72392c3-ceb6-4ca5-9877-d054fcf58720' ),
	('Dislike', null, '2ebe083d-374c-4564-90d8-9ade26b79e94', 'd72392c3-ceb6-4ca5-9877-d054fcf58720'),
	('Dislike', null, '2ebe083d-374c-4564-90d8-9ade26b79e94', 'd72392c3-ceb6-4ca5-9877-d054fcf58720'),
	('Dislike', null, '78fa6ee5-1b35-4c67-8ccc-697b036f2f57', 'd72392c3-ceb6-4ca5-9877-d054fcf58720'),
	('Dislike', null, '2ebe083d-374c-4564-90d8-9ade26b79e99', 'd72392c3-ceb6-4ca5-9877-d054fcf58720');
    `);
  }

  public async down(): Promise<void> {}
}
