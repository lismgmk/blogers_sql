import { Injectable } from '@nestjs/common';
import { BlackList } from '../../../entity/black-list.entity';

@Injectable()
export class RootBlackListRepository {
  async addTokenClearQuery(token: string) {
    return;
  }

  async getTokenClearQuery(token: string): Promise<BlackList[]> {
    return;
  }
}
