import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { add } from 'date-fns';
import { DataSource } from 'typeorm';
import { RootDevicesRepository } from './classes/root.devices.repository';
import { ICreateDevice } from './dto/createDevice.interface';

@Injectable()
export class DevicesQueryRepository extends RootDevicesRepository {
  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    private configService: ConfigService,
  ) {
    super();
  }
  expiredRefresh = this.configService.get<string>('EXPIRED_REFRESH');

  async getAllDevices(userId: string) {
    const allDevicesQuery = `
SELECT name, ip, id, "expiredAt",
CASE
    WHEN "device"."updatedAt" != NULL  THEN "device"."updatedAt" 
    ELSE "device"."createdAt"
END As "lastActiveDate"
	FROM public.device
	left join "user_device_device" on "user_device_device"."deviceId" = "device"."id" 
	where "user_device_device"."userId" = $1
`;
    return this.dataSource.query(allDevicesQuery, [userId]);
  }

  async createDevice(dto: ICreateDevice) {
    console.log(
      'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    );
    const expiredAt = add(new Date(), {
      seconds: Number(this.expiredRefresh.slice(0, -1)),
    });

    const queryComand = `
  INSERT INTO public."device"(
	id, "ip", "name", "expiredAt")
	VALUES ($1, $2, $3, $4)
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

  async deleteAllExcludeCurrent(userId: string, deviceId: string) {
    const deleteQuery = `
DELETE
FROM "device" D
WHERE EXISTS
		(SELECT "userId",
				"deviceId"
			FROM PUBLIC.USER_DEVICE_DEVICE U
			WHERE U."userId" = $1
				AND D.ID NOT IN ($2)
				AND U."deviceId" NOT IN ($2)) RETURNING *
`;
    await this.dataSource.query(deleteQuery, [userId, deviceId]);
    return;
  }

  async changeDeviceExpiredClearQuery(dto: {
    userId: string;
    deviceId: string;
  }) {
    const expiredAt = add(new Date(), {
      seconds: Number(this.expiredRefresh.slice(0, -1)),
    });

    const queryComand = `
   UPDATE "device"
SET "expiredAt" = $1
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
	id, "ip", "name", "expiredAt")
	VALUES ($1, $2, $3, $4)
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

  async getUserIdByDeviceId(id: string) {
    const queryComand = `
    SELECT * FROM "user_device_device" U
WHERE U."deviceId"= $1
    `;
    const entity = await this.dataSource.query(queryComand, [id]);
    return entity[0];
  }

  async deleteDeviceClearQuery(id: string, userId: string) {
    const currentUser = await this.getUserIdByDeviceId(id);
    if (!currentUser) {
      throw new NotFoundException();
    }
    if (currentUser.userId !== userId) {
      throw new ForbiddenException();
    }

    const queryComand = `
DELETE FROM "device"
WHERE  "id" = $1;
    `;
    await this.dataSource.query(queryComand, [id]);

    const nestedTableQueryComand = `
DELETE FROM PUBLIC.USER_DEVICE_DEVICE U
WHERE U."deviceId"= $1
    `;
    await this.dataSource.query(nestedTableQueryComand, [id]);
    return;
  }
}
