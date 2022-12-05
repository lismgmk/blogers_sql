export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 5000,
  jwt: {
    secret: process.env.SECRET,
  },
});
