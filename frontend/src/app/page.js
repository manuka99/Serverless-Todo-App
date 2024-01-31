"use client";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Home from "@/components/Home";
import AuthenticatorUI from "@/components/AuthenticatorUI";

export default function App() {
  const { route } = useAuthenticator((context) => [context.route]);

  // Use the value of route to decide which page to render
  return (
    <div className="text-white">
      Test {route}
      {route === "authenticated" ? <Home /> : <AuthenticatorUI />}
    </div>
  );
}
