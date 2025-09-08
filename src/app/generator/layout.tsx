import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Lexend } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Generador de Invitaciones",
  description: "Estás al poder de todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${lexend.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
