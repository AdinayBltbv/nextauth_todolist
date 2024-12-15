import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { db } from "./db";

const authOptions: NextAuthOptions = {
  providers: [GitHub, Google],

  async callbacks({ user }) {
    const { email, name, id } = user;

    if (email) {
      await db.query(
        `
        INSERT INTO users (id, email, name) VALUES ($1, $2, $3)
        ON CONFLICT (email) DO NOTHING;
      `,
        [id, email, name]
      );
    }

    return user;
  },

  async session({ session, user }) {
    session.user.id = user.id;
    return session;
  },

  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
    }
    return token;
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
