import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RootCheckIpRepository } from '../../../config/switchers/rootClasses/root.checkIp.repository';
import { CheckIpAttempt } from '../../../entity/checkIpAttempt.entity';

@Injectable()
export class CheckIpTormRepository extends RootCheckIpRepository {
  constructor(
    private configService: ConfigService,
    @InjectDataSource() protected dataSource: DataSource,
  ) {
    super();
  }

  async getAllUsersIp(dto: {
    userIp: string;
    path: string;
  }): Promise<CheckIpAttempt[]> {
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
