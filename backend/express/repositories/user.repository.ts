import { Prisma } from "@repo/prisma/db";
import { prisma } from "@repo/prisma/db";

type PrismaClient = typeof prisma;

class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }
}

export const userRepository = new UserRepository(prisma);