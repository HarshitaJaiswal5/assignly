import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@repo/prisma/db";
import { NextAuthConfig } from "next-auth";

const authOptions : NextAuthConfig = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "database" as const,
  },

  pages: {
    signIn: "/",
  },

  secret: process.env.AUTH_SECRET,
};

export default authOptions;