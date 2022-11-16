import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { ICreatedUserDto } from './dto/user-interfaces.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    private jwtPassService: JwtPassService,
  ) {}

  async getUserByIdClearQuery(id: string) {
    const queryComand = `
    SELECT * FROM public.user
WHERE id= $1
    `;
    const user = await this.dataSource.query(queryComand, [id]);
    return user[0];
  }

  async createUserClearQuery(dto: ICreatedUserDto) {
    const hashPassword = await this.jwtPassService.createPassBcrypt(
      dto.password,
    );
    const queryComand = `
  INSERT INTO public."user"(
	name, email, "createdAt", "passwordHash", "confirmationCode", "isConfirmed")
	VALUES ($1, $2, now(), $3, $4, $5);
    `;
    await this.dataSource.query(queryComand, [
      dto.login,
      dto.email,
      hashPassword,
      null,
      true,
    ]);
    return;
  }

  //   async deleteUserById(id: string) {
  //     return this.userModel.findByIdAndDelete(id);
  //   }

  //   async getAllUsers(
  //     queryParams: GetAllUsersQueryDto,
  //   ): Promise<IPaginationResponse<IUser>> {
  //     const loginPart = new RegExp(queryParams.searchLoginTerm);
  //     const emailPart = new RegExp(queryParams.searchEmailTerm);

  //     const filter = {
  //       'accountData.userName': loginPart,
  //       'accountData.email': emailPart,
  //     };

  //     const allUsers: IUser[] = (
  //       await this.userModel
  //         .find(filter)
  //         .sort({ [queryParams.sortBy]: queryParams.sortDirection })
  //         .skip(
  //           queryParams.pageNumber > 0
  //             ? (queryParams.pageNumber - 1) * queryParams.pageSize
  //             : 0,
  //         )
  //         .limit(queryParams.pageSize)
  //         .lean()
  //     ).map((i) => {
  //       return {
  //         id: i._id,
  //         login: i.accountData.userName,
  //         createdAt: i.accountData.createdAt,
  //         email: i.accountData.email,
  //       };
  //     });

  //     const totalCount = await this.userModel.countDocuments().exec();
  //     const paginationParams: paramsDto = {
  //       totalCount: totalCount,
  //       pageSize: queryParams.pageSize,
  //       pageNumber: queryParams.pageNumber,
  //     };
  //     return {
  //       ...paginationBuilder(paginationParams),
  //       items: allUsers,
  //     };
  //   }
}
