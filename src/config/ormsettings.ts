import { path } from 'app-root-path';
import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

const env = process.env.NODE_ENV;
const dotenv_path = `${path}/deploy/${process.env.NODE_ENV}/.env.${env}`;

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
  synchronize: true,
  // migrationsTableName: 'custom_migration_table',
};
