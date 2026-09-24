import 'dotenv/config';

export const env = {
  HTTP_SERVER_PORT: Number(process.env.HTTP_SERVER_PORT) || 6000,
  
  MAX_POOL_SIZE: process.env.MAX_POOL_SIZE,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  
  GEOAPIFY_BASE_URL: process.env.GEOAPIFY_BASE_URL,
  GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,

};

