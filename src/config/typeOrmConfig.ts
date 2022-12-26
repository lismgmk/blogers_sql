import { path } from 'app-root-path';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ormSettings } from './ormsettings';

config();

export const typeOrmConfig = new DataSource({
  ...ormSettings,
  entities: [`${path}/dist/entity/*.entity{.ts,.js}`],
  migrations: [`${path}/dist/migrations/**/*{.ts,.js}`],
});
