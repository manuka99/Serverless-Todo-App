import AuthenticatorProvider from "@/components/AuthenticatorProvider";
import "./globals.css";
import "@aws-amplify/ui-react/styles.css";

export default function RootLayout({ children }) {
  return <AuthenticatorProvider>{children}</AuthenticatorProvider>;
}
