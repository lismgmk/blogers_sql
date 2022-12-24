import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RootTestingRepository } from '../../../config/switchers/rootClasses/root.testing.repository';

@Injectable()
export class TestingQueryRepository extends RootTestingRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {
    super();
  }

  async deleteAllData() {
    await this.dataSource.query(`TRUNCATE TABLE public."black_list" CASCADE`);
    await this.dataSource.query(`TRUNCATE TABLE public."blog" CASCADE`);
    await this.dataSource.query(`TRUNCATE TABLE public."device" CASCADE`);
    await this.dataSource.query(`TRUNCATE TABLE public."user" CASCADE`);

    await this.dataSource.query(`TRUNCATE TABLE public."post" CASCADE`);
    await this.dataSource.query(`TRUNCATE TABLE public."post_comment" CASCADE`);
    await this.dataSource.query(`TRUNCATE TABLE public."like" CASCADE`);
    await this.dataSource.query(
      `TRUNCATE TABLE public."user_device_id_device" CASCADE`,
    );
    return;
  }
}
