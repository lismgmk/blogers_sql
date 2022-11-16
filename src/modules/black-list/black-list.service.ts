import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IBlackListParam } from './dto/black-list.interfaces';

@Injectable()
export class BlackListService {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

  async addTokenClearQuery(dto: IBlackListParam) {
    const queryComand = `
  INSERT INTO public."blacklist"(
	"tokenValue", "user", "device")
	VALUES ($1, $2, $3);
    `;
    await this.dataSource.query(queryComand, [
      dto.tokenValue,
      dto.userId,
      dto.deviceId,
    ]);
    return;
  }

  async getTokenClearQuery(token: string) {
    const queryComand = `
    SELECT * FROM public.blacklist
WHERE "tokenValue"= $1
    `;
    const result = await this.dataSource.query(queryComand, [token]);
    return result[0];
  }
}
