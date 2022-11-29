import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CheckIpAttemptService {
  constructor(
    private configService: ConfigService,
    @InjectDataSource() protected dataSource: DataSource,
  ) {}

  async getAllUsersIp(dto: { userIp: string; path: string }) {
    const secondsLimit = this.configService.get<string>('SECONDS_LIMIT');

    const queryComand = `
	 SELECT *
FROM "check_ip_attempt"
where "createdAt" > now() - $1 ::interval 
and "ip"=$2 
and "path"=$3
      `;
    return this.dataSource.query(queryComand, [
      `${secondsLimit}  SECOND`,
      dto.userIp,
      dto.path,
    ]);
  }
  async createUsersIp(dto: { userIp: string; path: string }) {
    const queryComand = `INSERT INTO public."check_ip_attempt"("path", "ip")
VALUES ($1, $2);
      `;
    await this.dataSource.query(queryComand, [dto.path, dto.userIp]);
    return;
  }
}
