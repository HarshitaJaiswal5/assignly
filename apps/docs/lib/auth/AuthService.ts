import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { apiClient } from "../api/ApiClient";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "database",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) {
        return true;
      }

      try {
        await apiClient.post("/auth/user", {
          googleId: account.providerAccountId,
          email: user.email,
          name: user.name,
          image: user.image,
        });

        return true;
      } catch (error) {
        console.error("User sync failed:", error);
        return false;
      }
    },

    async session({ session }) {
      return session;
    },
  },

  pages: {
    signIn: "/auth",
  },

  secret: process.env.AUTH_SECRET,
});