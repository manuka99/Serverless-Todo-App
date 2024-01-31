"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsExports);

export default function AuthenticatorUI() {
  console.log("ssss");
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
