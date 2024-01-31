import NextAuth, { AuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const authOptions: AuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER,
      idToken: true,
      checks: "nonce",
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }: any) => {
      if (account) token.account = account;
      if (user) token.user = user;
      return token;
    },
    async session({ session, token, user }: any) {
      session.account = token?.account;
      session.user = token?.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
