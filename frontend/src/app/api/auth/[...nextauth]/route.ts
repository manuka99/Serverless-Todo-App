import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

console.log(process.env.COGNITO_CLIENT_ID);
console.log(process.env.COGNITO_CLIENT_SECRET);
console.log(process.env.COGNITO_ISSUER);

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
