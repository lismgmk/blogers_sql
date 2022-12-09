import { DataSourceOptions } from 'typeorm';
import { path } from 'app-root-path';
import dotenv, { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const env = process.env.NODE_ENV;
const dotenv_path = `${path}/env/.env.${env}`;

const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

export const ormSettings: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  migrationsTableName: 'custom_migration_table',
};
