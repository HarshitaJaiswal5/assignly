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
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/",
  },
  
  secret: process.env.AUTH_SECRET,
  
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.name = user.name;
        session.user.image = user.image;
      }

      return session;
    },
  },

};

export default authOptions;