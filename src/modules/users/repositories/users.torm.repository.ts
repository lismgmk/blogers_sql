import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RootUsersRepository } from '../../../config/switchers/rootClasses/root.users.repository';
import { GetAllUsersQueryDto } from '../dto/get-all-user-query.dto';
import { ICreatedUserDto } from '../dto/user-interfaces.dto';

@Injectable()
export class UsersTormRepository extends RootUsersRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {
    super();
  }

  async getUserByIdClearQuery(id: string) {
    const queryComand = `
    SELECT * FROM public."user"
WHERE id= $1
    `;
    const user = await this.dataSource.query(queryComand, [id]);
    return user[0];
  }

  async getUserByNameClearQuery(name: string) {
    const queryComand = `
    SELECT * FROM public."user"
WHERE "name"= $1
    `;
    const user = await this.dataSource.query(queryComand, [name]);
    return user[0];
  }

  async getUserByEmailClearQuery(email: string) {
    const queryComand = `
    SELECT * FROM public."user"
WHERE "email"= $1
    `;
    const user = await this.dataSource.query(queryComand, [email]);
    return user[0];
  }

  async getUserByConfirmationCodeClearQuery(code: Date) {
    console.log(code);
    const queryComand = `
    SELECT * FROM public."user"
WHERE "confirmationCode" = $1
    `;
    const user = await this.dataSource.query(queryComand, [code]);
    console.log(user);

    return user[0];
  }

  async createUserClearQuery(dto: ICreatedUserDto & { hashPassword: string }) {
    const queryComand = `
  INSERT INTO public."user"(
	name, email, "createdAt", "passwordHash", "confirmationCode", "isConfirmed")
	VALUES ($1, $2, now(), $3, $4, $5);
    `;
    await this.dataSource.query(queryComand, [
      dto.login,
      dto.email,
      dto.hashPassword,
      dto.confirmationCode || null,
      dto.isConfirmed,
    ]);
    return;
  }

  async deleteUserByIdClearQuery(id: string) {
    const queryComand = `
   DELETE FROM "user"
WHERE id = $1;
    `;
    await this.dataSource.query(queryComand, [id]);
    return;
  }

  async getCountRows(searchLoginTerm: string, searchEmailTerm: string) {
    return this.dataSource.query(
      `SELECT  COUNT("id")  FROM  public."user" WHERE name like $1 and email like $2`,
      [`%${searchLoginTerm}%`, `%${searchEmailTerm}%`],
    );
  }

  async getAllUsersClearQuery(dto: GetAllUsersQueryDto & { offset: number }) {
    return this.dataSource.query(
      `
      SELECT id, name, "email", "createdAt", "passwordHash", "confirmationCode", "isConfirmed"
FROM public."user"
WHERE "name" like $1 and "email" like $2
ORDER BY $3
LIMIT $4 OFFSET $5
`,
      [
        `%${dto.searchLoginTerm}%`,
        `%${dto.searchEmailTerm}%`,
        `${dto.sortBy} ${dto.sortDirection}`,
        dto.pageSize,
        dto.offset,
      ],
    );
  }

  async changeUserConfirmCodeClearQuery(dto: {
    id: string;
    confirmationCode: string;
  }) {
    const queryComand = `
   UPDATE "user"
SET "confirmationCode" = $1
WHERE id = $2;
    `;
    await this.dataSource.query(queryComand, [dto.confirmationCode, dto.id]);

    return;
  }

  async changeUserStatusConfirmCodeClearQuery(dto: {
    id: string;
    confirmationCode: string;
    isConfirmed: boolean;
  }) {
    const queryComand = `
   UPDATE "user"
SET "confirmationCode" = $1, "isConfirmed" = $2 
WHERE id = $3;
    `;
    await this.dataSource.query(queryComand, [
      dto.confirmationCode,
      dto.id,
      dto.isConfirmed,
    ]);

    return;
  }

  async changeAdmitStateClearQuery(dto: {
    id: string;
    passwordHash: string;
    isConfirmed: boolean;
  }) {
    const queryComand = `
   UPDATE "user"
SET "passwordHash" = $1, "isConfirmed" = $2 
WHERE id = $3;
    `;
    await this.dataSource.query(queryComand, [
      dto.passwordHash,
      dto.isConfirmed,
      dto.id,
    ]);

    return;
  }

  async changeConfirmClearQuery(dto: { id: string; isConfirmed: boolean }) {
    const queryComand = `
   UPDATE "user"
SET  "isConfirmed" = $1 
WHERE "id" = $2;
    `;
    await this.dataSource.query(queryComand, [dto.isConfirmed, dto.id]);

    return;
  }
}
