import { Injectable } from '@nestjs/common';

@Injectable()
export class RootBlackListRepository {
  async addTokenClearQuery(token: string) {
    return;
  }

  async getTokenClearQuery(token: string) {
    return;
  }
}
