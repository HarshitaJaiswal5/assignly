import { userRepository, UserRepository } from "@repositories/user.repository.js";
import { BadRequestError } from "@utils/ApiError.js";
import { AuthenticatedUser } from "@repo/auth-service";

export class AuthService {
  constructor(
    private readonly users: UserRepository
  ) {}


  async logout(sessionToken: string): Promise<void> {
    await this.users.deleteSession(sessionToken);
  }
}

export const authService = new AuthService(userRepository);