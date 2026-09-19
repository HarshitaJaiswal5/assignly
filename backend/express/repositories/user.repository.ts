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
}

export const userRepository = new UserRepository(prisma);