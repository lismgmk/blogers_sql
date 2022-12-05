// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//   cli: {
//     migrationsDir: __dirname + '/../database/migrations',
//   },
//   extra: {
//     charset: 'utf8mb4_unicode_ci',
//   },
//   synchronize: false,
//   logging: true,
// };

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// class MigrationTypeOrmConfig {
//   static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
//     return {
//       type: 'postgres',
//       host: configService.get<string>('POSTGRES_HOST'),
//       port: parseInt(configService.get<string>('POSTGRES_PORT')),
//       username: configService.get<string>('POSTGRES_USER'),
//       password: configService.get<string>('POSTGRES_PASSWORD'),
//       database: configService.get<string>('POSTGRES_DB'),
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: false,
//       migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
//     };
//   }
// }
export const migrationTypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
