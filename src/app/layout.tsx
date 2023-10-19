import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "../utils/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dialog",
  description: "Chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#3a3c42" />
      <link rel="manifest" href="/manifest.json" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
