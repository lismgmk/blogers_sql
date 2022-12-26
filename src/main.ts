// if (!process.env.IS_TS_NODE) {
//   require('module-alias/register');
// }

import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  app.use(cookieParser());
  await app.listen(process.env.PORT || 5000);
  console.log(
    process.env.TYPE_ORM,
    `Start with: ${process.env.NODE_ENV}.env`,
    `${[__dirname + '/**/*.entity{.ts,.js}']}`,
  );
}
bootstrap();

// 	SELECT
//   pg_terminate_backend(pg_stat_activity.pid)
// FROM
//   pg_stat_activity
// WHERE
//   pg_stat_activity.datname = 'opwfsbkv'
// AND pid <> pg_backend_pid();
