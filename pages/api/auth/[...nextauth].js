import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        const res = await axios.post(
          `${process.env.APP_URL}/api/auth/signin`,
          credentials
        );

        const funcionario = res.data;

        if (funcionario) {
          return funcionario;
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    jwt: true,
  },

  jwt: {
    secret: process.env.JWT_TOKEN,
  },

  callbacks: {
    async jwt({ token, funcionario }) {
      if (funcionario) {
        token.uid = funcionario.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.funcionarioId = token.uid;
      }
      return session;
    },
  },
});
