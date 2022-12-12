import { Injectable } from '@nestjs/common';
import { RootBlackListRepository } from '../../config/switchers/rootClasses/root.blackList.repository';

@Injectable()
export class BlackListService {
  constructor(private blackListQueryRepository: RootBlackListRepository) {}

  async addTokenClearQuery(token: string) {
    return this.blackListQueryRepository.addTokenClearQuery(token);
  }

  async getTokenClearQuery(token: string) {
    return this.blackListQueryRepository.getTokenClearQuery(token);
  }
}
