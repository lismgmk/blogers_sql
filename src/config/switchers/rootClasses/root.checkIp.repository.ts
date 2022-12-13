import { Injectable } from '@nestjs/common';
import { CheckIpAttempt } from '../../../entity/checkIpAttempt.entity';

@Injectable()
export class RootCheckIpRepository {
  constructor() {}

  async getAllUsersIp(dto: {
    userIp: string;
    path: string;
  }): Promise<CheckIpAttempt[]> {
    return;
  }
  async createUsersIp(dto: { userIp: string; path: string }) {
    return;
  }
}
