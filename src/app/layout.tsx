import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm_plex_sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="pl">
      <SessionProvider session={session}>
        <body className={`${ibmPlexSans.variable} max-container antialiased`}>
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
