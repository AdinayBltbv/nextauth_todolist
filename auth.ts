import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
<<<<<<< HEAD
  providers: [Google],
  pages: {
    signIn: "/login",
  },
=======
  providers: [GitHub, Google],

>>>>>>> b943af9f9b1bb15fc7ee742d228d99e6d422c174
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
