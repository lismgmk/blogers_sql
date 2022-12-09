import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { path } from 'app-root-path';
import dotenv from 'dotenv';
import { migrationTypeOrmConfig } from './migration';
import { ormSettings } from './ormsettings';
config();

const env = process.env.NODE_ENV;
const dotenv_path = `${path}/env/.env.${env}`;

const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

export const migrationSeedTypeOrmConfig = new DataSource({
  ...ormSettings,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [`${path}/src/seedMigrations/**/*{.ts,.js}`],
});
