import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const cone = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
  return {
    postgresUrl: cone,
    //process.env.DATABASE_URL,
  };
});
