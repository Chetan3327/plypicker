import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import connect from "@/lib/connect";
import bcryptjs from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        const user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );
        if (!user) throw new Error("Invalid Email");
        const passwordMatch = await bcryptjs.compare(
          credentials!.password,
          user.password
        );
        if (!passwordMatch) throw new Error("Invalid Password");
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_URL,
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (trigger === "update" && session?.email) {
        token.email = session.email;
      }

      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          _id: token.id,
          name: token.name,
        },
      };
    },
  },
};
