// if (!process.env.IS_TS_NODE) {
//   require('module-alias/register');
// }

import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { DataSource, getManager } from 'typeorm';
import { path } from 'app-root-path';
import fs from 'fs';

const checkDBScript: string = fs
  .readFileSync(`${path}/src/config/typeorm/checkDbIfExists.sql`)
  .toString();
const createDb: string = fs
  .readFileSync(`${path}/src/config/typeorm/createDB.sql`)
  .toString();

const check = async (): Promise<void> => {
  const manager = getManager();

  const result = await manager.query(checkDBScript);

  if (result.length === 0) await manager.query(createDb);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  app.use(cookieParser());
  await app.listen(process.env.PORT || 5000);
  try {
    // wait on connection to be established
    await app.get(DataSource);
    await check();
  } catch (error) {
    // log error then throw
    throw error;
  }
  console.log(
    process.env.TYPE_ORM,
    `Start with: ${process.env.NODE_ENV}.env`,
    `${[__dirname + '/**/*.entity{.ts,.js}']}`,
  );
}
bootstrap();
