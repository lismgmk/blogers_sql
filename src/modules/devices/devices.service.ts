import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { add } from 'date-fns';
import { DataSource } from 'typeorm';
import { ICreateDevice } from './dto/createDevice.interface';

@Injectable()
export class DevicesService {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  expiredRefresh = this.configService.get<string>('EXPIRED_REFRESH');

  async changeDeviceExpiredClearQuery(dto: {
    userId: string;
    deviceId: string;
  }) {
    const expiredAt = add(new Date(), {
      seconds: Number(this.expiredRefresh.slice(0, -1)),
    });

    const queryComand = `
   UPDATE "device"
SET "expiredAt" = $1, "createdAt" = now()
WHERE "id" = $2;
    `;
    await this.dataSource.query(queryComand, [expiredAt, dto.deviceId]);

    return;
  }

  async createDeviceClearQuery(dto: ICreateDevice) {
    const expiredAt = add(new Date(), {
      seconds: Number(this.expiredRefresh.slice(0, -1)),
    });

    const queryComand = `
  INSERT INTO public."device"(
	id, "ip", "name", "expiredAt", "createdAt")
	VALUES ($1, $2, $3, $4, now())
      `;
    const nestedTableQueryComand = `
   INSERT INTO "user_device_device" (
          "userId", "deviceId"
        )
        VALUES( $1, $2)
  
    `;
    await this.dataSource.query(queryComand, [
      dto.id,
      dto.ip,
      dto.deviceName,
      expiredAt,
    ]);
    await this.dataSource.query(nestedTableQueryComand, [dto.userId, dto.id]);
    return;
  }

  async deleteDeviceClearQuery(id: string) {
    const queryComand = `
   DELETE FROM "device"
WHERE  "id" = $1;
    `;
    await this.dataSource.query(queryComand, [id]);
    return;
  }
}
