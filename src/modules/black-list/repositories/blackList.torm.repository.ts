import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RootBlackListRepository } from '../../../config/switchers/rootClasses/root.blackList.repository';

@Injectable()
export class BlackListTormRepository extends RootBlackListRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {
    super();
  }

  async addTokenClearQuery(token: string) {
    const queryComand = `
  INSERT INTO public."black_list"(
	"tokenValue")
	VALUES ($1);
    `;
    await this.dataSource.query(queryComand, [token]);
    return;
  }

  async getTokenClearQuery(token: string) {
    const queryComand = `
    SELECT * FROM public."black_list"
WHERE "tokenValue"= $1
    `;
    const result = await this.dataSource.query(queryComand, [token]);
    return result;
  }
}
