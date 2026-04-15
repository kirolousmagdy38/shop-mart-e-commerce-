
import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";
import { signIN } from "@/services/authApi";

import { jwtDecode } from "jwt-decode";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "test",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "***********",
        },
      },
      async authorize(credentials) {
        const response = await signIN(
          credentials?.email ?? "",
          credentials?.password ?? "",
        );
        console.log(response);

        if (response.message === "success") {
        const  decodedToken=jwtDecode(response.token);
        console.log("decodedToken:",decodedToken);
        
          const user = {
            id: response.user.email,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            token: response.token,
          };
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.user.token = token.token as string;
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
