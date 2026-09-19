import { userRepository } from "@repositories/user.repository.js";
import { BadRequestError } from "@utils/ApiError.js";

interface AuthUserData {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

export class AuthService {
  async createOrGetUser(data: AuthUserData) {
    if (!data.id || !data.email) {
      throw new BadRequestError(
        "User ID and email are required"
      );
    }

    const existingUser =
      await userRepository.findById(data.id);

    if (existingUser) {
      return existingUser;
    }

    return userRepository.create({
      id: data.id,
      email: data.email,
      name: data.name,
      image: data.image,
    });
  }
}

export const authService = new AuthService();