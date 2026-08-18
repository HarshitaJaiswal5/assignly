import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PrismaConfig } from 'prisma';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  schema: path.join('schemas', 'prisma', 'schema.prisma'),
  migrations: {
    path: path.join(__dirname, 'migrations'),
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
} satisfies PrismaConfig;
