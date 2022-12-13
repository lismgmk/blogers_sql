import { Injectable } from '@nestjs/common';
import { User } from '../../../entity/user.entity';
import { GetAllUsersQueryDto } from '../../../modules/users/dto/get-all-user-query.dto';
import { ICreatedUserDto } from '../../../modules/users/dto/user-interfaces.dto';

@Injectable()
export class RootUsersRepository {
  constructor() {}
  async getUserByIdClearQuery(id: string): Promise<User> {
    return;
  }

  async getUserByNameClearQuery(name: string): Promise<User> {
    return;
  }

  async getUserByEmailClearQuery(email: string): Promise<User> {
    return;
  }

  async getUserByConfirmationCodeClearQuery(code: Date): Promise<User> {
    return;
  }

  async createUserClearQuery(dto: ICreatedUserDto & { hashPassword: string }) {
    return;
  }

  async deleteUserByIdClearQuery(id: string) {
    return;
  }

  async getAllUsersClearQuery(dto: GetAllUsersQueryDto & { offset: number }) {
    return;
  }

  async changeUserConfirmCodeClearQuery(dto: {
    id: string;
    confirmationCode: string;
  }) {
    return;
  }

  async changeUserStatusConfirmCodeClearQuery(dto: {
    id: string;
    confirmationCode: string;
    isConfirmed: boolean;
  }) {
    return;
  }

  async changeAdmitStateClearQuery(dto: {
    id: string;
    passwordHash: string;
    isConfirmed: boolean;
  }) {
    return;
  }

  async changeConfirmClearQuery(dto: { id: string; isConfirmed: boolean }) {
    return;
  }

  async getCountRows(searchLoginTerm: string, searchEmailTerm: string) {
    return;
  }
}
