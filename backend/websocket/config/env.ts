import 'dotenv/config';

export const env = {
  WS_SERVER_PORT: Number(process.env.WS_SERVER_PORT) || 7000,
  FRONTEND_URL: process.env.FRONTEND_URL,
  WS_INTERNAL_SECRET: process.env.WS_INTERNAL_SECRET
};
