import { Prisma , prisma} from "@repo/prisma/db";

type PrismaClient = typeof prisma;

export class UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async findById(id: string) {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.db.user.create({
      data,
    });
  }

  async findSession(sessionToken: string) {
    return this.db.session.findUnique({
      where: {
        sessionToken,
      },
      include: {
        user: true,
      },
    });
  }

  async deleteSession(sessionToken: string) {
    await this.db.session.deleteMany({
      where: {
        sessionToken,
      },
    });
  }
}

export const userRepository = new UserRepository(prisma);