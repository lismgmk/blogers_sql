import { MigrationInterface, QueryRunner } from 'typeorm';

export class temprorFix1672088811248 implements MigrationInterface {
  name = 'temprorFix1672088811248';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_comment" DROP CONSTRAINT "FK_5675870bd3124aeeaa476256062"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" DROP CONSTRAINT "FK_59cb70befbb0f464cf4991d3ddd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_3acf7c55c319c4000e8056c1279"`,
    );
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "postId"`);
    await queryRunner.query(`ALTER TABLE "like" ADD "postId" integer`);
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "like" ADD "userId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" DROP CONSTRAINT "FK_c7fb3b0d1192f17f7649062f672"`,
    );
    await queryRunner.query(`ALTER TABLE "post_comment" DROP COLUMN "postId"`);
    await queryRunner.query(`ALTER TABLE "post_comment" ADD "postId" integer`);
    await queryRunner.query(`ALTER TABLE "post_comment" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "post_comment" ADD "userId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_d0418ddc42c5707dbc37b05bef9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "blogId"`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD "blogId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" DROP CONSTRAINT "PK_85c6532ad065a448e9de7638571"`,
    );
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" DROP CONSTRAINT "PK_b93d16dba5252c8d7221da38638"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" ADD CONSTRAINT "PK_657c293e81b67466e61cabee788" PRIMARY KEY ("deviceId")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_59cb70befbb0f464cf4991d3dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" ADD "userId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" DROP CONSTRAINT "PK_657c293e81b67466e61cabee788"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" ADD CONSTRAINT "PK_b93d16dba5252c8d7221da38638" PRIMARY KEY ("deviceId", "userId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_59cb70befbb0f464cf4991d3dd" ON "user_devices_device" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" ADD CONSTRAINT "FK_c7fb3b0d1192f17f7649062f672" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" ADD CONSTRAINT "FK_5675870bd3124aeeaa476256062" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_d0418ddc42c5707dbc37b05bef9" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" ADD CONSTRAINT "FK_59cb70befbb0f464cf4991d3ddd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" DROP CONSTRAINT "FK_59cb70befbb0f464cf4991d3ddd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_d0418ddc42c5707dbc37b05bef9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" DROP CONSTRAINT "FK_5675870bd3124aeeaa476256062"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" DROP CONSTRAINT "FK_c7fb3b0d1192f17f7649062f672"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_3acf7c55c319c4000e8056c1279"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_59cb70befbb0f464cf4991d3dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" DROP CONSTRAINT "PK_b93d16dba5252c8d7221da38638"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" ADD CONSTRAINT "PK_657c293e81b67466e61cabee788" PRIMARY KEY ("deviceId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_59cb70befbb0f464cf4991d3dd" ON "user_devices_device" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" DROP CONSTRAINT "PK_657c293e81b67466e61cabee788"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" ADD CONSTRAINT "PK_b93d16dba5252c8d7221da38638" PRIMARY KEY ("userId", "deviceId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" DROP CONSTRAINT "PK_85c6532ad065a448e9de7638571"`,
    );
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "blogId"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "blogId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_d0418ddc42c5707dbc37b05bef9" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "post_comment" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "post_comment" ADD "userId" uuid`);
    await queryRunner.query(`ALTER TABLE "post_comment" DROP COLUMN "postId"`);
    await queryRunner.query(`ALTER TABLE "post_comment" ADD "postId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "post_comment" ADD CONSTRAINT "FK_c7fb3b0d1192f17f7649062f672" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "like" ADD "userId" uuid`);
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "postId"`);
    await queryRunner.query(`ALTER TABLE "like" ADD "postId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_devices_device" ADD CONSTRAINT "FK_59cb70befbb0f464cf4991d3ddd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_comment" ADD CONSTRAINT "FK_5675870bd3124aeeaa476256062" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
