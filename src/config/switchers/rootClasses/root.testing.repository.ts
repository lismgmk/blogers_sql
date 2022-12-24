import { Injectable } from '@nestjs/common';

@Injectable()
export class RootTestingRepository {
  constructor() {}
  async deleteAllData() {
    return;
  }
}
