import { signIn, signOut } from "next-auth/react";

export class AuthService {
  async signInWithGoogle() {
    return signIn("google", {
      callbackUrl: "/Dashboard",
    });
  }

  async logout() {
    return signOut({
      callbackUrl: "/",
    });
  }
}

export const authService = new AuthService();