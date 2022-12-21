import { path } from 'app-root-path';
import dotenv, { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ormSettings } from './ormsettings';
config();

const env = process.env.NODE_ENV;
const dotenv_path = `${path}/deploy/${process.env.NODE_ENV}/.env.${env}`;

const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

export const migrationSeedTypeOrmConfig = new DataSource({
  ...ormSettings,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [`${path}/src/seedMigrations/**/*{.ts,.js}`],
});
