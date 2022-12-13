import { Injectable } from '@nestjs/common';
import { RootUsersRepository } from '../../config/switchers/rootClasses/root.users.repository';
import { paginationBuilder } from '../../helpers/pagination-builder';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { GetAllUsersQueryDto } from './dto/get-all-user-query.dto';
import { ICreatedUserDto } from './dto/user-interfaces.dto';

@Injectable()
export class UsersService {
  constructor(
    private rootUsersRepository: RootUsersRepository,
    private jwtPassService: JwtPassService,
  ) {}

  async getUserByIdClearQuery(id: string) {
    return this.rootUsersRepository.getUserByIdClearQuery(id);
  }

  async getUserByNameClearQuery(name: string) {
    return this.rootUsersRepository.getUserByNameClearQuery(name);
  }

  async getUserByEmailClearQuery(email: string) {
    return this.rootUsersRepository.getUserByEmailClearQuery(email);
  }

  async getUserByConfirmationCodeClearQuery(code: Date) {
    return this.rootUsersRepository.getUserByConfirmationCodeClearQuery(code);
  }

  async createUserClearQuery(dto: ICreatedUserDto) {
    const hashPassword = await this.jwtPassService.createPassBcrypt(
      dto.password,
    );
    return this.rootUsersRepository.createUserClearQuery({
      ...dto,
      hashPassword,
    });
  }

  async deleteUserByIdClearQuery(id: string) {
    await this.rootUsersRepository.deleteUserByIdClearQuery(id);
    return;
  }

  async getAllUsersClearQuery(dto: GetAllUsersQueryDto) {
    const offset =
      dto.pageNumber === 1 ? 0 : (dto.pageNumber - 1) * dto.pageSize;
    const allRows = await this.rootUsersRepository.getCountRows(
      dto.searchLoginTerm,
      dto.searchEmailTerm,
    );

    const allUsersQuery = await this.rootUsersRepository.getAllUsersClearQuery({
      ...dto,
      offset,
    });
    return {
      ...paginationBuilder({
        totalCount: Number(allRows[0].count),
        pageSize: dto.pageSize,
        pageNumber: dto.pageNumber,
      }),
      items: allUsersQuery,
    };
  }

  async changeUserConfirmCodeClearQuery(dto: {
    id: string;
    confirmationCode: string;
  }) {
    await this.rootUsersRepository.changeUserConfirmCodeClearQuery(dto);
    return;
  }

  async changeUserStatusConfirmCodeClearQuery(dto: {
    id: string;
    confirmationCode: string;
    isConfirmed: boolean;
  }) {
    await this.rootUsersRepository.changeUserStatusConfirmCodeClearQuery(dto);
    return;
  }

  async changeAdmitStateClearQuery(dto: {
    id: string;
    passwordHash: string;
    isConfirmed: boolean;
  }) {
    await this.rootUsersRepository.changeAdmitStateClearQuery(dto);
    return;
  }

  async changeConfirmClearQuery(dto: { id: string; isConfirmed: boolean }) {
    await this.rootUsersRepository.changeConfirmClearQuery(dto);
    return;
  }
}
