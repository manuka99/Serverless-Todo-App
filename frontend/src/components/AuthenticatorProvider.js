"use client";
import "@aws-amplify/ui-react/styles.css"; // default theme
import { Authenticator, View } from "@aws-amplify/ui-react";

export default function AuthenticatorProvider({ children }) {
  return (
    <Authenticator.Provider>
      <View>{children}</View>
    </Authenticator.Provider>
  );
}
