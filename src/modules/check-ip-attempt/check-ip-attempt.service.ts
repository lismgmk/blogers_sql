import { Injectable } from '@nestjs/common';
import { RootCheckIpRepository } from '../../config/switchers/rootClasses/root.checkIp.repository';

@Injectable()
export class CheckIpAttemptService {
  constructor(private rootCheckIpRepository: RootCheckIpRepository) {}

  async getAllUsersIp(dto: { userIp: string; path: string }) {
    return this.rootCheckIpRepository.getAllUsersIp(dto);
  }
  async createUsersIp(dto: { userIp: string; path: string }) {
    return this.rootCheckIpRepository.createUsersIp(dto);
  }
}
