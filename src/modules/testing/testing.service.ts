import { Injectable } from '@nestjs/common';
import { RootTestingRepository } from '../../config/switchers/rootClasses/root.testing.repository';

@Injectable()
export class TestingService {
  constructor(protected rootTestingRepository: RootTestingRepository) {}

  async deleteAllData() {
    return this.rootTestingRepository.deleteAllData();
  }
}
