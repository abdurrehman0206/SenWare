import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      isSuperAdmin: boolean;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      username: string;
      isSuperAdmin: boolean;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if (user.id) {
        const existingUser = await getUserById(user.id);
        if (!existingUser) return false;
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.user = {
        id: token.sub,
        username: existingUser.username,
        isSuperAdmin: existingUser.isSuperAdmin,
      };
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.user) {
        session.user = { ...session.user, ...token.user };
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
