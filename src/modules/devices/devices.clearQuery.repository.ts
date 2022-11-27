import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { add } from 'date-fns';
import { DataSource } from 'typeorm';
import { ICreateDevice } from './dto/createDevice.interface';

@Injectable()
export class DevicesQueryRepository {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  expiredRefresh = this.configService.get<string>('EXPIRED_REFRESH');

  //   async getAllDevices(userId: string) {
  //     const allDevicesQuery = `
  // SELECT name, ip, "createdAt", id, "expiredAt",
  // CASE
  //     WHEN "device"."updatedAt" != NULL  THEN "device"."updatedAt"
  //     ELSE "device"."createdAt"
  // END As "lastActiveDate"
  // 	FROM public.device
  // 	left join "user_device_device" on "user_device_device"."deviceId" = "device"."id"
  // 	where "user_device_device"."userId" = $1
  // `;
  //     return this.dataSource.query(allDevicesQuery, [userId]);
  //   }

  //   async deleteAllExcludeCurrent(userId: string, deviceId: string) {
  //     const deleteQuery = `
  // DELETE FROM "device"
  //   using "device" as d
  //   left outer join "user_device_device" on "user_device_device"."deviceId" = d."id"
  // 	where "user_device_device"."userId" = $1 and d.id != $2
  // `;
  //     await this.dataSource.query(deleteQuery, [userId, deviceId]);
  //     return;
  //   }

  //   async changeDeviceExpiredClearQuery(dto: {
  //     userId: string;
  //     deviceId: string;
  //   }) {
  //     const expiredAt = add(new Date(), {
  //       seconds: Number(this.expiredRefresh.slice(0, -1)),
  //     });

  //     const queryComand = `
  //    UPDATE "device"
  // SET "expiredAt" = $1
  // WHERE "id" = $2;
  //     `;
  //     await this.dataSource.query(queryComand, [expiredAt, dto.deviceId]);

  //     return;
  //   }

  //   async createDeviceClearQuery(dto: ICreateDevice) {
  //     const expiredAt = add(new Date(), {
  //       seconds: Number(this.expiredRefresh.slice(0, -1)),
  //     });

  //     const queryComand = `
  //   INSERT INTO public."device"(
  // 	id, "ip", "name", "expiredAt")
  // 	VALUES ($1, $2, $3, $4)
  //       `;
  //     const nestedTableQueryComand = `
  //    INSERT INTO "user_device_device" (
  //           "userId", "deviceId"
  //         )
  //         VALUES( $1, $2)

  //     `;
  //     await this.dataSource.query(queryComand, [
  //       dto.id,
  //       dto.ip,
  //       dto.deviceName,
  //       expiredAt,
  //     ]);
  //     await this.dataSource.query(nestedTableQueryComand, [dto.userId, dto.id]);
  //     return;
  //   }

  //   async deleteDeviceClearQuery(id: string) {
  //     const queryComand = `
  //    DELETE FROM "device"
  // WHERE  "id" = $1;
  //     `;
  //     await this.dataSource.query(queryComand, [id]);
  //     return;
  //   }
}
