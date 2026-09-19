import { userRepository, UserRepository } from "@repositories/user.repository.js";
import { BadRequestError } from "@utils/ApiError.js";

interface AuthUserData {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

export class AuthService {
  constructor(
    private readonly users: UserRepository
  ) {}

  async createOrGetUser(data: AuthUserData) {
    if (!data.id || !data.email) {
      throw new BadRequestError(
        "User ID and email are required"
      );
    }

    const existingUser =
      await this.users.findById(data.id);

    if (existingUser) {
      return existingUser;
    }

    return this.users.create({
      id: data.id,
      email: data.email,
      name: data.name,
      image: data.image,
    });
  }
}

export const authService = new AuthService(userRepository);