import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import { compare } from "bcryptjs";

import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) {
          return null;
        }

        const userData = await db
          .select()
          .from(user)
          .where(eq(user.name, credentials.name.toString()))
          .limit(1);

        if (userData.length === 0) return null;

        const isPasswordValid = await compare(
          credentials.password.toString(),
          userData[0].password
        );

        if (!isPasswordValid) return null;

        return {
          id: userData[0].id.toString(),
          name: userData[0].name,
          password: userData[0].password,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/panel",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
