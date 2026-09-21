import { userRepository, UserRepository } from "@repositories/user.repository.js";
import { BadRequestError } from "@utils/ApiError.js";
import { AuthenticatedUser } from "@shared-types/auth.types.js";

export class AuthService {
  constructor(
    private readonly users: UserRepository
  ) {}

  async getAuthenticatedUser(sessionToken: string): Promise<AuthenticatedUser | null> {
    const session = await this.users.findSession(sessionToken);

    if (!session) {
      return null;
    }

    if (session.expires <= new Date()) {
      return null;
    }

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
    };
  }

  async logout(sessionToken: string): Promise<void> {
    await this.users.deleteSession(sessionToken);
  }
}

export const authService = new AuthService(userRepository);