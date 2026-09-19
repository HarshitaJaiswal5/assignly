import { prisma } from "@repo/prisma/db";

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: {
    id?: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }) {
    return prisma.user.create({
      data,
    });
  }
}

export const userRepository = new UserRepository();