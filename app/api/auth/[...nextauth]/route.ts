import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const [username, password] = [
          process.env.TEST_USERNAME,
          process.env.TEST_PASSWORD,
        ];
        if (
          credentials?.username !== username ||
          credentials?.password !== password
        ) {
          return null;
        }
        return { id: "test" };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
