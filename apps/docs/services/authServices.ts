import { signIn, signOut } from "next-auth/react";

type AuthActions = {
  signIn: typeof signIn,
  signOut: typeof signOut
}

export class AuthService {
  constructor (private readonly auth: AuthActions) {}

  async signInWithGoogle() {
    return this.auth.signIn("google", {
      callbackUrl: "/Dashboard",
    });
  }

  async logout() {
    return this.auth.signOut({
      callbackUrl: "/",
    });
  }
}

export const authService = new AuthService({
  signIn,
  signOut
});