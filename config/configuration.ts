import { path } from 'app-root-path';
import { validationSchema } from './validation';

const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 5000,
  jwt: {
    secret: process.env.SECRET,
  },
});

export const configRoot = {
  isGlobal: true,
  validationSchema,
  envFilePath: `${path}/config/env/${process.env.NODE_ENV}.env`,
  load: [configuration],
};
