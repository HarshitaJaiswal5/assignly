import { prisma } from '@repo/prisma/db';
import type { AuthenticatedUser } from '../../shared-types/auth.types.js';

export class AuthService {
  public async getAuthenticatedUser(
    sessionToken: string
  ): Promise<AuthenticatedUser | null> {
    const session = await prisma.session.findUnique({
      where: {
        sessionToken,
      },
      include: {
        user: true,
      },
    });

    if (!session || session.expires <= new Date()) {
      return null;
    }

    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }
}
