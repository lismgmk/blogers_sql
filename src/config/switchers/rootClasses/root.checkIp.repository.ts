import { Injectable } from '@nestjs/common';
import { ICreateDevice } from '../../../modules/devices/dto/createDevice.interface';

@Injectable()
export class RootCheckIpRepository {
  constructor() {}

  async getAllUsersIp(dto: { userIp: string; path: string }) {
    return;
  }
  async createUsersIp(dto: { userIp: string; path: string }) {
    return;
  }
}
