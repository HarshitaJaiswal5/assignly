"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = exports.prisma = void 0;
var client_1 = require("@prisma/client");
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return client_1.Prisma; } });
var adapter_pg_1 = require("@prisma/adapter-pg");
var adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
var globalForPrisma = globalThis;
exports.prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient({
    adapter: adapter,
    log: ["warn", "error"],
});
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
