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
  await app.listen(process.env.PORT || 5000, '0.0.0.0');
  // console.log(process.env.TYPE_ORM);

  // console.log(
  //   process.env.TYPE_ORM,
  //   `Start with: ${process.env.NODE_ENV}.env`,
  //   `${[__dirname + '/**/*.entity{.ts,.js}']}`,
  // );
}
bootstrap();
