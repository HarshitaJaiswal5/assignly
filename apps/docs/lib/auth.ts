// // auth.ts
// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider !== "google" || !user.email) return true;

//       try {
//         // Call your backend service here
//         await createOrGetUser({
//           googleId: user.id,
//           email: user.email,
//           name: user.name,
//           image: user.image,
//         });

//         return true;
//       } catch {
//         return false;
//       }
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.name = user.name;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.email = token.email as string;
//         session.user.name = token.name as string;
//       }

//       return session;
//     },
//   },

//   pages: {
//     signIn: "/auth",
//   },

//   secret: process.env.AUTH_SECRET,
// });
